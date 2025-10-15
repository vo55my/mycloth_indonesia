<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { supabase } from "~/utils/supabase";
import { Icon } from "@iconify/vue";
import Navbar from "~/components/common/Navbar.vue";
import Footer from "~/components/common/Footer.vue";
import Breadcrumb from "~/components/common/Breadcrumb.vue";
import ProductCard from "~/components/ProductCard.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import ErrorDisplay from "~/components/common/ErrorDisplay.vue";
import ProductImageGallery from "~/components/product/ProductImageGallery.vue";
import ProductInfo from "~/components/ProductInfo.vue";
import ButtonCTA from "~/components/button/ButtonCTA.vue";

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
      <!-- Breadcrumb Section -->
      <section class="border-b border-[#2B2024]/10 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb :items="breadcrumbItems" />
        </div>
      </section>

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
        <!-- Product Section -->
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

        <!-- Related Products Section -->
        <section class="bg-[#FBF9FA] py-16 md:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
              <h2 class="text-4xl md:text-5xl font-bold text-[#2B2024] mb-4">
                You Might Also Like
              </h2>
              <div
                class="w-24 h-1 bg-[#FD0054] mx-auto mb-6 rounded-full"
              ></div>
              <p class="text-lg text-[#2B2024]/80 max-w-2xl mx-auto">
                Discover more amazing products from our collection that match
                your style
              </p>
            </div>

            <!-- Loading State -->
            <div
              v-if="relatedLoading"
              class="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div
                v-for="n in 4"
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

            <!-- Products Grid -->
            <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard
                v-for="relatedProduct in relatedProducts"
                :key="relatedProduct.id"
                :katalog="relatedProduct"
              />
            </div>

            <!-- Empty State -->
            <div
              v-if="!relatedLoading && relatedProducts.length === 0"
              class="text-center py-16"
            >
              <div
                class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
              >
                <Icon
                  icon="mdi:package-variant-remove"
                  class="w-16 h-16 text-[#2B2024]/40 mx-auto mb-4"
                />
                <h3 class="text-xl font-bold text-[#2B2024] mb-2">
                  No Related Products
                </h3>
                <p class="text-[#2B2024]/70 mb-6">
                  We couldn't find any related products at the moment.
                </p>
                <a
                  href="/shop"
                  class="inline-flex items-center space-x-2 bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
                >
                  <Icon icon="mdi:shopping" class="w-4 h-4" />
                  <span>Browse All Products</span>
                </a>
              </div>
            </div>

            <!-- Bottom CTA -->
            <ButtonCTA description="View All Collections" />
          </div>
        </section>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Custom animations for product cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

.product-card:nth-child(1) {
  animation-delay: 0.1s;
}
.product-card:nth-child(2) {
  animation-delay: 0.2s;
}
.product-card:nth-child(3) {
  animation-delay: 0.3s;
}
.product-card:nth-child(4) {
  animation-delay: 0.4s;
}

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
