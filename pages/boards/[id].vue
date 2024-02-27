<template>
  <div>
    <main>
      <header>
        <h1 contenteditable="true" @blur="onBlur">{{ board.title }}</h1>
      </header>
      <div v-if="board.title" class="sections grid grid-cols-10 gap-4 grid-rows-2 grid-flow-col-dense">
        <SectionCard v-for="section in board.sections" :section="section" :key="section.id" />
      </div>
      <div v-else class="no-board grid grid-cols-1 grid-rows-auto gap-2">
        <h1 class="justify-self-center">Board not found</h1>
        <NuxtLink class="justify-self-center" to="/">
          <button>Back to main</button>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const router = useRouter();

const boardStore = useBoardStore();

const { board } = storeToRefs(boardStore);

onMounted(async () => {
  await boardStore.fetch(router.currentRoute.value.params.id as string);
});

router.beforeResolve((to, from, next) => {
  if (board.value.dirty) {
    const answer = window.confirm('You have unexported changes. Are you sure you want to leave?');
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

window.onbeforeunload = () => {
  if (board.value.dirty) {
    return 'You have unexported changes. Are you sure you want to leave?';
  }
}

const onBlur = (e: Event) => {
  const target = e.target as HTMLInputElement;
  boardStore.updateTitle(target.innerText);
}
</script>

<style lang="postcss" scoped>
main {
  @apply px-4 pb-4
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
