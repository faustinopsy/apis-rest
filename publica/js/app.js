import router from './router.js';
import Navbar from './Navbar.js';
  const app = Vue.createApp({
    components: {
        Navbar
    },
    template: `
      <div>
      <Navbar />
        <router-view></router-view>
      </div>
    `,
    data() {
      },
      methods: {
      },
      mounted() {
      },
  });
  
  app.use(router);
  app.mount('#app');