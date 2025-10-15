<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  shopeeUrl: { type: String, required: true },
  tokopediaUrl: { type: String, required: true },
  lazadaUrl: { type: String, required: true },
});

const marketplaces = [
  {
    name: "Shopee",
    url: props.shopeeUrl,
    icon: "arcticons:shopee",
    color: "bg-orange-500 hover:bg-orange-600",
    textColor: "text-white",
    borderColor: "border-orange-500",
  },
  {
    name: "Tokopedia",
    url: props.tokopediaUrl,
    icon: "arcticons:tokopedia",
    color: "bg-green-500 hover:bg-green-600",
    textColor: "text-white",
    borderColor: "border-green-500",
  },
  {
    name: "Lazada",
    url: props.lazadaUrl,
    icon: "arcticons:lazada",
    color: "bg-red-500 hover:bg-red-600",
    textColor: "text-white",
    borderColor: "border-red-500",
  },
];
</script>

<template>
  <div class="flex flex-wrap sm:flex-row gap-4">
    <a
      v-for="marketplace in marketplaces"
      :key="marketplace.name"
      :href="marketplace.url"
      target="_blank"
      rel="noopener noreferrer"
      class="group inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50"
      :class="[
        marketplace.color,
        marketplace.textColor,
        'focus:ring-' + marketplace.color.split(' ')[0].split('-')[1] + '-500',
      ]"
    >
      <!-- Marketplace Icon -->
      <Icon
        :icon="marketplace.icon"
        class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110"
      />

      <!-- Marketplace Name -->
      <span class="flex items-center space-x-2">
        <span>Beli di</span>
        <span class="font-bold">{{ marketplace.name }}</span>
        <Icon
          icon="mdi:open-in-new"
          class="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
        />
      </span>
    </a>
  </div>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
a:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

/* Smooth transitions for all interactive states */
a {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
