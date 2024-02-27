<template>
  <nav class="flex justify-between gap-4">
    <div class="logo">
      <NuxtLink to="/">
        <div class="flex items-center gap-2">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 7l10 5 10-5"></path>
          </svg>
          <h1 class="text-2xl font-bold">Lean Canvas</h1>
        </div>
      </NuxtLink>
    </div>
    <ul class="flex gap-2">
      <li>
        <button class="primary" @click="onExport">Export</button>
      </li>
      <li>
        <NuxtLink to="/boards/import">
          <button class="primary">Import</button>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/boards/new">
          <button class="secondary">New</button>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { saveAs } from 'file-saver';
import { storeToRefs } from 'pinia';

const route = useRoute();
const boardStore = useBoardStore();

const { board } = storeToRefs(boardStore)

const onExport = () => {
  saveAs(new Blob([JSON.stringify(boardStore.board, null, 2)], { type: 'application/json' }), `${boardStore.board.title || 'board'}.json`);
  boardStore.board.dirty = false;
}
</script>

<style lang="postcss" scoped>
nav {
  @apply bg-white border-b-[1px] border-b-gray-200 p-5
}

@media only screen and (max-width: 600px) {
  .logo {
    @apply align-middle w-fit mx-auto
  }

  ul {
    @apply w-fit mx-auto
  }

  nav {
    @apply flex-col border-solid border-2 justify-center
  }
}

.primary {
  &:hover {
    @apply bg-blue-800
  }

  &:focus {
    @apply ring-4 ring-blue-300
  }

  @apply text-white bg-blue-500 font-medium rounded-lg text-sm px-6 py-2
}

.secondary {
  &:hover {
    @apply bg-green-800
  }

  &:focus {
    @apply ring-4 ring-green-300
  }

  @apply text-white bg-green-500 font-medium rounded-lg text-sm px-6 py-2
}
</style>