<template>
  <component
      :is="tag || 'li'"
      :class="[
      'inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10',
      { 'cursor-not-allowed pointer-events-none text-disabled-900': disabled, 'font-medium': selected },
    ]"
      :disabled="disabled"
      data-testid="list-item"
  >
    <component :is="childrenTag" v-if="$slots.prefix" :class="disabled ? 'text-disabled-500' : 'text-neutral-500'">
      <slot name="prefix" />
    </component>
    <component
        :is="childrenTag"
        class="flex flex-col min-w-0"
        :class="[accountSidebarClass, displayInline ? 'w-auto' : 'w-full']"
    >
      <slot />
    </component>
    <component :is="childrenTag" v-if="$slots.suffix" :class="disabled ? 'text-disabled-500' : 'text-neutral-500'">
      <slot name="suffix" />
    </component>
  </component>
</template>

<script setup lang="ts">
import { type PropType, type ConcreteComponent } from 'vue';
import { SfListItemSize } from '@storefront-ui/vue';

const props = defineProps({
  size: {
    type: String as PropType<`${SfListItemSize}`>,
    default: SfListItemSize.base
  },
  accountSidebar: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  selected: {
    type: Boolean,
    default: false
  },
  tag: {
    type: [String, Object] as PropType<string | ConcreteComponent>,
    default: undefined
  },
  childrenTag: {
    type: String,
    default: 'div'
  },
  displayInline: {
    type: Boolean,
    default: false
  }
});
const accountSidebarClass = ref('');
if (props.accountSidebar) {
  accountSidebarClass.value = 'items-center gap-4 md:gap-8 !flex-row';
}
</script>
<script lang="ts">
export const sizeClasses = {
  [SfListItemSize.sm]: 'py-1',
  [SfListItemSize.base]: 'py-2',
  [SfListItemSize.lg]: 'p-4'
};
</script>
