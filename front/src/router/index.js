import Vue from 'vue';
import VueRouter from 'vue-router';
//Layouts
import DashboardLayout from '../layouts/DashboardLayout.vue';
import PublicLayout from '../layouts/PublicLayout.vue';
// Views
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Products from '../views/Products.vue';
import NewProduct from '../views/NewProduct.vue';
import Profile from '../views/Profile.vue';
// Store
import store from '../store.js';
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/dashboard',
    meta: {requireAuth: true}
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        component: Dashboard
      }
    ],
    meta: {requireAuth: true}
  },
  {
    path: "/productos",
    component: DashboardLayout,
    children: [
      {
        path: "",
        component: Products
      },
      {
        path: "nuevo",
        component: NewProduct
      },
      {
        path: "editar/:id",
        component: NewProduct
      }
    ],
    meta: {requireAuth: true}
  },
  {
    path: "/perfil",
    component: DashboardLayout,
    children: [
      {
        path: "editar/:id",
        component: Profile
      }
    ],
    meta: {requireAuth: true}
  },
  {
    path: "/login",
    component: PublicLayout,
    children: [
      {
        path: "",
        component: Login
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

  if(rutaProtegida && store.state.token === ''){
    // console.log(store.state.token);
    next('/login');

  }else{
    next()
  }

})

export default router
