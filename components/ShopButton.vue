<script setup>
const props = defineProps({
  shopeeUrl: { type: String, required: true },
  tokopediaUrl: { type: String, required: true },
  lazadaUrl: { type: String, required: true },
});

const marketplaces = [
  {
    name: "Shopee",
    url: props.shopeeUrl,
    img: "/images/Toko/Shopee.png",
    classes:
      "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800",
  },
  {
    name: "Tokopedia",
    url: props.tokopediaUrl,
    img: "/images/Toko/Tokopedia.png",
    classes:
      "bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  },
  {
    name: "Lazada",
    url: props.lazadaUrl,
    img: "/images/Toko/Lazada.png",
    classes:
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  },
];
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <a
      v-for="marketplace in marketplaces"
      :key="marketplace.name"
      :href="marketplace.url"
      target="_blank"
      class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      :class="marketplace.classes"
    >
      <img
        :src="marketplace.img"
        :alt="marketplace.name"
        class="w-5 h-5 me-2 -ms-1"
      />
      {{ marketplace.name }}
    </a>
  </div>
</template>
