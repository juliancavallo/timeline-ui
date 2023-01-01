import React, {useEffect, useState} from 'react'
import { getAllTimelines } from '../../functions/apiFunctions';
import './home.css'
import { Link } from "react-router-dom";

const Home = () => {
    const [timelines, setTimelines] = useState(null)

    useEffect(() => {
        getAllTimelines(setTimelines);
    },[])

    console.log('render')

    return (
        <>
            {
                timelines != null ? (
                    <div className='timeline-container'>
                        {timelines.map(x => (
                            <Link to={`/timelines/${x.id}`} className='timeline-thumbnail' key={x.id}>{x.title}</Link>
                        )).concat(
                            <div key='addTimelineBtn' className='button-thumbnail'>
                                <p>+</p>
                            </div>
                        )}
                    </div>
                
                ) : ([
                    <div key='addTimelineBtn' className='button-thumbnail'>
                        <p>+</p>
                    </div>])
            }
        </>
    )
}

export default Home;