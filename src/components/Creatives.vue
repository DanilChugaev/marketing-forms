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
        v-model="subjects"
        id="subjects"
        label="Предмет(ы)"
        placeholder="Выберите предмет(ы)"
        :options="subjectsOptions"
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

<!--    блок с брендовыми цветами-->

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

    <Button :loading="isSendingFormData" @click="submitForm">Отправить</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStorage, useFetch } from '@vueuse/core'
import Button from 'primevue/button';
import { creativesFormSchema } from '../utils/validation.ts';
import { useNotifications } from '../composables/useNotification.ts';
import RequiredInfo from './Fields/RequiredInfo.vue';
import Text from './Fields/Text.vue';
import Errors from './Fields/Errors.vue';
import Select from './Fields/Select.vue';
import { genderOptions, subjectsOptions } from '../data/creatives.ts';
import Checkboxes from './Fields/Checkboxes.vue';
import Separator from './Fields/Separator.vue';
import Upload from './Fields/Upload.vue';

const { successNotify, errorNotify } = useNotifications();

const webhookUrl = useStorage('creative-webhook-url', '');
const campaignName = useStorage('creative-campaign-name', '');
const creativeTheme = useStorage('creative-creative-theme', '');
const subjects = useStorage<Record<string, any>>('creative-subjects', {});
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

async function submitForm() {
  errorMessages.value = [];

  const subjectsKeys = Object.keys(subjects.value);

  const payload = {
    campaignName: campaignName.value,       // название кампании
    creativeTheme: creativeTheme.value,      // тематика креатива
    usp: usp.value,                // УТП / Ключевое сообщение
    age: age.value,         // возраст
    mainElement: mainElement.value,        // основной элемент
    secondElement: secondElement.value,      // вторичный элемент
    title: title.value,              // заголовок
    subTitle: subTitle.value,           // подзаголовок
    buttonText: buttonText.value,         // текст кнопки
    // блок с брендовыми цветами
    font: font.value,      // шрифт для текстовых элементов
    style: style.value,              // стиль
    background: background.value,         // фон
    photo: photo.value,              // фото для примера
    comments: comments.value,
    subjects: subjectsKeys.includes('all') ? [''] : subjectsKeys, // предмет(ы)
    gender: gender.value.length === 2 ? [''] : gender.value, // пол
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
  } else if (error.value) {
    errorNotify(error.value);
  } else {
    errorNotify('Неизвестная ошибка, попробуйте позже');
  }

  isSendingFormData.value = false;
}

watch(() => subjects.value, (currentValue, oldValue) => {
  const currentKeys = Object.keys(currentValue);
  const oldKeys = Object.keys(oldValue);

  if (
      currentKeys.length > 1
      && currentKeys.includes('all')
      && oldKeys.includes('all')
      && oldKeys.length < currentKeys.length
  ) {
    delete subjects.value.all
  } else if (currentKeys.length > oldKeys.length && currentKeys.includes('all')) {
    subjects.value = {
      all: subjects.value.all,
    }
  }
})
</script>