<template>
  <label
      :for="id"
      class="label"
  >
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

<style scoped lang="postcss">

</style>