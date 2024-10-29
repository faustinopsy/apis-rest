export default {
  components: {},
  template: `
    <div>
      <h2>Personagens de Rick and Morty</h2>
      <label for="especie">Filtrar por Espécie:</label>
      <input type="text" id="especie" v-model="especie" @input="filterByEspecie" placeholder="Digite a espécie..." />

      <div v-if="filteredCharacters.length > 0">
        <img :src="filteredCharacters[currentIndex].image" alt="Imagem do Personagem" width="150" />
        <h3>{{ filteredCharacters[currentIndex].name }}</h3>
        <p><strong>Espécie:</strong> {{ filteredCharacters[currentIndex].species || 'Desconhecida' }}</p>
        <p><strong>Gênero:</strong> {{ filteredCharacters[currentIndex].gender || 'Desconhecido' }}</p>
        <p><strong>Origem:</strong> {{ filteredCharacters[currentIndex].origin.name || 'Desconhecida' }}</p>
      </div>
      <p v-else>Nenhum resultado encontrado para "{{ especie }}"</p>

      <button @click="previousCharacter" :disabled="currentIndex === 0 || filteredCharacters.length === 0">Anterior</button>
      <button @click="nextCharacter" :disabled="currentIndex === filteredCharacters.length - 1 || filteredCharacters.length === 0">Próximo</button>
    </div>
  `,
  data() {
    return {
      characters: [],
      filteredCharacters: [],
      currentIndex: 0,
      especie: '',
    };
  },
  methods: {
    async buscaPersonagem() {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        this.characters = data.results;
        this.filteredCharacters = this.characters;
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      }
    },
    nextCharacter() {
      if (this.currentIndex < this.filteredCharacters.length - 1) {
        this.currentIndex++;
      }
    },
    previousCharacter() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    filterByEspecie() {
      if (this.especie.trim() === '') {
        this.filteredCharacters = this.characters;
      } else {
        this.filteredCharacters = this.characters.filter(character => 
          character.species && character.species.toLowerCase().includes(this.especie.toLowerCase())
        );
      }
      this.currentIndex = 0;
    },
  },
  mounted() {
    this.buscaPersonagem();
  },
};
