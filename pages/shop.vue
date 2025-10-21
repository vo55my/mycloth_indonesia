<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/utils/supabase";
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import ShopHeaderSection from "@/components/section/shop/ShopHeaderSection.vue";
import ShopProductsSection from "@/components/section/shop/ShopProductsSection.vue";

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

const clearFilters = () => {
  searchQuery.value = "";
  selectedEditions.value = [];
};

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
      <!-- Header & Filter Section -->
      <ShopHeaderSection
        :breadcrumbItems="breadcrumbItems"
        :searchQuery="searchQuery"
        :selectedEditions="selectedEditions"
        :editions="editions"
        :filteredKatalogs="filteredKatalogs"
        @update:searchQuery="searchQuery = $event"
        @update:selectedEditions="selectedEditions = $event"
      />

      <!-- Products Grid Section -->
      <ShopProductsSection
        :isLoading="isLoading"
        :filteredKatalogs="filteredKatalogs"
        :searchQuery="searchQuery"
        :selectedEditions="selectedEditions"
        @clear-filters="clearFilters"
      />
    </main>

    <Footer />
  </div>
</template>
