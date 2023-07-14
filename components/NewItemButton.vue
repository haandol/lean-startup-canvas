<template>
  <div>
    <button @click="$emit('add')">+ Add Item</button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['add']);
</script>

<style lang="postcss" scoped>
button {
  &:hover {
    @apply text-gray-300 bg-gray-700
  }

  @apply text-gray-700 bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center w-full
}
</style>