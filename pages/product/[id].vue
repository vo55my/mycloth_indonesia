<script setup>
import { useRoute } from "vue-router";
import { supabase } from "~/utils/supabase";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import Breadcrumb from "~/components/Breadcrumb.vue";
import ProductSection from "~/components/ProductSection.vue";
import RelatedSection from "~/components/RelatedSection.vue";

const route = useRoute();
const { data: product, error } = await useAsyncData(
  `product-${route.params.id}`,
  async () => {
    const { data, error } = await supabase
      .from("katalogs")
      .select("*")
      .eq("id", route.params.id)
      .single();
    if (error) throw error;
    return data;
  }
);

if (error.value) {
  console.error("Error fetching product:", error.value);
}

const breadcrumbItems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  {
    name: product.value?.name || "Product",
    link: `/product/${route.params.id}`,
  },
];
</script>

<template>
  <div>
    <Navbar />
    <section class="bg-white py-8 mt-10 antialiased dark:bg-gray-900 md:py-16">
      <div class="container mx-auto grid-cols-1 p-4">
        <Breadcrumb :items="breadcrumbItems" />
      </div>
      <div v-if="product">
        <ProductSection :product="product" />
      </div>
      <div v-if="product">
        <RelatedSection :product="product" />
      </div>
      <div v-else-if="error">
        <p class="text-center py-16">
          Sorry, something went wrong while fetching the product.
        </p>
      </div>
      <div v-else>
        <p class="text-center py-16">Loading product...</p>
      </div>
    </section>
    <Footer />
  </div>
</template>
