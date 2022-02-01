<template>
    <div class="q-pa-md">
        <q-form
        @submit="OnSubmit"
        @reset="OnReset"
        >
        <q-input
        filled
        v-model="getname"
        label="Ingrese un nombre *"
        hint="Nombre descriptivo para el libro"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Porfavor ingresa un dato valido']"
      />
      <q-input
        filled
        v-model="getdescriptionUP"
        label="Ingresa una descripcion"
        hint="La descripcion es un texto descriptivo del libro, llenado opcional"       
      />

       <q-input
        filled
        v-model="getseason"
        label="Ingresa la gestion *"
        hint="Gestion o año de registro del libro ejm. 2021/01"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Porfavor ingresa un dato valido']"
      />
        <div class="q-mt-md">
             <q-page-sticky position="bottom-right" :offset="[18, 122]">
            <q-btn type="submit" fab icon="fas fa-save" color="blue" padding="10px" />
          </q-page-sticky>         
          <q-page-sticky position="bottom-right" :offset="[18, 70]">
            <q-btn type="reset" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>
        
      </div>
        </q-form>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{            
        }
    },
    methods:{
        ...mapActions('diary_books',['CreateDiaryBook','GetListDiaryBooks','UpdateDiaryBook']),
        ...mapMutations('diary_books',[]),
        OnSubmit(){
           
            this.UpdateDiaryBook(this.diary_selected);
            this.GetListDiaryBooks();
            this.OnReset();
        },
        OnReset(){
            this.$router.replace({
                name:'GetDiarybooks'
            })
        },
    },
    computed:{
        ...mapState('diary_books',['diary_selected']),
        getname:{
            get: function() {
                return this.$store.state.diary_books.diary_selected.book_name;
            },
            set: function(newtext) {
                
                this.$store.commit("diary_books/getbook_name", newtext);        
            }
        },

        getseason:{
            get: function() {
                return this.$store.state.diary_books.diary_selected.year_of_management;
            },
            set: function(newtext) {
                
                this.$store.commit("diary_books/getyear_of_management", newtext);        
            }
        },
         getdescriptionUP:{
            get: function() {
                return this.$store.state.diary_books.diary_selected.description;
            },
            set: function(newtext) {
                
                this.$store.commit("diary_books/getdescription", newtext);        
            }
        }


    }
}
</script>