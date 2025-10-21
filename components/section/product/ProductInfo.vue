<script setup>
import { Icon } from "@iconify/vue";
import ShopButton from "@/components/button/ShopButton.vue";

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
</script>

<template>
  <div class="flex flex-col justify-center space-y-6">
    <!-- Product Name -->
    <h1 class="text-3xl md:text-4xl font-bold text-[#2B2024] leading-tight">
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
          <span class="ml-2 text-[#2B2024]/80">{{ product.edition }}</span>
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
</template>
