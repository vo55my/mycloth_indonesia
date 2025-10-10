<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li
        v-for="(item, index) in items"
        :key="item.id || item.name"
        class="flex items-center"
      >
        <!-- Home Icon for first item -->
        <div v-if="index === 0" class="flex items-center">
          <a
            v-if="item.link"
            :href="item.link"
            class="flex items-center text-sm font-medium text-[#2B2024] hover:text-[#FD0054] transition-colors duration-200"
          >
            <Icon icon="mdi:home" class="w-4 h-4 mr-2" />
            {{ item.name }}
          </a>
          <span
            v-else
            class="flex items-center text-sm font-medium text-[#2B2024]/60"
          >
            <Icon icon="mdi:home" class="w-4 h-4 mr-2" />
            {{ item.name }}
          </span>
        </div>

        <!-- Other items -->
        <div v-else class="flex items-center">
          <a
            v-if="item.link"
            :href="item.link"
            class="text-sm font-medium text-[#2B2024] hover:text-[#FD0054] transition-colors duration-200"
          >
            {{ item.name }}
          </a>
          <span
            v-else
            class="text-sm font-medium text-[#2B2024]/60"
            aria-current="page"
          >
            {{ item.name }}
          </span>
        </div>

        <!-- Separator -->
        <Icon
          v-if="index < items.length - 1"
          icon="mdi:chevron-right"
          class="w-4 h-4 text-[#2B2024]/40 mx-2"
        />
      </li>
    </ol>
  </nav>
</template>

<style scoped>
/* Custom animation for breadcrumb */
.breadcrumb-enter-active {
  transition: all 0.3s ease-out;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
