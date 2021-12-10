<template>
  <b-container>
    <b-row class="mt-5 mb-2">
      <b-col lg="12">
        <b-alert
      :show="showAlert"
      dismissible
      variant="warning">
      {{msg}}
          </b-alert>
      </b-col>
      <b-col lg="3" v-for="item in dataProducts" :key="item._id">
        <b-card class="shadow rounded"
        :img-src="baseUrl +  item.image"
        img-alt="Image"
        img-top
        ><b-card-text>
            <b>{{ item.name }}</b
            ><br />
            $<span>{{ item.price }}</span>
            <br />
            <VueStars :value="item.review"/>
             
          </b-card-text>
          <b-button router-link :to="'/productos/editar/'+item._id" variant="dark" :disabled="loading">Editar</b-button>
          <b-button @click="deleteBoxConfirm(item._id)" class="btn-xs" variant="danger" :disabled="loading">Eliminar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueStars from "../components/VueStars.vue";
import axios from "axios";
import { mapState } from "vuex";


export default {
  name: "Products",
  components: {
	VueStars,
},
  data() {
    return {
      dataProducts: [],
      baseUrl: process.env.VUE_APP_BASE_URL_UPLOADS,
      showAlert: false, 
      loading: false,
      msg: '',
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    deleteBoxConfirm(id) {
        this.$bvModal.msgBoxConfirm('Está seguro de eliminar este producto ?')
          .then(value => {
            if(value){
              this.deleteProduct(id);
            }
          })
          .catch(err => {
            console.log(err);
            // An error occurred
          })
      },
      deleteProduct(id) {
        this.loading = true;
      let config = {
        headers: {
          token: this.token,
        },
      };
      axios
        .delete(process.env.VUE_APP_BASE_URL + "/products/"+id, config)
        .then((response) => {
          this.loading = false;
          this.showAlert = true;
          this.msg = response.data.message;
          this.getProducts();
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response);
        });
    },
    getProducts() {
      let config = {
        headers: {
          token: this.token,
        },
      };
      axios
        .get(process.env.VUE_APP_BASE_URL + "/products", config)
        .then((response) => {
          console.log(JSON.parse(JSON.stringify(response.data.data)));
          this.dataProducts = response.data.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>


<style>
.card-img-top {
    height: 200px;
    object-fit: contain;
    width: 100%;
}
</style>