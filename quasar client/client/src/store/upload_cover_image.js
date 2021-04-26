export const CoverProperties = {
    namespaced: true,
    state: {
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
        }
    },
    mutations: {
        getDataCoverImage(state, payload) {
            state.cover_image_information = {
                id:payload.id,
                url_uploaded:payload.url_uploaded,
                code_document:payload.code_document,
                crime:payload.crime,
                date_admission:payload.date_admission,
                hours_admission:payload.hours_admission,
                appellant:payload.appellant,
                process_type:payload.process_type,
                accused:payload.accused,
                relevant_court:payload.relevant_court,
                victim:payload.victim,
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

    }
}