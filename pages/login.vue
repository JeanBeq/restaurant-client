<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email :</label>
          <input type="email" v-model="email" required class="mt-1 p-2 w-full border rounded" />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">Mot de passe :</label>
          <input type="password" v-model="password" required class="mt-1 p-2 w-full border rounded" />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Connexion</button>
      </form>
      <p class="mt-4 text-center">
        Pas encore de compte ? <NuxtLink to="/register" class="text-blue-500 hover:underline">Inscription</NuxtLink>
      </p>
    </div>
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
    router.push('/');
  } else {
    console.error('Échec de la connexion :', response.error);
    alert('Échec de la connexion. Veuillez vérifier vos identifiants.');
  }
};

onMounted(() => {
  if (authStore.token) {
    router.push('/');
  }
});
</script>