export const VARIABLES_INIT = {
    namespaced:true,
    state:{
        item_active:"home"
    },
    mutations:{
        CheckItemActive(state,payload){
            state.item_active = payload
        }
    },
    actions:{}
}