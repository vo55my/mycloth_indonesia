<template>
  <div class="inline-flex flex-col items-center space-y-4">
    <div
      class="w-12 h-12 border-4 border-[#FD0054] border-t-transparent rounded-full animate-spin"
    ></div>
    <div>
      <h3 class="text-xl font-semibold text-[#2B2024] mb-2">
        {{ title || "Loading" }}
      </h3>
      <p class="text-[#2B2024]/70">
        {{ message || "Please wait..." }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
});
</script>
