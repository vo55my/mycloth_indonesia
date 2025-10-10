<script setup>
defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div class="text-center mb-8">
    <h2 class="text-4xl md:text-5xl font-bold text-[#2B2024] mb-4">
      {{ title }}
    </h2>
    <div class="w-24 h-1 bg-[#FD0054] mx-auto mb-6 rounded-full"></div>
    <p class="text-lg text-[#2B2024]/80 max-w-3xl mx-auto">
      {{ description }}
    </p>
  </div>
</template>
