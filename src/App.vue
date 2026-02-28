<template>
  <h1>Marketing forms</h1>

  <div class="forms">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Креативы</Tab>
        <Tab value="1">Семантика</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="0">
          <Creatives />
        </TabPanel>

        <TabPanel value="1">
          <Semantics />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Creatives from './components/Creatives.vue';
import Semantics from './components/Semantics.vue';
</script>

<style lang="postcss">
.forms {
  width: 100%;
}
</style>
