<template>
  <nav class="flex justify-between gap-4">
    <div class="logo">
      <NuxtLink to="/">
        <NuxtImg src="/logo.png" width="180" />
      </NuxtLink>
    </div>
    <ul class="flex gap-2">
      <li>
        <button class="primary" @click="onExport">Export</button>
      </li>
      <li>
        <NuxtLink to="/boards/upload">
          <button class="primary">Upload</button>
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
const boardStore = useBoardStore();

const onExport = () => {
  saveAs(new Blob([JSON.stringify(boardStore.board, null, 2)], { type: 'application/json' }), `${boardStore.board.title || 'board'}.json`);
  boardStore.board.clean = true;
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