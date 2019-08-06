import Vue from 'vuex'
import Vuex from 'vuex'
import user from './modlue/user'
import getters from './getters'


Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        user
    },
    getters
})

export default store