<template>
    <div class="q-pa-md">
        <q-form
        @submit="OnSubmit"
        @reset="OnReset"
        >
        <q-input
        filled
        v-model="diary_book_properties.book_name"
        label="Ingrese un nombre *"
        hint="Nombre descriptivo para el libro"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Porfavor ingresa un dato valido']"
      />
      <q-input
        filled
        v-model="diary_book_properties.description"
        label="Ingresa una descripcion"
        hint="La descripcion es un texto descriptivo del libro, llenado opcional"       
      />

       <q-input
        filled
        v-model="diary_book_properties.year_of_management"
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
        <!-- <q-btn label="Registrar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" /> -->
      </div>
        </q-form>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            diary_book_properties:{
                book_name:null,
                description:null,
                year_of_management:null
            }
        }
    },
    methods:{
        ...mapActions('diary_books',['CreateDiaryBook','GetListDiaryBooks']),
        ...mapMutations('diary_books',[]),
        OnSubmit(){           
            this.CreateDiaryBook(this.diary_book_properties);
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
        ...mapState('diary_books',[])
    }
}
</script>