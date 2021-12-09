<template>
  <div>
    <b-container>
      <b-row class="login-page">
        <b-col lg="4" md="6" sm="8" class="mx-auto">
          <b-card
          title="Login">
            <b-form @submit="onSubmit" v-if="show">
              <b-form-group label="Correo Electronico:" label-for="input-1">
                <b-form-input
                  v-model="form.email"
                  type="email"
                  placeholder="Correo Electrónico"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Contraseña:"
                label-for="input-2"
              >
                <b-form-input
                  type="password"
                  v-model="form.password"
                  placeholder="Contraseña"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" class="btn-block" variant="success"
                >Iniciar Sesión</b-button
              >
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,  
    };
  },
  methods: {
    ...mapMutations(['obtenerUsuario']),
    ...mapActions(['guardarUsuario', 'leerToken', 'cerrarSesion']),
    onSubmit(event) {
      event.preventDefault();
      axios.post(process.env.VUE_APP_BASE_URL+'/auth/login', this.form)
      .then(response =>{
          console.log('Mostrando response',response);
          const token = response.data.token;
          this.guardarUsuario(token);
      })
      .catch(error =>{
          console.log('Mostrando error', error);
      })
      
      //alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style>
.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
</style>