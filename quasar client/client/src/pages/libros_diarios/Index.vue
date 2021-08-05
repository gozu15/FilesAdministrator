<template>
  <div class="q-pa-md">
    <DiarybookTable/>
  </div>
</template>
<script>
import DiarybookTable from "../../components/DiaryBooks/DiaryBooksTable.vue";
export default {
  components: { DiarybookTable },
  data() {
    return {   
    }
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
