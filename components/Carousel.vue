<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";

const currentSlide = ref(0);
const autoPlay = ref(true);
const interval = ref(null);

const slides = [
  {
    id: 1,
    image: "/images/Slide/Black.png",
    alt: "Black Collection",
    title: "Black Edition",
    subtitle: "Elegant & Powerful",
    description: "Discover our premium black collection with exclusive designs",
  },
  {
    id: 2,
    image: "/images/Slide/White.png",
    alt: "White Collection",
    title: "White Series",
    subtitle: "Pure & Minimalist",
    description: "Clean and sophisticated designs for everyday style",
  },
  {
    id: 3,
    image: "/images/Slide/Parallax.png",
    alt: "Parallax Collection",
    title: "Parallax Effect",
    subtitle: "Dynamic & Modern",
    description: "Experience our innovative parallax design series",
  },
];

const goToSlide = (index) => {
  currentSlide.value = index;
  resetAutoPlay();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
  resetAutoPlay();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  resetAutoPlay();
};

const resetAutoPlay = () => {
  if (autoPlay.value) {
    clearInterval(interval.value);
    startAutoPlay();
  }
};

const startAutoPlay = () => {
  if (autoPlay.value) {
    interval.value = setInterval(() => {
      nextSlide();
    }, 5000);
  }
};

const toggleAutoPlay = () => {
  autoPlay.value = !autoPlay.value;
  if (autoPlay.value) {
    startAutoPlay();
  } else {
    clearInterval(interval.value);
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div class="relative w-full overflow-hidden group">
    <!-- Carousel Container -->
    <div class="relative h-screen overflow-hidden">
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
        :class="{
          'opacity-100 z-20': currentSlide === index,
          'opacity-0 z-10': currentSlide !== index,
        }"
      >
        <!-- Background Image -->
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="w-full h-full object-cover"
          loading="lazy"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-[#2B2024]/40"></div>

        <!-- Content -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-[#FBF9FA] px-4 max-w-4xl mx-auto">
            <h2 class="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
              {{ slide.title }}
            </h2>
            <p
              class="text-xl md:text-2xl mb-6 text-[#FD0054] font-semibold animate-fade-in-up delay-200"
            >
              {{ slide.subtitle }}
            </p>
            <p
              class="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up delay-400"
            >
              {{ slide.description }}
            </p>
            <div class="animate-fade-in-up delay-600">
              <a
                href="/shop"
                class="inline-flex items-center space-x-2 bg-[#FD0054] text-[#FBF9FA] px-8 py-4 rounded-lg font-semibold hover:bg-[#A80038] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Shop Collection</span>
                <Icon icon="mdi:arrow-right" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div
      class="absolute z-30 flex -translate-x-1/2 bottom-8 left-1/2 space-x-3"
    >
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        type="button"
        class="w-3 h-3 rounded-full transition-all duration-300 border border-[#FBF9FA]"
        :class="{
          'bg-[#FD0054] border-[#FD0054]': currentSlide === index,
          'bg-transparent hover:bg-[#FBF9FA]/50': currentSlide !== index,
        }"
        :aria-current="currentSlide === index"
        :aria-label="`Go to slide ${index + 1}`"
        @click="goToSlide(index)"
      ></button>
    </div>

    <!-- Navigation Buttons -->
    <button
      type="button"
      class="absolute top-1/2 left-4 z-30 flex items-center justify-center w-12 h-12 -translate-y-1/2 bg-[#2B2024]/50 hover:bg-[#2B2024]/70 text-[#FBF9FA] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
      @click="prevSlide"
    >
      <Icon icon="mdi:chevron-left" class="w-6 h-6" />
      <span class="sr-only">Previous slide</span>
    </button>

    <button
      type="button"
      class="absolute top-1/2 right-4 z-30 flex items-center justify-center w-12 h-12 -translate-y-1/2 bg-[#2B2024]/50 hover:bg-[#2B2024]/70 text-[#FBF9FA] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
      @click="nextSlide"
    >
      <Icon icon="mdi:chevron-right" class="w-6 h-6" />
      <span class="sr-only">Next slide</span>
    </button>

    <!-- Auto Play Toggle -->
    <button
      type="button"
      class="absolute top-4 right-4 z-30 flex items-center justify-center w-10 h-10 bg-[#2B2024]/50 hover:bg-[#2B2024]/70 text-[#FBF9FA] rounded-lg transition-all duration-300"
      @click="toggleAutoPlay"
      :aria-label="autoPlay ? 'Pause carousel' : 'Play carousel'"
    >
      <Icon :icon="autoPlay ? 'mdi:pause' : 'mdi:play'" class="w-5 h-5" />
    </button>

    <!-- Slide Counter -->
    <div
      class="absolute top-4 left-4 z-30 bg-[#2B2024]/50 text-[#FBF9FA] px-3 py-1 rounded-lg text-sm"
    >
      <span class="font-medium">{{ currentSlide + 1 }}</span>
      <span class="mx-1">/</span>
      <span>{{ slides.length }}</span>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-600 {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions for carousel */
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.7s ease-in-out;
}

.carousel-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.carousel-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
