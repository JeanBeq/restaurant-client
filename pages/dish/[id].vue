<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <div v-if="dish" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-2">{{ dish.name }}</h1>
          <p class="text-gray-700 mb-4">{{ dish.description }}</p>
          <p class="text-gray-700 mb-4">Prix : {{ dish.price }}€</p>
        </div>
      </div>
      <div v-else class="flex justify-center items-center min-h-screen">
        <p class="text-gray-700">Chargement...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '@/store/auth';

  definePageMeta({
    middleware: 'auth'
  });
  
  const route = useRoute();
  const dish = ref(null);
  const authStore = useAuthStore();
  
  const fetchDish = async () => {
    try {
      const response = await $fetch(`http://localhost:8081/api/dish/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      dish.value = response;
    } catch (error) {
      console.error('Échec de la récupération du plat:', error);
    }
  };
  
  onMounted(() => {
    fetchDish();
  });
  </script>