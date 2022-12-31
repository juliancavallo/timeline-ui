import React, {useEffect, useState, useLayoutEffect} from 'react'
import { getEvents } from '../../functions/functions';
import { useParams } from "react-router";
import {useWindowWidth} from '../../functions/customHooks'
import './timeline.css'

const Timeline = () => {
    let { id } = useParams();
    const [events, setEvents] = useState(null);
    const [range, setRange] = useState(1);
    const [offset, setOffset] = useState(0);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        loadData();
        getEvents(setEvents, id);
    }, [])

    const addEvents = (year) => {
        let elements = [];
        const nextYear = year + range;
        const eventsInRange = events.filter(x => new Date(x.date).getFullYear() >= year && new Date(x.date).getFullYear() < nextYear);

        if(eventsInRange){
            for(let i in eventsInRange){
                elements.push( 
                <p className='event-title' onClick={() => alert(eventsInRange[i].summary)}>
                    {eventsInRange[i].title}
                </p>);
            }
        }

        return elements;
    }

    const loadData = () => {
        if(events != null){
            const firstYear = new Date(events[0].date).getFullYear() + (offset * range);
            const timelineWidth = windowWidth * 0.9;

            const eventsQty = Math.max(Math.floor((timelineWidth / 200)) - 1, 1); //200px is the event width

            let elements = [];

            for (let i = firstYear; i < firstYear + (eventsQty * range); i += range) {
                elements.push(
                <div className='year'>
                    {i}
                    <div className='mark'></div>
                    {addEvents(i)}
                </div>)
            }

            return elements;
        }
    }
    
    return (
        <>
        {
            events != null ? (
                <div className="timeline">
                    <section className="buttons-container">
                        <button id="btnBack" className="time-btn" onClick={() => setOffset(Math.max(offset - 1, 0))}>◄</button>
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
                        <button id="btnForward" className="time-btn" onClick={() => setOffset(offset + 1)}>►</button>
                    </section>
                    <section className='events-container'>
                        {loadData()}
                    </section>
                </div>
            ) : (
                <></>
            )
        }
        </>
    )
}

export default Timeline;