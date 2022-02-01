import Vue from 'vue'
let year = new Date().getFullYear()
let month = new Date().getMonth() + 1
month = (month >=10) ? month : "0"+month
let date = new Date().getDate()
date = (date >=10) ? date : "0"+date
let hour = new Date().getHours();
let minutes = new Date().getMinutes();
const GET_TODAY = year + "-"+month+"-"+date
const GET_TIMETODAY = hour+":"+minutes
export const CoverProperties = {
    namespaced: true,
    state: {
        id_cover:null,
        step_one: true,
        step_two: false,
        cover_image_information: {
            id: null,
            url_uploaded: null,
            code_document: null,
            crime: null,
            date_admission: null,
            hours_admission: null,
            appellant: null, //QUERELLANTES
            process_type: null,
            accused: null, //IMPUTADO
            relevant_court: null,
            victim: null, //VICTIMAS
        },
        cover_list:[],
    },
    mutations: {
        GetdataToCoverModule(state,payload){
            state.cover_list= payload;
        },
        GetId(state,payload){
            state.id_cover = payload.id;
        },
        getDataCoverImage(state, payload) {
            let auxid= (payload._id != undefined ? payload._id : (payload.id != undefined ? payload.id : null))
         
            state.cover_image_information = {
                id:(auxid == null ? state.cover_image_information.id : auxid),
                url_uploaded:(payload.url_uploaded== null ? state.cover_image_information.url_uploaded : payload.url_uploaded),
                code_document:(payload.code_document== null ? state.cover_image_information.code_document : payload.code_document),
                crime:(payload.crime== null ? state.cover_image_information.crime : payload.crime),
                date_admission:(payload.date_admission== null ? state.cover_image_information.date_admission : payload.date_admission),
                hours_admission:(payload.hours_admission== null ? state.cover_image_information.hours_admission : payload.hours_admission),
                appellant:(payload.appellant== null ? state.cover_image_information.appellant : payload.appellant),
                process_type:(payload.process_type== null ? state.cover_image_information.process_type : payload.process_type),
                accused:(payload.accused== null ? state.cover_image_information.accused : payload.accused),
                relevant_court:(payload.relevant_court== null ? state.cover_image_information.relevant_court : payload.relevant_court),
                victim:(payload.victim== null ? state.cover_image_information.victim : payload.victim),
            }
           
        },
        clearCoverInformation(state){
            state.cover_image_information={
                id: null,
                url_uploaded: null,
                code_document: null,
                crime: null,
                date_admission: null,
                hours_admission: null,
                appellant: null, //QUERELLANTES
                process_type: null,
                accused: null, //IMPUTADO
                relevant_court: null,
                victim: null, //VICTIMAS
            }
        },
        changeStepOne(state){
            state.step_one = true;
            state.step_two = false;
        },
        changeStepTwo(state){
            state.step_one = false;
            state.step_two = true;
        }
    },
    actions: {
        GetDataFromApi({commit}){
            Vue.prototype.$axios.get('documents/read')
            .then(response =>{
               
                commit('GetdataToCoverModule',response.data);
            })
            .catch(error =>{
                console.log(error);
            })
            
        },
        UpdateDataFromApi({commit},payload){
            let id = (payload.id != undefined ? payload.id : payload._id)
            return Vue.prototype.$axios.put(`documents/update/${id}`,payload)
        },
        CreateCoverDocument({commit},payload){
           return Vue.prototype.$axios.post('documents/create',payload);
            
        },
        DeleteData({commit},payload){
            let id = (payload.id != undefined ? payload.id : payload._id)
            return Vue.prototype.$axios.delete(`documents/delete/${id}`);
        }
    }
}