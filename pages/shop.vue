<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../utils/supabase";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import EditionDropdown from "../components/EditionDropdown.vue";
import SearchBar from "../components/SearchBar.vue";
import ProductCard from "../components/ProductCard.vue";

const breadcrumbItems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
];

const katalogs = ref([]);
const searchQuery = ref("");
const selectedEditions = ref([]);
const editions = ref([]);

async function fetchKatalogs() {
  const { data } = await supabase.from("katalogs").select("*");
  katalogs.value = data || [];
  const uniqueEditions = [
    ...new Set(data.map((p) => p.edition).filter(Boolean)),
  ];
  editions.value = uniqueEditions;
}

onMounted(() => {
  fetchKatalogs();
});

const filteredKatalogs = computed(() => {
  return katalogs.value.filter((katalog) => {
    const matchesName =
      katalog.name &&
      katalog.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesEdition =
      selectedEditions.value.length === 0 ||
      (katalog.edition && selectedEditions.value.includes(katalog.edition));
    const hasImage = katalog.image_2;
    return matchesName && matchesEdition && hasImage;
  });
});
</script>

<template>
  <div>
    <Navbar />
    <section class="bg-white py-8 mt-10 antialiased dark:bg-gray-900 md:py-16">
      <div class="container mx-auto grid-cols-1 p-4">
        <Breadcrumb :items="breadcrumbItems" />
      </div>
      <div
        class="container mx-auto flex flex-row justify-center sm:justify-center md:justify-between lg:justify-between items-center text-gray-500 dark:text-gray-400 px-4"
      >
        <SearchBar v-model:searchQuery="searchQuery" />
        <p class="text-center flex-grow mx-4">
          Showing {{ filteredKatalogs.length }} results
        </p>
        <EditionDropdown
          :editions="editions"
          v-model:selectedEditions="selectedEditions"
        />
      </div>
      <div
        class="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 px-4"
      >
        <ProductCard
          v-for="katalog in filteredKatalogs"
          :key="katalog.id"
          :katalog="katalog"
        />
      </div>
    </section>
    <Footer />
  </div>
</template>
