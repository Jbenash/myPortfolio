import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

//step:1 create an axios instance
const api = axios.create(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)


//step:2 add a request interceptor to handle errors globally
api.interceptors.request.use(
    (response) => response,
    (error) => {
        console.log('API Request Error:', error);
        return Promise.reject(error)
        //it should return a promise rejection because axios expects that
    }
)

//step:3 create specific API modules
export const aboutAPI = {
    getAbout: () => api.get('/about'),

}


export const projectsAPI = {
    getProjects: () => api.get('/projects'),
}

export const skillsAPI = {
    getSkills: () => api.get('/skills')

}

export const contactAPI = {
    submitContact: (data) => api.post('/contact', data)

}


