<template>
    <div class="q-pa-md">
        <div>
            <div>
             <div class="text-h6 text-center">
                {{diary_selected.book_name}}
            </div>
            <div class="text-h6" style="font-size:14px;">
                Año/Semestre: 
            </div>
            {{diary_selected.year_of_management}}
            <div class="text-h6" style="font-size:14px;">
                Descripcion: 
            </div>
            {{diary_selected.description}}
           
        </div>
        <div class="table-box">
             <q-table
        title="Contenido del libro"      
        :columns="columns"
        :data="diary_selected.book_content"        
        :filter="filter"      
    >
        <template v-slot:top-right>        
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input>
            <div class="q-pl-md">
                <q-btn round color="primary" icon="add" @click="GotoCreate"></q-btn>
            </div>        
        </template>  

        <template v-slot:body-cell-accused="props">
             <q-td :props="props">                 
                 <ul v-for="(acusado,index) in props.row.accused" :key="index">
                     <li >{{acusado}}</li>
                 </ul>                
            </q-td>     
        </template>    
        <template v-slot:body-cell-victim="props">
             <q-td :props="props">                 
                 <ul v-for="(victim,index) in props.row.victim" :key="index">
                     <li >{{victim}}</li>
                 </ul>                
            </q-td>     
        </template>    
        <template v-slot:body-cell-appellant="props">
             <q-td :props="props">                 
                 <ul v-for="(appellant,index) in props.row.appellant" :key="index">
                     <li >{{appellant}}</li>
                 </ul>                
            </q-td>     
        </template>    

        <template v-slot:body-cell-options="props">
        <div class="row">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="ViewMore(props.row)"
            icon="fas fa-eye"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="EditRow(props.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="GetRowToDelete(props.row)"
            icon="delete"
          ></q-btn>           
        </div>
      </template>
    </q-table>
        </div>
         <div class="q-ma-md">               
                 <q-page-sticky position="bottom-right" :offset="[18, 130]">
          <q-btn
            round
            size="18px"
            color="primary"
            icon="fas fa-arrow-left"
            direction="left"
            @click="goBack"
          >
          </q-btn>
        </q-page-sticky>
            </div>
        </div>
        
        <q-dialog v-model="delete_open_content" persistent>
            <DeleteContentfromDiaryBook/>
        </q-dialog>
        
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import DeleteContentfromDiaryBook from './DeleteContentDiaryBook'
export default {
    components:{DeleteContentfromDiaryBook},
    data(){
        return{
            filter:'',
            columns:[
                {
                    name: 'entry_date',                    
                    label: 'Nombre',
                    align: 'left',
                    field: row => row.entry_date,
                    format: val => `${new Date(val)}`,
                    sortable: true,
                    style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:13px;`,   
                },
                
                // { name: 'description', label: 'Descripcion', field: 'description' },
                { name: 'accused', label: 'Acusados', sortable: true, field: 'accused', align: 'left',
                style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:13px;`, },
                // { name: 'date_init', label: 'Fecha final', field: 'date_init', align: 'left', format: val => `${new Date(val)}`,},                
                { name: 'victim', label: 'Victimas', field: 'victim', align: 'left', sortable: true,
                    style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:13px;`,   
                },
                 { name: 'appellant', label: 'Querellantes', field: 'appellant', align: 'left', sortable: true,
                    style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:13px;`,   
                },
                { name: 'nurek_number', label: 'Nurej', field: 'nurek_number', align: 'left', sortable: true,
                    style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:13px;`,   
                },
                { name: 'options', label: 'Opciones', field: 'options', align: 'left', headerStyle: 'width: 150px',sortable: true,},
 
            ]    
        }
    },
    methods:{
        ...mapMutations('diary_books',['ReloadDiaryContentSelected','OpenCloseDeleteContentBook']),
        ...mapActions('diary_books',[]),
        GotoCreate(){
            this.$router.push({
                name:'CreateContentDiarybook'
            })
        },
        
        goBack(){
            this.$router.replace(
                {
                    name:'GetDiarybooks'
                }
            );
        },

        ViewMore(row_selected){
            
            let objectnew = {    
                id:row_selected._id,            
                entry_date: this.TransformDateAndHoursToRead(row_selected.entry_date),
                departure_date: this.TransformDateAndHoursToRead(row_selected.departure_date),
                accused: row_selected.accused.join(),
                victim: row_selected.victim.join(),
                appellant: row_selected.appellant.join(),
                fojas_number: row_selected.fojas_number,
                detail_sum: row_selected.detail_sum,
                nurek_number: row_selected.nurek_number
            }                 
           this.ReloadDiaryContentSelected(objectnew)
           this.$router.push({
               name:'PreviewContentDiarybook'
           })
        },
        TransformDateAndHoursToRead(date_time){
             let year = new Date(date_time).getUTCFullYear();
            let month = new Date(date_time).getUTCMonth() + 1;
            month = month < 10 ? "0" + month : month;
            let day = new Date(date_time).getUTCDate();
            let hour = new Date(date_time).getUTCHours() - 4;
            hour = hour >= 10 ? hour : "0" + hour;
            let min = new Date(date_time).getUTCMinutes();
            min = min >= 10 ? min : "0" + min;
            let newDateFull = year + "-" + month + "-" + day + " " + hour + ":" + min;
            return newDateFull
        },
        EditRow(row_selected){           
           let objectnew = {      
                id:row_selected._id,   
                entry_date: this.TransformDateAndHoursToRead(row_selected.entry_date),
                departure_date: this.TransformDateAndHoursToRead(row_selected.departure_date),
                accused: row_selected.accused.join(),
                victim: row_selected.victim.join(),
                appellant: row_selected.appellant.join(),
                fojas_number: row_selected.fojas_number,
                detail_sum: row_selected.detail_sum,
                nurek_number: row_selected.nurek_number
            }        
           this.ReloadDiaryContentSelected(objectnew)
           this.$router.push({
               name:'UpdateContentDiarybook'
           })      
        },
        GetRowToDelete(row_selected){
           let objectnew = {               
               id:row_selected._id,   
                entry_date: row_selected.entry_date,
                departure_date: row_selected.departure_date,
                accused: row_selected.accused.join(),
                victim: row_selected.victim.join(),
                appellant: row_selected.appellant.join(),
                fojas_number: row_selected.fojas_number,
                detail_sum: row_selected.detail_sum,
                nurek_number: row_selected.nurek_number
            }        
           this.ReloadDiaryContentSelected(objectnew)
           this.OpenCloseDeleteContentBook(true);

        },
    },
    computed:{
        ...mapState('diary_books',['diary_selected','diary_content_selected','delete_open_content']),
    },

}
</script>
<style lang="sass" scoped>
.table-box
    padding-right:60px
</style>