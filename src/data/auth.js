import api from '../api';

export const postUser = (data) => {
    api.auth.postUser(data)
    .then(response => response.json())
    .catch(err => {
        console.log(err);
    });
}