<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import MobileSidebar from "@/components/common/MobileSidebar.vue";

const isMenuOpen = ref(false);
const storeAccordionOpen = ref(false);
const activeDropdown = ref(null);

const handleSmoothScroll = (event, targetId) => {
  event.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
    isMenuOpen.value = false; // Close mobile menu after click
  }
};

const toggleDropdown = (dropdown) => {
  if (activeDropdown.value === dropdown) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = dropdown;
  }
};

// Close mobile sidebar when clicking outside
const closeSidebar = () => {
  isMenuOpen.value = false;
  storeAccordionOpen.value = false;
  activeDropdown.value = null;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Check if click is outside dropdown
  if (activeDropdown.value && !event.target.closest(".dropdown-container")) {
    activeDropdown.value = null;
  }
};

const storeLinks = [
  {
    name: "Shopee",
    href: "https://shopee.co.id/",
    icon: "arcticons:shopee",
  },
  {
    name: "Tokopedia",
    href: "https://www.tokopedia.com/",
    icon: "arcticons:tokopedia",
  },
  {
    name: "Lazada",
    href: "https://www.lazada.co.id/",
    icon: "arcticons:lazada",
  },
];

const navLinks = [
  { name: "Home", href: "/", icon: "mdi:home" },
  { name: "Edition", href: "#edition", icon: "mdi:star" },
  { name: "Catalog", href: "#catalog", icon: "mdi:view-grid" },
];

// Add event listener for click outside
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Remove event listener when component is destroyed
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 bg-[#FBF9FA]/95 backdrop-blur-lg border-b border-[#2B2024]/10 shadow-sm z-50 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-3 group">
            <img
              src="/images/Slide/Logo.png"
              class="h-10 transition-transform group-hover:scale-105"
              alt="MyCloth Logo"
            />
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <a
            href="/"
            class="px-4 py-2 text-[#2B2024] hover:text-[#FD0054] font-medium rounded-lg transition-colors duration-200 hover:bg-[#2B2024]/5"
          >
            Home
          </a>

          <!-- Store Dropdown -->
          <div class="relative dropdown-container">
            <button
              @click="toggleDropdown('store')"
              class="flex items-center space-x-1 px-4 py-2 text-[#2B2024] hover:text-[#FD0054] font-medium rounded-lg transition-colors duration-200 hover:bg-[#2B2024]/5"
            >
              <span>Store</span>
              <Icon
                icon="mdi:chevron-down"
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'store' }"
              />
            </button>

            <div
              v-show="activeDropdown === 'store'"
              class="absolute top-full left-0 mt-2 w-48 bg-[#FBF9FA] rounded-xl shadow-lg border border-[#2B2024]/10 py-2 z-50 animate-fade-in"
            >
              <a
                v-for="store in storeLinks"
                :key="store.name"
                :href="store.href"
                target="_blank"
                class="flex items-center px-4 py-3 text-[#2B2024] hover:bg-[#FD0054] hover:text-[#FBF9FA] transition-colors duration-200 group"
                @click="activeDropdown = null"
              >
                <Icon
                  :icon="store.icon"
                  class="w-5 h-5 mr-3 text-[#FD0054] group-hover:text-[#FBF9FA]"
                />
                <span>{{ store.name }}</span>
                <Icon
                  icon="mdi:open-in-new"
                  class="w-4 h-4 ml-auto opacity-60"
                />
              </a>
            </div>
          </div>

          <a
            href="#edition"
            @click.prevent="handleSmoothScroll($event, '#edition')"
            class="px-4 py-2 text-[#2B2024] hover:text-[#FD0054] font-medium rounded-lg transition-colors duration-200 hover:bg-[#2B2024]/5"
          >
            Edition
          </a>
          <a
            href="#catalog"
            @click.prevent="handleSmoothScroll($event, '#catalog')"
            class="px-4 py-2 text-[#2B2024] hover:text-[#FD0054] font-medium rounded-lg transition-colors duration-200 hover:bg-[#2B2024]/5"
          >
            Catalog
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center space-x-4">
          <a
            href="/shop"
            class="bg-[#FD0054] text-[#FBF9FA] px-6 py-2 rounded-lg font-medium hover:bg-[#A80038] transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Shop Now
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 rounded-lg text-[#2B2024] hover:bg-[#2B2024]/5 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <MobileSidebar
      :is-open="isMenuOpen"
      :nav-links="navLinks"
      :store-links="storeLinks"
      @close="closeSidebar"
    />
  </nav>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for sidebar */
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
