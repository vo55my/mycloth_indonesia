<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { supabase } from "../utils/supabase";

const editions = ref([]);
const isLoading = ref(true);
const hoveredEdition = ref(null);

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
    isLoading.value = false;
  }
}

const handleHover = (index) => {
  hoveredEdition.value = index;
};

const handleLeave = () => {
  hoveredEdition.value = null;
};

onMounted(() => {
  fetchEditions();
});
</script>

<template>
  <section id="edition" class="bg-[#FBF9FA] py-20 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-[#2B2024] mb-4">
          Our Editions
        </h2>
        <div class="w-24 h-1 bg-[#FD0054] mx-auto mb-6 rounded-full"></div>
        <p class="text-lg text-[#2B2024]/80 max-w-3xl mx-auto">
          Discover our edition collections featuring unique designs and premium
          quality. Each piece tells a story of craftsmanship and style.
        </p>
      </div>

      <!-- Editions Grid -->
      <div
        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <!-- Loading State -->
        <template v-if="isLoading">
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
            @mouseleave="handleLeave"
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

              <!-- Badge -->
              <!-- <div
                class="absolute top-4 left-4 bg-[#FD0054] text-[#FBF9FA] px-3 py-1 rounded-full text-sm font-semibold"
              >
                Limited
              </div> -->
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
      <div class="text-center mt-12">
        <a
          href="/shop"
          class="inline-flex items-center space-x-3 bg-[#2B2024] text-[#FBF9FA] px-8 py-4 rounded-lg font-semibold hover:bg-[#FD0054] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Icon icon="mdi:shopping" class="w-5 h-5" />
          <span>Explore All Editions</span>
          <Icon icon="mdi:arrow-right" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
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
</style>
