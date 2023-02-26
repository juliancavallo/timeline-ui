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
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/timelines/${id}`, info, {headers: {'Authorization': getToken()}});
    console.log(response);
}

const createTimeline = async (info) => {
    console.log('createTimeline');
    const response = await axios
        .post(`${process.env.REACT_APP_API_URL}/timelines`, info, {headers: {'Authorization': getToken()}})
        .catch((error) => {
            alert(error.response.data)
        });
    console.log(response);
}

const deleteTimeline = async (id) => {
    console.log('deleteTimeline');
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/timelines/${id}`, {headers: {'Authorization': getToken()}});
    console.log(response);
}

const getEvents = async (state, idTimeline) => {
    console.log('getEvents');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/${idTimeline}`);
    state(response.data);
}

const createEvent = async (info) => {
    console.log('createEvent');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, info, {headers: {'Authorization': getToken()}});
    console.log(response);
}

const updateEvent = async (info, id) => {
    console.log('updateEvent');
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/events/${id}`, info, {headers: {'Authorization': getToken()}});
    console.log(response);
}

const deleteEvent = async (id) => {
    console.log('deleteEvent');
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`, {headers: {'Authorization': getToken()}});
    console.log(response);
}

const isAuthorized = () => {
    const token = localStorage.getItem('token');
    
    return token ? true : false;
}

const getToken = () => {
    const token = localStorage.getItem('token');

    if(token)
        return `Bearer ${token}`
    
    return "";
}

const login = async (user, password) => {
    console.log('login');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        'username': user,
        'password': password
    }).then((response) => {
        localStorage.setItem('token',response.data.token);
        alert('Login successful')
    }).catch((error) => {
        alert(error.response.data.message);
    });
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
    deleteEvent,
    isAuthorized,
    login
}