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
        <q-icon color="positive" :name="icon" />
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
          :active="getitemactivemodel == item.checkactivemodel"
           active-class="my-menu-link"   
          tag="a"
          target="_blank"
          @click="goToPathModel(item.pathLink,item.checkactivemodel)"         
          
        >
          <q-item-section v-if="item.icon" avatar>
            <q-icon color="positive" :name="item.icon" />
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
     
    },
    goToPathModel(path,check){
         this.$router.push(path);
          this.getitemactivemodel = check
    }
  },
  computed:{
    ...mapState('init_variables',['item_active','item_active_model']),
    getitemactive:{
      get:function(){
        return this.$store.state.init_variables.item_active;
      },
      set:function(value){
      this.$store.commit("init_variables/CheckItemActive", value);
      }
    },
    getitemactivemodel:{
       get:function(){
        return this.$store.state.init_variables.item_active_model;
      },
        set:function(value){
        this.$store.commit("init_variables/CheckItemActiveInModel", value);
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import '../css/quasar.variables.scss'
.q-item-docs
  padding: 0 !important

.items-menu
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  font-size: 17px
  height: 75px

.my-menu-link
  color: white
  background-color: rgb(9, 9, 9) !important

.q-expansion-item
  color: $positive !important

</style>
