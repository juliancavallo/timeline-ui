import React, { useEffect, useState } from 'react'
import { getEvents } from '../../functions/apiFunctions';
import { useParams } from "react-router";
import {useWindowWidth} from '../../functions/customHooks'
import './timeline.css'
import Toast from '../Toast/Toast';
import { Link } from 'react-router-dom';
import {Home, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight} from '@mui/icons-material';

const Timeline = () => {
    let { id } = useParams();
    const [events, setEvents] = useState(null);
    const [range, setRange] = useState(1);
    const [offset, setOffset] = useState(0);
    const [selectedItem, setselectedItem] = useState(null);
    const [updateData, setUpdateData] = useState(true);
    const [createEvent, setCreateEvent] = useState(null);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if(updateData){
            async function getEventsAsync(){
                await getEvents(setEvents, id);
            }

            getEventsAsync();
            console.log('useEffect');
            loadData();

            setUpdateData(false);
        }
    }, [updateData])

    const handleEventClick = (item) => {
        setselectedItem(item);
    }

    const handleEventClosed = () => {
        setselectedItem(null);
        setCreateEvent(null);
        setUpdateData(true);
    }

    const addEvents = (year) => {
        let elements = [];
        const nextYear = year + range;
        const eventsInRange = events.filter(x => new Date(x.date).getFullYear() >= year && new Date(x.date).getFullYear() < nextYear);

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

    const loadData = () => {
        if(events != null && events.length > 0){
            const firstYear = new Date(events[0].date).getFullYear() + (offset * range);
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

            return elements;
        }
    }
    
    console.log('render')
    return (
        <>
        <Link to={'/'} className='redirect-button'><Home></Home></Link>
        {
            <div className="timeline">
                {(events != null && events.length > 0) ? (
                    <>
                        <section className="buttons-container">
                            <button id="btnBack" className="time-btn" onClick={() => setOffset(Math.max(offset - 1, 0))}><KeyboardDoubleArrowLeft/></button>
                            <div className="select-container">
                                <label htmlFor="range">Year range</label>
                                <select name="selectRange" id="range" className="select" onChange={(e) => setRange(Number(e.target.value))}>
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
                            <button id="btnForward" className="time-btn" onClick={() => setOffset(offset + 1)}><KeyboardDoubleArrowRight/></button>
                        </section>
                        <section className='events-container'>
                                {loadData()}
                        </section>
                        {
                            selectedItem != null && (
                                <Toast info={selectedItem} handleClosed={() => handleEventClosed()}></Toast>
                            )
                        }
                    </>

                ) : <></>}
            </div>
        }
        
        <button id="btnNewEvent" className='new-event-button' onClick={() => setCreateEvent(true)}>New event</button>
        {
            createEvent != null && (
                <Toast handleClosed={() => handleEventClosed()} info={({idTimeline: id})}></Toast>
            )
        }
        </>
    )
}

export default Timeline;