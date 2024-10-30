import pokemon from './apis/pokemon.js';
import Produtos from './apis/produtos.js';

const routes = [
  { path: '/', redirect: '/pokemon' },
  { path: '/pokemon', component: pokemon },
  { path: '/produtos', component: Produtos },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});



export default router;
