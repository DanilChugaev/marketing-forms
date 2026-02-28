<template>
  <div class="form">
    <div class="row">
      <span class="required">*</span>
      <span>Обязательные поля</span>
    </div>

    <div class="column">
      <label class="label" for="webhookUrl">Ссылка на вебхук<sup class="required">*</sup></label>
      <InputText id="webhookUrl" v-model="webhookUrl" required />
    </div>

    <div class="column">
      <label class="label" for="campaignName">Название компании<sup class="required">*</sup></label>
      <InputText id="campaignName" v-model="formData.campaignName" placeholder="Введите название компании" required />
    </div>

    <div class="column">
      <label class="label" for="theme">Тематика креатива<sup class="required">*</sup></label>
      <InputText id="theme" v-model="formData.theme" placeholder="Введите тематику креатива" required />
    </div>

    <div class="column">
      <label class="label" for="usp">УТП / Ключевое сообщение<sup class="required">*</sup></label>
      <InputText id="usp" v-model="formData.usp" placeholder="Введите ключевое сообщение" required />
    </div>

    <div class="column">
      <div class="label">Целевая аудитория (пол)<sup class="required">*</sup></div>

      <div
          v-for="gender in audienceGenderOptions"
          :key="gender.value"
          class="row"
      >
        <Checkbox :inputId="gender.value" v-model="formData.audienceGender" :value="gender.value" />
        <label class="label" :for="gender.value">{{ gender.label }}</label>
      </div>
    </div>

    <div class="column">
      <div class="label">Целевая аудитория (возраст)<sup class="required">*</sup></div>

      <div
          v-for="age in audienceAgeOptions"
          :key="age.value"
          class="row"
      >
        <Checkbox :inputId="age.value" v-model="formData.audienceAge" :value="age.value" />
        <label class="label" :for="age.value">{{ age.label }}</label>
      </div>
    </div>

    <div class="column">
      <div class="label">Стиль креатива<sup class="required">*</sup></div>

      <div
          v-for="style in styleOptions"
          :key="style.value"
          class="row"
      >
        <Checkbox :inputId="style.value" v-model="formData.style" :value="style.value" />
        <label class="label" :for="style.value">{{ style.label }}</label>
        <InputText v-if="style.value === 'other_style'" v-model="formData.otherCreativeStyle" name="otherCreativeStyle"/>
      </div>
    </div>

    <div class="column">
      <div class="label">Цветовая схема<sup class="required">*</sup></div>

      <div
          v-for="color in colorsOptions"
          :key="color.value"
          class="row"
      >
        <Checkbox :inputId="color.value" v-model="formData.colors" :value="color.value" />
        <label class="label" :for="color.value">{{ color.label }}</label>
        <InputText v-if="color.value === 'other_color'" v-model="formData.otherColorScheme" name="otherColorScheme"/>
        <InputText v-if="color.value === 'custom'" name="" v-model="formData.customColorScheme"/>
      </div>
    </div>

    <div class="column">
      <div class="label">Размер креатива<sup class="required">*</sup></div>

      <div
          v-for="size in formatOptions"
          :key="size.value"
          class="row"
      >
        <Checkbox :inputId="size.value" v-model="formData.format" :value="size.value" />
        <label class="label" :for="size.value">{{ size.label }}</label>
      </div>
    </div>

    <div class="column">
      <label class="label" for="folderUrl">Ссылка на папку в Гугл Диске</label>
      <InputText id="folderUrl" v-model="folderUrl" placeholder="Введите ссылку" />
    </div>

    <div class="column">
      <label class="label" for="comments">Дополнительные пожелания</label>
      <InputText id="comments" v-model="formData.comments" placeholder="Введите пожелания" />
    </div>

    <ul v-if="errorMessages.length">
      <li v-for="message in errorMessages" :key="message" class="required">
        {{message}}
      </li>
    </ul>

    <Button @click="submitForm">Отправить</Button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStorage, useFetch } from '@vueuse/core'
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { creativesFormSchema } from '../utils/validation.ts';
import {useNotifications} from '../composables/useNotification.ts';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('creative-webhook-url', '');
const folderUrl = useStorage('creative-folder-url', '');

