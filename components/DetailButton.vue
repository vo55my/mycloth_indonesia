<script>
export default {
  name: "DetailButton",
  props: {
    productUrl: {
      type: String,
      required: true,
      default: "#",
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <a
    :href="productUrl"
    :target="external ? '_blank' : '_self'"
    :rel="external ? 'noopener noreferrer' : null"
    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
  >
    Lihat Produk
  </a>
</template>
