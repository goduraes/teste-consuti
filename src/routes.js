import Editar from './components/editar/Editar.vue';
import Home from './components/home/Home.vue';

export const routes = [
    {path: '', component: Home, titulo: 'Home'},
    {path: '/editar/:id', component: Editar, titulo: 'Editar'}
];