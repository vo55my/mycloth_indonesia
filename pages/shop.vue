<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/utils/supabase";
import { Icon } from "@iconify/vue";
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import EditionDropdown from "~/components/shop/EditionDropdown.vue";
import SearchBar from "~/components/shop/SearchBar.vue";
import ProductCard from "@/components/ProductCard.vue";

const breadcrumbItems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
];

const katalogs = ref([]);
const searchQuery = ref("");
const selectedEditions = ref([]);
const editions = ref([]);
const isLoading = ref(true);

async function fetchKatalogs() {
  try {
    const { data, error } = await supabase.from("katalogs").select("*");
    if (error) throw error;

    katalogs.value = data || [];
    editions.value = [...new Set(data.map((p) => p.edition).filter(Boolean))];
  } catch (err) {
    console.error("Error fetching katalogs:", err.message);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchKatalogs);

const filteredKatalogs = computed(() =>
  katalogs.value.filter((katalog) => {
    const matchesName =
      katalog?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ??
      false;

    const matchesEdition =
      selectedEditions.value.length === 0 ||
      (katalog?.edition && selectedEditions.value.includes(katalog.edition));

    const hasImage = Boolean(katalog?.image_2);

    return matchesName && matchesEdition && hasImage;
  })
);
</script>

<template>
  <div class="min-h-screen bg-[#FBF9FA]">
    <Navbar />

    <!-- Main Content -->
    <main class="pt-24 pb-16">
      <!-- Breadcrumb Section -->
      <section class="border-b border-[#2B2024]/10 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb :items="breadcrumbItems" />
        </div>
      </section>

      <!-- Filter & Search Section -->
      <section class="bg-white border-b border-[#2B2024]/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div
            class="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <!-- Search Bar -->
            <div class="w-full lg:w-auto lg:flex-1 max-w-md">
              <SearchBar v-model:searchQuery="searchQuery" />
            </div>

            <!-- Results Count -->
            <div class="text-center lg:text-left">
              <p class="text-[#2B2024] font-medium">
                Showing
                <span class="text-[#FD0054] font-bold">{{
                  filteredKatalogs.length
                }}</span>
                {{ filteredKatalogs.length === 1 ? "result" : "results" }}
              </p>
            </div>

            <!-- Edition Dropdown -->
            <div class="w-full lg:w-auto">
              <EditionDropdown
                :editions="editions"
                v-model:selectedEditions="selectedEditions"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Products Grid Section -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Loading State -->
          <div v-if="isLoading" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="n in 8"
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

          <!-- Empty State -->
          <div
            v-else-if="filteredKatalogs.length === 0"
            class="text-center py-16"
          >
            <div
              class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 max-w-md mx-auto"
            >
              <div
                class="w-16 h-16 bg-[#2B2024]/10 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon
                  icon="mdi:package-variant"
                  class="w-16 h-16 text-[#2B2024]/40 mx-auto mb-4"
                />
              </div>
              <h3 class="text-xl font-bold text-[#2B2024] mb-2">
                No Products Found
              </h3>
              <p class="text-[#2B2024]/70 mb-6">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  @click="
                    searchQuery = '';
                    selectedEditions = [];
                  "
                  class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200"
                >
                  Clear Filters
                </button>
                <a
                  href="/"
                  class="border border-[#2B2024] text-[#2B2024] px-6 py-2 rounded-lg font-medium hover:bg-[#2B2024] hover:text-[#FBF9FA] transition-colors duration-200"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              v-for="katalog in filteredKatalogs"
              :key="katalog.id"
              :katalog="katalog"
            />
          </div>

          <!-- Load More Section (if needed) -->
          <div v-if="filteredKatalogs.length > 0" class="text-center mt-12">
            <p class="text-[#2B2024]/60 mb-4">
              Showing all {{ filteredKatalogs.length }} products
            </p>
            <a
              href="#top"
              class="inline-flex items-center space-x-2 text-[#FD0054] hover:text-[#A80038] font-semibold transition-colors duration-200"
            >
              <span>Back to Top</span>
              <Icon icon="mdi:arrow-up" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-grid {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Smooth scrolling for back to top */
html {
  scroll-behavior: smooth;
}
</style>
