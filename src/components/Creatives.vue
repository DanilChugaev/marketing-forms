<template>
  <div class="form">
    <div class="row">
      <RequiredInfo class="flex-1" />

      <Button @click="clearForm">Очистить форму</Button>
    </div>


    <Separator text="Основные настройки"/>

    <Text
        v-model="webhookUrl"
        id="webhookUrl"
        label="Ссылка на вебхук"
        required
    />

    <Separator text="Аудитория и таргеты"/>

    <Text
        v-model="campaignName"
        id="campaignName"
        label="Название кампании"
        required
    />

    <Text
        v-model="creativeTheme"
        id="creativeTheme"
        label="Тематика креатива"
        placeholder="Пример: подготовка к ЕГЭ с нуля"
        required
    />

    <Select
        v-model="subject"
        id="subject"
        label="Предмет"
        placeholder="Выберите предмет"
        :options="subjectOptions"
        description="При выборе предмета автоматически подставляются брендовые цвета в блок с брендовыми цветами"
        required
    />

    <Text
        v-model="usp"
        id="usp"
        label="УТП / Ключевое сообщение"
        placeholder="Пример: поможем подготовиться к ЕГЭ или ОГЭ даже с нулевого уровня до высоких баллов"
        description="Какое сообщение хотим передать через креатив"
        type="textarea"
        required
    />

    <Checkboxes
        v-model="gender"
        label="Целевая аудитория (пол)"
        :options="genderOptions"
        required
    />

    <Text
        v-model="age"
        id="age"
        label="Целевая аудитория (возраст)"
        type="number"
        required
    />

    <Separator text="Элементы креатива"/>

    <Text
        v-model="mainElement"
        id="mainElement"
        label="Основной элемент"
        placeholder="Пример: девушка с учебниками в руках, прижимает их к себе, улыбается"
        description="Это то, что первым бросается в глаза, когда человек видит креатив. Здесь должно быть что-то, что явно говорит о продукте или отсылает к целевой аудитории. Меняем только сам элемент."
        type="textarea"
        required
    />

    <Text
        v-model="secondElement"
        id="secondElement"
        label="Вторичный элемент(ы) (не будет добавлен, если пусто)"
        placeholder="Пример: иконки книги, звездочек, график вверх"
        description="Это последний элемент, куда должен упасть взгляд у зрителя. Сюда стоит добавить указание скидки, призыв к действию, дополнительный элемент для усиления основного или оставить пустым. Меняем только сам элемент."
        type="textarea"
    />

    <Text
        v-model="title"
        id="title"
        label="Заголовок (не будет добавлен, если пусто)"
        placeholder="Пример: Подготовка к ЕГЭ на 80+ баллов!"
    />

    <Text
        v-model="subTitle"
        id="subTitle"
        label="Подзаголовок (не будет добавлен, если пусто)"
        placeholder="Пример: Эффективная подготовка за 2 месяца!"
    />

    <Text
        v-model="buttonText"
        id="buttonText"
        label="Текст кнопки (не будет добавлена, если пусто)"
        placeholder="Пример: Записаться на урок"
    />

    <Separator text="Цвета и стиль"/>

    <Text
        :model-value="brandBackground"
        id="brandBackground"
        label="Брендовый цвет фона"
        disabled
    />

    <Text
        :model-value="brandIllustrations"
        id="brandIllustrations"
        label="Брендовый цвет иллюстрации"
        disabled
    />

    <Text
        v-model="font"
        id="font"
        label="Шрифт для текстовых элементов"
        description="Предопределен, но его можно заменить. При новой генерации возвращаться к первоначальным заданным значениям"
    />

    <Text
        v-model="style"
        id="style"
        label="Стиль"
        placeholder="Пример: современный, детский, яркий, минимализм, деловой, HDR-реализм"
        description="Заполняем самостоятельно"
    />

    <Text
        v-model="background"
        id="background"
        label="Фон"
        placeholder="Пример: светлый, градиент от нежно голубого к солнечно-желтому"
        description="Заполняем самостоятельно - задаем цвет или цветовую комбинацию. Можно задать в формате #FFFFFF. Допустимы простые фоны с узором - линии, звездочки"
    />

    <Separator text="Дополнительно"/>

    <Upload
        v-model="photo"
        id="photo"
        label="Фото для примера"
    />

    <Text
        v-model="comments"
        id="comments"
        label="Пожелания"
        type="textarea"
    />

    <Errors :messages="errorMessages" />

    <Button :loading="isSendingFormData" @click="submitForm">{{ isSendingFormData ? 'Идет обработка...' : 'Отправить' }}</Button>

    <div v-if="resultImageUrl" class="row row--bottom">
      <Text
          v-model="resultImageUrl"
          id="resultImageUrl"
          label="Результат"
          class="flex-1"
      />

      <Button @click="copy(resultImageUrl)">Скопировать</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import { useStorage, useFetch, useClipboard } from '@vueuse/core'
