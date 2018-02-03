import axios from 'axios';
import $store from '@store/';
import $config from '@config';

export default {
    basic (username, password) {
        let args = {};
        args.baseURL = config.SERVER_URL;
        args.auth = {
            username: username,
            password: password
        };
        return axios.create(args)
    },
    access () {
        let args = {};
        args.baseURL = $config.SERVER_URL;
        if ($store.getters.isLogged()) {
            args.headers = {Authorization: `Bearer ${$store.state.tokens.access}`};
        }
        return axios.create(args)
    },
    refresh () {
        let args = {};
        args.baseURL = $config.SERVER_URL;
        if ($store.getters.isLogged()) {
            args.headers = {Authorization: `Bearer ${$store.state.tokens.refresh}`};
        }
        return axios.create(args)
    },
    noAuth () {
        let args = {};
        args.baseURL = $config.SERVER_URL;
        args.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        return axios.create(args)
    }
}
