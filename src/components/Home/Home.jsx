import React, {useEffect, useState} from 'react'
import { getAllTimelines } from '../../functions/functions';
import './home.css'
import NewTimelineButton from '../NewTimelineButton/NewTimelineButton'

const Home = () => {
    const [timelines, setTimelines] = useState(null)

    useEffect(() => {
        getAllTimelines(setTimelines);
    },[])

    return (
        <>
            {
                timelines != null ? (
                    <div className='timeline-container'>
                        {timelines.map(x => (
                            <div key={x.id} className='timeline-thumbnail'>
                                <p>{x.title}</p>
                            </div>
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