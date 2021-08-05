<template>
  <!-- :href="link" -->
  <div>
    <q-item
      v-if="type == 'text'"
      clickable   
      v-ripple       
      :active="getitemactive === checkactive"
      active-class="my-menu-link"     
      @click="goToPath(pathLink)"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>        
      </q-item-section>
    </q-item>

    <!-- <q-item v-if="type == 'array'" class="q-item-docs"  tag="a" target="_blank" > -->
      <q-expansion-item
      v-if="type == 'array'"
        expand-separator
        :icon="icon"
        :label="title"       
      >
        <q-item
          v-for="(item, index) in new_array"
          :key="index"
          clickable
          tag="a"
          target="_blank"
          @click="goToPath(item.pathLink)"
          
        >
          <q-item-section v-if="item.icon" avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>            
          </q-item-section>
        </q-item>
      </q-expansion-item>
    <!-- </q-item> -->
  </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: "EssentialLink",
  props: {
    type: {
      type: String
    },
    new_array: {type:Array},
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "#"
    },

    pathLink: {
      type: String,
      default: ""
    },

    icon: {
      type: String,
      default: ""
    },
    checkactive:{
      type:String,
      default:""
    }
  },
  data(){
    return{
      
    }
  },
  methods: {
    goToPath(path) {
      this.$router.push(path);
      this.getitemactive = this.checkactive
    }
  },
  computed:{
    ...mapState('init_variables',['item_active']),
    getitemactive:{
      get:function(){
        return this.$store.state.init_variables.item_active;
      },
      set:function(value){
      this.$store.commit("init_variables/CheckItemActive", value);
      }
    }
  }
};
</script>
<style>
.q-item-docs{
  padding: 0 !important;
}
.q-item{
  font-family: serif;
  font-size: 20px;
  height: 63px;
}
.my-menu-link{
  color: white;
  background-color: #0c7c02
}
</style>
