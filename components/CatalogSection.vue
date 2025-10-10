<script setup>
import { ref, onMounted, computed } from "vue";
import ProductCard from "./ProductCard.vue";
import { Icon } from "@iconify/vue";
import { supabase } from "../utils/supabase";

const katalogs = ref([]);
const loading = ref(true);
const errorMessage = ref("");
const activeFilter = ref("new"); // Default to "new" filter

const filters = [
  { id: "new", name: "New Arrivals", icon: "mdi:new-box" },
  { id: "popular", name: "Popular", icon: "mdi:fire" },
  { id: "limited", name: "Limited Edition", icon: "mdi:star" },
];

async function fetchKatalogs() {
  try {
    const { data, error } = await supabase
      .from("katalogs")
      .select(
        "id, name, edition, price, image_2, is_new, is_popular, is_limited"
      )
      .limit(12);

    if (error) throw error;

    if (data && data.length) {
      katalogs.value = data;
    } else {
      katalogs.value = [];
    }
  } catch (err) {
    errorMessage.value = "Failed to load catalog.";
    console.error(err.message);
  } finally {
    loading.value = false;
  }
}

const filteredKatalogs = computed(() => {
  if (activeFilter.value === "new")
    return katalogs.value.filter((item) => item.is_new);
  if (activeFilter.value === "popular")
    return katalogs.value.filter((item) => item.is_popular);
  if (activeFilter.value === "limited")
    return katalogs.value.filter((item) => item.is_limited);
  return katalogs.value;
});

onMounted(() => {
  fetchKatalogs();
});
</script>

<template>
  <section id="catalog" class="bg-[#FBF9FA] py-20 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-8">
        <h2 class="text-4xl md:text-5xl font-bold text-[#2B2024] mb-4">
          Our Catalog
        </h2>
        <div class="w-24 h-1 bg-[#FD0054] mx-auto mb-6 rounded-full"></div>
        <p class="text-lg text-[#2B2024]/80 max-w-3xl mx-auto">
          Explore our carefully curated collection of premium t-shirts. Each
          piece is designed with attention to detail and crafted for comfort.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex justify-center mb-8">
        <div
          class="bg-white rounded-2xl p-2 border border-[#2B2024]/10 shadow-sm"
        >
          <div class="flex flex-wrap justify-center gap-2">
            <button
              v-for="filter in filters"
              :key="filter.id"
              @click="activeFilter = filter.id"
              :class="[
                'flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
                activeFilter === filter.id
                  ? 'bg-[#FD0054] text-[#FBF9FA] shadow-md'
                  : 'text-[#2B2024] hover:bg-[#2B2024]/5',
              ]"
            >
              <Icon :icon="filter.icon" class="w-4 h-4" />
              <span class="text-sm">{{ filter.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="i in 8"
          :key="`skel-${i}`"
          class="bg-white rounded-2xl overflow-hidden border border-[#2B2024]/10 animate-pulse"
        >
          <div class="aspect-square bg-gray-300"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded mb-2 w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div class="h-6 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="text-center py-16">
        <div
          class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
        >
          <Icon
            icon="mdi:alert-circle"
            class="w-16 h-16 text-[#FD0054] mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-[#2B2024] mb-2">Oops!</h3>
          <p class="text-[#2B2024]/70 mb-6">{{ errorMessage }}</p>
          <button
            @click="fetchKatalogs"
            class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="katalog in filteredKatalogs"
          :key="katalog.id"
          :katalog="katalog"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && !errorMessage && filteredKatalogs.length === 0"
        class="text-center py-16"
      >
        <div
          class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
        >
          <Icon
            icon="mdi:package-variant"
            class="w-16 h-16 text-[#2B2024]/40 mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-[#2B2024] mb-2">
            No Products Found
          </h3>
          <p class="text-[#2B2024]/70 mb-6">
            We couldn't find any products matching your selection. Try a
            different filter.
          </p>
          <button
            @click="activeFilter = 'new'"
            class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
          >
            View New Arrivals
          </button>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 space-y-8">
        <!-- Stats Section -->
        <div class="bg-white rounded-2xl p-8 border border-[#2B2024]/10">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="flex items-center justify-center space-x-2 mb-3">
                <Icon icon="mdi:tshirt-crew" class="w-6 h-6 text-[#FD0054]" />
                <div class="text-2xl font-bold text-[#2B2024]">50+</div>
              </div>
              <div class="text-[#2B2024]/70 text-sm font-medium">
                Unique Designs
              </div>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center space-x-2 mb-3">
                <Icon icon="mdi:quality-high" class="w-6 h-6 text-[#FD0054]" />
                <div class="text-2xl font-bold text-[#2B2024]">100%</div>
              </div>
              <div class="text-[#2B2024]/70 text-sm font-medium">
                Premium Quality
              </div>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center space-x-2 mb-3">
                <Icon icon="mdi:star" class="w-6 h-6 text-[#FD0054]" />
                <div class="text-2xl font-bold text-[#2B2024]">4.8</div>
              </div>
              <div class="text-[#2B2024]/70 text-sm font-medium">
                Customer Rating
              </div>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center space-x-2 mb-3">
                <Icon icon="mdi:headset" class="w-6 h-6 text-[#FD0054]" />
                <div class="text-2xl font-bold text-[#2B2024]">24/7</div>
              </div>
              <div class="text-[#2B2024]/70 text-sm font-medium">
                Customer Support
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center text-[#2B2024]">
          <div
            class="p-2 text-[#FBF9FA] text"
          >
            <div class="max-w-3xl mx-auto text-[#2B2024]">
              <h3 class="text-2xl md:text-3xl font-bold mb-4">
                Ready to Find Your Perfect Style?
              </h3>
              <p class="mb-6 text-lg">
                Explore our complete collection with exclusive designs and
                limited editions.
              </p>
              <div
                class="flex flex-wrap sm:flex-row gap-4 justify-center items-center"
              >
                <a
                  href="/shop"
                  class="inline-flex items-center space-x-2 bg-[#FBF9FA] text-[#2B2024] px-6 py-3 rounded-lg font-semibold hover:bg-[#2B2024] hover:text-[#FBF9FA] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Icon icon="mdi:shopping" class="w-5 h-5" />
                  <span>View Full Catalog</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom animations */
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
.product-card:nth-child(5) {
  animation-delay: 0.5s;
}
.product-card:nth-child(6) {
  animation-delay: 0.6s;
}
.product-card:nth-child(7) {
  animation-delay: 0.7s;
}
.product-card:nth-child(8) {
  animation-delay: 0.8s;
}
</style>
