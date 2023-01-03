import axios from 'axios'

const getAllTimelines = async (state) => {
    console.log('getAllTimelines');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/timelines`);
    state(response.data);
}

const getEvents = async (state, idTimeline) => {
    console.log('getEvents');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/${idTimeline}`);
    state(response.data);
}


const createEvent = async (info) => {
    console.log('createEvent');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, info);
    console.log(response);
}

const updateEvent = async (info, id) => {
    console.log('updateEvent');
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/events/${id}`, info);
    console.log(response);
}

export {
    getAllTimelines,
    getEvents,
    createEvent,
    updateEvent
}