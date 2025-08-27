<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../utils/supabase";
import ProductCard from "./ProductCard.vue";

const katalogs = ref([]);

async function fetchKatalogs() {
  const { data } = await supabase.from("katalogs").select("*");
  if (data) {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    katalogs.value = data.slice(0, 4);
  } else {
    katalogs.value = [];
  }
}

onMounted(() => {
  fetchKatalogs();
});
</script>

<template>
  <section
    class="antialiased bg-white dark:bg-gray-900 md:py-16 px-4"
  >
    <h1
      class="text-center mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Related Products
    </h1>
    <hr class="w-30 h-1 mx-auto bg-gray-100 border-0 dark:bg-gray-700 mb-5" />
    <div
      class="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:px-4"
    >
      <ProductCard
        v-for="katalog in katalogs"
        :key="katalog.id"
        :katalog="katalog"
      />
    </div>
  </section>
</template>
