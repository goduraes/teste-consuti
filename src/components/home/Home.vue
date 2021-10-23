<template>
  <b-container>
    <h2 class="mb-3 mt-3" >Lista de Itens</h2>

    <b-button class="mt-3 mb-3" variant="success" v-b-modal.modal-1>
      <b-icon icon="plus" aria-hidden="true"/>Cadastrar
    </b-button>
    
    <b-table 
      :fields="fields" 
      :items="items" 
      :per-page="perPage"
      :current-page="currentPage"
      responsive="sm" 
      class="bordered" 
      id="my-table">
      <template #cell(nameage)="data">
        <b-button variant="danger" @click="deletar(data.item.ID)"
          v-b-tooltip.hover title="Deletar Item" >
          <b-icon icon="trash-fill" aria-hidden="true"/>
        </b-button>
        <router-link :to="'/editar/'+data.item.ID">
          <b-button variant="primary" v-b-tooltip.hover title="Editar item">
            <b-icon icon="pencil-square" aria-hidden="true"/>
          </b-button>
        </router-link>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <addModal @salvo="this.getList()"/>
  </b-container>
</template>

<script>
  import axios from 'axios';
  import addModal from '../shared/addModal/add.vue';

  export default {
    components: { addModal },
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        fields: [
          'Nome',
          { key: 'Descricao', label: 'Descrição' },
          "Tipo",
          "Ordem",
          { key: 'nameage', label: 'Opções', class: 'text-center' }
        ],
        items: [
          {},
        ]
      }
    },

    computed: {
      rows() {
        return this.items.length
      }
    },

    methods: {
      getList() {
        axios.get('http://tst.sportibrasil.com.br/Services/CategoriaService.svc/ObterCategoriasPorEmail/gduraes10@gmail.com')
          .then((response) => {
            this.items = response.data.ObterCategoriasPorEmailResult;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      deletar(id) {
        if (confirm("Confirma a exclusão do objeto?")) {
          axios.delete(`http://tst.sportibrasil.com.br/Services/CategoriaService.svc/ExcluirCategoria/${id}`)
            .then((response) => {
              this.getList();
            })
            .catch((error) => {
              alert('Error')
            })
        }
      },
    },

    created() {
      this.getList();
    }
  }
</script>