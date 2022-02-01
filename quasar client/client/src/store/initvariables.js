export const VARIABLES_INIT = {
    namespaced:true,
    state:{
        item_active:"home",
        item_active_model:"memorialdoc"
    },
    mutations:{
        CheckItemActive(state,payload){
            state.item_active = payload
        },
        CheckItemActiveInModel(state,payload){
            state.item_active_model = payload
        },
    },
    actions:{}
}