<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { supabase } from "../utils/supabase";
import Navbar from "../components/Navbar.vue";
import Carousel from "../components/Carousel.vue";
import Footer from "../components/Footer.vue";
import ProductCard from "../components/ProductCard.vue";
import SectionHeader from "../components/SectionHeader.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import ErrorState from "../components/ErrorState.vue";
import EmptyState from "../components/EmptyState.vue";
import ButtonCTA from "../components/ButtonCTA.vue";

// Store Section Data
const storeLoading = ref(true);
const stores = [
  {
    name: "Lazada",
    src: "/images/Toko/Lazada.png",
    link: "https://www.lazada.co.id/",
    icon: "arcticons:lazada",
    description: "Free shipping with minimum purchase",
    color: "hover:border-red-500",
  },
  {
    name: "Shopee",
    src: "/images/Toko/Shopee.png",
    link: "https://shopee.co.id/",
    icon: "arcticons:shopee",
    description: "Special flash sales every day",
    color: "hover:border-orange-500",
  },
  {
    name: "Tokopedia",
    src: "/images/Toko/Tokopedia.png",
    link: "https://www.tokopedia.com/",
    icon: "arcticons:tokopedia",
    description: "Official store with full collection",
    color: "hover:border-green-500",
  },
];

// Edition Section Data
const editions = ref([]);
const editionLoading = ref(true);
const hoveredEdition = ref(null);

// Catalog Section Data
const katalogs = ref([]);
const catalogLoading = ref(true);
const errorMessage = ref("");
const activeFilter = ref("new");

const filters = [
  { id: "new", name: "New Arrivals", icon: "mdi:new-box" },
  { id: "popular", name: "Popular", icon: "mdi:fire" },
  { id: "limited", name: "Limited Edition", icon: "mdi:star" },
];

// Store Functions
onMounted(() => {
  setTimeout(() => {
    storeLoading.value = false;
  }, 1000);
  fetchEditions();
  fetchKatalogs();
});

// Edition Functions
async function fetchEditions() {
  try {
    const { data } = await supabase.from("editions").select("*");
    if (data) {
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      editions.value = data.slice(0, 4);
    } else {
      editions.value = [];
    }
  } catch (error) {
    console.error("Error fetching editions:", error);
    editions.value = [];
  } finally {
    editionLoading.value = false;
  }
}

const handleHover = (index) => {
  hoveredEdition.value = index;
};

// Catalog Functions
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
    catalogLoading.value = false;
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
</script>

