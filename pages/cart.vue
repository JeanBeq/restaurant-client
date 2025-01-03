<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-4">Votre Panier</h1>
          <ul>
            <li v-for="item in cartStore.items" :key="item.dish.id" class="mb-2 flex justify-between items-center">
              <span>{{ item.dish.name }} - {{ item.quantity }} x {{ item.dish.price }}€</span>
              <button @click="removeItem(item.dish.id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Supprimer</button>
            </li>
          </ul>
          <button v-if="cartStore.items.length > 0" @click="confirmOrder" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">Confirmer la commande</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '@/store/cart';
  import { useAuthStore } from '@/store/auth';
  import { useRouter } from 'vue-router';
  
  definePageMeta({
    middleware: 'auth'
  });
  
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const router = useRouter();
  
  const removeItem = (dishId) => {
    cartStore.removeItem(dishId);
  };
  
  const confirmOrder = async () => {
    try {
      const response = await $fetch('http://localhost:8081/api/orders/new', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: cartStore.items[0]?.dish.restaurantId,
          items: cartStore.items.map(item => ({
            dishId: item.dish.id,
            quantity: item.quantity,
          })),
        }),
      });
      cartStore.clearCart();
      alert('Commande confirmée avec succès !');
      router.push('/');
    } catch (error) {
      console.error('Échec de la confirmation de la commande :', error);
      alert('Échec de la confirmation de la commande.');
    }
  };
  </script>