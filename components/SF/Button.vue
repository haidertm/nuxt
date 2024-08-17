<template>
  <component
      :is="tagWithDefaults"
      :type="type"
      :disabled="disabled"
      :class="[
      'font-medium text-base focus-visible:outline-offset-0 focus-visible:outline-0 disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses[variant],
    ]"
      data-testid="button"
      @click="$emit('click')"
  >
    <slot v-if="$slots.prefix" name="prefix" />
    <slot />
    <slot v-if="$slots.suffix" name="suffix" />
  </component>
</template>

<script setup lang="ts">
import { type ConcreteComponent } from 'vue';

import { useAttrsRef, SfButtonSize, SfButtonVariant } from '@storefront-ui/vue';

const variantClasses = {
  [SfButtonVariant.primary]: 'text-white bg-primary-medium disabled:bg-disabled-300',
  [SfButtonVariant.secondary]: 'text-primary-medium disabled:ring-1 disabled:ring-disabled-300 disabled:bg-white/50',
  [SfButtonVariant.tertiary]: 'text-primary-medium disabled:bg-transparent',
};

const props = withDefaults(
    defineProps<{
      size?: `${SfButtonSize}`;
      variant?: `${SfButtonVariant}`;
      disabled?: boolean;
      square?: boolean;
      tag?: string | ConcreteComponent;
    }>(),
    {
      size: SfButtonSize.base,
      variant: SfButtonVariant.primary,
      disabled: false,
      square: false,
      tag: undefined,
    },
);
defineEmits(['click']);

const { size, tag, square } = toRefs(props);

const sizeClasses = computed(() => {
  switch (size.value) {
    case SfButtonSize.sm: {
      return [square.value ? 'p-1.5' : 'leading-5 text-sm py-1.5 px-3', 'gap-1.5'];
    }
    case SfButtonSize.lg: {
      return [square.value ? 'p-4' : 'py-3 leading-6', 'gap-3'];
    }
    default: {
      return [square.value ? 'p-2' : 'py-2 leading-6', 'gap-2'];
    }
  }
});

const tagWithDefaults = computed(() => tag?.value || 'button');

const attrs = useAttrsRef();
const type = computed(
    () =>
        attrs.value.type ??
        (typeof tagWithDefaults.value === 'string' && tagWithDefaults.value.toLowerCase() === 'button'
            ? 'button'
            : undefined),
);
</script>
