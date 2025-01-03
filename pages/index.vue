<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div v-if="userRestaurant" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Votre Restaurant</h2>
        <div class="restaurant">
          <NuxtLink :to="`/restaurant/${userRestaurant.id}`" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold">{{ userRestaurant.name }}</h3>
            <p class="text-gray-700">{{ userRestaurant.address }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Tous les Restaurants</h2>
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant mb-4">
          <NuxtLink :to="`/restaurant/${restaurant.id}`" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold">{{ restaurant.name }}</h3>
            <p class="text-gray-700">{{ restaurant.address }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
definePageMeta({
  middleware: 'auth'
});

const restaurants = ref([]);
const userRestaurant = ref(null);
const authStore = useAuthStore();
const userId = ref(null);

const fetchRestaurants = async () => {
  try {
    const response = await $fetch('http://localhost:8081/api/restaurants', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    restaurants.value = response;

    if (authStore.token) {
      const userResponse = await $fetch('http://localhost:8081/api/users/@me', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      userId.value = userResponse.id;
      userRestaurant.value = restaurants.value.find(restaurant => restaurant.userId === userId.value);
    }
  } catch (error) {
    console.error('Échec de la récupération des restaurants:', error);
  }
};

onMounted(() => {
  fetchRestaurants();
});
</script>

<style scoped>
.restaurant {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
}
</style>