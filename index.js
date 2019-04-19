const axios = require('axios');
const production = false;

const app = production
    ? 'https://bichofolha-api.supera.com.br'
    : 'http://localhost:1337';

const LOGIN_URL = app.concat('/auth/local');
const TEAMS_URL = app.concat('/teams');

let jwt_token;

const login = async () => {
    try {
        axios
            .post(LOGIN_URL, {
                identifier: 'thais',
                password: '123123'
            })
            .then(response => {
                jwt_token = response.data.jwt;
                console.log(jwt_token);
            })
            .then(() => {
                teams();
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        return null;
    }
};

const teams = async () => {
    try {
        axios
            .get(TEAMS_URL, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        return null;
    }
};

login();
