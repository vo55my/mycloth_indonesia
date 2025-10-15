<script setup>
import { Icon } from "@iconify/vue";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { name: "Tentang Kami", href: "#about" },
  { name: "Katalog Produk", href: "/shop" },
  { name: "Edisi Terbaru", href: "#new-arrivals" },
  { name: "Size Guide", href: "#size-guide" },
  { name: "Cara Order", href: "#how-to-order" },
];

const customerService = [
  { name: "Kebijakan Pengembalian", href: "#return-policy" },
  { name: "Pengiriman", href: "#shipping" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact Us", href: "#contact" },
  { name: "Track Order", href: "#track-order" },
];

const storeLinks = [
  {
    name: "Shopee",
    href: "https://shopee.co.id/",
    icon: "arcticons:shopee",
    color: "text-[#FD0054]",
  },
  {
    name: "Tokopedia",
    href: "https://www.tokopedia.com/",
    icon: "arcticons:tokopedia",
    color: "text-[#FD0054]",
  },
  {
    name: "Lazada",
    href: "https://www.lazada.co.id/",
    icon: "arcticons:lazada",
    color: "text-[#FD0054]",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: "mdi:instagram",
    color: "text-[#FD0054]",
  },
  {
    name: "TikTok",
    href: "#",
    icon: "ic:baseline-tiktok",
    color: "text-[#FD0054]",
  },
  {
    name: "Twitter",
    href: "#",
    icon: "mdi:twitter",
    color: "text-[#FD0054]",
  },
];
</script>

<template>
  <footer class="bg-[#FBF9FA] border-t border-[#2B2024]/10">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-4">
            <img src="/images/Slide/Logo.png" class="h-10" alt="MyCloth Logo" />
            <span class="text-2xl font-bold text-[#2B2024]">
              MyCloth Indonesia
            </span>
          </div>
          <p class="text-[#2B2024]/80 mb-6 leading-relaxed">
            MyCloth adalah toko baju modern yang menyediakan koleksi pakaian
            stylish dan berkualitas tinggi dengan desain eksklusif edisi
            terbatas.
          </p>

          <!-- Contact Info -->
          <div class="space-y-3">
            <div class="flex items-center space-x-3 text-[#2B2024]/80">
              <Icon icon="mdi:map-marker" class="w-5 h-5 text-[#FD0054]" />
              <span class="text-sm">Jakarta, Indonesia</span>
            </div>
            <div class="flex items-center space-x-3 text-[#2B2024]/80">
              <Icon icon="mdi:phone" class="w-5 h-5 text-[#FD0054]" />
              <span class="text-sm">+62 812 3456 789</span>
            </div>
            <div class="flex items-center space-x-3 text-[#2B2024]/80">
              <Icon icon="mdi:email" class="w-5 h-5 text-[#FD0054]" />
              <span class="text-sm">cs@mycloth.id</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-[#2B2024] mb-6">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-[#2B2024]/80 hover:text-[#FD0054] transition-colors duration-200 text-sm flex items-center space-x-2"
              >
                <Icon icon="mdi:chevron-right" class="w-4 h-4 text-[#FD0054]" />
                <span>{{ link.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-semibold text-[#2B2024] mb-6">
            Customer Service
          </h3>
          <ul class="space-y-3">
            <li v-for="service in customerService" :key="service.name">
              <a
                :href="service.href"
                class="text-[#2B2024]/80 hover:text-[#FD0054] transition-colors duration-200 text-sm flex items-center space-x-2"
              >
                <Icon icon="mdi:chevron-right" class="w-4 h-4 text-[#FD0054]" />
                <span>{{ service.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Store & Social Media -->
        <div class="space-y-8">
          <!-- Official Stores -->
          <div>
            <h3 class="text-lg font-semibold text-[#2B2024] mb-6">
              Beli di Official Store
            </h3>
            <div class="space-y-3">
              <a
                v-for="store in storeLinks"
                :key="store.name"
                :href="store.href"
                target="_blank"
                class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-[#2B2024]/10 hover:border-[#FD0054] hover:shadow-sm transition-all duration-200 group"
              >
                <Icon :icon="store.icon" class="w-6 h-6" :class="store.color" />
                <span
                  class="text-[#2B2024] group-hover:text-[#FD0054] font-medium text-sm"
                >
                  {{ store.name }}
                </span>
                <Icon
                  icon="mdi:open-in-new"
                  class="w-4 h-4 text-[#2B2024]/40 ml-auto group-hover:text-[#FD0054]"
                />
              </a>
            </div>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-semibold text-[#2B2024] mb-6">
              Follow Kami
            </h3>
            <div class="flex space-x-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                class="p-3 bg-white border border-[#2B2024]/10 rounded-lg hover:border-[#FD0054] hover:shadow-sm transition-all duration-200 group"
              >
                <Icon
                  :icon="social.icon"
                  class="w-5 h-5"
                  :class="social.color"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-[#2B2024]/10 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <!-- Copyright -->
          <div class="text-center md:text-left">
            <span class="text-sm text-[#2B2024]/80">
              © {{ currentYear }}
              <a
                href="/"
                class="hover:text-[#FD0054] font-medium transition-colors"
              >
                MyCloth Indonesia
              </a>
              . All rights reserved.
            </span>
          </div>

          <!-- Additional Links -->
          <div class="flex space-x-6 text-sm">
            <a
              href="#privacy-policy"
              class="text-[#2B2024]/80 hover:text-[#FD0054] transition-colors flex items-center space-x-1"
            >
              <Icon icon="mdi:shield-account" class="w-4 h-4" />
              <span>Privacy Policy</span>
            </a>
            <a
              href="#terms"
              class="text-[#2B2024]/80 hover:text-[#FD0054] transition-colors flex items-center space-x-1"
            >
              <Icon icon="mdi:file-document" class="w-4 h-4" />
              <span>Terms of Service</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
