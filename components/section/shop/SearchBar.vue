<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:searchQuery", "search"]);

const onInput = (event) => {
  emit("update:searchQuery", event.target.value);
};

const onSearch = () => {
  emit("search", props.searchQuery);
};
</script>

<template>
  <form class="w-full max-w-md" @submit.prevent="onSearch">
    <label for="search-input" class="sr-only"> Search products </label>
    <div class="relative">
      <!-- Search Icon -->
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <Icon icon="mdi:magnify" class="w-5 h-5 text-[#2B2024]/60" />
      </div>

      <!-- Search Input -->
      <input
        type="search"
        id="search-input"
        :value="searchQuery"
        @input="onInput"
        class="block w-full pl-10 pr-4 py-3 text-[#2B2024] bg-[#FBF9FA] border border-[#2B2024]/20 rounded-xl placeholder-[#2B2024]/60 focus:outline-none focus:ring-2 focus:ring-[#FD0054] focus:border-[#FD0054] transition-all duration-200"
        placeholder="Search products..."
        required
      />

      <!-- Clear Button (when there's text) -->
      <button
        v-if="searchQuery"
        type="button"
        @click="$emit('update:searchQuery', '')"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#2B2024]/40 hover:text-[#FD0054] transition-colors duration-200"
        aria-label="Clear search"
      >
        <Icon icon="mdi:close-circle" class="w-5 h-5" />
      </button>
    </div>

    <!-- Search Button (optional - for mobile or additional emphasis) -->
    <button
      type="submit"
      class="mt-2 w-full bg-[#FD0054] text-[#FBF9FA] py-3 rounded-xl font-semibold hover:bg-[#A80038] transition-colors duration-200 shadow-sm hover:shadow-md md:hidden"
    >
      Search
    </button>
  </form>
</template>

<style scoped>
/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(253, 0, 84, 0.1);
}

/* Smooth transitions */
input {
  transition: all 0.2s ease-in-out;
}
</style>
