import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public: true
    }
  },
  //servicios item
  {
    path: '/Services_item/:id',
    name: "Services_item",
    component:()=>import('../views/Services_item.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/authv',
    name: 'AuthV',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "authv" */ '../views/AuthV.vue'),
    meta: {
      auth: true,
    },
    children: [{
        path: 'categoria',
        name: 'Categoria',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'articulo',
        name: 'Articulo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "articulo" */ '../views/Articulo.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'usuario',
        name: 'Usuario',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "usuario" */ '../views/Usuario.vue'),
        meta: {
          auth: true,
        },
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(ruta => ruta.meta.public)) {
    next();
  } else if (to.matched.some(ruta => ruta.meta.auth)) {
    if (store.state.user) {
      next()
    } else {
      next({
        name: 'Login'
      })
    }
  } else {
    next();
  }
})

export default router