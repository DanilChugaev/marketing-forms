<template>
  <div class="column">
    <Label :id :label :required />

    <TreeSelect
        v-model="model"
        :options
        :placeholder
        filter
        filter-placeholder="Поиск"
        show-clear
        :input-id="id"
        :selection-mode="'checkbox'"
        :virtual-scroller-options="{ itemSize: 38 }"
        class="w-full"
    />

    <span class="info">{{description}}</span>
  </div>
</template>

<script setup lang="ts">
import TreeSelect from 'primevue/treeselect';
import Label from './Label.vue';
import type {TreeNode} from 'primevue/treenode';

const model = defineModel<string[]>();

defineProps<{
  id: string;
  label: string;
  options: TreeNode[];
  required?: boolean;
  placeholder?: string;
  description?: string;
}>();
</script>

<style>
.p-tree-node-toggle-button {
  display: none !important;
}
</style>
