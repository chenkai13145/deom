const user={
    state:{
        hh:'陈凯'
    },
    mulition:{
       hh(state,data){
           state.hh=data
       }
    },
    action:{
        hhs({commit},data){
            commit('hh',data)
        }
    }
}
export default user;