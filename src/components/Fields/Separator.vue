<template>
  <div class="separator">
    {{text}}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>();
</script>

<style scoped lang="postcss">
.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background-color: var(--bg-color);
}
</style>