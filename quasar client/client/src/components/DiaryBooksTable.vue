<template>
  <div class="q-pa-md">
    <div class="box_interface">
      <!-- LISTA DE LOS LIBROS DIARIOS -->
      <div v-if="form_register == false" class="table_diarybooks">
        <div class="text-h4 q-mb-md">LIBROS Registrados</div>
        <div class="row justify-end">
          <div style="margin: 10px">
            <q-btn
              round
              dense
              color="primary"
              size="20px"
              icon="add"
              @click="form_register = !form_register"
            />
          </div>
        </div>

        <!-- TABLE INIT -->

        <q-table
          :grid="$q.screen.xs"
          title=""
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
                @click="EditRow(props)"
                icon="edit"
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="DeleteRow(props)"
                icon="delete"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>

      <div v-if="form_register == true" class="diarybook_register-form">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Nombre *"
            hint="Ingrese un nombre descriptivo del Libro"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingresa un dato valido',
            ]"
          />
          <!-- <q-input
            filled
            v-model="description"
            label="Descripcion "
            hint="Ingrese alguna descripcion para el libro"
          /> -->

          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Cancelar"
              color="primary"
              flat
              class="q-ml-sm"
              @click="onReset()"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DiarybookTable",
  data() {
    return {
      name: null,
      date: "2019/02/01",
      description: null,
      filter: null,
      form_register: false,
      columns: [
        {
          name: "name_diary_book",
          required: true,
          label: "Nombre de libro",
          align: "left",
          field: (row) => row.book_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "documents_count_register",
          align: "center",
          label: "N° Documentos registrados",
          field: "documents_count_register",
          sortable: true,
        },
        {
          name: "date_update",
          label: "Fecha de actualizacion",
          field: "date_update",
          align: "center",
          sortable: true,
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
  methods: {
    RegisterDiaryBook() {},

    onSubmit() {
      let object = {
        book_name: this.name,
        year_of_management: this.date,
      };
      this.$axios
        .post("diary_books/create", object)
        .then((result) => {
          console.log(result.data);
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: result.data.message,
          });
        })
        .catch((err) => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: err.message,
          });
          console.error(err);
        });
    },

    onReset() {
      this.name = null;
      this.date = this.GetDate();
      this.description = null;
      this.form_register = false;
    },
    EditRow(item_selected) {},
    DeleteRow(item_selected) {},
    GetDiaryBooks() {
      this.$axios
        .get("diary_books")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    GetDate() {
      let month =
        new Date().getMonth() + 1 >= 10
          ? new Date().getMonth()
          : "0" + (new Date().getMonth() + 1);
      let year = new Date().getFullYear();
      let date =
        new Date().getDate() >= 10
          ? new Date().getDate()
          : "0" + new Date().getDate();
      let date_complete = "" + year + "/" + month + "/" + date;
      console.log(date_complete);
      return date_complete;
    },
  },
  mounted() {
    this.GetDiaryBooks();
    this.date = this.GetDate();
  },
};
</script>
