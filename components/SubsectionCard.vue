<template>
  <section class="subsection-card">
    <div class="header">
      <h3>{{ subsection.title }}</h3>
    </div>
    <div class="body">
      <ItemCard v-for="(item, index) in subsection.items" :item="item" :key="index" :index="index"
        @update-item="onUpdateItem" />
      <NewItemButton @add="onAddItem" />
    </div>
  </section>
</template>

<script setup lang="ts">
type Subsection = {
  sectionId: number
  subsection: {
    title: string
    items: string[]
  }
}
const props = defineProps<Subsection>();

const boardStore = useBoardStore();
const { board } = storeToRefs(boardStore);

const section = computed(() => {
  return board.value.sections.find((section) => section.id === props.sectionId);
});

const onAddItem = () => {
  board.value.dirty = true
  props.subsection.items.push('')
}

const onUpdateItem = (event: { index: number, value: string }) => {
  board.value.dirty = true
  props.subsection.items[event.index] = event.value;
}
</script>

<style lang="postcss" scoped>
.header {
  h3 {
    @apply px-4 mt-10 font-bold tracking-tight text-gray-900
  }
}

.body {
  @apply m-4 text-sm text-black
}
</style>