<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/utils/supabase";
import ButtonCTA from "@/components/button/ButtonCTA.vue";
import SectionHeader from "@/components/section/home/SectionHeader.vue";

const editions = ref([]);
const editionLoading = ref(true);
const hoveredEdition = ref(null);

onMounted(() => {
  fetchEditions();
});

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
</script>

<template>
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
            class="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#FD0054] transition-all duration-500 hover:shadow-xl edition-card"
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
</template>
