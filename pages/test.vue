<script setup>
import { supabase } from '../utils/supabase';

const editions = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const fetchEditions = async () => {
  try {
    const { data, error } = await supabase.from("editions").select("*");
    if (error) throw error;
    editions.value = data;
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEditions();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Daftar Users</h1>

    <div v-if="loading">Loading data...</div>
    <div v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

    <table
      v-else
      class="table-auto border-collapse border border-gray-400 w-full"
    >
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-400 px-4 py-2">ID</th>
          <th class="border border-gray-400 px-4 py-2">Nama</th>
          <th class="border border-gray-400 px-4 py-2">Gambar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="edition in editions" :key="edition.id">
          <td class="border border-gray-400 px-4 py-2">{{ edition.id }}</td>
          <td class="border border-gray-400 px-4 py-2">{{ edition.name }}</td>
          <td class="border border-gray-400 px-4 py-2">
            <img
              :src="edition.image"
              alt="edition image"
              class="w-24 h-24 object-cover rounded"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
