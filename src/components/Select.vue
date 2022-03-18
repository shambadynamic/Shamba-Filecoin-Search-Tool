<template>
  <div class="input-group mb-2">
    <div class="input-group-text"><slot></slot></div>
    <select :name="name" class="form-control">
      <option selected value="">{{ nullValue || "" }}</option>
      <option v-for="(v, i) in props.values" :key="i" :value="v.value">
        {{ v.name || v.value }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  name: string;
  nullValue?: string;
  values: Array<{
    name?: string;
    value: string;
  }>;
}>();
</script>
