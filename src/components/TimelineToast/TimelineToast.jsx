import React, { useState } from 'react'
import {Close} from '@mui/icons-material';
import { createTimeline, updateTimeline } from '../../functions/apiFunctions';

const TimelineToast = ({info, handleClosed}) => {
    const [title, setTitle] = useState(info.title ?? 'Title...');

    const handleSaved = async () => {
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
            <input type='text' className='toast-title' value={title} spellCheck={false} onChange={(e) => setTitle(e.target.value)}></input>

                <div className='toast-footer'>
                    <button className='toast-button' onClick={() => handleSaved()}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default TimelineToast;