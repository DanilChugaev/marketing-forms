<template>
  <div class="form">
    <RequiredInfo />

    <Separator text="Основные настройки"/>

    <Text
        v-model="webhookUrl"
        id="webhookUrl"
        label="Ссылка на вебхук"
        required
    />

    <Separator text="Аудитория и таргеты"/>

    <Text
        v-model="formData.campaignName"
        id="campaignName"
        label="Название кампании"
        required
    />

    <Text
        v-model="formData.creativeTheme"
        id="creativeTheme"
        label="Тематика креатива"
        placeholder="Пример: подготовка к ЕГЭ с нуля"
        required
    />

    <Select
        v-model="formData.subjects"
        id="subjects"
        label="Предмет(ы)"
        placeholder="Выберите предмет(ы)"
        :options="subjects"
        description="При выборе предмета автоматически подставляются брендовые цвета в блок с брендовыми цветами"
        required
    />

    <Text
        v-model="formData.usp"
        id="usp"
        label="УТП / Ключевое сообщение"
        placeholder="Пример: поможем подготовиться к ЕГЭ или ОГЭ даже с нулевого уровня до высоких баллов"
        description="Какое сообщение хотим передать через креатив"
        type="textarea"
        required
    />

    <Checkboxes
        v-model="formData.gender"
        label="Целевая аудитория (пол)"
        :options="audienceGenderOptions"
        required
    />

    <Text
        v-model="formData.age"
        id="age"
        label="Целевая аудитория (возраст)"
        type="number"
        required
    />

    <Separator text="Элементы креатива"/>

    <Text
        v-model="formData.mainElement"
        id="mainElement"
        label="Основной элемент"
        placeholder="Пример: девушка с учебниками в руках, прижимает их к себе, улыбается"
        description="Это то, что первым бросается в глаза, когда человек видит креатив. Здесь должно быть что-то, что явно говорит о продукте или отсылает к целевой аудитории. Меняем только сам элемент."
        type="textarea"
        required
    />

    <Text
        v-model="formData.secondElement"
        id="secondElement"
        label="Вторичный элемент(ы) (не будет добавлен, если пусто)"
        placeholder="Пример: иконки книги, звездочек, график вверх"
        description="Это последний элемент, куда должен упасть взгляд у зрителя. Сюда стоит добавить указание скидки, призыв к действию, дополнительный элемент для усиления основного или оставить пустым. Меняем только сам элемент."
        type="textarea"
    />

    <Text
        v-model="formData.title"
        id="title"
        label="Заголовок (не будет добавлен, если пусто)"
        placeholder="Пример: Подготовка к ЕГЭ на 80+ баллов!"
    />

    <Text
        v-model="formData.subTitle"
        id="subTitle"
        label="Подзаголовок (не будет добавлен, если пусто)"
        placeholder="Пример: Эффективная подготовка за 2 месяца!"
    />

    <Text
        v-model="formData.buttonText"
        id="buttonText"
        label="Текст кнопки (не будет добавлена, если пусто)"
        placeholder="Пример: Записаться на урок"
    />

    <Separator text="Цвета и стиль"/>

<!--    блок с брендовыми цветами-->

    <Text
        v-model="formData.font"
        id="font"
        label="Шрифт для текстовых элементов"
        description="Предопределен, но его можно заменить. При новой генерации возвращаться к первоначальным заданным значениям"
    />

    <Text
        v-model="formData.style"
        id="style"
        label="Стиль"
        placeholder="Пример: современный, детский, яркий, минимализм, деловой, HDR-реализм"
        description="Заполняем самостоятельно"
    />

    <Text
        v-model="formData.background"
        id="background"
        label="Фон"
        placeholder="Пример: светлый, градиент от нежно голубого к солнечно-желтому"
        description="Заполняем самостоятельно - задаем цвет или цветовую комбинацию. Можно задать в формате #FFFFFF. Допустимы простые фоны с узором - линии, звездочки"
    />

    <Separator text="Дополнительно"/>

    <Upload
        v-model="formData.photo"
        id="photo"
        label="Фото для примера"
    />

    <Text
        v-model="formData.comments"
        id="comments"
        label="Пожелания"
        type="textarea"
    />

    <Errors :messages="errorMessages" />

    <Button :loading="isSendingFormData" @click="submitForm">Отправить</Button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStorage, useFetch } from '@vueuse/core'
import Button from 'primevue/button';
import { creativesFormSchema } from '../utils/validation.ts';
import {useNotifications} from '../composables/useNotification.ts';
import RequiredInfo from './Fields/RequiredInfo.vue';
import Text from './Fields/Text.vue';
import Errors from './Fields/Errors.vue';
import Select from './Fields/Select.vue';
import {audienceGenderOptions, subjects} from '../data/creatives.ts';
import Checkboxes from './Fields/Checkboxes.vue';
import Separator from './Fields/Separator.vue';
import type {CreativesFormData} from '../types.ts';
import Upload from './Fields/Upload.vue';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('creative-webhook-url', '');

const defaultFont = 'CoFo Gothic Trial';
const defaultFormData: CreativesFormData = {
  campaignName: '',       // название кампании
  creativeTheme: '',      // тематика креатива
  subjects: [],           // предмет(ы)
  usp: '',                // УТП / Ключевое сообщение
  gender: [],             // пол
  age: undefined,         // возраст
  mainElement: '',        // основной элемент
  secondElement: '',      // вторичный элемент
  title: '',              // заголовок
  subTitle: '',           // подзаголовок
  buttonText: '',         // текст кнопки
  // блок с брендовыми цветами
  font: defaultFont,      // шрифт для текстовых элементов
  style: '',              // стиль
  background: '',         // фон
  photo: '',              // фото для примера
  comments: '',
}

const formData = reactive({...defaultFormData})

const errorMessages = ref([]);
const isSendingFormData = ref(false);

async function submitForm() {
  errorMessages.value = [];
  const payload = {
    ...formData,
    subjects: Object.keys(formData.subjects)
  }

  try {
    await creativesFormSchema.parseAsync({
      webhookUrl: webhookUrl.value,
      ...payload,
    });
  } catch (error: any) {
    errorMessages.value = error.issues.map((issue: { message: string }) => issue.message);
    console.error('Ошибка валидации:', error.issues);

    return;
  }

  isSendingFormData.value = true;

  const { error, data } = await useFetch(webhookUrl.value)
      .post(payload)
      .json();

  if (data.value && data.value.success) {
    successNotify(data.value.message || 'Данные отправлены успешно');
    clearForm();
  } else if (error.value) {
    errorNotify(error.value);
  } else {
    errorNotify('Неизвестная ошибка, попробуйте позже');
  }

  isSendingFormData.value = false;
}

function clearForm() {
  Object.assign(formData, { ...defaultFormData });
}
</script>