import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});
// https://my-fullstack-auth-app1.herokuapp.com
// http://localhost:5000
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const createPayment = (data2) => API.post('/payments', data2);
export const fetchNotes = () => API.get('/notes');
export const getCategoryCount = () => API.get('/category');
export const getStatusCount = () => API.get('/status');
export const getPost = (email) => API.get(`/posts/${email}`);
export const getFilePost = (email) => API.get(`/files/${email}`);
export const createFilePost = (newPost) => API.post('/files', newPost);
export const createFollowUp = (newFollowUp) => API.post('/notes', newFollowUp);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const updateFilePost = (id, updatedPost) => API.patch(`/files/${id}`, updatedPost);
export const getRetainedFiles = () => API.get(`/retainedFile`);
export const getRetainedStatus = (email) => API.get(`/retainedFile/${email}`);
export const createRetainedAgreement = (newPost) => API.post('/retainedFile', newPost);
export const updateRetainedAgreement = (id, updatedPost) =>
  API.patch(`/retainedFile/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
