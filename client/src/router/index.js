import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/';
//import axios from "axios";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes //routes: routes
})

router.beforeEach(async (to, from, next) => {
  let isAuth = false;

  if (store.state.User.user !== null) {
    isAuth = true;
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuth) next({ name: 'Login' });
  else next();
})

export default router