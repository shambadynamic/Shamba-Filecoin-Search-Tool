<template>
  <div class="input-group mb-2">
    <div class="input-group-text"><slot></slot></div>
    <input
      :type="props.type"
      class="form-control"
      :name="props.name"
      :placeholder="props.placeholder || ''"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  placeholder?: string;
  name: string;
  type: string;
}>();
</script>
