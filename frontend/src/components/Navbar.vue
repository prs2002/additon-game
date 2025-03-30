<template>
    <nav class="bg-gray-900 text-white p-4 flex justify-between">
      <h1 class="text-xl">Dashboard</h1>
      <button @click="logout" class="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  </template>
  
  <script>
  import { auth } from '../firebase';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const logout = async () => {
        await auth.signOut();
        router.push('/');
      };
      return { logout };
    },
  };
  </script>