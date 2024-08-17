import { computed, reactive } from 'vue';

interface GlobalEmitsInterface {
  value: string | boolean | number | null;
  type: string;
}

interface TMEmitsInterface {
  TMEmits: Array<GlobalEmitsInterface>;
}

const state = reactive<TMEmitsInterface>({
  TMEmits: []
});
const maxVisibleEmits = 1000;

const callEmit = (emit: GlobalEmitsInterface) => {
  const dismiss = () => {
    state.TMEmits.splice(0);
  };
  const upFrontNotification = {
    ...emit,
    dismiss
  };

  state.TMEmits.push(upFrontNotification);
  if (state.TMEmits.length > maxVisibleEmits) state.TMEmits.shift();
  setTimeout(dismiss, 1000);
};
export const useGlobalEmits = () => {
  return {
    callEmit,
    GlobalEmits: computed(() => state.TMEmits)
  };
};
