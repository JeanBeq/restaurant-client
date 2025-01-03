<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Inscription</h1>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email :</label>
            <input type="email" v-model="email" required class="mt-1 p-2 w-full border rounded" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700">Mot de passe :</label>
            <input type="password" v-model="password" required class="mt-1 p-2 w-full border rounded" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Inscription</button>
        </form>
        <p class="mt-4 text-center">
          Déjà un compte ? <NuxtLink to="/login" class="text-blue-500 hover:underline">Connexion</NuxtLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/store/auth';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  
  const register = async () => {
    const result = await authStore.register(email.value, password.value);
    if (result.success) {
      router.push('/');
    } else {
      alert(result.error);
    }
  };
  </script>