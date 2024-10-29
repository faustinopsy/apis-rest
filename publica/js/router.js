import pokemon from './apis/pokemon.js';
import rickmorty from './apis/rickmorty.js';

const routes = [
  { path: '/', redirect: '/pokemon' },
  { path: '/pokemon', component: pokemon },
  { path: '/rickmorty', component: rickmorty },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});



export default router;
