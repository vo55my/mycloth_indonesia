<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const props = defineProps({
  editions: {
    type: Array,
    required: true,
  },
  selectedEditions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:selectedEditions"]);
const isDropdownOpen = ref(false);

function toggleEdition(edition) {
  const isSelected = props.selectedEditions.includes(edition);
  const newSelectedEditions = isSelected
    ? props.selectedEditions.filter((e) => e !== edition)
    : [...props.selectedEditions, edition];

  emit("update:selectedEditions", newSelectedEditions);
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest(".dropdown-container")) {
    isDropdownOpen.value = false;
  }
}

// Add event listener for click outside
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative dropdown-container">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#FD0054] text-[#FBF9FA] rounded-lg hover:bg-[#A80038] focus:outline-none focus:ring-2 focus:ring-[#FD0054] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
      type="button"
    >
      Edition
      <span class="ml-2">{{
        selectedEditions.length > 0 ? `(${selectedEditions.length})` : ""
      }}</span>
      <Icon
        icon="mdi:chevron-down"
        class="w-4 h-4 ml-2 transition-transform duration-200"
        :class="{ 'rotate-180': isDropdownOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="isDropdownOpen"
      class="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#2B2024]/10 py-2 z-50 animate-fade-in max-h-60 overflow-y-auto"
    >
      <!-- Selected Count -->
      <div class="px-4 py-2 border-b border-[#2B2024]/10">
        <p class="text-sm text-[#2B2024]/70">
          {{ selectedEditions.length }} selected
        </p>
      </div>

      <!-- Edition List -->
      <ul class="py-2">
        <li v-for="(edition, index) in editions" :key="edition + '-' + index">
          <div
            class="flex items-center px-4 py-2 hover:bg-[#2B2024]/5 transition-colors duration-150 cursor-pointer group"
            @click="toggleEdition(edition)"
          >
            <!-- Custom Checkbox -->
            <div
              class="w-4 h-4 border-2 rounded-sm flex items-center justify-center mr-3 transition-all duration-200"
              :class="[
                selectedEditions.includes(edition)
                  ? 'bg-[#FD0054] border-[#FD0054]'
                  : 'border-[#2B2024]/30 group-hover:border-[#FD0054]',
              ]"
            >
              <Icon
                v-if="selectedEditions.includes(edition)"
                icon="mdi:check"
                class="w-3 h-3 text-white"
              />
            </div>

            <!-- Edition Label -->
            <label
              class="flex-1 text-sm font-medium text-[#2B2024] cursor-pointer select-none group-hover:text-[#FD0054] transition-colors"
            >
              {{ edition }}
            </label>
          </div>
        </li>
      </ul>

      <!-- Clear All Button -->
      <div
        v-if="selectedEditions.length > 0"
        class="px-4 py-2 border-t border-[#2B2024]/10"
      >
        <button
          @click="emit('update:selectedEditions', [])"
          class="w-full text-sm text-[#FD0054] hover:text-[#A80038] font-medium transition-colors duration-200 text-center py-1"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
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

/* Custom scrollbar */
.max-h-60::-webkit-scrollbar {
  width: 4px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #fbf9fa;
  border-radius: 2px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #fd0054;
  border-radius: 2px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #a80038;
}
</style>
