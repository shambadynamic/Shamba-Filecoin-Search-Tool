<template>
  <div style="margin-bottom: 90px">
    <div class="container">
      <div class="d-flex justify-content-between mb-2">
        <h1>{{ store.state.searchFor ? "Search Result" : "History" }}</h1>
        <button
          v-if="store.state.searchFor"
          class="btn btn-logo"
          @click="clearSeach"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <p v-if="!store.state.searchFor">
        Use the Search tools to locate previous oracle transactions from the
        list below.
      </p>
      <div v-if="store.state.searchFor">
        <Accordion :histories="store.state.getSearchHistories" />
      </div>
      <div v-else-if="Object.keys(store.state.histories).length > 0">
        <Accordion :histories="store.state.histories" />
        <p class="mt-3" v-if="store.state.loading">
          <i class="fas fa-spinner fa-spin me-2"></i> loading ...
        </p>
      </div>
      <div v-else>
        <p v-if="store.state.loading">
          <i class="fas fa-spinner fa-spin me-2"></i> loading ...
        </p>
        <div v-else class="alert alert-info">No record found!</div>
      </div>
    </div>
    <div
      class="text-center p-2 text-white fixed-bottom"
      style="background-color: purple"
    >
      <small>&copy; {{ new Date().getFullYear() }} Shamba Filecoin</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store/index";
import Accordion from "@/components/Accordion.vue";

function clearSeach() {
  store.state.searchFor = false;
  store.state.searchHistories = {};
}

store.fetch();
</script>
