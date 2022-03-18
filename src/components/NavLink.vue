<template>
  <li class="nav-item">
    <router-link
      class="p-sm-2 mb-sm-2 mt-sm-2"
      :class="{ 'nav-link': true, active: isActive }"
      :to="to"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["to"],
  computed: {
    isActive() {
      if (this.$route.path === this.to) {
        return true;
      }
      return false;
    },
  },
});
</script>
