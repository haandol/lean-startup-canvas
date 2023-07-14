<template>
  <div>
    <main>
      <header>
        <h1 contenteditable="true" @blur="onBlur">{{ board.title }}</h1>
      </header>
      <div class="sections grid grid-cols-10 gap-4 grid-rows-2 grid-flow-col-dense">
        <SectionCard v-for="section in board.sections" :section="section" :key="section.id" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const boardStore = useBoardStore();
boardStore.initBoard();

const { board } = storeToRefs(boardStore);

const onBlur = (e: Event) => {
  const target = e.target as HTMLDivElement;
  boardStore.updateBoardTitle(target.innerText);
};
</script>

<style lang="postcss" scoped>
main {
  @apply px-4
}

header h1 {
  &:focus {
    @apply outline-none;
  }

  @apply my-6 p-2 text-4xl font-bold text-center outline-none break-words;
}

.no-board {
  h1 {
    @apply text-2xl font-bold text-gray-500
  }

  button {
    &:hover {
      @apply bg-indigo-800
    }

    @apply text-white bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center
  }
}

@media only screen and (max-width: 768px) {
  .sections {
    @apply grid-cols-4 grid-flow-row-dense;
  }
}

@media only screen and (max-width: 480px) {
  .sections {
    @apply grid-cols-2 grid-flow-row-dense;
  }
}
</style>
