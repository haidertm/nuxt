import type { Ref } from 'vue';

export interface UseZIndexState {
  AddToCartClassRemove: boolean;
  addToCartClassActive: boolean;
  checkCalcModelOpen: boolean;
  modalButtonClicked: boolean;
  modalCloseButtonClicked: boolean;
  isMenuOpen: boolean;
  isFormOpen: boolean;
  scrollToReviewsSection: boolean;
}

export interface UseZindexEmits {
  AddToCartClassRemove: Readonly<Ref<boolean>>;
  addToCartClassActive: Readonly<Ref<boolean>>;
  checkCalcModelOpen: Readonly<Ref<boolean>>;
  modalButtonClicked: Readonly<Ref<boolean>>;
  modalCloseButtonClicked: Readonly<Ref<boolean>>;
  isFormOpen: Ref<boolean>;
  isMenuOpen: Readonly<Ref<boolean>>;
  scrollToReviewsSection: Readonly<Ref<boolean>>;
  activeAddToCartClass: () => void;
  AddToCartClassRemoved: () => void;
  removeRelativePosition: () => void;
  closeCalculatorModel: () => void;
  modalOpened: () => void;
  openAskQuestionForm: () => void;
  modalClosed: () => void;
  closeMenu: () => void;
  isScrolled: () => void;
  openMenu: () => void;
}

export type UseZindexEmitsReturn = () => UseZindexEmits;
