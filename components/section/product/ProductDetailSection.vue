<script setup>
import ProductImageGallery from "@/components/section/product/ProductImageGallery.vue";
import ProductInfo from "@/components/section/product/ProductInfo.vue";

defineProps({
  product: {
    type: Object,
    required: true,
  },
  productImages: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="bg-[#FBF9FA] py-12 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
        <!-- Product Images -->
        <ProductImageGallery
          :images="productImages"
          :productName="product.name"
        />

        <!-- Product Details -->
        <ProductInfo :product="product" />
      </div>
    </div>
  </section>
</template>
