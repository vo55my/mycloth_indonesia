<script setup>
import Breadcrumb from "@/components/common/Breadcrumb.vue";

defineProps({
  breadcrumbItems: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section class="border-b border-[#2B2024]/10 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumb :items="breadcrumbItems" />
    </div>
  </section>
</template>