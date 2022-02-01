import Vue from 'vue'
const vue = Vue.prototype;
export const DIARY_BOOK ={
    namespaced:true,
    state:{
        list_diary_books:[],
        list_content_frombooks:[],
        diary_selected:{},
        diary_content_selected:{},
        delete_open:false,
        delete_open_content:false,

        /**
         * id_diary_book: null,
        entry_date: null,
        departure_date: null,
        accused: [],
        victim: [],
        appellant: [],
        fojas_number: null,
        detail_sum: null,
        nurek_number: null
         */
    },
    mutations:{
        OpenCloseDeleteContentBook(state,payload){
            state.delete_open_content = payload
        },
        Getentry_date(state,payload){
            state.diary_content_selected.entry_date = payload
        },
        Getdeparture_date(state,payload){
            state.diary_content_selected.departure_date = payload
        },
        Getaccused(state,payload){
            state.diary_content_selected.accused = payload
        },
        Getvictim(state,payload){
            state.diary_content_selected.victim = payload
        },
        Getappellant(state,payload){
            state.diary_content_selected.appellant = payload
        },
        Getfojas_number(state,payload){
            state.diary_content_selected.fojas_number = payload
        },
        Getdetail_sum(state,payload){
            state.diary_content_selected.detail_sum = payload
        },
        Getnurek_number(state,payload){
            state.diary_content_selected.nurek_number = payload
        },

        ReloadDiaryContentSelected(state,payload){
            state.diary_content_selected = payload
        },
        ReloadDiarySelected(state,payload){
            state.diary_selected = payload
        },
        ReloadListDiaryBooks(state,payload){
            state.list_diary_books = payload
        },
        DeleteOpenClose(state,payload){
            state.delete_open = payload
        },
        getbook_name(state,payload){
            state.diary_selected.book_name= payload
        },
        getyear_of_management(state,payload){
            state.diary_selected.year_of_management= payload
        },
        getdescription(state,payload){
            state.diary_selected.description= payload
        },
    },
    actions:{
        GetListDiaryBooks({commit}){
            vue.$axios.get('diary_books/complete/get/full')
            .then(response =>{ 
                response.data.data.forEach(element =>{
                    element.departure_date
                })
                commit('ReloadListDiaryBooks',response.data.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        GetDiaryBookById({commit},payload){
            let id = payload.id_diary_book || payload.id || payload._id
            vue.$axios.get(`diary_books/complete/${id}`)
            .then(response =>{
            
                commit('ReloadDiarySelected',response.data.data)
            })
            .catch(err =>{
                console.log("err",err)
            })
        },
        CreateDiaryBook({commit},payload){
            let book_to_create = payload
            vue.$axios.post(`diary_books/create`,book_to_create)
            .then(response =>{
                
            })
            .catch(err =>{
                console.log(err)
            })
        },
        CreateContentToDiaryBook({commit},payload){
            let id = payload.id || payload.id_diary_book
            let book_content = payload
           return vue.$axios.post(`diary_books/description/add/${id}`,book_content)
            
        },

        UpdateDiaryBook({commit},payload){
            let id_book = payload.id || payload._id
            let data = {
                book_name:payload.book_name,
                year_of_management:payload.year_of_management,
                description:payload.description,
            }
            vue.$axios.put(`diary_books/update/${id_book}`,data)
            .then(response =>{
             
            })
            .catch(err =>{
                console.log(err)
            })
        },
        UpdateContentFromDiaryBook({commit},payload){
            let id= payload.id || payload._id;
            return vue.$axios.put(`diary_books/description/update/${id}`,payload)
            
        },
        DeleteDiaryBook({commit},payload){
            let id_book = payload.id || payload._id
            vue.$axios.delete(`diary_books/delete/${id_book}`)
            .then(response =>{
           
            })
            .catch(err =>{
                console.log(err)
            })
        },
        DeleteContentDiaryBook({commit},payload){
            let id_content = payload.id || payload._id
            vue.$axios.delete(`diary_books/description/delete/${id_content}`)
            .then(response =>{
              
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }
}