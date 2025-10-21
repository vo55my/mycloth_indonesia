<script setup>
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import Carousel from "@/components/section/home/Carousel.vue";
import StoreSection from "@/components/section/home/StoreSection.vue";
import EditionSection from "@/components/section/home/EditionSection.vue";
import CatalogSection from "@/components/section/home/CatalogSection.vue";
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
