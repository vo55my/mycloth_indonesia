<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  productName: {
    type: String,
    default: "Product",
  },
});

const activeImage = ref(props.images[0] || "/fallback.jpg");

watch(
  () => props.images,
  (newImages) => {
    if (newImages.length) {
      activeImage.value = newImages[0];
    }
  }
);

const handleImageError = (event) => {
  event.target.src = "/fallback.jpg";
};

const handleThumbnailError = (event) => {
  event.target.src = "/fallback-thumb.jpg";
};
</script>

<template>
  <div class="flex flex-col items-center lg:items-start">
    <!-- Main Image -->
    <div
      class="relative bg-white rounded-2xl p-4 shadow-sm border border-[#2B2024]/10"
    >
      <img
        v-if="activeImage"
        class="w-full max-w-md rounded-xl transition-all duration-500 hover:scale-105"
        :src="activeImage"
        :alt="productName"
        @error="handleImageError"
      />

      <!-- Image Loading State -->
      <div
        v-if="!activeImage"
        class="w-full h-80 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center"
      >
        <Icon icon="mdi:tshirt-crew" class="w-16 h-16 text-gray-300" />
      </div>
    </div>

    <!-- Image Thumbnails -->
    <div
      v-if="images.length > 1"
      class="flex gap-3 mt-6 justify-center lg:justify-start"
    >
      <button
        v-for="image in images"
        :key="image"
        @click="activeImage = image"
        class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-white shadow-sm"
        :class="{
          'border-[#FD0054]': activeImage === image,
          'border-[#2B2024]/20 hover:border-[#FD0054]': activeImage !== image,
        }"
      >
        <img
          :src="image"
          :alt="`${productName} thumbnail`"
          class="w-full h-full object-cover"
          @error="handleThumbnailError"
        />
      </button>
    </div>
  </div>
</template>
