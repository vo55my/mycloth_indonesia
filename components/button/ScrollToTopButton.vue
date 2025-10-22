<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 z-50 bg-[#FD0054] text-[#FBF9FA] p-3 rounded-full shadow-lg hover:bg-[#A80038] transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FD0054] focus:ring-opacity-50"
    aria-label="Back to top"
  >
    <Icon icon="mdi:arrow-up" class="w-6 h-6" />
  </button>
</template>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
