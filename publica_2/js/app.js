import Produtos from './produtos.js';

const app = Vue.createApp({
  components: { Produtos },
  template: `
  <div>
  <Produtos />
  </div>
`,
});

app.mount('#app');