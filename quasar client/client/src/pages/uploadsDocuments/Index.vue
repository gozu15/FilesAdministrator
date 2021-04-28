<template>
  <div class="q-pa-md">
    <div class="content">
      <div class="tableaux">
        <q-table
          :grid="$q.screen.xs"
          title="Lista de Caratulas"
          :data="data"
          :columns="columns"
          row-key="name"
          :filter="filter"
          table-header-class="bg-primary text-white"
        >
          <template v-slot:top-right>
            <div class="row">
              <div class="col-12" style="margin: 10px,">
                <div class="row justify-end">
                  <q-btn
                    round
                    dense
                    color="primary"
                    size="20px"
                    icon="add"
                    @click="GoToRegisterAnImage()"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="row justify-end">
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filter"
                    placeholder="Click aqui para buscar"
                    style="width: 300px"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <!-- TABLE INIT -->
          </template>

          <template v-slot:body-cell-acussed="props">
            <q-td :props="props">
              <ul>
                <li v-for="(acusado, index) in props.row.accused" :key="index">
                  {{ acusado }}
                </li>
              </ul>
            </q-td>
          </template>
          <template v-slot:body-cell-appellant="props">
            <q-td :props="props">
              <ul>
                <li
                  v-for="(querellante, index) in props.row.appellant"
                  :key="index"
                >
                  {{ querellante }}
                </li>
              </ul>
            </q-td>
          </template>
          <template v-slot:body-cell-victim="props">
            <q-td :props="props">
              <ul>
                <li v-for="(victima, index) in props.row.victim" :key="index">
                  {{ victima }}
                </li>
              </ul>
            </q-td>
          </template>

          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="editRow(props)"
                icon="edit"
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="GetRowToDelete(props)"
                icon="delete"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <!-- DIALOG INIT -->
      <q-dialog v-model="dialog_delete">
        <DialogDelete/>
      </q-dialog>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import DataimageContent from "../../components/DataimageContent";
import DialogDelete from '../../components/DialogDeleteTableOption'
export default {
  components: { DataimageContent,DialogDelete },
  data() {
    return {
      persistent: false,
      navigationActive: false,
      registerOption: true,
      filter: "",
      selected: [],
      pagination: {},
      urlImage: null,
      dialog_delete:false,
      id: null,

      columns: [
        {
          name: "code_nurek",
          required: true,
          label: "Codigo NUREK",
          align: "left",
          field: row => row.code_document,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "crime",
          label: "Crimen",
          field: "crime",
          align: "center",
          style: `font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;`,
          sortable: true
        },
        {
          name: "acussed",
          label: "Imputados",
          field: "imputados",
          align: "left",
          style: `font-size: 0.85em;
          font-style: italic;  
          color: #555;
          margin-top: 4px;`
          },

        {
          name: "appellant",
          label: "Querellantes",
          field: "querellantes",
          align: "left",
          style: `font-size: 0.95em;
          font-style: italic; 
          color: #555;
          margin-top: 4px;`
        },
        {
          name: "victim",
          label: "Victimas",
          field: "victimas",
          align: "left",
          style: `font-size: 0.95em;
                  font-style: italic;                 
                  color: #555;
                  margin-top: 4px;`
        },

        {
          name: "options",
          label: "Opciones",
          field: "options"
        }
      ],
      data: []
    }
    
  },
  computed: {
    ...mapState('upload_image',['id_cover']),
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    },

    dataImageComputed() {
      return this.dtlink;
    }
  },
  methods: {
    ...mapMutations('upload_image',['GetId']),
    getImageUploaded() {
      this.$axios
        .get("documents/read")
        .then(response => {
          response.data.date_init = null;
          response.data.forEach(element => {
            let dateHrs =
              "" + element.date_admission + " " + element.hours_admission;
            element.date_init = dateHrs;
          });
          this.data = response.data;

          console.log("Resposne", response);
        })
        .catch(err => {
          console.error("Error ocurrido", err);
        });
    },
    GoToRegisterAnImage() {
      this.$router.push({
        name: "AddImage"
      });
    },    

    //METHODS TABLE BUTTONS
    EditRow(props) {
      console.log(props);
    },
    GetRowToDelete(props) {       
      this.GetId({id:props.row._id})
      this.dialog_delete= true;
    }   
  },
  created() {
    this.getImageUploaded();
  },
  mounted() {}
};
</script>
<style scoped>
.content {
  width: 90%;
  margin: auto;
}
.card-content {
  width: 90%;
  margin: auto;
  padding: 10px;
}
.img-content {
  width: 100%;
  text-align: center;
}
.img-content img {
  width: 70%;
  height: 400px;
  background-size: 100% 100%;
}
</style>
