<template>
  <div>
    <main>
      <header>
        <h1>Import board file</h1>
      </header>
      <div class="grid grid-cols-3 grid-rows-2">
        <div class="col-span-3 text-center">
          <input type="file" @change="onChange" />
          <button class="primary" @click="onClick">Import</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const boardStore = useBoardStore();

const files = ref();

const onChange = (e: Event) => {
  files.value = (e.target as HTMLInputElement).files;
}

const onClick = async (e: Event) => {
  if (!files.value) {
    alert('select JSON file first.');
    return;
  }

  const file = (files.value[0] as File);

  if (file.type !== 'application/json') {
    alert('select only JSON file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (res) => {
    boardStore.fromJSON(res.target?.result?.toString())
    router.push('/boards/detail')
  }
  reader.onerror = (err) => {
    alert(err);
    return;
  }
  reader.readAsText(file);
};
</script>

<style lang="postcss" scoped>
header h1 {
  &:focus {
    @apply outline-none;
  }

  @apply my-6 p-2 text-4xl font-bold text-center outline-none break-words;
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
</style>
