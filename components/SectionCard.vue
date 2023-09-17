<template>
  <section class="section-card col-span-2">
    <div class="header">
      <h3>{{ section.title }}</h3>
      <p>{{ section.description }}</p>
    </div>
    <div class="body">
      <ItemCard v-for="(item, index) in section.items" :item="item" :key="index" :index="index"
        @update-item="onUpdateItem" />
      <NewItemButton @add="onAddItem" />
    </div>
    <SubsectionCard v-if="section.subsection" :subsection="section.subsection" :section-id="section.id" />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

type Section = {
  section: {
    id: number
    title: string
    description: string
    items: string[]
    subsection?: SubSection
  }
}
type SubSection = {
  title: string
  items: string[]
}

const props = defineProps<Section>();

const boardStore = useBoardStore();
const { board } = storeToRefs(boardStore);

const section = computed(() => {
  return board.value.sections.find((section) => section.id === props.section.id);
});

const onAddItem = () => {
  board.value.dirty = true;
  if (section.value) {
    section.value.items.push('')
  }
}

const onUpdateItem = (event: { index: number, value: string }) => {
  board.value.dirty = true;
  if (section.value) {
    section.value.items[event.index] = event.value;
  }

}
</script>

<style lang="postcss" scoped>
.section-card {
  &:nth-child(1) {
    @apply row-span-2 border-[#FF4858]
  }

  &:nth-child(2) {
    @apply border-orange-300
  }

  &:nth-child(3) {
    @apply border-orange-600
  }

  &:nth-child(4) {
    @apply border-[#1B7F79];
  }

  &:nth-child(5) {
    @apply border-green-300;
  }

  &:nth-child(6) {
    @apply border-[#72F2EB];
  }

  &:nth-child(7) {
    @apply border-[#00CCC0];
  }

  &:nth-child(3n+4) {
    @apply row-span-2
  }

  @apply border-2 border-gray-200 rounded-lg shadow-md
}

@media (max-width: 480px) {
  .section-card {
    @apply mx-auto w-full;
  }
}

.header {
  h3 {
    @apply mb-2 text-2xl font-bold tracking-tight text-gray-900
  }

  p {
    @apply text-sm text-gray-500 mb-2
  }

  & {
    @apply border-b-[1px] py-2 px-4 border-inherit
  }
}

.body {
  @apply p-4 text-sm text-black
}
</style>