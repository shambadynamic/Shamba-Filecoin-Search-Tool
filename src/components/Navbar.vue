<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #800080"
  >
    <div class="container">
      <a class="navbar-brand" href="/">Shamba Filecoin</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav me-auto">
          <NavLink to="/">Home</NavLink>
          <li class="nav-item">
            <div class="btn-group m-2">
              <button
                :class="{ active: store.state.activeHistory == 'ALL' }"
                @click="store.state.activeHistory = 'ALL'"
                class="btn btn-outline-light my-light"
              >
                ALL
              </button>
              <button
                :class="{ active: store.state.activeHistory == 'GEOSTATS' }"
                @click="store.state.activeHistory = 'GEOSTATS'"
                class="btn btn-outline-light my-light"
              >
                GEOSTATS
              </button>
              <button
                :class="{ active: store.state.activeHistory == 'FIRE' }"
                @click="store.state.activeHistory = 'FIRE'"
                class="btn btn-outline-light my-light"
              >
                FIRE
              </button>
            </div>
          </li>
        </ul>
        <SearchDropDownVue />
        <!-- <form class="d-flex">
          <div class="input-group">
            <div class="input-group-text">
              <i class="fas fa-search"></i>
            </div>
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import NavLink from "@/components/NavLink.vue";
import SearchDropDownVue from "./SearchDropDown.vue";
import store from "@/store";
</script>

<style>
.my-light {
  color: white;
}
.my-light:hover {
  color: black;
}
</style>
