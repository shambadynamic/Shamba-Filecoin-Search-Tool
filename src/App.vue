<template>
  <div class="mb-4">
    <Navbar />
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import "@/assets/css/main.css";

export default defineComponent({
  components: {
    Navbar,
  },
});
</script>
