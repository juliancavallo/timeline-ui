import React, { useEffect, useState } from 'react'
import { getEvents, getTimeline, isAuthorized } from '../../functions/apiFunctions';
import {useWindowWidth} from '../../functions/customHooks'
import './timeline.css'
import EventToast from '../EventToast/EventToast';
import {useParams} from 'react-router'
import { Link } from 'react-router-dom';
import {Home, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import LoginToast from '../LoginToast/LoginToast';

const Timeline = () => {
    const [timeline, setTimeline] = useState({});
    let {id} = useParams();
    const [events, setEvents] = useState(null);
    const [eventsToRender, setEventsToRender] = useState([]);

    const [range, setRange] = useState(1);
    const [offset, setOffset] = useState(0);
    
    const [selectedItem, setselectedItem] = useState(null);
    
    const [fetchData, setFetchData] = useState(true);
    const [createEvent, setCreateEvent] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    
    const windowWidth = useWindowWidth();
    

    useEffect(() => {
        if(fetchData){
            async function getEventsAsync(){
                await getEvents(setEvents, id);
            }

            getEventsAsync();
            console.log('useEffect - updateData');
            
            setFetchData(false);
        }
    }, [fetchData, id])

    useEffect(() => {
        async function getTimelineAsync(){
            await getTimeline(setTimeline, parseInt(id));
        }
        
        getTimelineAsync();
        
        console.log('useEffect - getTimeline');
    }, [id]);

    const convertToUTCDate = (date) => {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        return new Date(year, month, day);
    }

    useEffect(() => {    
        const loadData = () => {
            if(events != null && events.length > 0){
                const date = convertToUTCDate(new Date(events[0].date));
                const firstYear = date.getFullYear() + (offset * range);
                const timelineWidth = windowWidth * 0.9;
    
                const eventsQty = Math.max(Math.floor((timelineWidth / 200)) - 1, 1); //200px is the event width
    
                let elements = [];
    
                for (let i = firstYear; i < firstYear + (eventsQty * range); i += range) {
                    elements.push(
                    <div className='year' key={i}>
                        {i}
                        <div className='mark' key={i}></div>
                        {addEvents(i)}
                    </div>)
                }
    
                setEventsToRender(elements);
            }
            
        }
        
        const addEvents = (year) => {
            let elements = [];
            const nextYear = year + range;
            const eventsInRange = events.filter(x => convertToUTCDate(new Date(x.date)).getFullYear() >= year && convertToUTCDate(new Date(x.date)).getFullYear() < nextYear);
    
            if(eventsInRange){
                for(let i in eventsInRange){
                    elements.push( 
                        <div className='event-title' onClick={() => handleEventClick(eventsInRange[i])} key={i}>
                            {eventsInRange[i].title}
                        </div>);
                }
            }
    
            return elements;
        }

            loadData(); 
    }, [events, offset, range, windowWidth])

    const goToEnd = () => {
        const lastYear = convertToUTCDate(new Date(events[events.length - 1].date)).getFullYear();
        const firstYear = convertToUTCDate(new Date(events[0].date)).getFullYear();
        const newOffset = (lastYear - firstYear) / range;
        setOffset(newOffset);
    }

    const goToStart = () => {
        setOffset(0);
    }

    const handleEventClick = (item) => {

        if(isAuthorized())
            setselectedItem(item);
        else
            setShowLogin(true);
    }

    const handleEventClosed = () => {
        setselectedItem(null);
        setCreateEvent(null);
        setFetchData(true);
    }

    const handleEventChangeRange = (newRange) => {
        const firstYearOnScreen =   eventsToRender[0].props.children[0];
        const firstYear = convertToUTCDate(new Date(events[0].date)).getFullYear();

        const yearsDifference = firstYearOnScreen - firstYear;
        
        const newOffset = Math.floor(yearsDifference / newRange); 

        setRange(newRange);
        setOffset(newOffset);
    }

    const handleClickNewEvent = (e) => {
        e.preventDefault();

        if(isAuthorized())
            setCreateEvent(true);
        else
            setShowLogin(true);
    }

    const handleLoginToastClosed = () => {
        setShowLogin(false);
    }

    
    console.log('render')
    return (
        <>
            <>
                <Link to={'/'} className='redirect-button'><Home></Home></Link>
                <p className='timeline-title'>{timeline.title}</p>
                <section className="buttons-container">
                    <button id="btnStart" className="time-btn" onClick={() => goToStart()}><KeyboardDoubleArrowLeft/></button>
                    <button id="btnBack" className="time-btn" onClick={() => setOffset(Math.max(offset - 1, 0))}><KeyboardArrowLeft/></button>
                    <div className="select-container">
                        <label htmlFor="range">Year range</label>
                        <select name="selectRange" id="range" className="select" onChange={(e) => handleEventChangeRange(Number(e.target.value))}>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
                        </select>
                    </div>
                    <button id="btnForward" className="time-btn" onClick={() => setOffset(offset + 1)}><KeyboardArrowRight/></button>
                    <button id="btnEnd" className="time-btn" onClick={() => goToEnd()}><KeyboardDoubleArrowRight/></button>
                </section>
                {
                    <div className="timeline">
                        {(events != null && events.length > 0) ? (
                            <>
                                <section className='events-container'>
                                        {eventsToRender}
                                </section>
                                {
                                    selectedItem != null && (
                                        <EventToast info={selectedItem} handleClosed={() => handleEventClosed()}></EventToast>
                                    )
                                }
                            </>

                        ) : <></>}
                    </div>
                }
                
                <button id="btnNewEvent" className='new-event-button' onClick={(e) => handleClickNewEvent(e)}>New event</button>
                {
                    createEvent != null && (
                        <EventToast handleClosed={() => handleEventClosed()} info={({idTimeline: id})}></EventToast>
                    )
                }
            </>
            <>
                { showLogin ? <LoginToast handleClosed={() => handleLoginToastClosed()}></LoginToast> : null }
            </>
        </>
    )
}

export default Timeline;