<script setup>
import { Icon } from "@iconify/vue";

const stats = [
  {
    icon: "mdi:tshirt-crew",
    value: "50+",
    label: "Unique Designs",
  },
  {
    icon: "mdi:quality-high",
    value: "100%",
    label: "Premium Quality",
  },
  {
    icon: "mdi:star",
    value: "4.8",
    label: "Customer Rating",
  },
  {
    icon: "mdi:headset",
    value: "24/7",
    label: "Customer Support",
  },
];
</script>

<template>
  <div class="bg-white rounded-2xl p-8 border border-[#2B2024]/10">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="(stat, index) in stats" :key="index" class="text-center">
        <div class="flex items-center justify-center space-x-2 mb-3">
          <Icon :icon="stat.icon" class="w-6 h-6 text-[#FD0054]" />
          <div class="text-2xl font-bold text-[#2B2024]">{{ stat.value }}</div>
        </div>
        <div class="text-[#2B2024]/70 text-sm font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </div>
</template>
