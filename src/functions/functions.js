import axios from 'axios'

const getAllTimelines = async (state) => {
    const request = await axios.get(`${process.env.REACT_APP_API_URL}/timelines`);
    state(request.data);
}

export {
    getAllTimelines
}