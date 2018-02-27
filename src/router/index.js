import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import InputEditor from '@/pages/InputEditor';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/input-editor/:id',
      name: 'input-editor',
      props: true,
      component: InputEditor,
    },
  ],
});
