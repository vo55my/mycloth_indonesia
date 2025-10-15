<script setup>
defineProps({
  message: String,
});

const emit = defineEmits(["retry"]);
</script>

<template>
  <div class="text-center py-16">
    <div
      class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
    >
      <Icon
        icon="mdi:alert-circle"
        class="w-16 h-16 text-[#FD0054] mx-auto mb-4"
      />
      <h3 class="text-xl font-bold text-[#2B2024] mb-2">Oops!</h3>
      <p class="text-[#2B2024]/70 mb-6">{{ message }}</p>
      <button
        @click="$emit('retry')"
        class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  </div>
</template>
