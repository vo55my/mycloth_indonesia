<script setup>
import Navbar from "../components/Navbar.vue";
import Carousel from "../components/Carousel.vue";
import StoreSection from "../components/StoreSection.vue";
import EditionSection from "../components/EditionSection.vue";
import CatalogSection from "../components/CatalogSection.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div>
    <Navbar />
    <main>
      <Carousel />
      <StoreSection />
      <EditionSection />
      <CatalogSection />
    </main>
    <Footer />
  </div>
</template>
