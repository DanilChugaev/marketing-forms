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

    <Text v-model="id" id="tg-id" label="ID тг чата" type="number" required />

    <Separator
      text="Укажите несколько id кампаний либо выберите справочник специалиста"
    />

    <Text
      v-model="ids"
      id="ids"
      label="ID(s) кампании(й)"
      type="textarea"
      :required="!isIdsOptional"
    />

    <Select
      v-model="specialist"
      id="specialist"
      label="Присылать активные кампании из справочника специалиста"
      :options="specialistOptions"
      :required="!isSpecialistOptional"
    />

    <Errors :messages="errorMessages" />

    <Button :loading="isSendingFormData" @click="submitForm">{{
      isSendingFormData ? 'Идет обработка...' : 'Отправить'
    }}</Button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStorage, useFetch } from '@vueuse/core';
import RequiredInfo from './Fields/RequiredInfo.vue';
import Text from './Fields/Text.vue';
import Button from 'primevue/button';
import { statisticsFormSchema } from '../utils/validation.ts';
import { useNotifications } from '../composables/useNotification.ts';
import Select from './Fields/Select.vue';
import { specialistOptions } from '../data/statistics.ts';
import Separator from './Fields/Separator.vue';
import type { StatisticsFormData } from '../types.ts';
import Errors from './Fields/Errors.vue';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('campaign-webhook-url', '');
const id = useStorage('statistics-tg-id', '');
const ids = useStorage('statistics-campaign-ids', '');
const specialist = useStorage<Record<string, boolean>>(
  'statistics-specialist',
  {},
);

const errorMessages = ref([]);
const isSendingFormData = ref(false);

const specialistKey = computed(
  () => Object.keys(specialist.value ?? {})[0] ?? '',
);

const hasIds = computed(() => ids.value.trim().length > 0);
const hasSpecialist = computed(() => specialistKey.value.length > 0);

// Если ids заполнено - specialist не обязателен
const isSpecialistOptional = computed(() => hasIds.value);
// Если specialist заполнен - ids не обязателен
const isIdsOptional = computed(() => hasSpecialist.value);

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

  const payload: StatisticsFormData = {
    id: id.value, // id тг чата
    ids: parseCampaignIds(ids.value), // IDs кампаний
    specialist: specialistKey.value, // Справочник специалиста
  };

  try {
    await statisticsFormSchema.parseAsync({
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
  } else if (error.value) {
    errorNotify(error.value);
  } else {
    errorNotify('Неизвестная ошибка, попробуйте позже');
  }

  isSendingFormData.value = false;
}

function clearForm() {
  id.value = '';
  ids.value = '';
  specialist.value = {};
}
</script>
