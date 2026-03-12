<template>
  <ul v-if="messages.length">
    <li v-for="message in messages" :key="message" class="required">
      {{message}}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  messages: string[]
}>();
</script>
