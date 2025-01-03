<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-4">Admin Panel</h1>
          <button @click="showAddRestaurantForm = true" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4">Ajouter un restaurant</button>
          <div v-if="showAddRestaurantForm" class="mb-4">
            <form @submit.prevent="addRestaurant">
              <div class="mb-2">
                <label for="name" class="block text-gray-700">Nom :</label>
                <input type="text" v-model="newRestaurant.name" required class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-2">
                <label for="address" class="block text-gray-700">Adresse :</label>
                <input type="text" v-model="newRestaurant.address" required class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-2">
                <label for="userId" class="block text-gray-700">Propriétaire :</label>
                <select v-model="newRestaurant.userId" required class="mt-1 p-2 w-full border rounded">
                  <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
                </select>
              </div>
              <button type="submit" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Ajouter</button>
            </form>
          </div>
          <h2 class="text-2xl font-semibold mb-4">Liste des Restaurants</h2>
          <ul>
            <li v-for="restaurant in restaurants" :key="restaurant.id" class="mb-2 flex justify-between items-center">
              <span>{{ restaurant.name }} - {{ restaurant.address }}</span>
              <button @click="deleteRestaurant(restaurant.id)" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Supprimer</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';

    definePageMeta({
    middleware: 'auth'
  });
  
  const authStore = useAuthStore();
  const router = useRouter();
  const restaurants = ref([]);
  const users = ref([]);
  const showAddRestaurantForm = ref(false);
  const newRestaurant = ref({ name: '', address: '', userId: null });
  
  const fetchRestaurants = async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/restaurants', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      restaurants.value = response;
    } catch (error) {
      console.error('Échec de la récupération des restaurants:', error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/users', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      users.value = response;
    } catch (error) {
      console.error('Échec de la récupération des utilisateurs:', error);
    }
  };
  
  const addRestaurant = async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/restaurants/new', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRestaurant.value),
      });
      restaurants.value.push(response);
      newRestaurant.value = { name: '', address: '', userId: null };
      showAddRestaurantForm.value = false;
    } catch (error) {
      console.error('Échec de l\'ajout du restaurant:', error);
    }
  };
  
  const deleteRestaurant = async (id) => {
    try {
      await $fetch(`http://localhost:8081/api/restaurants/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      restaurants.value = restaurants.value.filter(restaurant => restaurant.id !== id);
    } catch (error) {
      console.error('Échec de la suppression du restaurant:', error);
    }
  };
  
  onMounted(async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/users/@me', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      if (response.role !== 'ADMIN') {
        router.push('/');
      } else {
        fetchRestaurants();
        fetchUsers();
      }
    } catch (error) {
      console.error('Échec de la vérification du rôle de l\'utilisateur:', error);
      router.push('/');
    }
  });
  </script>