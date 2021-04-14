<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="tittle">Libros Diarios</div>
    </div>
    <!-- TABS DESIGN -->
    <q-splitter v-model="splitterModel" style="height: 500px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="diary_books" icon="book" label="Libros Diarios" />
          <q-tab name="add_to_book" icon="add" label="Causas Libros" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="diary_books">
            <DiarybookTable />
          </q-tab-panel>

          <q-tab-panel name="add_to_book">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
import DiarybookTable from "../../components/DiaryBooksTable";
export default {
  components: { DiarybookTable },
  data() {
    return {
      tab: "diary_books",
      splitterModel: 20,
    };
  },
};
</script>
<style scoped>
.tittle {
  width: 100%;
  height: 60px;
  background-color: #035b75;
  color: rgb(253, 245, 235);
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  text-align: center;
  font-size: 30px;
}
</style>
