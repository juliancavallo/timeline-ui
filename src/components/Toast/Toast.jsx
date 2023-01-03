import React, { useState } from 'react'
import './toast.css'
import {Close, Delete} from '@mui/icons-material';
import { createEvent, updateEvent } from '../../functions/apiFunctions';

const Toast = ({info, handleClosed}) => {
    const [title, setTitle] = useState(info.title ?? 'Title...');
    const [summary, setSummary] = useState(info.summary ?? 'Description...');
    const [date, setDate] = useState(info.date != null ? info.date.split('T')[0] : '2022-01-01');

    const handleDeleted = () => {
        alert(info.id);
    }

    const handleSaved = async () => {
        let event = {
            title: title,
            summary: summary,
            date: date,
            idTimeline: info.idTimeline
        };

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
                    <button className='toast-button' onClick={() => handleDeleted()}><Delete/></button>
                    <button className='toast-button' onClick={handleClosed}><Close/></button>
                </div>

                <input type='text' className='toast-title' value={title} spellCheck={false} onChange={(e) => setTitle(e.target.value)}></input>
                <input type='date' defaultValue={date} onChange={(e) => setDate(e.target.value)}></input>
                <textarea value={summary} spellCheck={false} onChange={(e) => setSummary(e.target.value)}></textarea>

                <div className='toast-footer'>
                    <button className='toast-button' onClick={() => handleSaved()}>Save</button>
                </div>

            </div>
        </div>
    )
}

export default Toast;