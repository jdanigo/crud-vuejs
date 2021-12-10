<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand router-link to="/" ><img src="../assets/logoonegroup.png" width="100px"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Productos</em>
          </template>
          <b-dropdown-item router-link to="/productos" >Listar</b-dropdown-item>
          <b-dropdown-item router-link to="/productos/nuevo" >Crear</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Bienvenido {{usuarioDB.fullName}}</em>
          </template>
          <b-dropdown-item router-link :to="'/perfil/editar/'+usuarioDB.userId" >Perfil</b-dropdown-item>
          <b-dropdown-item href="#" @click="cerrarSesion()" v-if="estaActivo">Salir</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['estaActivo', 'usuarioDB'])
  }
}


</script>