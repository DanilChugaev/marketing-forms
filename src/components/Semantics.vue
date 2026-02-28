<template>
  <div class="form">
    <div class="row">
      <span class="required">*</span>
      <span>Обязательные поля</span>
    </div>

    <div class="column">
      <label class="label" for="parsePhrases">Введите фразы для парсинга (каждый запрос с новой строки)<sup class="required">*</sup></label>
      <Textarea id="parsePhrases" v-model="formData.parsePhrases" required auto-resize/>
    </div>

    <div class="column">
      <label class="label" for="negativePhrases">Введите минус-фразы (каждая фраза с новой строки)</label>
      <Textarea id="negativePhrases" v-model="formData.negativePhrases" auto-resize/>
    </div>

    <div class="column">
      <label for="regions" class="label">Выберите регион</label>
      <TreeSelect
          v-model="formData.regions"
          :options="yandexDirectRegions"
          placeholder="Выберите регион"
          filter
          filterPlaceholder="Поиск по названию региона..."
          showClear
          inputId="regions"
          :selection-mode="'multiple'"
          :virtual-scroller-options="{ itemSize: 38 }"
          class="w-full"
      />
    </div>

    <div class="column">
      <div class="label">Добавлять исходные маски в проект?<sup class="required">*</sup></div>

      <div class="row">
        <RadioButton v-model="formData.includeMasks" input-id="mask_yes" value="yes" />
        <label class="label" for="mask_yes">Да</label>
      </div>

      <div class="row">
        <RadioButton v-model="formData.includeMasks" input-id="mask_no" value="no" />
        <label class="label" for="mask_no">Нет</label>
      </div>
    </div>

    <div class="column">
      <label for="baseFrequency" class="label">Собрать до базовой частоты (введите число или оставьте пустым)</label>
      <InputText id="baseFrequency" v-model.number="formData.baseFrequency" type="number" />
    </div>

    <div class="column">
      <div class="label">Требуется кластеризация фраз?<sup class="required">*</sup></div>

      <div class="row">
        <RadioButton v-model="formData.clusterPhrases" input-id="cluster_yes" value="yes" />
        <label class="label" for="cluster_yes">Да</label>
      </div>

      <div class="row">
        <RadioButton v-model="formData.clusterPhrases" input-id="cluster_no" value="no" />
        <label class="label" for="cluster_no">Нет</label>
      </div>
    </div>

    <ul v-if="errorMessages.length">
      <li v-for="message in errorMessages" :key="message" class="required">
        {{ message }}
      </li>
    </ul>

    <Button @click="submitForm">Отправить</Button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Textarea from 'primevue/textarea';
import TreeSelect from 'primevue/treeselect';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { semanticsFormSchema } from '../utils/validation.ts';

const formData = reactive({
  parsePhrases: '',
  negativePhrases: '',
  regions: [],
  includeMasks: '',
  baseFrequency: null,
  clusterPhrases: '',
})

const errorMessages = ref([]);

