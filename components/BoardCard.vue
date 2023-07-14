<template>
  <div class="board-card">
    <NuxtLink :to="`/boards/${board.id}`">
      <h3>{{ board.title }}</h3>
      <p>{{ board.description }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
type Board = {
  id: string
  title: string
  description: string
}
defineProps<{ board: Board }>()
</script>

<style lang="postcss" scoped>
.board-card {
  &:hover {
    @apply bg-gray-100
  }

  @apply block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md
}

h3 {
  @apply mb-2 text-2xl font-bold tracking-tight text-gray-900
}

p {
  @apply font-normal text-gray-700
}
</style>