import Button from 'primevue/button';
import { creativesFormSchema } from '../utils/validation.ts';
import { useNotifications } from '../composables/useNotification.ts';
import RequiredInfo from './Fields/RequiredInfo.vue';
import Text from './Fields/Text.vue';
import Errors from './Fields/Errors.vue';
import Select from './Fields/Select.vue';
import { brandBackgroundOptions, brandIllustrationsOptions, genderOptions, subjectOptions } from '../data/creatives.ts';
import Checkboxes from './Fields/Checkboxes.vue';
import Separator from './Fields/Separator.vue';
import Upload from './Fields/Upload.vue';
import type { CreativesFormData } from '../types.ts';

const { successNotify, errorNotify } = useNotifications();
const { copy } = useClipboard()

const webhookUrl = useStorage('creative-webhook-url', '');
const campaignName = useStorage('creative-campaign-name', '');
const creativeTheme = useStorage('creative-creative-theme', '');
const subject = useStorage<Record<string, any>>('creative-subject', {});
const usp = useStorage('creative-usp', '');
const gender = useStorage('creative-gender', []);
const age = useStorage('creative-age', undefined);
const mainElement = useStorage('creative-main-element', '');
const secondElement = useStorage('creative-second-element', '');
const title = useStorage('creative-title', '');
const subTitle = useStorage('creative-subTitle', '');
const buttonText = useStorage('creative-buttonText', '');
const style = useStorage('creative-style', '');
const background = useStorage('creative-background', '');
const photo = useStorage('creative-photo', '');
const comments = useStorage('creative-comments', '');

const defaultFont = 'CoFo Gothic Trial';

const font = ref(defaultFont);
const errorMessages = ref([]);
const isSendingFormData = ref(false);
const resultImageUrl = ref('');

const subjectKey = computed<string>(() => Object.keys(subject.value ?? {})[0] ?? '');
const brandBackground = computed<string>(() => brandBackgroundOptions[subjectKey.value] ?? '');
const brandIllustrations = computed<string>(() => brandIllustrationsOptions[subjectKey.value] ?? '');

async function submitForm() {
  errorMessages.value = [];

  let genderValue = '';

  if (gender.value.length > 1) {
    genderValue = `${genderOptions[0]!.value}, ${genderOptions[1]!.value}`;
  } else {
    genderValue = gender.value[0] ?? '';
  }

  const payload: CreativesFormData = {
    campaignName: campaignName.value,             // название кампании
    creativeTheme: creativeTheme.value,           // тематика креатива
    usp: usp.value,                               // УТП / Ключевое сообщение
    age: age.value,                               // возраст
    mainElement: mainElement.value,               // основной элемент
    secondElement: secondElement.value,           // вторичный элемент
    title: title.value,                           // заголовок
    subTitle: subTitle.value,                     // подзаголовок
    buttonText: buttonText.value,                 // текст кнопки
    brandBackground: brandBackground.value,       // брендовый цвет фона
    brandIllustrations: brandIllustrations.value, // брендовый цвет иллюстрации
    font: font.value,                             // шрифт для текстовых элементов
    style: style.value,                           // стиль
    background: background.value,                 // фон
    photo: photo.value,                           // фото для примера
    comments: comments.value,                     // пожелания
    subject: subjectKey.value,                    // предмет
    gender: genderValue,                          // пол
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
      .post({
        ...payload,
        subject: subjectKey.value === 'all' ? '' : subjectKey.value,
      })
      .json();

  if (data.value && data.value.success) {
    resultImageUrl.value = data.value.imageUrl;
    successNotify(data.value.message || 'Данные успешно обработаны');
  } else if (error.value) {
    errorNotify(error.value);
  } else {
    errorNotify('Неизвестная ошибка, попробуйте позже');
  }

  isSendingFormData.value = false;
}

function clearForm() {
  campaignName.value = '';
  creativeTheme.value = '';
  subject.value = {};
  usp.value = '';
  gender.value = [];
  age.value = undefined;
  mainElement.value = '';
  secondElement.value = '';
  title.value = '';
  subTitle.value = '';
  buttonText.value = '';
  style.value = '';
  background.value = '';
  photo.value = '';
  comments.value = '';
}
</script>