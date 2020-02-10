import api from '../api';

export const postUser = () => {
    api.auth.postUser()
    .then(response => response.json())
    .catch(err => {
        console.log(err);
    });
}