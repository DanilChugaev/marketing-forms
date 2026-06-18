<template>
  <div class="column">
    <div class="row">
      <Checkbox v-model="model" :input-id="id" binary />

      <Label :id :label />
    </div>

    <span class="info">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Label from './Label.vue';

const model = defineModel<boolean>();

defineProps<{
  id: string;
  label: string;
  description?: string;
}>();
</script>
