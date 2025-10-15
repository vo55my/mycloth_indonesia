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
    class="group inline-flex items-center justify-center bg-[#FD0054] text-[#FBF9FA] font-semibold rounded-lg hover:bg-[#A80038] focus:outline-none focus:ring-2 focus:ring-[#FD0054] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 w-full sm:w-auto"
    :class="[
      // Responsive padding
      'px-3 py-2 text-xs', // Mobile
      'sm:px-4 sm:py-2.5 sm:text-sm', // Tablet
      'md:px-5 md:py-3 md:text-base', // Desktop
      'lg:px-6 lg:py-3 lg:text-base', // Large desktop
    ]"
  >
    <!-- Button Content -->
    <span
      class="flex items-center justify-center space-x-1 sm:space-x-2 leading-none"
    >
      <span class="whitespace-nowrap">Lihat Produk</span>
      <Icon
        icon="mdi:arrow-right"
        class="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        :class="[
          'w-3 h-3', // Mobile
          'sm:w-4 sm:h-4', // Tablet
          'md:w-5 md:h-5', // Desktop
        ]"
      />
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

/* Ensure perfect vertical alignment */
.leading-none {
  line-height: 1;
}
</style>
