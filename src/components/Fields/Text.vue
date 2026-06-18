<template>
  <div class="column">
    <Label :id :label :required />

    <InputText
      v-if="type === 'text'"
      v-model="model"
      type="text"
      :id="id"
      :required
      :placeholder
      :disabled
    />

    <InputNumber
      v-else-if="type === 'number'"
      v-model="model"
      :id="id"
      :required
      :placeholder
      :disabled
      :min
      :max
    />

    <Textarea
      v-else
      v-model="model as string"
      :id="id"
      :required
      :placeholder
      :auto-resize="true"
    />

    <span v-if="description" class="info">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Label from './Label.vue';

const model = defineModel<any>();

withDefaults(
  defineProps<{
    id: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    description?: string;
    type?: 'text' | 'number' | 'textarea';
    min?: number;
    max?: number;
  }>(),
  {
    type: 'text',
  },
);
</script>
