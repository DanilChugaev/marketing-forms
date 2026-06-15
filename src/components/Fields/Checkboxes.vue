<template>
  <div class="column">
    <Label :label :required />

    <div v-for="gender in options" :key="gender.value" class="row">
      <Checkbox
        v-model="model"
        :input-id="gender.value"
        :value="gender.value"
      />

      <Label :id="gender.value" :label="gender.label" />
    </div>

    <span class="info">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Label from './Label.vue';
import type { LabelValuePair } from '../../types.ts';

const model = defineModel<string[]>();

defineProps<{
  label: string;
  options: LabelValuePair[];
  required?: boolean;
  placeholder?: string;
  description?: string;
}>();
</script>
