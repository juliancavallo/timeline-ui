import React from 'react'
import './toast.css'

const Toast = ({info}) => {
    return (
        <div className='toast'>{info}</div>
    )
}

export default Toast;