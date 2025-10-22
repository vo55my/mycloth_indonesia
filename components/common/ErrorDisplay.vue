<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  title: String,
  message: String,
});
</script>

<template>
  <div
    class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
  >
    <div
      class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
    >
      <Icon
        icon="mdi:alert-circle"
        class="w-16 h-16 text-[#FD0054] mx-auto mb-4"
      />
    </div>

    <h3 class="text-xl font-bold text-[#2B2024] mb-2">
      {{ title || "Error" }}
    </h3>
    <p class="text-[#2B2024]/70 mb-6">
      {{ message }}
    </p>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <slot name="actions">
        <a
          href="/shop"
          class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
        >
          Browse Products
        </a>
        <a
          href="/"
          class="border border-[#2B2024] text-[#2B2024] px-6 py-2 rounded-lg font-medium hover:bg-[#2B2024] hover:text-[#FBF9FA] transition-colors duration-200"
        >
          Back to Home
        </a>
      </slot>
    </div>
  </div>
</template>
