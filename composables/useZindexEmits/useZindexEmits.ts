import type { UseZindexEmitsReturn, UseZIndexState } from '~/composables/useZindexEmits/types';

export const useZindexEmits: UseZindexEmitsReturn = () => {
  const state = useState<UseZIndexState>('zIndex', () => ({
    AddToCartClassRemove: false,
    addToCartClassActive: false,
    checkCalcModelOpen: false,
    modalButtonClicked: false,
    modalCloseButtonClicked: false,
    isMenuOpen: false,
    isFormOpen: false,
    scrollToReviewsSection: false
  }));

  const activeAddToCartClass = () => {
    state.value.AddToCartClassRemove = true;
  };

  const AddToCartClassRemoved = () => {
    state.value.AddToCartClassRemove = false;
  };
  const removeRelativePosition = () => {
    state.value.addToCartClassActive = true;
  };
  const closeCalculatorModel = () => {
    state.value.checkCalcModelOpen = !state.value.checkCalcModelOpen;
  };
  const modalOpened = () => {
    state.value.modalButtonClicked = true;
  };
  const modalClosed = () => {
    state.value.modalCloseButtonClicked = true;
  };

  const closeMenu = () => {
    state.value.isMenuOpen = false;
  };

  const openMenu = () => {
    state.value.isMenuOpen = true;
  };

  const openAskQuestionForm = () => {
    state.value.isFormOpen = true;
  };

  const isScrolled = () => {
    state.value.scrollToReviewsSection = !state.value.scrollToReviewsSection;
  };

  return {
    activeAddToCartClass,
    AddToCartClassRemoved,
    removeRelativePosition,
    closeCalculatorModel,
    modalOpened,
    modalClosed,
    openMenu,
    closeMenu,
    isScrolled,
    openAskQuestionForm,
    ...toRefs(state.value)
  };
};
