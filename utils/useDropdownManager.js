import { ref } from "vue";

export function useDropdownManager() {
  const activeDropdown = ref(null);

  const openDropdown = (dropdownId) => {
    if (activeDropdown.value !== dropdownId) {
      activeDropdown.value = dropdownId;
    }
  };

  const closeDropdown = (dropdownId) => {
    if (activeDropdown.value === dropdownId) {
      activeDropdown.value = null;
    }
  };

  const closeAllDropdowns = () => {
    activeDropdown.value = null;
  };

  const isDropdownOpen = (dropdownId) => {
    return activeDropdown.value === dropdownId;
  };

  return {
    activeDropdown,
    openDropdown,
    closeDropdown,
    closeAllDropdowns,
    isDropdownOpen,
  };
}
