<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <div v-if="restaurant" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="restaurant.image || 'https://via.placeholder.com/800x400'" alt="Restaurant Image" class="w-full h-64 object-cover">
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-2">{{ restaurant.name }}</h1>
          <p class="text-gray-700 mb-4">Addresse : {{ restaurant.address }}</p>
          <h2 class="text-2xl font-semibold mb-2">Plats</h2>
          <ul class="list-disc list-inside">
            <li v-for="dish in dishes" :key="dish.id" class="mb-2 flex justify-between items-center">
              <NuxtLink :to="`/dish/${dish.id}`">
                <span class="font-medium">{{ dish.name }}</span> - <span class="text-gray-600">{{ dish.price }}€</span>
              </NuxtLink>
              <div>
                <button @click="addToCart(dish)" class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded ml-2">Ajouter au panier</button>
                <button v-if="isOwner" @click="deleteDish(dish.id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2">Supprimer</button>
              </div>
            </li>
          </ul>
          <button v-if="isOwner" @click="showAddDishForm = true" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">Ajouter un plat</button>
          <div v-if="showAddDishForm" class="mt-4">
            <form @submit.prevent="addDish">
              <div class="mb-2">
                <label for="name" class="block text-gray-700">Nom :</label>
                <input type="text" v-model="newDish.name" required class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-2">
                <label for="description" class="block text-gray-700">Description :</label>
                <input type="text" v-model="newDish.description" required class="mt-1 p-2 w-full border rounded" />
              </div>
              <div class="mb-2">
                <label for="price" class="block text-gray-700">Prix :</label>
                <input type="number" v-model="newDish.price" required class="mt-1 p-2 w-full border rounded" />
              </div>
              <button type="submit" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Ajouter</button>
            </form>
          </div>
          <div v-if="orders.length > 0" class="mt-8">
            <h2 class="text-2xl font-semibold mb-2">Commandes</h2>
            <ul class="list-disc list-inside">
              <li v-for="order in orders" :key="order.id" class="mb-2">
                <div class="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 class="text-xl font-semibold mb-2">Commande #{{ order.id }}</h3>
                  <ul class="list-disc list-inside">
                    <li v-for="item in order.orderItems" :key="item.id" class="mb-2">
                      {{ item.quantity }} x {{ item.dish.name }}
                    </li>
                  </ul>
                  <button v-if="isOwner" @click="deleteOrder(order.id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mt-2">Supprimer la commande</button>
                </div>
              </li>
            </ul>
          </div>
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
  import { useCartStore } from '@/store/cart';
  
  definePageMeta({
    middleware: 'auth'
  });
  
  const route = useRoute();
  const restaurant = ref(null);
  const dishes = ref([]);
  const orders = ref([]);
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const isOwner = ref(false);
  const showAddDishForm = ref(false);
  const newDish = ref({ name: '', description: '', price: 0 });
  
  const fetchRestaurant = async () => {
    try {
      const response = await $fetch(`http://localhost:8081/api/restaurants/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      restaurant.value = response;
  
      const userResponse = await $fetch('http://localhost:8081/api/users/@me', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      isOwner.value = response.userId === userResponse.id;
      if (isOwner.value) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Échec de la récupération du restaurant:', error);
    }
  };
  
  const fetchRestaurantDishes = async () => {
    try {
      const response = await $fetch(`http://localhost:8081/api/restaurant/${route.params.id}/dishes`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      dishes.value = response;
    } catch (error) {
      console.error('Échec de la récupération des plats du restaurant:', error);
    }
  };
  
  const fetchOrders = async () => {
    try {
      const response = await $fetch(`http://localhost:8081/api/orders/restaurant/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      orders.value = response;
    } catch (error) {
      console.error('Échec de la récupération des commandes:', error);
    }
  };
  
  const addDish = async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/dish/new', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newDish.value, restaurantId: restaurant.value.id }),
      });
      dishes.value.push(response);
      newDish.value = { name: '', description: '', price: 0 };
      showAddDishForm.value = false;
    } catch (error) {
      console.error('Échec de l\'ajout du plat:', error);
    }
  };
  
  const deleteDish = async (id) => {
    try {
      await $fetch(`http://localhost:8081/api/dish/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      dishes.value = dishes.value.filter(dish => dish.id !== id);
    } catch (error) {
      console.error('Échec de la suppression du plat:', error);
    }
  };
  
  const deleteOrder = async (id) => {
    try {
      await $fetch(`http://localhost:8081/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      orders.value = orders.value.filter(order => order.id !== id);
    } catch (error) {
      console.error('Échec de la suppression de la commande:', error);
    }
  };
  
  const addToCart = (dish) => {
    cartStore.addItem(dish, 1);
  };
  
  onMounted(() => {
    fetchRestaurant();
    fetchRestaurantDishes();
  });
  </script>