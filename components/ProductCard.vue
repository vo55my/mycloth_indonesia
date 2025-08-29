<script setup>
import { ref } from "vue";
import DetailButton from "./DetailButton.vue";

const isLoading = ref(true);

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
</script>

<template>
  <div
    class="w-full max-w-sm rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-6 rounded-t-lg aspect-square">
      <div
        v-if="isLoading"
        class="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
      ></div>
      <img
        v-show="!isLoading"
        class="w-full h-full object-contain"
        :src="katalog.image_2 || '/fallback.jpg'"
        :alt="katalog.name || 'Produk MyCloth'"
        loading="lazy"
        @load="isLoading = false"
        @error="
          (e) => {
            e.target.src = '/fallback.jpg';
            isLoading = false;
          }
        "
      />
    </div>
    <div class="px-5 pb-5">
      <h5
        class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {{ katalog.name }}
      </h5>
      <p class="text-center dark:text-white pb-4">
        {{ katalog.edition }}
      </p>
      <div class="flex flex-wrap items-center gap-2 justify-center">
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          {{ formatCurrency(katalog.price) }}
        </span>
        <DetailButton
          :productUrl="`/product/${katalog.id}`"
          aria-label="Lihat detail produk {{ katalog.name }}"
        />
      </div>
    </div>
  </div>
</template>
