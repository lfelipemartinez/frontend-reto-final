import Vue from 'vue'
import Vuex from 'vuex'
import jwtdecode from 'jwt-decode'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, token){
        state.token = token;

    },
    setUser(state, usuario){
        state.user = usuario
    }
    },
    actions: {
        saveToken({commit}, token){
            commit("setToken", token);
            commit("setUser", jwtdecode(token));
            localStorage.setItem('token', token);

        },
        autoLogin({commit}){
            const token = localStorage.getItem('token');
            if (token){
                commit("setToken", token);
                commit("setUser", jwtdecode(token));

            }

        },
        out({commit}){
            commit("setToken", null);
            commit("setUser", null);
            localStorage.removeItem('token');
            router.push({name: 'Home'})
        }
}
   }
)