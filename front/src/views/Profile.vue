<template>
<b-container>
      <b-row class="mt-5">
        <b-col lg="8" class="mx-auto">
          
          <b-alert
      :show="showAlert"
      dismissible
      variant="info">
      {{msg}}
          </b-alert>
          <b-card
          title="EDITAR PERFIL">

            <b-form @submit="onSubmit">
              <b-form-group label="Nombres:" label-for="input-1">
                <b-form-input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Nombres"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Apellidos:" label-for="input-1">
                <b-form-input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Apellidos"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Imagen:" label-for="input-1">
              <input type="file" @change="uploadImage" class="form-control">  
              </b-form-group>

              <b-form-group label="Correo:" label-for="input-1">
                <b-form-input
                  v-model="form.email"
                  type="text"
                  placeholder="Correo"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Contraseña:" label-for="input-1">
                <b-form-input
                  v-model="form.password"
                  type="text"
                  placeholder="Dejar en blanco si no desea cambiarla"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Telefono:" label-for="input-1">
                <b-form-input
                  v-model="form.phone"
                  type="text"
                  placeholder="Telefono"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" class="btn-block" variant="success" :disabled="loading">
                {{loading ? 'Cargando...' : 'Enviar'}}
              </b-button
              >
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        image: "",
        email: "",
        phone: "",
        password: undefined,
      },
      id: null,
      showAlert: false, 
      loading: false,
      msg: '',
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    
    getProfile() {
      this.loading = true;
      axios({
        method: 'GET',
        url: process.env.VUE_APP_BASE_URL+'/users/'+this.id,
        data: this.form,
        headers : {token: this.token},
      })
      .then(response =>{
        this.loading = false;
        const { firstName , lastName, image, email, phone} = response.data.data;
          this.form.firstName = firstName;
          this.form.lastName = lastName;
          this.form.email = email;
          this.form.image = image;
          this.form.phone = phone;
      })
      .catch(error =>{
        this.loading = false;
        this.showAlert = true;
        this.msg=error.toString();
        console.log('Mostrando error', error);
      })
    },
    onSubmit(event) {
      this.loading = true;
      event.preventDefault();
      axios({
        method: this.id ? 'PUT' : 'POST',
        url: this.id ? process.env.VUE_APP_BASE_URL+'/users/'+this.id : process.env.VUE_APP_BASE_URL+'/users',
        data: this.form,
        headers: {token: this.token},
      })
      .then(response =>{
        this.loading = false;
          console.log('Mostrando response',response);
          this.showAlert = true;
          this.msg=response.data.message;
          //this.$router.push('/productos').catch(()=>{});          
      })
      .catch(error =>{
        this.loading = true;
        console.log('Mostrando error', error);
      })
    },
    uploadImage(event) {
      event.preventDefault();
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append("UploadSingleFile",file);
      let config = {
        headers: {
          token: this.token,
        },
      };
      axios.post(process.env.VUE_APP_BASE_URL+'/uploads', formData, config)
      .then(response =>{
          console.log('Mostrando response',response);
          this.form.image = response.data.data.src;
      })
      .catch(error =>{
          console.log('Mostrando error', error);
      })
    },
  },
  created() {
    this.id = this.$route.params.id;
    if(this.id){
      this.getProfile();
    }
  }
};
</script>