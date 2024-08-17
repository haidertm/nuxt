<template>
  <div class="bg-[#000] w-full custom-header mp:hidden" :class="dynamicClass">
    <HeaderMegaNavDesktop :navigation="navigation" />
  </div>
  <HeaderMegaNavMobile :is-open="isOpen" @toggle-open="$emit('toggle-open', $event)" :navigation="navigation" />
</template>

<script setup lang="ts">
import type { NavItemInterface } from '~/composables/useNavigation/types';

defineProps({
  navigation: {
    type: Array as () => NavItemInterface[],
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['back-to-top', 'toggle-open']);
const route = useRoute();
const scrollPositionState = useState<number>('scrollPositionState');
const scrollPosition = ref(scrollPositionState.value ?? 0);
const heightDifference = ref(0);
const isBrowser = computed(() => typeof window !== 'undefined');

const computeHeightDifference = () => {
  const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
  );
  if (isBrowser) {
    const viewportHeight = window.innerHeight;
    heightDifference.value = pageHeight - viewportHeight;
  }
};

const dynamicClass = computed(() => {
  return heightDifference.value > 140 && scrollPosition.value > 95 ? 'md:fixed z-50 md:top-0' : 'relative';
});

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
  emit('back-to-top', window.scrollY > 20);
};

onMounted(() => {
  computeHeightDifference();
  if (heightDifference.value > 140) {
    window.addEventListener('scroll', updateScroll);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll);
});

watch(
    () => route.fullPath,
    () => {
      computeHeightDifference();
    }
);
</script>
