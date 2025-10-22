<script setup>
import { Icon } from "@iconify/vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import ScrollToTopButton from "@/components/button/ScrollToTopButton.vue";

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  filteredKatalogs: {
    type: Array,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  selectedEditions: {
    type: Array,
    required: true,
  },
});

defineEmits(["clear-filters"]);
</script>

<template>
  <section class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-white rounded-2xl overflow-hidden border border-[#2B2024]/10 animate-pulse"
        >
          <div class="aspect-square bg-gray-200"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded mb-2 w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div class="h-6 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredKatalogs.length === 0" class="text-center py-16">
        <div
          class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
        >
          <div
            class="w-16 h-16 bg-[#2B2024]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon
              icon="mdi:package-variant"
              class="w-16 h-16 text-[#2B2024]/40 mx-auto mb-4"
            />
          </div>
          <h3 class="text-xl font-bold text-[#2B2024] mb-2">
            No Products Found
          </h3>
          <p class="text-[#2B2024]/70 mb-6">
            Try adjusting your search or filter criteria to find what you're
            looking for.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              @click="$emit('clear-filters')"
              class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
            >
              Clear Filters
            </button>
            <a
              href="/"
              class="border border-[#2B2024] text-[#2B2024] px-6 py-2 rounded-lg font-medium hover:bg-[#2B2024] hover:text-[#FBF9FA] transition-colors duration-200"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-6 product-grid">
        <ProductCard
          v-for="katalog in filteredKatalogs"
          :key="katalog.id"
          :katalog="katalog"
        />
      </div>

      <!-- Scroll to Top Button -->
      <ScrollToTopButton />
    </div>
  </section>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-grid {
  animation: fadeIn 0.6s ease-out forwards;
}
</style>
