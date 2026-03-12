<template>
  <div class="column">
    <Label :id :label :required />

    <InputText
        v-if="type === 'text' || type === 'number'"
        v-model="model"
        :id="id"
        :required
        :placeholder
        :type
    />

    <Textarea
        v-else
        v-model="model as string"
        :id="id"
        :required
        :placeholder
        :auto-resize="true"
    />

    <span class="info">{{description}}</span>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Label from './Label.vue';

const model = defineModel<string | number>();

withDefaults(
  defineProps<{
    id: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    type?: 'text' | 'number' | 'textarea';
  }>(),
  {
    type: 'text',
  }
);
</script>
