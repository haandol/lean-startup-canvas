<template>
  <div>
    <main class="grid grid-cols-6 grid-rows-auto gap-4">
      <BoardCard v-for="board in boards" :board="board" :key="board.id" />
    </main>
  </div>
</template>

<script setup lang="ts">
const boards = [
  {
    id: 'sample',
    title: 'Setsquare BSS MVNO Billing System',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
  },
];
</script>

<style lang="postcss" scoped>
main {
  @apply p-4
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
