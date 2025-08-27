<script setup>
import { ref, computed } from "vue";
import ShopButton from "./ShopButton.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const formatPrice = (price) => {
  if (!price) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const images = computed(() => {
  const imgs = [];
  if (props.product.image_2) imgs.push(props.product.image_2);
  if (props.product.image_1) imgs.push(props.product.image_1);
  return imgs;
});

const activeImage = ref(images.value[0] || "");
</script>

<template>
  <section class="bg-white py-10 antialiased dark:bg-gray-900 md:py-16">
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-12 xl:gap-16"
      >
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img
            v-if="activeImage"
            class="w-80 rounded-2xl transition-transform duration-300 hover:scale-105"
            :src="activeImage"
            :alt="product.name"
          />
          <div
            v-if="images.length > 1"
            class="flex gap-3 mt-5 justify-center lg:justify-start"
          >
            <button
              v-for="image in images"
              :key="image"
              @click="activeImage = image"
              class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:border-red-500"
              :class="{
                'border-gray-100 dark:border-gray-200':
                  activeImage === image,
                'border-primary-600 dark:border-primary-400': activeImage !== image,
              }"
            >
              <img
                :src="image"
                :alt="`${product.name} thumbnail`"
                class="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
        <div class="mt-8 lg:mt-0 space-y-6">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            {{ product.name }}
          </h1>

          <p
            class="text-3xl font-extrabold text-primary-600 sm:text-4xl dark:text-white"
          >
            {{ formatPrice(product.price) }}
          </p>

          <div class="grid grid-cols-1 gap-3 text-gray-600 dark:text-gray-300">
            <p>
              <span class="font-semibold text-gray-900 dark:text-white"
                >Edisi:</span
              >
              {{ product.edition }}
            </p>
            <p>
              <span class="font-semibold text-gray-900 dark:text-white"
                >Material:</span
              >
              {{ product.material }}
            </p>
            <p>
              <span class="font-semibold text-gray-900 dark:text-white"
                >Ukuran:</span
              >
              {{ product.size }}
            </p>
            <p>
              <span class="font-semibold text-gray-900 dark:text-white"
                >Warna:</span
              >
              {{ product.color }}
            </p>
          </div>
          <ShopButton
            class="mt-4 w-full sm:w-auto"
            shopeeUrl="https://shopee.co.id/"
            tokopediaUrl="https://www.tokopedia.com/"
            lazadaUrl="https://www.lazada.co.id/"
          />
        </div>
      </div>
    </div>
  </section>
</template>
