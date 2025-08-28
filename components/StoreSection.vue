<script setup>
import { ref, onMounted } from "vue";

const loading = ref(true);

const stores = [
  { name: "Lazada", src: "/images/Toko/Lazada.png", link: "#" },
  { name: "Shopee", src: "/images/Toko/Shopee.png", link: "#" },
  { name: "Tokopedia", src: "/images/Toko/Tokopedia.png", link: "#" },
];

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
        v-for="n in stores.length"
        :key="n"
        class="h-[150px] w-[150px] mx-auto bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      ></div>
    </div>

    <div
      v-else
      class="container mx-auto grid grid-cols-3 gap-8 text-gray-500 dark:text-gray-400 px-4"
    >
      <a
        v-for="store in stores"
        :key="store.name"
        :href="store.link"
        :aria-label="store.name"
        class="flex items-center justify-center"
      >
        <img
          class="h-auto max-w-full"
          :src="store.src"
          :alt="store.name"
          width="150"
        />
      </a>
    </div>
  </section>
</template>
