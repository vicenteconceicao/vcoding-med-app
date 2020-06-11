import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pacientes from '../views/patient/Pacientes.vue'
import Paciente from '../views/patient/Paciente'
import Login from '../views/Login.vue'
import Atendimentos from '../views/Atendimentos.vue'
import Configuracoes from '../views/setting/Configuracoes.vue'
import Usuarios from '../views/user/Usuarios.vue'
import Perfil from '../views/Perfil.vue'
import Menus from '../views/menu/Menus.vue'
import Medicines from '../views/medicine/Medicines.vue'
import Beds from '../views/bed/Beds.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Pacientes,
  },
  {
    path: '/paciente/:id',
    component: Paciente,
    props: true
  },
  {
    path: '/atendimentos',
    name: 'Atendimentos',
    component: Atendimentos
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/medicamentos',
    name: 'Medicines',
    component: Medicines
  },
  {
    path: '/leitos',
    name: 'Beds',
    component: Beds
  },
  {
    path: '/configuracoes',
    name: 'Configuracoes',
    component: Configuracoes,
    children: [{
      path: 'menus',
      name: 'Menus',
      component: Menus,
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
