<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  isOpen: Boolean,
  navLinks: Array,
  storeLinks: Array,
});

const emit = defineEmits(["close"]);

const handleSmoothScroll = (event, targetId) => {
  event.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
    emit("close");
  }
};

const closeSidebar = () => {
  emit("close");
};
</script>

<template>
  <!-- Mobile Sidebar Overlay -->
  <div
    v-show="isOpen"
    class="md:hidden fixed inset-0 z-40 transition-opacity duration-300"
    @click="closeSidebar"
  ></div>

  <!-- Mobile Sidebar -->
  <div
    class="md:hidden fixed top-0 right-0 h-full w-80 bg-[#FBF9FA] shadow-xl z-50 transform transition-transform duration-300 ease-in-out sidebar-scroll"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Sidebar Header -->
    <div
      class="flex items-center justify-between p-6 border-b border-[#2B2024]/10 bg-[#FBF9FA] sticky top-0 z-10"
    >
      <div class="flex items-center space-x-3">
        <img src="/images/Slide/Logo.png" class="h-8" alt="MyCloth Logo" />
      </div>
      <button
        @click="closeSidebar"
        class="p-2 rounded-lg text-[#2B2024] hover:bg-[#2B2024]/5 transition-colors duration-200"
        aria-label="Close menu"
      >
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>

    <!-- Sidebar Content -->
    <div class="flex-1 overflow-y-auto h-[calc(100vh-140px)] bg-[#FBF9FA]">
      <div class="space-y-8 py-6 px-6">
        <!-- Main Navigation -->
        <div class="space-y-3">
          <h3
            class="text-sm font-semibold text-[#2B2024] uppercase tracking-wider mb-2 px-1"
          >
            Menu
          </h3>
          <div class="space-y-1">
            <a
              v-for="link in navLinks"
              :key="link.name"
              :href="link.href"
              @click="
                link.href.startsWith('#')
                  ? handleSmoothScroll($event, link.href)
                  : closeSidebar()
              "
              class="flex items-center space-x-3 px-4 py-3 text-[#2B2024] hover:bg-[#2B2024]/5 rounded-lg font-medium transition-colors duration-200 group"
            >
              <Icon :icon="link.icon" class="w-5 h-5 text-[#FD0054]" />
              <span class="flex-1">{{ link.name }}</span>
              <Icon
                v-if="link.href.startsWith('#')"
                icon="mdi:arrow-right"
                class="w-4 h-4 text-[#2B2024]/40"
              />
            </a>
          </div>
        </div>

        <!-- Store Section -->
        <div class="space-y-3">
          <h3
            class="text-sm font-semibold text-[#2B2024] uppercase tracking-wider mb-2 px-1"
          >
            Official Stores
          </h3>
          <div class="space-y-1">
            <a
              v-for="store in storeLinks"
              :key="store.name"
              :href="store.href"
              target="_blank"
              @click="closeSidebar"
              class="flex items-center space-x-3 px-4 py-3 text-[#2B2024] hover:bg-[#FD0054] hover:text-[#FBF9FA] rounded-lg font-medium transition-colors duration-200 group"
            >
              <Icon :icon="store.icon" class="w-5 h-5 text-[#FD0054]" />
              <span class="flex-1">{{ store.name }}</span>
              <Icon
                icon="mdi:open-in-new"
                class="w-4 h-4 opacity-60 group-hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="border-t border-[#2B2024]/10 bg-[#FBF9FA] sticky bottom-0 p-6">
      <a
        href="/shop"
        @click="closeSidebar"
        class="block w-full bg-[#FD0054] text-[#FBF9FA] text-center px-4 py-3 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200 shadow-sm"
      >
        Shop Now
      </a>
    </div>
  </div>
</template>

<style scoped>
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: #fd0054 #fbf9fa;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: #fbf9fa;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #fd0054;
  border-radius: 2px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background: #a80038;
}
</style>
