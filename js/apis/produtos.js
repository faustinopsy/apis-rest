  export default {
    template: `
      <div>
        <h2>Produtos Disponíveis</h2>
        <div v-if="produtos.length > 0">
          <div v-for="produto in produtos" :key="produto.id" class="produto-item">
            <h3>{{ produto.name }}</h3>
            <p>{{ produto.description }}</p>
            <p><strong>Preço:</strong> {{ produto.price }} {{ produto.currency.toUpperCase() }}</p>
            <button @click="comprarProdutos(produto)">Comprar</button>
          </div>
        </div>
        <p v-else>Carregando produtos...</p>
        <div id="payment-status">{{ paymentStatus }}</div>
  
        <!-- Div onde o Element do cartão será montado -->
        <div id="card-element" class="card-element"></div>
      </div>
    `,
    data() {
      return {
        produtos: [],
        paymentStatus: '',
        stripe: null,
        elements: null,
        cardElement: null,
      };
    },
    methods: {
      async buscaProdutos() {
        try {
          const response = await fetch('src/produtos.php');
          const data = await response.json();
  
          if (data.success) {
            this.produtos = data.produtos;
          } else {
            console.error("Erro ao buscar produtos:", data.error);
          }
        } catch (error) {
          console.error("Erro na conexão com o servidor:", error);
        }
      },
      initializeStripe() {
        this.stripe = Stripe("pk_test_X3UjaoxEdQZSRd7YmWVBMIa4");
        this.elements = this.stripe.elements();
        this.cardElement = this.elements.create("card");
        this.cardElement.mount("#card-element");
      },
      async comprarProdutos(produto) {
        try {
          const response = await fetch("src/pagar.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: produto.price,
              currency: produto.currency,
              description: `Compra do produto: ${produto.name}`,
            }),
          });
          
          const data = await response.json();
          
          if (data.client_secret) {
            const result = await this.stripe.confirmCardPayment(data.client_secret, {
              payment_method: {
                card: this.cardElement,
              },
            });
  
            if (result.error) {
              this.paymentStatus = `Erro: ${result.error.message}`;
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                this.paymentStatus = 'Pagamento realizado com sucesso!';
              }
            }
          } else {
            this.paymentStatus = 'Erro ao criar a intenção de pagamento.';
          }
        } catch (error) {
          console.error("Erro ao processar o pagamento:", error);
          this.paymentStatus = 'Erro no servidor.';
        }
      }
    },
    mounted() {
      this.initializeStripe();
      this.buscaProdutos();
    },
  };
  