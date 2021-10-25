<template>
  <b-container>
    <h2 class="mb-3 mt-3" >Edição de item</h2>
    
    <router-link to="/">
      <b-button class="mb-3 mt-3" variant="warning">
        <b-icon icon="arrow-left-short" aria-hidden="true"/> Voltar
      </b-button>
    </router-link>

    <b-form-input class="mb-3" v-model="Nome" placeholder="Nome"></b-form-input>
    <b-form-input class="mb-3" v-model="Descricao" placeholder="Descrição"></b-form-input>
    <b-form-input class="mb-3" type="number" v-model="Ordem" placeholder="Ordem"></b-form-input>

    <b-button class="mb-3" variant="primary" @click="SalvarEdicao()">
      <b-icon icon="check" aria-hidden="true"/> Salvar
    </b-button>
  </b-container>
</template>

<script>
import api from '../../service/api';

export default {
  data() {
    return {
      ID: null,
      Nome: "",
      Descricao: "",
      Ordem: null,
    }
  },

  methods: {
    getItem() {
      api.get(`CategoriaService.svc/ObterCategoriaPorCodigo/${this.$route.params.id}`)
        .then((response) => {
          this.ID = response.data.ObterPorCodigoResult.ID;
          this.Nome = response.data.ObterPorCodigoResult.Nome;
          this.Descricao = response.data.ObterPorCodigoResult.Descricao;
          this.Ordem = response.data.ObterPorCodigoResult.Ordem;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    SalvarEdicao() {
      const item = {
        ID: this.ID,
        Descricao: this.Descricao,
        Nome: this.Nome, 
        Ordem: parseInt(this.Ordem),
        Email: "gduraes10@gmail.com"
      }

      api.put('http://tst.sportibrasil.com.br/Services/CategoriaService.svc/AtualizarCategoria', item)
        .then((response) => {
          alert("Item editado com sucesso!");
          this.$router.push('/');
        })
        .catch((error) => {
          alert('Error');
        })
    }
  },

  created() {
    this.getItem();
  }
}
</script>

<style>
</style>
