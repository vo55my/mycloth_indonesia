<script setup>
import { ref, onMounted } from "vue";
import SectionHeader from "@/components/section/home/SectionHeader.vue";
import { Icon } from "@iconify/vue";

const storeLoading = ref(true);
const stores = [
  {
    name: "Lazada",
    src: "/images/Toko/Lazada.png",
    link: "https://www.lazada.co.id/",
    description: "Free shipping with minimum purchase",
    color: "hover:border-red-500",
  },
  {
    name: "Shopee",
    src: "/images/Toko/Shopee.png",
    link: "https://shopee.co.id/",
    description: "Special flash sales every day",
    color: "hover:border-orange-500",
  },
  {
    name: "Tokopedia",
    src: "/images/Toko/Tokopedia.png",
    link: "https://www.tokopedia.com/",
    description: "Official store with full collection",
    color: "hover:border-green-500",
  },
];

onMounted(() => {
  setTimeout(() => {
    storeLoading.value = false;
  }, 1000);
});
</script>

<template>
  <section id="store" class="bg-[#FBF9FA] py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        title="Available In"
        description="Shop our exclusive collections from your favorite online marketplaces. Each platform offers special promotions and benefits for our customers."
      />

      <!-- Loading State -->
      <div v-if="storeLoading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          class="group bg-white rounded-2xl p-8 border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-[#FD0054] store-card"
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
                <Icon icon="mdi:truck-fast" class="w-4 h-4 text-[#FD0054]" />
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
</template>
