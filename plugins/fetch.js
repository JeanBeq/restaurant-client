import { useAuthStore } from '@/store/auth';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const authStore = useAuthStore();

    nuxtApp.$fetch = (url, options = {}) => {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        };
      }
      return $fetch(url, options);
    };
  });
});