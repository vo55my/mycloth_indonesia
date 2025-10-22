<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { supabase } from "@/utils/supabase";
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import ErrorDisplay from "@/components/common/ErrorDisplay.vue";
import ScrollToTopButton from "@/components/button/ScrollToTopButton.vue";
import ProductHeaderSection from "@/components/section/product/ProductHeaderSection.vue";
import ProductDetailSection from "@/components/section/product/ProductDetailSection.vue";
import RelatedProductsSection from "@/components/section/product/RelatedProductsSection.vue";

const route = useRoute();

// Product data
const {
  data: product,
  pending,
  error,
} = await useAsyncData(`product-${route.params.id}`, async () => {
  const { data, error } = await supabase
    .from("katalogs")
    .select("*")
    .eq("id", route.params.id)
    .single();
  if (error) throw error;
  return data;
});

// Related products data
const relatedProducts = ref([]);
const relatedLoading = ref(true);

async function fetchRelatedProducts() {
  const { data, error } = await supabase.from("katalogs").select("*");

  if (error) {
    console.error("Error fetching katalogs:", error.message);
    relatedProducts.value = [];
    relatedLoading.value = false;
    return;
  }

  if (data) {
    for (let i = data.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    relatedProducts.value = data.slice(0, 4);
  }

  relatedLoading.value = false;
}

// Product images computation
const productImages = computed(() => {
  if (!product.value) return [];
  const imgs = [];
  if (product.value.image_2) imgs.push(product.value.image_2);
  if (product.value.image_1) imgs.push(product.value.image_1);
  return imgs;
});

const breadcrumbItems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  {
    name: product.value?.name ?? "Product",
    link: `/product/${route.params.id}`,
  },
];

// Fetch related products when component mounts
onMounted(fetchRelatedProducts);
</script>

<template>
  <div class="min-h-screen bg-[#FBF9FA]">
    <Navbar />

    <!-- Main Content -->
    <main class="pt-24">
      <!-- Header Section -->
      <ProductHeaderSection :breadcrumbItems="breadcrumbItems" />

      <!-- Loading State -->
      <section v-if="pending" class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <LoadingSpinner
              title="Loading Product"
              message="Please wait while we fetch the product details..."
            />
          </div>
        </div>
      </section>

      <!-- Error State -->
      <section v-else-if="error" class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <ErrorDisplay
              title="Product Not Found"
              message="Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be incorrect."
            />
          </div>
        </div>
      </section>

      <!-- Product Content -->
      <section v-else class="bg-white">
        <!-- Product Detail Section -->
        <ProductDetailSection
          :product="product"
          :productImages="productImages"
        />

        <!-- Related Products Section -->
        <RelatedProductsSection
          :relatedProducts="relatedProducts"
          :relatedLoading="relatedLoading"
        />
      </section>

      <!-- Scroll to Top Button -->
      <ScrollToTopButton />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Smooth transitions */
section {
  transition: all 0.3s ease-in-out;
}

/* Custom hover effects */
img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease-in-out;
}
</style>
