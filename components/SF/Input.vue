<template>
  <component
      :is="wrapperTag"
      class="flex items-center gap-2 px-4 bg-white rounded-md focus-visible:outline-0"
      :class="[getSizeClasses[size], wrapperClass]"
      data-testid="input"
  >
    <slot name="prefix" />
    <input
        v-model="inputValue"
        class="min-w-[80px] w-full text-base outline-none appearance-none text-neutral-900 disabled:cursor-not-allowed disabled:bg-transparent read-only:bg-transparent"
        :size="1"
        data-testid="input-field"
        v-bind="$attrs"
    />
    <slot name="suffix" />
  </component>
</template>

<script lang="ts" setup>
import type { PropType, ConcreteComponent } from 'vue';
import { computed, ref, toRefs } from 'vue';
import { SfInputSize } from '@storefront-ui/vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  wrapperTag: {
    type: [String, Object] as PropType<string | ConcreteComponent>,
    default: 'span',
  },
  size: {
    type: String as PropType<`${SfInputSize}`>,
    default: SfInputSize.base,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: [String, Object],
    default: '',
  },
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
}>();
const { modelValue } = toRefs(props);

/*
Internal state has been implemented due to useFocusVisible and how it works. Main reason is that
it captures native HTMLElement.prototype.focus method. It makes value disappear under certain circumstances,
so it's important to keep it here, or to always pass modelValue to the component.
*/
const internalState = ref<string | number>();
const inputValue = computed({
  get: () => modelValue.value ?? internalState.value,
  set: (value) => {
    emit('update:modelValue', value);
    internalState.value = value;
  },
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};

const getSizeClasses = {
  [SfInputSize.sm]: ' h-[32px]',
  [SfInputSize.base]: 'h-[40px]',
  [SfInputSize.lg]: 'h-[48px]',
};
</script>