<template>
  <div>
    <Navbar />
    <main>
      <Carousel />

      <!-- Store Section -->
      <section id="store" class="bg-[#FBF9FA] py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Available In"
            description="Shop our exclusive collections from your favorite online marketplaces. Each platform offers special promotions and benefits for our customers."
          />

          <!-- Loading State -->
          <div
            v-if="storeLoading"
            class="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div
              v-for="n in stores.length"
              :key="n"
              class="bg-white rounded-2xl p-8 border border-[#2B2024]/10 animate-pulse"
            >
              <div class="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-6"></div>
              <div class="h-4 bg-gray-300 rounded mb-3 w-3/4 mx-auto"></div>
              <div class="h-3 bg-gray-200 rounded mb-2 w-full"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>

          <!-- Stores Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              v-for="store in stores"
              :key="store.name"
              :href="store.link"
              target="_blank"
              :aria-label="`Visit ${store.name} store`"
              class="group bg-white rounded-2xl p-8 border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-[#FD0054]"
            >
              <!-- Store Logo -->
              <div class="flex justify-center mb-6">
                <div class="relative">
                  <img
                    class="h-20 w-auto transition-transform duration-300 group-hover:scale-110"
                    :src="store.src"
                    :alt="store.name"
                    loading="lazy"
                  />
                  <div
                    class="absolute -top-2 -right-2 w-6 h-6 bg-[#FD0054] rounded-full flex items-center justify-center"
                  >
                    <Icon icon="mdi:check" class="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <!-- Store Info -->
              <div class="text-center">
                <h3
                  class="text-xl font-bold text-[#2B2024] mb-3 group-hover:text-[#FD0054] transition-colors"
                >
                  {{ store.name }}
                </h3>
                <p class="text-[#2B2024]/70 mb-4 text-sm leading-relaxed">
                  {{ store.description }}
                </p>

                <!-- Features -->
                <div
                  class="flex justify-center items-center space-x-4 text-sm text-[#2B2024]/60 mb-6"
                >
                  <div class="flex items-center space-x-1">
                    <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
                    <span>4.9/5</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Icon
                      icon="mdi:truck-fast"
                      class="w-4 h-4 text-[#FD0054]"
                    />
                    <span>Fast Delivery</span>
                  </div>
                </div>

                <!-- CTA Button -->
                <div
                  class="flex items-center justify-center space-x-2 text-[#FD0054] font-semibold group-hover:text-[#A80038] transition-colors"
                >
                  <span>Visit Store</span>
                  <Icon
                    icon="mdi:arrow-right"
                    class="w-4 h-4 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <!-- Hover Effect Background -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-[#FD0054]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10"
              ></div>
            </a>
          </div>
        </div>
      </section>

      <!-- Edition Section -->
      <section id="edition" class="bg-[#FBF9FA] py-20 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Editions"
            description="Discover our edition collections featuring unique designs and premium quality. Each piece tells a story of craftsmanship and style."
          />

          <!-- Editions Grid -->
          <div
            class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            <!-- Loading State -->
            <template v-if="editionLoading">
              <div
                v-for="i in 4"
                :key="`skel-${i}`"
                class="bg-white rounded-2xl overflow-hidden border border-[#2B2024]/10 animate-pulse"
              >
                <div class="aspect-[3/4] bg-gray-300"></div>
                <div class="p-4">
                  <div class="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </template>

            <!-- Editions Content -->
            <template v-else>
              <!-- Edition Cards -->
              <div
                v-for="(edition, index) in editions"
                :key="edition.id"
                class="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#FD0054] transition-all duration-500 hover:shadow-xl"
                @mouseenter="handleHover(index)"
                @mouseleave="hoveredEdition = null"
              >
                <!-- Image Container -->
                <div class="relative overflow-hidden">
                  <img
                    class="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    :src="edition.image"
                    :alt="edition.name"
                    loading="lazy"
                  />

                  <!-- Overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#2B2024]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                </div>

                <!-- Card Footer -->
                <div class="p-3">
                  <h3
                    class="text-lg font-semibold text-[#2B2024] mb-2 group-hover:text-[#FD0054] transition-colors"
                  >
                    {{ edition.name }}
                  </h3>
                  <p class="text-[#2B2024]/70 text-sm line-clamp-2">
                    {{
                      edition.description ||
                      "Exclusive design available for a limited time"
                    }}
                  </p>
                </div>
              </div>
            </template>
          </div>

          <!-- Bottom CTA -->
          <ButtonCTA description="Explore All Editions" />
        </div>
      </section>

      <!-- Catalog Section -->
      <section id="catalog" class="bg-[#FBF9FA] py-20 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Catalog"
            description="Explore our carefully curated collection of premium t-shirts. Each piece is designed with attention to detail and crafted for comfort."
          />

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
            v-if="catalogLoading"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <LoadingSkeleton v-for="i in 8" :key="`skel-${i}`" />
          </div>

          <!-- Error State -->
          <ErrorState
            v-else-if="errorMessage"
            :message="errorMessage"
            @retry="fetchKatalogs"
          />

          <!-- Products Grid -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <ProductCard
              v-for="katalog in filteredKatalogs"
              :key="katalog.id"
              :katalog="katalog"
            />
          </div>

          <!-- Empty State -->
          <EmptyState
            v-if="
              !catalogLoading && !errorMessage && filteredKatalogs.length === 0
            "
            @reset-filter="activeFilter = 'new'"
          />

          <!-- Bottom Section -->
          <div class="mt-8 space-y-8">
            <!-- Stats Section -->
            <div class="bg-white rounded-2xl p-8 border border-[#2B2024]/10">
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="text-center">
                  <div class="flex items-center justify-center space-x-2 mb-3">
                    <Icon
                      icon="mdi:tshirt-crew"
                      class="w-6 h-6 text-[#FD0054]"
                    />
                    <div class="text-2xl font-bold text-[#2B2024]">50+</div>
                  </div>
                  <div class="text-[#2B2024]/70 text-sm font-medium">
                    Unique Designs
                  </div>
                </div>
                <div class="text-center">
                  <div class="flex items-center justify-center space-x-2 mb-3">
                    <Icon
                      icon="mdi:quality-high"
                      class="w-6 h-6 text-[#FD0054]"
                    />
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
              <div class="p-2 text-[#FBF9FA] text">
                <div class="max-w-3xl mx-auto text-[#2B2024]">
                  <h3 class="text-2xl md:text-3xl font-bold mb-4">
                    Ready to Find Your Perfect Style?
                  </h3>
                  <p class="mb-6 text-lg">
                    Explore our complete collection with exclusive designs and
                    limited editions.
                  </p>

                  <!-- Bottom CTA -->
                  <ButtonCTA description="View Full Catalog" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

.edition-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

.edition-card:nth-child(1) {
  animation-delay: 0.1s;
}
.edition-card:nth-child(2) {
  animation-delay: 0.2s;
}
.edition-card:nth-child(3) {
  animation-delay: 0.3s;
}
.edition-card:nth-child(4) {
  animation-delay: 0.4s;
}

.store-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

.store-card:nth-child(1) {
  animation-delay: 0.1s;
}
.store-card:nth-child(2) {
  animation-delay: 0.2s;
}
.store-card:nth-child(3) {
  animation-delay: 0.3s;
}
</style>
