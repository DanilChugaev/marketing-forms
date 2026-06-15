<template>
  <h1>Marketing forms</h1>

  <div class="forms">
    <Tabs v-model:value="selectedForm">
      <TabList>
        <Tab value="0">Креативы</Tab>
        <Tab value="1">Проверка минус-слов</Tab>
        <Tab value="2">Настройка уведомлений статистики</Tab>
        <!--         <Tab value="3">Расширение семантического ядра</Tab> -->
      </TabList>

      <TabPanels>
        <TabPanel value="0">
          <Creatives />
        </TabPanel>

        <TabPanel value="1">
          <Campaign />
        </TabPanel>

        <TabPanel value="2">
          <Statistics />
        </TabPanel>

        <TabPanel value="3">
          <Semantics />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>

  <Toast position="top-right" />
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Toast from 'primevue/toast';
import { useStorage } from '@vueuse/core';

import Creatives from './components/Creatives.vue';
import Semantics from './components/Semantics.vue';
import Campaign from './components/Campaign.vue';
import Statistics from './components/Statistics.vue';

const selectedForm = useStorage('selected-form', '0');
</script>

<style lang="postcss">
.forms {
  width: 100%;
}
</style>
