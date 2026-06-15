<template>
  <label :for="id" :class="['label', { 'label--pointer': id }]">
    {{ label }}

    <sup v-if="required" class="required">*</sup>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  label: string;
  required?: boolean;
}>();
</script>
