<template>
  <div>
    <h1>Restaurants</h1>
    <div v-if="userRestaurant">
      <h2>Votre Restaurant</h2>
      <div class="restaurant">
        <h3>{{ userRestaurant.name }}</h3>
        <p>{{ userRestaurant.adress }}</p>
      </div>
    </div>
    <div v-else>
      <h2>Tous les Restaurants</h2>
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant">
        <h3>{{ restaurant.name }}</h3>
        <p>{{ restaurant.adress }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';

const restaurants = ref([]);
const userRestaurant = ref(null);
const authStore = useAuthStore();

const fetchRestaurants = async () => {
  try {
    const response = await $fetch('http://localhost:8081/api/restaurants', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    restaurants.value = response;

    if (authStore.token) {
      const userResponse = await $fetch('http://localhost:8081/api/user', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      const userId = userResponse.id;

      const userRestaurantResponse = await $fetch(`http://localhost:8081/api/restaurants?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      if (userRestaurantResponse.length > 0) {
        userRestaurant.value = userRestaurantResponse[0];
      }
    }
  } catch (error) {
    console.error('Échec de la récupération des restaurants:', error);
  }
};

onMounted(() => {
  fetchRestaurants();
});
</script>

<style>
.restaurant {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
}
</style>