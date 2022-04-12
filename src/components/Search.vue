<template>
  <div>
    <form action="#" method="get" @submit.prevent="doSearch">
      <div class="p-2 scroll-dev">
        <p>Request parameters</p>
        <div class="input-group mb-2">
          <div class="input-group-text">Datasets</div>
          <select
            @change="datasetChanged($event)"
            name="dataset"
            class="form-control"
          >
            <option selected value="">Select a dataset</option>
            <option
              v-for="(dataset, i) in datasets"
              :key="i"
              :value="dataset.code"
            >
              {{ dataset.name }}
            </option>
          </select>
        </div>
        <div class="input-group mb-2">
          <div class="input-group-text">Available bands</div>
          <select
            v-if="maindataset && maindataset.available_bands"
            name="bands"
            class="form-control"
          >
            <option selected value="">Select a band</option>
            <option
              v-for="(band, i) in maindataset.available_bands"
              :key="i"
              :value="band"
            >
              {{ band }}
            </option>
          </select>
          <input
            v-else
            type="text"
            disabled
            class="form-control"
            placeholder="Please select a Dataset first"
          />
        </div>
        <InputGroup name="scale" type="number">Preferred Scale</InputGroup>
        <Select
          name="statistics"
          :values="statistics"
          nullValue="Select a statistic"
          >Statistics</Select
        >
        <InputGroup name="start_date" type="date">Start date</InputGroup>
        <InputGroup name="end_date" type="date">End date</InputGroup>
        <div class="input-group mb-2">
          <div class="input-group-text">Geometry</div>
          <textarea name="geometry" rows="5" class="form-control"></textarea>
        </div>
        <p class="mt-4">Response parameters</p>
        <InputGroup name="date_time" type="date">Transaction Date</InputGroup>
        <InputGroup name="contract_address" type="text">
          Contract address
        </InputGroup>
        <InputGroup name="operator_address" type="text">
          Operator address
        </InputGroup>
        <InputGroup name="tx_hash" type="text">TX Hash</InputGroup>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-2 p-2">
        <button
          ref="searchButton"
          type="reset"
          class="btn btn-outline-danger"
          @click="maindataset = null"
        >
          <i class="fas fa-times fe-fw me-2"></i> Reset
        </button>
        <div class="form-check ms-2 me-1">
          <input
            class="form-check-input"
            name="dontClearFields"
            type="checkbox"
            value="yes"
            id="dontClearFields"
          />
          <label class="form-check-label" for="dontClearFields">
            Don't clear search fields
          </label>
        </div>
        <button ref="searchButton" type="submit" class="btn btn-logo">
          <i class="fas fa-search fe-fw me-2"></i> Search
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import datasets from "@/datasets.json";
import { Dataset } from "@/types/dataset";
import store from "@/store";
import { History } from "@/types/history";
import InputGroup from "@/components/InputGroup.vue";
import Select from "@/components/Select.vue";
import statistics from "@/variables/statistics.json";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const searchButton = ref<HTMLButtonElement | null>(null);
const maindataset = ref<Dataset | null>(null);

const datasetChanged = function (event: any) {
  maindataset.value =
    datasets.find((dataset) => dataset.code === event.target.value) || null;
};

const doSearch = function (event: any) {
  if (event.target === null) {
    return;
  }
  let form = event.target as HTMLFormElement;
  let formdata = new FormData(form);
  let dontClearFields = formdata.get("dontClearFields");
  let dataset = formdata.get("dataset");
  let bands = formdata.get("bands");
  let scale = parseFloat(formdata.get("scale") + "");
  let statistics = formdata.get("statistics");
  let start_date = formdata.get("start_date");
  let end_date = formdata.get("end_date");
  let geometry = formdata.get("geometry");
  let tx_hash = formdata.get("tx_hash");
  let contract_address = formdata.get("contract_address");
  let operator_address = formdata.get("operator_address");
  let date_time = formdata.get("date_time");

  if (!dontClearFields) {
    form.reset();
    maindataset.value = null;
  }

  if (searchButton.value) {
    searchButton.value.innerHTML =
      '<i class="fe-fw fa-solid fa-spinner fa-spin me-2"></i> Searching';
  }

  let find = false;

  store.state.searchHistories = {};
  for (const key in store.state.histories) {
    if (Object.prototype.hasOwnProperty.call(store.state.histories, key)) {
      const history: History = store.state.histories[key];
      try {
        if (
          typeof dataset === "string" &&
          dataset.trim() &&
          history.request.dataset_code.search(dataset) === -1
        ) {
          continue;
        }

        if (
          typeof bands === "string" &&
          bands.trim() &&
          history.request.selected_band.search(bands) === -1
        ) {
          continue;
        }

        if (scale && history.request.image_scale !== scale) {
          continue;
        }

        if (
          typeof statistics === "string" &&
          statistics.trim() &&
          history.request.agg_x !== statistics
        ) {
          continue;
        }

        if (
          typeof start_date === "string" &&
          start_date.trim() &&
          new Date(history.request.start_date).getTime() !==
            new Date(start_date).getTime()
        ) {
          continue;
        }

        if (
          typeof end_date === "string" &&
          end_date.trim() &&
          new Date(history.request.end_date).getTime() !==
            new Date(end_date).getTime()
        ) {
          continue;
        }

        try {
          if (
            typeof geometry === "string" &&
            geometry.trim() &&
            JSON.stringify(history.request.geometry) !==
              JSON.stringify(JSON.parse(geometry))
          ) {
            continue;
          }
        } catch (e) {
          continue;
        }

        if (
          typeof tx_hash === "string" &&
          tx_hash.trim() &&
          history.response.tx_hash.search(tx_hash) === -1
        ) {
          continue;
        }

        if (
          typeof contract_address === "string" &&
          contract_address.trim() &&
          history.response.contract_address.search(contract_address) === -1
        ) {
          continue;
        }

        if (
          typeof operator_address === "string" &&
          operator_address.trim() &&
          history.response.operator_address.search(operator_address) === -1
        ) {
          continue;
        }

        if (
          typeof date_time === "string" &&
          date_time.trim() &&
          // Math.abs(
          new Date(history.response.datetime).toLocaleDateString() !==
            new Date(date_time).toLocaleDateString()
          // ) >
          //   24 * 60 * 60 * 1000
        ) {
          console.log(date_time);
          continue;
        }
      } catch (e) {
        continue;
      }

      find = true;
      store.state.searchHistories[history.response.tx_hash] = history;
    }
  }

  if (searchButton.value) {
    searchButton.value.innerHTML =
      '<i class="fe-fw fa-solid fa-search me-2"></i> Search';
  }

  store.state.searchFor = true;
  emit("close");
  // maindataset.value = null
  // event.target.reset()
};
</script>

<style scoped>
.scroll-dev {
  max-height: 400px;
  overflow: auto;
}
</style>
