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
  const response = await authStore.login(email.value, password.value);
  if (response.success) {
    router.push('/restaurant');
  } else {
    console.error('Login failed:', response.error);
    alert('Login failed. Please check your credentials.');
  }
};

onMounted(() => {
  if (authStore.token) {
    router.push('/restaurant');
  }
});
</script>