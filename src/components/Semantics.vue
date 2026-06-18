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

    <Text v-model="reportName" id="reportName" label="Имя отчета" required />

    <Text
      v-model="parsePhrases"
      id="parsePhrases"
      label="Введите фразы для парсинга"
      description="Каждая фраза с новой строки"
      type="textarea"
      required
    />

    <Text
      v-model="minFrequency"
      id="minFrequency"
      label="Минимальная частотность"
      type="number"
      :min="0"
      :max="maxFrequency"
    />

    <Text
      v-model="maxFrequency"
      id="maxFrequency"
      label="Максимальная частотность"
      type="number"
      :min="minFrequency"
      :max="999999999"
    />

    <Text
      v-model="positivePhrases"
      id="negativePhrases"
      label="В фразах должна быть любая из строк"
      description="Каждая фраза с новой строки"
      type="textarea"
    />

    <Text
      v-model="negativePhrases"
      id="negativePhrases"
      label="В фразах не должно быть любой из строк"
      description="Каждая фраза с новой строки"
      type="textarea"
    />

    <Select
      v-model="regions"
      id="regions"
      label="Регион"
      placeholder="Выберите регион"
      :options="yandexDirectRegionsOptions"
      required
    />

    <Select
      v-model="viewingDepth"
      id="viewingDepth"
      label="Глубина просмотра"
      placeholder="Выберите глубину просмотра"
      :options="viewingDepthOptions"
      required
    />

    <Text
      v-model="minKeyWeight"
      id="minKeyWeight"
      label="Минимальный вес ключа (от 1 до 10)"
      description="Минимальное количество страниц, которое должно быть в выдаче по фразе из списка страниц найденных по фразам для расширения ядра, что бы она попала в отчет.
Если указать 2, то в отчет попадут ключи в выдаче которых будет находиться минимум 2 страницы из списка страниц, которые будут найдены по заданным ключам.
Если указать 1, то в отчет попадут все фразы у которых в выдаче встречается любой домен из списка.
Чем больше вес - тем ключ является более тематическим.
Внимание: если в отчет попало 0 ключей, скорее всего вы выставили слишком большое значение веса."
      type="number"
      required
      :min="1"
      :max="10"
    />

    <CheckboxEl
      v-model="clusterPhrases"
      id="clusterPhrases"
      label="Требуется кластеризация фраз"
    />

    <CheckboxEl
      v-model="popularSourcePhrasesForms"
      id="popularSourcePhrasesForms"
      label="Использовать самые популярные формы исходных фраз"
      description="Найдем самые популярные формы исходных фраз и выполним отчет на их основе.
В большинстве случаев рекомендуем оставить галочку."
    />

    <CheckboxEl
      v-model="excludeSourcePhrases"
      id="excludeSourcePhrases"
      label="Исключить исходные фразы из отчета"
    />
    <Errors :messages="errorMessages" />

    <Button :loading="isSendingFormData" @click="submitForm">{{
      isSendingFormData ? 'Идет обработка...' : 'Отправить'
    }}</Button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFetch, useStorage } from '@vueuse/core';
import Button from 'primevue/button';
import { semanticsFormSchema } from '../utils/validation.ts';
import { useNotifications } from '../composables/useNotification.ts';
import {
  viewingDepthOptions,
  yandexDirectRegionsOptions,
} from '../data/semantics.ts';

import RequiredInfo from './Fields/RequiredInfo.vue';
import Errors from './Fields/Errors.vue';
import Text from './Fields/Text.vue';
import Select from './Fields/Select.vue';
import CheckboxEl from './Fields/CheckboxEl.vue';
import { type SemanticsFormData } from '../types.ts';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('semantics-webhook-url', '');
const reportName = useStorage('semantics-report-name', '');
const parsePhrases = useStorage('semantics-parse-phrases', '');
const minFrequency = useStorage('semantics-min-frequency', 0);
const maxFrequency = useStorage('semantics-max-frequency', 999999999);
const positivePhrases = useStorage('semantics-positive-phrases', '');
const negativePhrases = useStorage('semantics-negative-phrases', '');
const regions = useStorage('semantics-regions', { '213': true });
const viewingDepth = useStorage('semantics-viewing-depth', { '10': true });
const minKeyWeight = useStorage('semantics-min-key-weight', 2);
const clusterPhrases = useStorage('semantics-cluster-phrases', false);
const popularSourcePhrasesForms = useStorage(
  'semantics-popular-source-phrases-forms',
  true,
);
const excludeSourcePhrases = useStorage(
  'semantics-exclude-source-phrases',
  false,
);

const errorMessages = ref([]);
const isSendingFormData = ref(false);

const regionKey = computed(
  () => Object.keys(regions.value ?? {})[0] ?? 213, // Москва
);
const viewingDepthKey = computed(
  () => Object.keys(viewingDepth.value ?? {})[0] ?? 10,
);

async function submitForm() {
  errorMessages.value = [];

  const payload: SemanticsFormData = {
    reportName: reportName.value,
    parsePhrases: parsePhrases.value,
    minFrequency: minFrequency.value,
    maxFrequency: maxFrequency.value,
    positivePhrases: positivePhrases.value,
    negativePhrases: negativePhrases.value,
    region: Number(regionKey.value),
    viewingDepth: Number(viewingDepthKey.value),
    minKeyWeight: minKeyWeight.value,
    clusterPhrases: clusterPhrases.value,
    popularSourcePhrasesForms: popularSourcePhrasesForms.value,
    excludeSourcePhrases: excludeSourcePhrases.value,
  };

  try {
    await semanticsFormSchema.parseAsync({
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
  reportName.value = '';
  parsePhrases.value = '';
  minFrequency.value = 0;
  maxFrequency.value = 999999999;
  positivePhrases.value = '';
  negativePhrases.value = '';
  regions.value = { '213': true };
  viewingDepth.value = { '10': true };
  minKeyWeight.value = 2;
  clusterPhrases.value = false;
  popularSourcePhrasesForms.value = true;
  excludeSourcePhrases.value = false;
}
</script>
