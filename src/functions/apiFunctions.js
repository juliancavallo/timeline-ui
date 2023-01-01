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

export {
    getAllTimelines,
    getEvents
}