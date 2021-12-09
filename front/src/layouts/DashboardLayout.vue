<template>
<div class="home">
    <Navbar />
  <router-view></router-view>
</div>

</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
  name: "DashboardLayout",
  components:{
    Navbar,
  }
}
</script>

<style>

  
  
</style>