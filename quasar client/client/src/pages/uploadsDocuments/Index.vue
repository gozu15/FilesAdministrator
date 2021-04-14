<template>
  <div class="q-pa-md">
    <div class="content">
      <div class="row justify-center">
        <div class="tittle">
          <h2>MAPEO DE IMAGENES</h2>
        </div>
      </div>

      <div class="tableaux">
        <div class="row justify-end">
          <div style="margin: 10px">
            <q-btn
              round
              dense
              color="primary"
              size="20px"
              icon="add"
              @click="persistent = !persistent"
            />
          </div>
        </div>
        <!-- TABLE INIT -->
        <q-table
          :grid="$q.screen.xs"
          title="Registro de imagenes subidas al servidor"
          :data="data"
          :columns="columns"
          row-key="name"
          :filter="filter"
          table-header-class="bg-primary text-white"
        >
          <template v-slot:top-right>
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
                @click="deleteRow(props)"
                icon="delete"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <!-- DIALOG INIT -->
  </div>
</template>
<script>
import DataimageContent from "../../components/DataimageContent";
export default {
  components: { DataimageContent },
  data() {
    return {
      persistent: false,
      navigationActive: false,
      registerOption: true,
      filter: "",
      selected: [],
      pagination: {},
      urlImage: null,
      id: null,

      columns: [
        {
          name: "code_nurek",
          required: true,
          label: "Codigo NUREK",
          align: "left",
          field: (row) => row.code_document,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "process_type",
          align: "center",
          label: "Tipo de proceso",
          field: "process_type",
          sortable: true,
        },
        {
          name: "crime",
          label: "Crimen",
          field: "crime",
          align: "center",
          sortable: true,
        },
        {
          name: "date_init",
          label: "Fecha / Hra de ingreso",
          field: "date_init",
          align: "center",
        },
        {
          name: "imputado",
          label: "Imputados",
          field: "imputados",
          align: "center",
        },

        {
          name: "querellante",
          label: "Querellantes",
          field: "querellantes",
          align: "center",
        },
        {
          name: "victima",
          label: "Victimas",
          field: "victimas",
          align: "center",
        },

        {
          name: "options",
          label: "Opciones",
          field: "options",
        },
      ],
      data: [],
    };
  },
  computed: {
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    },

    dataImageComputed() {
      return this.dtlink;
    },
  },
  methods: {
    getImageUploaded() {
      this.$axios
        .get("documents/read")
        .then((response) => {
          response.data.date_init = null;
          response.data.forEach((element) => {
            let dateHrs =
              "" + element.date_admission + " " + element.hours_admission;
            element.date_init = dateHrs;
          });
          this.data = response.data;

          console.log("Resposne", response);
        })
        .catch((err) => {
          console.error("Error ocurrido", err);
        });
    },

    //METHODS TABLE BUTTONS
    editRow(props) {
      console.log(props);
    },
    deleteRow(props) {
      console.log(props);
    },
  },
  created() {
    this.getImageUploaded();
  },
  mounted() {},
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
