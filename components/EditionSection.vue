<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../utils/supabase";

const editions = ref([]);
const isLoading = ref(true);

async function fetchEditions() {
  try {
    const { data } = await supabase.from("editions").select("*");
    if (data) {
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      editions.value = data.slice(0, 3);
    } else {
      editions.value = [];
    }
  } catch (error) {
    console.error("Error fetching editions:", error);
    editions.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchEditions();
});
</script>

<template>
  <section
    id="edition"
    class="antialiased bg-white dark:bg-gray-900 md:py-16 pb-10 pt-20 px-4"
  >
    <h1
      class="dark:text-white font-bold leading-none lg:text-4xl mb-3 md:text-3xl text-4xl text-center text-gray-900 tracking-tight"
    >
      Edition
    </h1>
    <hr class="border-0 bg-gray-100 dark:bg-gray-700 h-1 mb-5 mx-auto w-25" />
    <div
      class="container gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 mx-auto sm:mx-10 sm:grid-cols-2"
    >
      <template v-if="isLoading">
        <div v-for="i in 4" :key="`skel-${i}`" class="flex justify-center">
          <div
            class="w-full h-auto aspect-[4/5] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
          ></div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="edition in editions"
          :key="edition.id"
          class="flex justify-center"
        >
          <img
            class="h-auto rounded-lg max-w-full"
            :src="edition.image"
            :alt="edition.name"
          />
        </div>
        <div class="flex justify-center">
          <figure
            class="cursor-pointer filter grayscale max-w-sm relative transition-all duration-300"
          >
            <a href="/shop">
              <img
                v-if="editions.length"
                class="blur-xs duration-300 hover:blur-none rounded-lg transition-all"
                :src="editions[0].image"
                alt="All Editions"
              />
            </a>
            <figcaption
              class="absolute flex inset-0 items-center justify-center px-4 text-white text-lg"
            >
              <a href="/shop">
                <p class="text-3xl font-bold text-center">View More</p>
              </a>
            </figcaption>
          </figure>
        </div>
      </template>
    </div>
  </section>
</template>
