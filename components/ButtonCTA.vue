<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  description: String,
});
</script>

<template>
  <div class="text-center mt-8">
    <a
      href="/shop"
      class="inline-flex items-center space-x-3 bg-[#2B2024] text-[#FBF9FA] px-8 py-4 rounded-lg font-semibold hover:bg-[#FD0054] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <Icon icon="mdi:shopping" class="w-5 h-5" />
      <span>{{ description }}</span>
      <Icon icon="mdi:arrow-right" class="w-5 h-5" />
    </a>
  </div>
</template>
