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

    <Text v-model="id" id="campaign" label="ID кампании" required />

    <Button :loading="isSendingFormData" @click="submitForm">{{
      isSendingFormData ? 'Идет обработка...' : 'Отправить'
    }}</Button>

    <!-- Отображение данных ответа -->
    <div
      v-if="showResponse && responseData.length > 0"
      class="response-section"
    >
      <div class="response-header">
        <h3>Результат анализа:</h3>
      </div>

      <div class="response-block">
        <template
          v-if="
            responseData &&
            responseData.length > 0 &&
            !!responseData[0].negative_word
          "
        >
          <div class="section-title">
            ⚠️ Подозрительные отрицательные слова:
          </div>

          <div class="negatives-list">
            <div
              v-for="(negative, negIndex) in responseData"
              :key="negIndex"
              class="negative-item"
            >
              <div class="negative-word">{{ negative.negative_word }}</div>

              <div class="negative-details">
                <div class="column">
                  <span class="label">Причина:</span>
                  <span class="value">{{ negative.reason }}</span>
                </div>

                <div class="column">
                  <span class="label">Уверенность:</span>
                  <span
                    class="value confidence"
                    :class="'confidence-' + negative.confidence"
                  >
                    {{ translateConfidence(negative.confidence) }}
                  </span>
                </div>

                <div class="column">
                  <span class="label">Рекомендация:</span>
                  <span class="value recommendation">{{
                    translateRecommendation(negative.recommendation)
                  }}</span>
                </div>

                <div
                  v-if="
                    negative.conflicting_keywords &&
                    negative.conflicting_keywords.length > 0
                  "
                  class="column"
                >
                  <span class="label">Конфликтующие ключевые слова:</span>
                  <span class="value">{{
                    negative.conflicting_keywords.join(', ')
                  }}</span>
                </div>

                <div class="column">
                  <span class="label">Источник:</span>
                  <span class="value">{{ negative.source }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="no-negatives">
            Подозрительные отрицательные слова не найдены.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStorage, useFetch } from '@vueuse/core';
import RequiredInfo from './Fields/RequiredInfo.vue';
import Text from './Fields/Text.vue';
import Button from 'primevue/button';
import type { CampaignFormData } from '../types.ts';
import { campaignFormSchema } from '../utils/validation.ts';
import { useNotifications } from '../composables/useNotification.ts';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('campaign-webhook-url', '');
const id = useStorage('creative-campaign-id', '');

const errorMessages = ref([]);
const isSendingFormData = ref(false);
const responseData = ref<any[]>([]);
const showResponse = ref(false);

async function submitForm() {
  errorMessages.value = [];
  resetResponse();

  const payload: CampaignFormData = {
    id: id.value, // ID кампании
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
    if (
      data.value?.data &&
      Array.isArray(data.value.data.all_suspicious_negatives)
    ) {
      responseData.value = data.value.data.all_suspicious_negatives;
      showResponse.value = true;
    }
  } else if (error.value) {
    errorNotify(error.value);
  } else {
    errorNotify('Неизвестная ошибка, попробуйте позже');
  }

  isSendingFormData.value = false;
}

function clearForm() {
  id.value = '';
}

// Сброс отображения ответа
function resetResponse() {
  showResponse.value = false;
  responseData.value = [];
}

function translateConfidence(confidence: string): string {
  const map: Record<string, string> = {
    high: 'Высокая',
    medium: 'Средняя',
    low: 'Низкая',
  };
  return map[confidence] || confidence;
}

function translateRecommendation(rec: string): string {
  const map: Record<string, string> = {
    keep_for_review: 'Проверить вручную',
    remove: 'Удалить',
  };
  return map[rec] || rec;
}
</script>
