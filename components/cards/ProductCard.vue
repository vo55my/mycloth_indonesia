<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import DetailButton from "@/components/button/DetailButton.vue";

const isLoading = ref(true);
const isHovered = ref(false);

const props = defineProps({
  katalog: {
    type: Object,
    required: true,
  },
});

const formatCurrency = (value) => {
  const number = Number(value);
  if (isNaN(number)) return value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const handleImageLoad = () => {
  isLoading.value = false;
};

const handleImageError = () => {
  isLoading.value = false;
};
</script>

<template>
  <div
    class="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#FD0054] transition-all duration-500 hover:shadow-xl"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image Container -->
    <div class="relative aspect-square bg-[#FBF9FA] overflow-hidden">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse"
      >
        <Icon icon="mdi:tshirt-crew" class="w-12 h-12 text-gray-300" />
      </div>

      <!-- Product Image -->
      <img
        v-show="!isLoading"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        :src="katalog.image_2"
        :alt="katalog.name || 'Produk MyCloth'"
        loading="lazy"
        @load="handleImageLoad"
        @error="handleImageError"
      />

      <!-- Overlay on Hover -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#2B2024]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <!-- Quick Actions -->
      <!-- <div
        class="absolute top-3 right-3 flex flex-col space-y-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300"
      >
        <button
          class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FD0054] hover:text-white transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <Icon icon="mdi:heart-outline" class="w-4 h-4" />
        </button>
        <button
          class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FD0054] hover:text-white transition-colors duration-200"
          aria-label="Quick view"
        >
          <Icon icon="mdi:eye-outline" class="w-4 h-4" />
        </button>
      </div> -->

      <!-- Product Badges -->
      <div class="absolute top-3 left-3 flex flex-col space-y-2">
        <span
          v-if="katalog.is_new"
          class="bg-[#FD0054] text-[#FBF9FA] px-2 py-1 rounded-full text-xs font-semibold"
        >
          New
        </span>
        <span
          v-if="katalog.is_popular"
          class="bg-[#A80038] text-[#FBF9FA] px-2 py-1 rounded-full text-xs font-semibold"
        >
          Popular
        </span>
        <span
          v-if="katalog.is_limited"
          class="bg-[#2B2024] text-[#FBF9FA] px-2 py-1 rounded-full text-xs font-semibold"
        >
          Limited
        </span>
      </div>

      <!-- Hover View Button -->
      <div
        class="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <DetailButton
          :productUrl="`/product/${katalog.id}`"
          class="bg-[#FD0054] hover:bg-[#A80038] text-[#FBF9FA] px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
          :aria-label="`Lihat detail ${katalog.name}`"
        />
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-6">
      <!-- Product Name -->
      <h3
        class="text-lg font-semibold text-[#2B2024] mb-2 line-clamp-1 group-hover:text-[#FD0054] transition-colors"
      >
        {{ katalog.name }}
      </h3>

      <!-- Edition -->
      <p class="text-[#2B2024]/70 text-sm mb-3 line-clamp-1">
        {{ katalog.edition }}
      </p>

      <!-- Rating -->
      <div class="flex items-center space-x-1 mb-4">
        <div class="flex">
          <Icon
            v-for="star in 5"
            :key="star"
            icon="mdi:star"
            class="w-4 h-4"
            :class="star <= 4 ? 'text-yellow-400' : 'text-gray-300'"
          />
        </div>
        <span class="text-sm text-[#2B2024]/60">(4.8)</span>
      </div>

      <!-- Price & Action -->
      <div class="flex items-center justify-between">
        <!-- Price -->
        <div class="flex flex-col">
          <span class="text-xl font-bold text-[#FD0054]">
            {{ formatCurrency(katalog.price) }}
          </span>
          <span
            v-if="katalog.original_price"
            class="text-sm text-[#2B2024]/60 line-through"
          >
            {{ formatCurrency(katalog.original_price) }}
          </span>
        </div>

        <!-- Add to Cart Button -->
        <!-- <button
          class="w-10 h-10 bg-[#2B2024] text-[#FBF9FA] rounded-lg flex items-center justify-center hover:bg-[#FD0054] transition-colors duration-200 shadow-sm hover:shadow-md"
          aria-label="Add to cart"
        >
          <Icon icon="mdi:shopping" class="w-5 h-5" />
        </button> -->
      </div>
    </div>

    <!-- Quick Add to Cart Bar (Mobile) -->
    <!-- <div class="md:hidden border-t border-[#2B2024]/10 p-4">
      <button
        class="w-full bg-[#FD0054] text-[#FBF9FA] py-2 rounded-lg font-semibold hover:bg-[#A80038] transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Icon icon="mdi:shopping" class="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div> -->
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
