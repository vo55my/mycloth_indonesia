<script setup>
import { ref, onMounted } from "vue";

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1500);
});
</script>

<template>
  <section
    id="store"
    class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16"
  >
    <h1
      class="text-center mb-3 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"
    >
      Available In
    </h1>
    <hr class="w-45 h-1 mx-auto bg-gray-100 border-0 dark:bg-gray-700 mb-2" />
    <div v-if="loading" class="container mx-auto grid grid-cols-3 gap-8 px-4">
      <div
        v-for="n in 3"
        :key="n"
        class="h-[150px] w-[150px] mx-auto bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      ></div>
    </div>
    <div
      v-else
      class="container mx-auto grid grid-cols-3 gap-8 text-gray-500 dark:text-gray-400 px-4"
    >
      <a href="#" class="flex items-center justify-center">
        <img
          class="h-auto max-w-full"
          src="/images/Toko/Lazada.png"
          alt="Lazada"
          width="150"
        />
      </a>
      <a href="#" class="flex items-center justify-center">
        <img
          class="h-auto max-w-full"
          src="/images/Toko/Shopee.png"
          alt="Shopee"
          width="150"
        />
      </a>
      <a href="#" class="flex items-center justify-center">
        <img
          class="h-auto max-w-full"
          src="/images/Toko/Tokopedia.png"
          alt="Tokopedia"
          width="150"
        />
      </a>
    </div>
  </section>
</template>
