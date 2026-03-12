<template>
  <div class="column">
    <Label :id :label :required />

    <FileUpload
        class="p-button-outlined"
        mode="basic"
        severity="secondary"
        choose-label="Выбрать"
        :max-file-size="1048576"
        customUpload
        auto
        @select="onFileSelect"
    />

    <img
        v-if="model"
        :src="model"
        alt="Image"
    />

    <span class="info">{{description}}</span>
  </div>
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload';
import Label from './Label.vue';

const model = defineModel<string>({ default: ''});

defineProps<{
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
}>();

function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    model.value = e.target?.result as string ?? '';
  };

  reader.readAsDataURL(file);
}
</script>
