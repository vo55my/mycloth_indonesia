<script setup>
import { Icon } from "@iconify/vue";
import { ref, inject } from "vue";

const props = defineProps({
  statuses: {
    type: Array,
    required: true,
  },
  selectedStatuses: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:selectedStatuses"]);

// Inject dropdown manager
const dropdownManager = inject("dropdownManager");
const dropdownId = "status-dropdown";

const isDropdownOpen = ref(false);

function toggleStatus(status) {
  const isSelected = props.selectedStatuses.includes(status);
  const newSelectedStatuses = isSelected
    ? props.selectedStatuses.filter((s) => s !== status)
    : [...props.selectedStatuses, status];

  emit("update:selectedStatuses", newSelectedStatuses);
}

function toggleDropdown() {
  if (isDropdownOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

function openDropdown() {
  dropdownManager.openDropdown(dropdownId);
  isDropdownOpen.value = true;
}

function closeDropdown() {
  dropdownManager.closeDropdown(dropdownId);
  isDropdownOpen.value = false;
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest(".dropdown-container")) {
    closeDropdown();
  }
}

// Listen to global dropdown state changes
import { watch } from "vue";

watch(
  () => dropdownManager.activeDropdown.value,
  (newActiveId) => {
    if (newActiveId !== dropdownId) {
      isDropdownOpen.value = false;
    }
  }
);

// Add event listener for click outside
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  closeDropdown();
});
</script>

<template>
  <div class="relative dropdown-container">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="inline-flex items-center px-4 py-3 text-sm font-semibold bg-[#FD0054] text-[#FBF9FA] rounded-lg hover:bg-[#A80038] focus:outline-none focus:ring-2 focus:ring-[#FD0054] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
      type="button"
    >
      Filter
      <span class="ml-2">{{
        selectedStatuses.length > 0 ? `(${selectedStatuses.length})` : ""
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
          {{ selectedStatuses.length }} selected
        </p>
      </div>

      <!-- Status List -->
      <ul class="py-2">
        <li v-for="(status, index) in statuses" :key="status + '-' + index">
          <div
            class="flex items-center px-4 py-2 hover:bg-[#2B2024]/5 transition-colors duration-150 cursor-pointer group"
            @click="toggleStatus(status)"
          >
            <!-- Custom Checkbox -->
            <div
              class="w-4 h-4 border-2 rounded-sm flex items-center justify-center mr-3 transition-all duration-200"
              :class="[
                selectedStatuses.includes(status)
                  ? 'bg-[#FD0054] border-[#FD0054]'
                  : 'border-[#2B2024]/30 group-hover:border-[#FD0054]',
              ]"
            >
              <Icon
                v-if="selectedStatuses.includes(status)"
                icon="mdi:check"
                class="w-3 h-3 text-white"
              />
            </div>

            <!-- Status Label -->
            <label
              class="flex-1 text-sm font-medium text-[#2B2024] cursor-pointer select-none group-hover:text-[#FD0054] transition-colors"
            >
              {{ status }}
            </label>
          </div>
        </li>
      </ul>

      <!-- Clear All Button -->
      <div
        v-if="selectedStatuses.length > 0"
        class="px-4 py-2 border-t border-[#2B2024]/10"
      >
        <button
          @click="emit('update:selectedStatuses', [])"
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
