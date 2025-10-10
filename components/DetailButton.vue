<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  productUrl: {
    type: String,
    required: true,
    default: "#",
  },
  external: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a
    :href="productUrl"
    :target="external ? '_blank' : '_self'"
    :rel="external ? 'noopener noreferrer' : null"
    class="inline-flex items-center justify-center px-6 py-3 bg-[#FD0054] text-[#FBF9FA] font-semibold rounded-lg hover:bg-[#A80038] focus:outline-none focus:ring-2 focus:ring-[#FD0054] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 w-45"
  >
    <!-- Button Content -->
    <span class="flex items-center space-x-2">
      <span>Lihat Produk</span>
      <Icon icon="mdi:arrow-right" class="w-5 h-5" />
    </span>
  </a>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
a:focus {
  box-shadow: 0 0 0 3px rgba(253, 0, 84, 0.1);
}

/* Smooth transition for all interactive states */
a {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
