import { createRouter, createWebHistory } from 'vue-router'
import TodoApp from './components/TodoApp.vue'
import Page404 from './components/Page404.vue'
import PageMain from './components/PageMain'
import PagePasswordValidate from './components/PagePasswordValidate.vue'
import Weather from './components/Weather.vue'

export const routes = [
    {
        path: '/todoapp',
        name: 'todoapp',
        component: TodoApp
    },
    {
        path: '/',
        name: 'page main',
        component: PageMain
    },
    {
        path: '/password-validate',
        name: 'pasword validate',
        component: PagePasswordValidate
    },
    {
        path: '/weather',
        name: 'weather',
        component: Weather
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: Page404 },
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: Page404 },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;