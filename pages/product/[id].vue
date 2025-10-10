<script setup>
import { useRoute } from "vue-router";
import { supabase } from "~/utils/supabase";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import Breadcrumb from "~/components/Breadcrumb.vue";
import ProductSection from "~/components/ProductSection.vue";
import RelatedSection from "~/components/RelatedSection.vue";

const route = useRoute();

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

const breadcrumbItems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  {
    name: product.value?.name ?? "Product",
    link: `/product/${route.params.id}`,
  },
];
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
            <div class="inline-flex flex-col items-center space-y-4">
              <!-- Loading Spinner -->
              <div
                class="w-12 h-12 border-4 border-[#FD0054] border-t-transparent rounded-full animate-spin"
              ></div>
              <div>
                <h3 class="text-xl font-semibold text-[#2B2024] mb-2">
                  Loading Product
                </h3>
                <p class="text-[#2B2024]/70">
                  Please wait while we fetch the product details...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Error State -->
      <section v-else-if="error" class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div
              class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
            >
              <!-- Error Icon -->
              <div
                class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon
                  icon="mdi:alert-circle"
                  class="w-16 h-16 text-[#FD0054] mx-auto mb-4"
                />
              </div>

              <h3 class="text-xl font-bold text-[#2B2024] mb-2">
                Product Not Found
              </h3>
              <p class="text-[#2B2024]/70 mb-6">
                Sorry, we couldn't find the product you're looking for. It may
                have been removed or the link might be incorrect.
              </p>

              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/shop"
                  class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
                >
                  Browse Products
                </a>
                <a
                  href="/"
                  class="border border-[#2B2024] text-[#2B2024] px-6 py-2 rounded-lg font-medium hover:bg-[#2B2024] hover:text-[#FBF9FA] transition-colors duration-200"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Content -->
      <section v-else class="bg-white">
        <ProductSection :product="product" />
        <RelatedSection :product="product" />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Custom loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions */
section {
  transition: all 0.3s ease-in-out;
}
</style>
