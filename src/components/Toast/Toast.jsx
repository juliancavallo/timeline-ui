import React from 'react'
import './toast.css'
import {Close} from '@mui/icons-material';

const Toast = ({info, handleClosed}) => {
    return (
        <div className='toast-wrapper'>
            <div className='toast'>
                <button className='close-button' onClick={handleClosed}><Close/></button>
                <input type='text' className='toast-title' defaultValue={info.title} spellCheck={false}></input>
                <input type='text' defaultValue={info.date}></input>
                <textarea defaultValue={info.summary} spellCheck={false}></textarea>
            </div>
        </div>
    )
}

export default Toast;