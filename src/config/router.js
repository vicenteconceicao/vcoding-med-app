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
    props: true },
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
    path: '/configuracoes',
    name: 'Configuracoes',
    component: Configuracoes
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  /*{
    path: '*',
    redirect: '/login'
  },*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
