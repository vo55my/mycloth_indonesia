<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";
import { supabase } from "../utils/supabase";

const katalogs = ref([]);
const loading = ref(true);
const errorMessage = ref("");

async function fetchKatalogs() {
  try {
    const { data, error } = await supabase
      .from("katalogs")
      .select("id, name, edition, price, image_2")
      .limit(4);

    if (error) throw error;

    if (data && data.length) {
      for (let i = data.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      katalogs.value = data.slice(0, 4);
    } else {
      katalogs.value = [];
    }
  } catch (err) {
    errorMessage.value = "Failed to load catalog.";
    console.error(err.message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchKatalogs();
});
</script>

<template>
  <section
    id="catalog"
    class="antialiased bg-white pb-10 pt-20 dark:bg-gray-900 md:py-16 px-4"
  >
    <h1
      class="text-center mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Catalog
    </h1>
    <hr class="w-30 h-1 mx-auto bg-gray-100 border-0 dark:bg-gray-700 mb-5" />

    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
      Loading products...
    </div>

    <div v-else-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </div>

    <div
      v-else
      class="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 sm:px-4"
    >
      <ProductCard
        v-for="katalog in katalogs"
        :key="katalog.id"
        :katalog="katalog"
      />
    </div>
  </section>
</template>
