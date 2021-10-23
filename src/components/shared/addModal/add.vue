<template>
    <b-modal id="modal-1" size="lg" modal-footer="false" title="Cadastrar" no-close-on-backdrop>
        <div>
            <b-form-input class="mb-3" v-model="Nome" placeholder="Nome"></b-form-input>
            <b-form-input class="mb-3" v-model="Descricao" placeholder="Descrição"></b-form-input>
            <b-form-input class="mb-3" type="number" v-model="Ordem" placeholder="Ordem"></b-form-input>
        </div>
        <template #modal-footer>
            <b-button
                variant="danger"
                class="float-right"
                @click="$bvModal.hide('modal-1')">
                <b-icon icon="x-circle" aria-hidden="true"/> Cancelar
            </b-button>
            <b-button
                :disabled="!Descricao || !Nome || !Ordem"
                variant="primary"
                class="float-right"
                @click="salvar()">
                <b-icon icon="check" aria-hidden="true"/> Salvar
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import api from '../../../service/api';

export default {
    data() {
        return {
            Nome: "",
            Descricao: "",
            Ordem: null,
        }
    },
    
    methods: {
        salvar(){
            this.$bvModal.hide('modal-1')

            const item = {
                Descricao: this.Descricao,
                Nome: this.Nome, 
                Ordem: parseInt(this.Ordem),
                Email: "gduraes10@gmail.com"
            }

            api.post('CategoriaService.svc/CadastrarCategoria', item)
            .then((response) => {
                alert("Item Salvo com sucesso!");
                this.$emit('salvo');
            })
            .catch((error) => {
                alert('Error');
            })
        }
    }
}
</script>

<style>

</style>