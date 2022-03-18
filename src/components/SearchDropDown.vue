<template>
  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        ref="searchBtn"
      >
        <i class="fas fa-search me-2"></i> Search
      </a>
      <div
        class="dropdown-menu dropdown-menu-end navsearch p-0"
        aria-labelledby="navbarDropdown"
        style="width: 500px; box-shadow: 0 0 100px 10px #00000050"
        ref="dropdownMenu"
      >
        <Search @close="close" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Search from "@/components/Search.vue";

const searchBtn = ref<HTMLLinkElement | null>(null);
const dropdownMenu = ref<HTMLDivElement | null>(null);

function close() {
  if (searchBtn.value !== null) {
    searchBtn.value.setAttribute("aria-expanded", "false");
    searchBtn.value.classList.remove("show");
  }
  if (dropdownMenu.value !== null) {
    dropdownMenu.value.removeAttribute("data-bs-popper");
    dropdownMenu.value.classList.remove("show");
  }
  console.log("close");
}
</script>