const yandexDirectRegions = [
  { key: '225', label: 'Россия' },
  { key: '1', label: 'Москва и Московская область' },
  { key: '213', label: 'Москва' },
  { key: '2', label: 'Санкт-Петербург' },
  { key: '10174', label: 'Санкт-Петербург и Ленинградская область' },
  { key: '3', label: 'Центр' },
  { key: '4', label: 'Белгород' },
  { key: '10645', label: 'Белгородская область' },
  { key: '5', label: 'Иваново' },
  { key: '6', label: 'Калуга' },
  { key: '7', label: 'Кострома' },
  { key: '8', label: 'Курск' },
  { key: '9', label: 'Липецк' },
  { key: '10', label: 'Орёл' },
  { key: '11', label: 'Рязань' },
  { key: '12', label: 'Смоленск' },
  { key: '13', label: 'Тамбов' },
  { key: '14', label: 'Тверь' },
  { key: '15', label: 'Тула' },
  { key: '16', label: 'Ярославль' },
  { key: '17', label: 'Северо-Запад' },
  { key: '18', label: 'Петрозаводск' },
  { key: '19', label: 'Сыктывкар' },
  { key: '20', label: 'Архангельск' },
  { key: '21', label: 'Вологда' },
  { key: '22', label: 'Калининград' },
  { key: '23', label: 'Мурманск' },
  { key: '24', label: 'Великий Новгород' },
  { key: '25', label: 'Псков' },
  { key: '26', label: 'Юг' },
  { key: '28', label: 'Махачкала' },
  { key: '30', label: 'Нальчик' },
  { key: '33', label: 'Владикавказ' },
  { key: '35', label: 'Краснодар' },
  { key: '36', label: 'Ставрополь' },
  { key: '37', label: 'Астрахань' },
  { key: '38', label: 'Волгоград' },
  { key: '39', label: 'Ростов-на-Дону' },
  { key: '40', label: 'Поволжье' },
  { key: '41', label: 'Йошкар-Ола' },
  { key: '42', label: 'Саранск' },
  { key: '43', label: 'Казань' },
  { key: '44', label: 'Ижевск' },
  { key: '45', label: 'Чебоксары' },
  { key: '46', label: 'Киров' },
  { key: '47', label: 'Нижний Новгород' },
  { key: '48', label: 'Оренбург' },
  { key: '49', label: 'Пенза' },
  { key: '50', label: 'Пермь' },
  { key: '51', label: 'Самара' },
  { key: '52', label: 'Урал' },
  { key: '53', label: 'Курган' },
  { key: '54', label: 'Екатеринбург' },
  { key: '55', label: 'Тюмень' },
  { key: '56', label: 'Челябинск' },
  { key: '57', label: 'Ханты-Мансийск' },
  { key: '58', label: 'Салехард' },
  { key: '59', label: 'Сибирь' },
  { key: '62', label: 'Красноярск' },
  { key: '63', label: 'Иркутск' },
  { key: '64', label: 'Кемерово' },
  { key: '65', label: 'Новосибирск' },
  { key: '66', label: 'Омск' },
  { key: '67', label: 'Томск' },
  { key: '68', label: 'Чита' },
  { key: '74', label: 'Якутск' },
  { key: '75', label: 'Владивосток' },
  { key: '76', label: 'Хабаровск' },
  { key: '77', label: 'Благовещенск' },
  { key: '78', label: 'Петропавловск-Камчатский' },
  { key: '79', label: 'Магадан' },
  { key: '80', label: 'Южно-Сахалинск' },
  { key: '172', label: 'Уфа' },
  { key: '191', label: 'Брянск' },
  { key: '192', label: 'Владимир' },
  { key: '193', label: 'Воронеж' },
  { key: '194', label: 'Саратов' },
  { key: '195', label: 'Ульяновск' },
  { key: '197', label: 'Барнаул' },
  { key: '198', label: 'Улан-Удэ' },
  { key: '235', label: 'Магнитогорск' },
  { key: '236', label: 'Набережные Челны' },
  { key: '237', label: 'Новокузнецк' },
  { key: '238', label: 'Новочеркасск' },
  { key: '239', label: 'Сочи' },
  { key: '240', label: 'Тольятти' },
  { key: '959', label: 'Севастополь' },
  { key: '977', label: 'Крым' },
  { key: '10646', label: 'Губкин' },
  { key: '10649', label: 'Старый Оскол' },
  { key: '10650', label: 'Брянская область' },
  { key: '10658', label: 'Владимирская область' },
  { key: '10672', label: 'Воронежская область' },
  { key: '10687', label: 'Ивановская область' },
  { key: '10693', label: 'Калужская область' },
  { key: '10699', label: 'Костромская область' },
  { key: '10705', label: 'Курская область' },
  { key: '10712', label: 'Липецкая область' },
  { key: '10716', label: 'Балашиха' },
  { key: '10722', label: 'Дубна' },
  { key: '10819', label: 'Тверская область' },
  { key: '10841', label: 'Ярославская область' },
  { key: '10842', label: 'Архангельская область' },
  { key: '10853', label: 'Вологодская область' },
  { key: '10857', label: 'Калининградская область' },
  { key: '10897', label: 'Мурманская область' },
  { key: '10904', label: 'Новгородская область' },
  { key: '10926', label: 'Псковская область' },
  { key: '10933', label: 'Республика Карелия' },
  { key: '10939', label: 'Республика Коми' },
  { key: '10946', label: 'Астраханская область' },
  { key: '10950', label: 'Волгоградская область' },
  { key: '10995', label: 'Краснодарский край' },
  { key: '11004', label: 'Республика Адыгея' },
  { key: '11010', label: 'Республика Дагестан' },
  { key: '11012', label: 'Республика Ингушетия' },
  { key: '11013', label: 'Кабардино-Балкарская Республика' },
  { key: '11020', label: 'Карачаево-Черкесская Республика' },
  { key: '11021', label: 'Республика Северная Осетия — Алания' },
  { key: '11024', label: 'Чеченская Республика' },
  { key: '11029', label: 'Ростовская область' },
  { key: '11069', label: 'Ставропольский край' },
  { key: '11070', label: 'Кировская область' },
  { key: '11077', label: 'Республика Марий Эл' },
  { key: '11079', label: 'Нижегородская область' },
  { key: '11084', label: 'Оренбургская область' },
  { key: '11095', label: 'Пензенская область' },
  { key: '11108', label: 'Пермский край' },
  { key: '11111', label: 'Республика Башкортостан' },
  { key: '11117', label: 'Республика Мордовия' },
  { key: '11119', label: 'Республика Татарстан' },
  { key: '11131', label: 'Самарская область' },
  { key: '11146', label: 'Саратовская область' },
  { key: '11148', label: 'Удмуртская Республика' },
  { key: '11153', label: 'Ульяновская область' },
  { key: '11156', label: 'Чувашская Республика' },
  { key: '11158', label: 'Курганская область' },
  { key: '11162', label: 'Свердловская область' },
  { key: '11176', label: 'Тюменская область' },
  { key: '11193', label: 'Ханты-Мансийский автономный округ' },
  { key: '11225', label: 'Челябинская область' },
  { key: '11232', label: 'Ямало-Ненецкий автономный округ' },
  { key: '11235', label: 'Алтайский край' },
  { key: '11266', label: 'Иркутская область' },
  { key: '11282', label: 'Кемеровская область' },
  { key: '11309', label: 'Красноярский край' },
  { key: '11316', label: 'Новосибирская область' },
  { key: '11318', label: 'Омская область' },
  { key: '11330', label: 'Республика Бурятия' },
  { key: '11340', label: 'Республика Хакасия' },
  { key: '11353', label: 'Томская область' },
  { key: '11375', label: 'Амурская область' },
  { key: '11398', label: 'Камчатский край' },
  { key: '11403', label: 'Магаданская область' },
  { key: '11409', label: 'Приморский край' },
  { key: '11443', label: 'Республика Саха (Якутия)' },
  { key: '11450', label: 'Сахалинская область' },
  { key: '11457', label: 'Хабаровский край' },
  { key: '21949', label: 'Забайкальский край' },
  { key: '10231', label: 'Республика Алтай' },
  { key: '10233', label: 'Республика Тыва' },
  { key: '10243', label: 'Еврейская автономная область' },
  { key: '10251', label: 'Чукотский автономный округ' },
  { key: '10176', label: 'Ненецкий автономный округ' },
  { key: '149', label: 'Беларусь' },
  { key: '159', label: 'Казахстан' },
  { key: '111', label: 'Европа' },
  { key: '166', label: 'СНГ' },
  { key: '183', label: 'Азия' },
  { key: '318', label: 'Универсальное' },
  { key: '-1', label: 'Весь мир' },
  { key: '0', label: 'Без учёта региона' }
];

async function submitForm() {
  try {
    await semanticsFormSchema.parseAsync(formData);
    console.log('Форма валидна:', formData);
  } catch (error: any) {
    errorMessages.value = error.issues.map((issue: { message: string }) => issue.message);
    console.error('Ошибка валидации:', error.issues);
  }
}
</script>