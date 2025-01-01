<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '@/store/auth';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/login', {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value,
        },
      });
      authStore.setToken(response.accessToken);
      // Redirect to a protected route after successful login
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  
  onMounted(() => {
    if (authStore.token) {
      router.push('/');
    }
  });
  </script>