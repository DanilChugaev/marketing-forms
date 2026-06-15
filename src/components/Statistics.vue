<template>
  <div class="form">
    <div class="row">
      <RequiredInfo class="flex-1" />

      <Button @click="clearForm">Очистить форму</Button>
    </div>

    <Text
      v-model="webhookUrl"
      id="webhookUrl"
      label="Ссылка на вебхук"
      required
    />

    <Text v-model="id" id="age" label="ID тг чата" type="number" required />

    <Text
      v-model="Ids"
      id="age"
      label="ID(s) кампании(й)"
      type="textarea"
      required
    />

    <Button :loading="isSendingFormData" @click="submitForm">{{
      isSendingFormData ? 'Идет обработка...' : 'Отправить'
    }}</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStorage, useFetch } from '@vueuse/core';
import RequiredInfo from './Fields/RequiredInfo.vue';
import Text from './Fields/Text.vue';
import Button from 'primevue/button';
import { campaignFormSchema } from '../utils/validation.ts';
import { useNotifications } from '../composables/useNotification.ts';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('campaign-webhook-url', '');
const id = useStorage('creative-tg-id', '');
const Ids = useStorage('creative-campaign-ids', '');

const errorMessages = ref([]);
const isSendingFormData = ref(false);
const responseData = ref<any[]>([]);
const showResponse = ref(false);

function parseCampaignIds(input: string): string {
  // Разделяем по запятой, пробелу и переносу строки
  const parts = input.split(/[,\s\n]+/);
  // Фильтруем пустые значения, оставляем только цифры, преобразуем в числа и обратно в строки
  const ids = parts
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .map(part => part.replace(/[^\d]/g, ''))
    .filter(part => part.length > 0);
  // Возвращаем как единую строку через запятую
  return ids.join(',');
}

async function submitForm() {
  errorMessages.value = [];
  resetResponse();

  const payload: any = {
    id: id.value, // id тг чата
    Ids: parseCampaignIds(Ids.value), // IDs кампаний
  };

  try {
    await campaignFormSchema.parseAsync({
      webhookUrl: webhookUrl.value,
      ...payload,
    });
  } catch (error: any) {
    errorMessages.value = error.issues.map(
      (issue: { message: string }) => issue.message,
    );
    console.error('Ошибка валидации:', error.issues);

    return;
  }

  isSendingFormData.value = true;

  const { error, data } = await useFetch(webhookUrl.value).post(payload).json();

  if (data.value && data.value.success) {
    successNotify(data.value.message || 'Данные успешно обработаны');

    // Сохраняем и отображаем данные ответа
    if (data.value.data && Array.isArray(data.value.data)) {
      responseData.value = data.value.data;
    } else if (data.value.all_suspicious_negatives) {
      // Если ответ приходит как объект, а не массив
      responseData.value = [data.value];
    }

    showResponse.value = true;
  } else if (error.value) {
    errorNotify(error.value);
  } else {
    errorNotify('Неизвестная ошибка, попробуйте позже');
  }

  isSendingFormData.value = false;
}

function clearForm() {
  id.value = '';
  Ids.value = '';
}

// Сброс отображения ответа
function resetResponse() {
  showResponse.value = false;
  responseData.value = [];
}
</script>
