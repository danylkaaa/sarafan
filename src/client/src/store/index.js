import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        tokens: {
            access: null,
            refresh: null,
        },
        user: null
    },
    plugins: [
        createPersistedState()
    ],
    getters: {
        isLogged: (state) = > () = > Boolean(state.user),
    isNotLogged
:
(state) =
>
() =
>
!Boolean(state.user),
},
mutations: {
    login(state, data)
    {
        state.tokens.refresh = data.tokens.refresh;
        state.tokens.access = data.tokens.access;
        state.user = data.user;
    }
,
    setTokenRefresh(state, token)
    {
        state.tokens.refresh = token
    }
,
    setTokenAccess(state, token)
    {
        state.tokens.access = token
    }
,
    setUser(state, value)
    {
        state.user = value;
    }
}
,
actions: {
    SET_TOKEN_REFRESH({commit}, token)
    {
        commit('setTokenRefresh', token);
    }
,
    SET_TOKEN_ACCESS({commit}, token)
    {
        commit('setTokenAccess', token);
    }
,
    SET_USER({commit}, value)
    {
        commit('setUser', value)
    }
,
    LOGIN({commit}, value)
    {
        commit('login', value);
    }
}
})
