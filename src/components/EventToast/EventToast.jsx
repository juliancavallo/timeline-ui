import React, { useState } from 'react'
import './eventToast.css'
import {Close, Delete} from '@mui/icons-material';
import { createEvent, updateEvent, deleteEvent } from '../../functions/apiFunctions';

const EventToast = ({info, handleClosed}) => {
    const [title, setTitle] = useState(info.title ?? '');
    const [summary, setSummary] = useState(info.summary ?? '');
    const [date, setDate] = useState(info.date != null ? info.date.split('T')[0] : '2022-01-01');

    const handleDeleted = async () => {
        if(info.id)
            await deleteEvent(info.id);

        handleClosed();
    }

    const handleSaved = async () => {
        let event = {
            title: title,
            summary: summary,
            date: date,
            idTimeline: info.idTimeline
        };

        if(title == ""){
            alert('the title is mandatory');
            return;
        }

        if(summary == ""){
            alert('the summary is mandatory');
            return;
        }

        if(info.id)
            await updateEvent(event, info.id);
        else
            await createEvent(event);

        handleClosed();
    }

    return (
        <div className='toast-wrapper'>
            <div className='toast'>
                <div className='toast-header'>
                    <button className='toast-button' onClick={() => handleDeleted()} disabled={info.id == null}><Delete/></button>
                    <button className='toast-button' onClick={handleClosed}><Close/></button>
                </div>

                <input 
                    type='text' 
                    className='toast-title' 
                    value={title} 
                    spellCheck={false} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'></input>

                <input type='date' defaultValue={date} onChange={(e) => setDate(e.target.value)}></input>
                
                <textarea 
                    value={summary} 
                    spellCheck={false} 
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder='Summary'
                    ></textarea>

                <div className='toast-footer'>
                    <button className='toast-button' onClick={() => handleSaved()}>Save</button>
                </div>

            </div>
        </div>
    )
}

export default EventToast;