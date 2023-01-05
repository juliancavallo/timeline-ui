import React, {useEffect, useState} from 'react'
import { getAllTimelines, deleteTimeline } from '../../functions/apiFunctions';
import './home.css'
import { Link } from "react-router-dom";
import {Delete, Edit} from '@mui/icons-material';
import TimelineToast from '../TimelineToast/TimelineToast'

const Home = () => {
    const [timelines, setTimelines] = useState(null);
    const [updateData, setUpdateData] = useState(true);
    const [createTimeline, setCreateTimeline] = useState(false);
    const [editTimeline, setEditTimeline] = useState(false);

    useEffect(() => {
        if(updateData){
            async function getAllTimelinesAsync() {
                await getAllTimelines(setTimelines);
            }
            
            getAllTimelinesAsync();

            setUpdateData(false);            
        }
    },[updateData])

    const handleDelete = async (e, id) => {
        e.preventDefault();
        await deleteTimeline(id);

        setUpdateData(true);
    }

    const handleEdit = async (e, id) => {
        e.preventDefault();

        setEditTimeline(true);
    }

    const handleCreate = async (e) => {
        e.preventDefault();

        setCreateTimeline(true);
    }

    const handleToastClosed = () => {
        setUpdateData(true);
        setCreateTimeline(false);
        setEditTimeline(false);
    }

    console.log('render')

    return (
        <>
            {
                timelines != null ? (
                    <div className='timeline-container'>
                        {timelines.map(x => (
                            <>
                                <Link to={`/timelines/${x.id}`} className='timeline-thumbnail' key={x.id}>{x.title}
                                    <div className='action-buttons-container'>
                                        <Delete className='action-button' onClick={(e) => handleDelete(e, x.id)}/>
                                        <Edit className='action-button' onClick={(e) => handleEdit(e, x.id)}/>
                                    </div>
                                </Link>
                                {
                                    editTimeline ? (<TimelineToast info={x} handleClosed={() => handleToastClosed()}></TimelineToast>) : null
                                }
                            </>
                        )).concat(
                            <>
                                <div key='addTimelineBtn' className='button-thumbnail' onClick={(e) => handleCreate(e)}>
                                    <p>New timeline</p>
                                </div>
                                {
                                    createTimeline ? (<TimelineToast info={{}} handleClosed={() => handleToastClosed()}></TimelineToast>) : null
                                }
                            </>
                        )}
                    </div>
                
                ) : (
                    <div className='timeline-container'>
                        <div key='addTimelineBtn' className='button-thumbnail' onClick={(e) => handleCreate(e)}>
                            <p>New timeline</p>
                        </div>
                        {
                            createTimeline ? (<TimelineToast info={{}} handleClosed={() => handleToastClosed()}></TimelineToast>) : null
                        }
                    </div>
                    )
            }
        </>
    )
}

export default Home;