const formData = reactive({
  webhookUrl: webhookUrl.value,

  campaignName: '',
  theme: '',
  usp: '',
  audienceGender: [],
  audienceAge: [],
  style: [],
  colors: [],
  format: [],
  folderUrl: folderUrl.value,
  comments: '',

  otherCreativeStyle: '',
  otherColorScheme: '',
  customColorScheme: '',
})

const errorMessages = ref([]);

const audienceGenderOptions = [
  { value: 'female', label: 'Женщины' },
  { value: 'male', label: 'Мужчины' },
]

const audienceAgeOptions = [
  { value: '0-18', label: '0-18 лет' },
  { value: '15-24', label: '15-24 года' },
  { value: '25-34', label: '25-34 года' },
  { value: '35-44', label: '35-44 года' },
  { value: '45-54', label: '45-54 года' },
  { value: '55+', label: '55+ лет' },
]

const styleOptions = [
  { value: 'minimalist', label: 'Минимализм' },
  { value: 'bright_and_catchy', label: 'Яркий и сочный' },
  { value: 'corporate', label: 'Корпоративный' },
  { value: 'retro', label: 'Ретро' },
  { value: 'funny', label: 'Мультяшный' },
  { value: 'memes', label: 'Мемный' },
  { value: 'photography', label: 'Фотография' },
  { value: 'other_style', label: 'Другое' },
];

const colorsOptions = [
  { value: 'red_and_white', label: 'Красный + белый' },
  { value: 'blue_and_white', label: 'Синий + белый' },
  { value: 'green_and_white', label: 'Зеленый + белый' },
  { value: 'black_and_gold', label: 'Черный + золотой' },
  { value: 'pink_and_white', label: 'Розовый + белый' },
  { value: 'other_color', label: 'Другое' },
  { value: 'custom', label: 'Брендовые цвета (rgb через запятую)' }
];

const formatOptions = [
  { value: '1080x1080', label: '1080x1080 (ТГО)' },
  { value: '1080x607', label: '1080x607 (ТГО)' },
  { value: '200x400', label: '200x400 (ГО десктопы)' },
  { value: '300x250', label: '300x250 (ГО десктопы)' },
  { value: '300x500', label: '300x500 (ГО десктопы)' },
  { value: '300x600', label: '300x600 (ГО десктопы)' },
  { value: '336x280', label: '336x280 (ГО десктопы)' },
  { value: '728x90', label: '728x90 (ГО десктопы)' },
  { value: '970x250', label: '970x250 (ГО десктопы)' },
  { value: '640x100', label: '640x100 (ГО мобилки)' },
  { value: '640x200', label: '640x200 (ГО мобилки)' },
  { value: '640x960', label: '640x960 (ГО мобилки)' },
  { value: '940x640', label: '940x640 (ГО мобилки)' },
];

async function submitForm() {
  errorMessages.value = [];

  try {
    await creativesFormSchema.parseAsync(formData);
    console.log('Форма валидна:', formData);
  } catch (error: any) {
    errorMessages.value = error.issues.map((issue: { message: string }) => issue.message);
    console.error('Ошибка валидации:', error.issues);
    return;
  }

  const { error, data } = await useFetch(webhookUrl.value)
      .post({
        campaignName: formData.campaignName,
        theme: formData.theme,
        usp: formData.usp,
        audienceGender: formData.audienceGender,
        audienceAge: formData.audienceAge,
        style: formData.otherCreativeStyle ? [...formData.style, formData.otherCreativeStyle] : formData.style,
        colors: formData.otherColorScheme ? [...formData.colors, formData.otherColorScheme] : formData.colors,
        format: formData.format,
        folderUrl: formData.folderUrl,
        comments: formData.comments,
      })
      .json();

  if (data.value && data.value.success) {
    successNotify(data.value.message || 'Данные отправлены успешно');
    clearForm();
    return;
  }

  if (error.value) {
    errorNotify(error.value);
    return;
  }

  errorNotify('Неизвестная ошибка, попробуйте позже');
}

function clearForm() {
  formData.campaignName = '';
  formData.theme = '';
  formData.usp = '';
  formData.audienceGender = [];
  formData.audienceAge = [];
  formData.style = [];
  formData.otherCreativeStyle = '';
  formData.colors = [];
  formData.otherColorScheme = '';
  formData.format = [];
  formData.comments = '';
}
</script>