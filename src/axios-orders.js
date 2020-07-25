import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgerbuilder-77bd6.firebaseio.com/'
});

export default instance;