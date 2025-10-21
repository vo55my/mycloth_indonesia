<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/utils/supabase";
import { Icon } from "@iconify/vue";
import LoadingSkeleton from "@/components/common/LoadingSkeleton.vue";
import ErrorState from "@/components/common/ErrorState.vue";
import EmptyState from "@/components/common/EmptyState.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import ButtonCTA from "@/components/button/ButtonCTA.vue";
import SectionHeader from "@/components/section/home/SectionHeader.vue";
import StatsSection from "@/components/section/home/StatsSection.vue";

const katalogs = ref([]);
const catalogLoading = ref(true);
const errorMessage = ref("");
const activeFilter = ref("new");

const filters = [
  { id: "new", name: "New Arrivals", icon: "mdi:new-box" },
  { id: "popular", name: "Popular", icon: "mdi:fire" },
  { id: "limited", name: "Limited Edition", icon: "mdi:star" },
];

onMounted(() => {
  fetchKatalogs();
});

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
      <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="katalog in filteredKatalogs"
          :key="katalog.id"
          :katalog="katalog"
          class="product-card"
        />
      </div>

      <!-- Empty State -->
      <EmptyState
        v-if="!catalogLoading && !errorMessage && filteredKatalogs.length === 0"
        @reset-filter="activeFilter = 'new'"
      />

      <!-- Bottom Section -->
      <div class="mt-8 space-y-8">
        <!-- Stats Section -->
        <StatsSection />

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
</template>
