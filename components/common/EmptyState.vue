<script setup>
defineEmits(["reset-filter"]);
</script>

<template>
  <div class="text-center py-16">
    <div
      class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
    >
      <Icon
        icon="mdi:package-variant"
        class="w-16 h-16 text-[#2B2024]/40 mx-auto mb-4"
      />
      <h3 class="text-xl font-bold text-[#2B2024] mb-2">No Products Found</h3>
      <p class="text-[#2B2024]/70 mb-6">
        We couldn't find any products matching your selection. Try a different
        filter.
      </p>
      <button
        @click="$emit('reset-filter')"
        class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
      >
        View New Arrivals
      </button>
    </div>
  </div>
</template>
