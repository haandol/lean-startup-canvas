<template>
  <div>
    <main class="grid grid-cols-6 grid-rows-auto gap-4">
      <BoardCard
        v-for="board in boards"
        :board="board"
        :key="board.id"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
const boards = [
  {
    id: 'sample',
    title: 'EncBird-V1',
    description: '직장인이 쉽게 어휘력을 키울 수 있는 앱',
  },
]
</script>

<style lang="postcss" scoped>
main {
  @apply p-4;
}

@media only screen and (max-width: 768px) {
  .grid {
    @apply grid-cols-2;
  }
}

@media only screen and (max-width: 480px) {
  .grid {
    @apply grid-cols-1;
  }
}
</style>
