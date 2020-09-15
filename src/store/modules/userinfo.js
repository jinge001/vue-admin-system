const userinfo = {
    state: {
        userinfo: {},
   },
   mutations:{
        getuserinfo(state, userinfo) {
            return state.userinfo = userinfo;
        },

   },
   actions: {
    GenerateUsers({ commit }, data) {
        //console.log(data);
        commit('getuserinfo', data);
    },
   },

}
export default userinfo;