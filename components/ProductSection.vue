<script setup>
import { ref, computed, watch } from "vue";
import { Icon } from "@iconify/vue";
import ShopButton from "./ShopButton.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const formatCurrency = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const images = computed(() => {
  const imgs = [];
  if (props.product.image_2) imgs.push(props.product.image_2);
  if (props.product.image_1) imgs.push(props.product.image_1);
  return imgs;
});

const activeImage = ref(images.value[0] || "/fallback.jpg");

watch(images, (newImages) => {
  if (newImages.length) {
    activeImage.value = newImages[0];
  }
});

const handleImageError = (event) => {
  event.target.src = "/fallback.jpg";
};

const handleThumbnailError = (event) => {
  event.target.src = "/fallback-thumb.jpg";
};
</script>

<template>
  <section class="bg-[#FBF9FA] py-12 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
        <!-- Product Images -->
        <div class="flex flex-col items-center lg:items-start">
          <!-- Main Image -->
          <div
            class="relative bg-white rounded-2xl p-4 shadow-sm border border-[#2B2024]/10"
          >
            <img
              v-if="activeImage"
              class="w-full max-w-md rounded-xl transition-all duration-500 hover:scale-105"
              :src="activeImage"
              :alt="product.name"
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
                'border-[#2B2024]/20 hover:border-[#FD0054]':
                  activeImage !== image,
              }"
            >
              <img
                :src="image"
                :alt="`${product.name} thumbnail`"
                class="w-full h-full object-cover"
                @error="handleThumbnailError"
              />
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="flex flex-col justify-center space-y-6">
          <!-- Product Name -->
          <h1
            class="text-3xl md:text-4xl font-bold text-[#2B2024] leading-tight"
          >
            {{ product.name }}
          </h1>

          <!-- Price -->
          <div class="flex items-center space-x-2">
            <p class="text-3xl md:text-4xl font-bold text-[#FD0054]">
              {{ formatCurrency(product.price) }}
            </p>
            <span
              v-if="product.original_price"
              class="text-lg text-[#2B2024]/60 line-through"
            >
              {{ formatCurrency(product.original_price) }}
            </span>
          </div>

          <!-- Product Information -->
          <div class="grid grid-cols-1 gap-4">
            <div class="flex items-center space-x-3">
              <Icon icon="mdi:star" class="w-5 h-5 text-[#FD0054]" />
              <div>
                <span class="font-semibold text-[#2B2024]">Edisi:</span>
                <span class="ml-2 text-[#2B2024]/80">{{
                  product.edition
                }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <Icon icon="mdi:palette" class="w-5 h-5 text-[#FD0054]" />
              <div>
                <span class="font-semibold text-[#2B2024]">Material:</span>
                <span class="ml-2 text-[#2B2024]/80">{{
                  product.material || "Premium Cotton"
                }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <Icon icon="mdi:ruler" class="w-5 h-5 text-[#FD0054]" />
              <div>
                <span class="font-semibold text-[#2B2024]">Ukuran:</span>
                <span class="ml-2 text-[#2B2024]/80">{{
                  product.size || "S, M, L, XL"
                }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <Icon icon="mdi:invert-colors" class="w-5 h-5 text-[#FD0054]" />
              <div>
                <span class="font-semibold text-[#2B2024]">Warna:</span>
                <span class="ml-2 text-[#2B2024]/80">{{
                  product.color || "Various Colors"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Features -->
          <div class="flex flex-wrap gap-4 pt-4">
            <div class="flex items-center space-x-2 text-sm text-[#2B2024]/70">
              <Icon icon="mdi:truck-fast" class="w-4 h-4 text-[#FD0054]" />
              <span>Free Shipping</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-[#2B2024]/70">
              <Icon icon="mdi:shield-check" class="w-4 h-4 text-[#FD0054]" />
              <span>1 Year Warranty</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-[#2B2024]/70">
              <Icon icon="mdi:refresh" class="w-4 h-4 text-[#FD0054]" />
              <span>30-Day Returns</span>
            </div>
          </div>

          <!-- Shop Button -->
          <div class="pt-6">
            <ShopButton
              class="w-full sm:w-auto"
              shopeeUrl="https://shopee.co.id/"
              tokopediaUrl="https://www.tokopedia.com/"
              lazadaUrl="https://www.lazada.co.id/"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom hover effects */
img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease-in-out;
}
</style>
