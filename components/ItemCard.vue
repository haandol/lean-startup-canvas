<template>
  <div class="item-card">
    <div contenteditable @blur="onBlur" class="editable">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['updateItem']);
const props = defineProps<{
  index: number
  item: string
}>();

const onBlur = (e: Event) => {
  const target = e.target as HTMLDivElement;
  const value = target.innerText;

  emits('updateItem', { index: props.index, value });
};
</script>

<style lang="postcss" scoped>
.item-card {
  @apply my-2 p-2 border border-gray-200 rounded-lg shadow-sm min-h-[37px];
}

.editable {
  &:focus {
    @apply outline-none;
  }

  @apply outline-none break-words;
}
</style>