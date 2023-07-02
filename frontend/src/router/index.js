// Composables
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import SetupPage from '@/views/SetupPage.vue';
import UserCreate from '@/views/TestCreate/UserCreate.vue';
import ProjectCreate from '@/views/TestCreate/ProjectCreate.vue';
import PaymentCreate from '@/views/TestCreate/PaymentCreate.vue';
import CreateCompany from '@/views/dashboard/Modal/LoginModal.vue';
import notifyAlert from '@/components/Notify/NotifyAlert.vue';

const routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: '/setup',
    component: SetupPage,
  },
  {
    path: '/test',
    component: notifyAlert,
  },
  {
    path: '/createCompany',
    component: CreateCompany,
  },
  {
    path: '/createUser',
    component: UserCreate,
  },
  {
    path: '/createProject',
    component: ProjectCreate
  },
  {
    path: '/createPayment',
    component: PaymentCreate
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
