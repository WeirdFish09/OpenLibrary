import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import userTokenService from '@/services/userTokenService';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      const authorized = userTokenService.isUserAuthorized();
      if (!authorized) {
        next({ name: 'Login' });
      }
      next();
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const authorized = userTokenService.isUserAuthorized();
      if (authorized) {
        next({ name: 'UserProfile' });
      }
      next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const authorized = userTokenService.isUserAuthorized();
      if (authorized) {
        next({ name: 'UserProfile' });
      }
      next();
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
