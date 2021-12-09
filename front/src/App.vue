<template>
  <router-view/>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods:{
    ...mapActions(['leerToken'])
  },
  created(){
    this.leerToken();
  }
}


</script>