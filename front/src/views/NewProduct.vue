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
          :title="this.id ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO' ">

            <b-form @submit="onSubmit">
              <b-form-group label="Nombre:" label-for="input-1">
                <b-form-input
                  v-model="form.name"
                  type="text"
                  placeholder="Nombre"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Imagen:" label-for="input-1">
              <input type="file" @change="uploadImage" class="form-control">  
              </b-form-group>
              <b-form-group label="Precio:" label-for="input-1">
                <b-form-input
                  v-model="form.price"
                  type="number"
                  placeholder="Precio"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Calificacion:" label-for="input-1">
                <b-form-input
                  v-model="form.review"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Califacion"
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
        name: "",
        image: "",
        price: "",
        review: "",
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
    
    getProduct() {
      this.loading = true;
      axios({
        method: 'GET',
        url: process.env.VUE_APP_BASE_URL+'/products/'+this.id,
        data: this.form,
        headers : {token: this.token},
      })
      .then(response =>{
        this.loading = false;
        const { name , image, price, review} = response.data.data;
          this.form.name = name;
          this.form.image = image;
          this.form.price = price;
          this.form.review = review;
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
        url: this.id ? process.env.VUE_APP_BASE_URL+'/products/'+this.id : process.env.VUE_APP_BASE_URL+'/products',
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
      this.getProduct();
    }
  }
};
</script>