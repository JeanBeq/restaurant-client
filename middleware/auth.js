import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && to.name !== 'login' && to.name !== 'register') {
    return navigateTo('/login');
  }
});