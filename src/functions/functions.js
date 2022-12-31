import axios from 'axios'

const getAllTimelines = async (state) => {
    const request = await axios.get(`${process.env.REACT_APP_API_URL}/timelines`);
    state(request.data);
}

const getEvents = async (state, idTimeline) => {
    const request = await axios.get(`${process.env.REACT_APP_API_URL}/events/${idTimeline}`);
    state(request.data);
}

export {
    getAllTimelines,
    getEvents
}