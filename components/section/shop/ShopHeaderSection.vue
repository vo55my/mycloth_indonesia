<script setup>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import SearchBar from "@/components/section/shop/SearchBar.vue";
import EditionDropdown from "@/components/section/shop/EditionDropdown.vue";
import StatusDropdown from "@/components/section/shop/StatusDropdown.vue";
import { useDropdownManager } from "@/utils/useDropdownManager";

const dropdownManager = useDropdownManager();

// Provide dropdown manager to child components
import { provide } from "vue";
provide("dropdownManager", dropdownManager);

defineProps({
  breadcrumbItems: {
    type: Array,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  selectedEditions: {
    type: Array,
    required: true,
  },
  selectedStatuses: {
    type: Array,
    required: true,
  },
  editions: {
    type: Array,
    required: true,
  },
  statuses: {
    type: Array,
    required: true,
  },
  filteredKatalogs: {
    type: Array,
    required: true,
  },
});

defineEmits([
  "update:searchQuery",
  "update:selectedEditions",
  "update:selectedStatuses",
]);
</script>

<template>
  <section class="bg-white">
    <!-- Breadcrumb Section -->
    <div class="border-b border-[#2B2024]/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb :items="breadcrumbItems" />
      </div>
    </div>

    <!-- Filter & Search Section -->
    <div class="border-b border-[#2B2024]/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <!-- Search Bar -->
          <div class="w-full lg:w-auto lg:flex-1 max-w-md">
            <SearchBar
              :searchQuery="searchQuery"
              @update:searchQuery="$emit('update:searchQuery', $event)"
            />
          </div>

          <!-- Results Count -->
          <div class="text-center lg:text-left">
            <p class="text-[#2B2024] font-medium">
              Showing
              <span class="text-[#FD0054] font-bold">{{
                filteredKatalogs.length
              }}</span>
              {{ filteredKatalogs.length === 1 ? "result" : "results" }}
            </p>
          </div>

          <!-- Filter Dropdowns -->
          <div class="flex flex-wrap gap-3 justify-center lg:justify-end">
            <!-- Status Dropdown -->
            <StatusDropdown
              :statuses="statuses"
              :selectedStatuses="selectedStatuses"
              @update:selectedStatuses="
                $emit('update:selectedStatuses', $event)
              "
            />

            <!-- Edition Dropdown -->
            <EditionDropdown
              :editions="editions"
              :selectedEditions="selectedEditions"
              @update:selectedEditions="
                $emit('update:selectedEditions', $event)
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
