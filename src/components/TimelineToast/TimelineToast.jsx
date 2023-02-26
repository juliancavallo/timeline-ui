import React, { useState } from 'react'
import { createTimeline, updateTimeline } from '../../functions/apiFunctions';
import {Close} from '@mui/icons-material';

const TimelineToast = ({info, handleClosed}) => {
    const [title, setTitle] = useState(info.title ?? '');

    const handleSaved = async () => {

        if(title == ""){
            alert('the title is mandatory');
            return;
        }

        let timeline = {
            title: title
        };

        if(info.id)
            await updateTimeline(timeline, info.id);
        else
            await createTimeline(timeline)

        handleClosed();
    }

    return (
        <div className='toast-wrapper'>
            <div className='toast'>
                <div className='toast-header'>
                    <button className='toast-button' onClick={() => handleClosed()}><Close/></button>
                </div>

                <input 
                    type='text' 
                    className='toast-title' 
                    value={title} 
                    spellCheck={false} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title..."></input>

                <div className='toast-footer'>
                    <button className='toast-button' onClick={() => handleSaved()}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default TimelineToast;