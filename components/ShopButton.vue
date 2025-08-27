<script setup>
defineProps({
  shopeeUrl: {
    type: String,
    required: true,
  },
  tokopediaUrl: {
    type: String,
    required: true,
  },
  lazadaUrl: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <!-- Shopee Button -->
    <a
      :href="shopeeUrl"
      target="_blank"
      class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
    >
      <img
        src="/images/Toko/Shopee.png"
        alt="Shopee"
        class="w-5 h-5 me-2 -ms-1"
      />
      Shopee
    </a>
    <!-- Tokopedia Button -->
    <a
      :href="tokopediaUrl"
      target="_blank"
      class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      <img
        src="/images/Toko/Tokopedia.png"
        alt="Tokopedia"
        class="w-5 h-5 me-2 -ms-1"
      />
      Tokopedia
    </a>
    <!-- Lazada Button -->
    <a
      :href="lazadaUrl"
      target="_blank"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <img
        src="/images/Toko/Lazada.png"
        alt="Lazada"
        class="w-5 h-5 me-2 -ms-1"
      />
      Lazada
    </a>
  </div>
</template>
