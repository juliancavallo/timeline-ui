import axios from 'axios'

const getAllTimelines = async (state) => {
    console.log('getAllTimelines');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/timelines`);
    state(response.data);
}

const getTimeline = async (state, idTimeline) => {
    console.log('getTimeline');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/timelines`);
    state(response.data.filter(x => x.id === idTimeline)[0]);
}

const updateTimeline = async (info, id) => {
    console.log('updateTimeline');
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/timelines/${id}`, info);
    console.log(response);
}

const createTimeline = async (info) => {
    console.log('createTimeline');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/timelines`, info);
    console.log(response);
}

const deleteTimeline = async (id) => {
    console.log('deleteTimeline');
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/timelines/${id}`);
    console.log(response);
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

const deleteEvent = async (id) => {
    console.log('deleteEvent');
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`);
    console.log(response);
}

export {
    getAllTimelines,
    getTimeline,
    updateTimeline,
    createTimeline,
    deleteTimeline,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}