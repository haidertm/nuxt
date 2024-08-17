export const useBannersEvents = () => {
  const touchDrag = ref(true);
  const bannerClick = ref(false);

  const handleMove = () => {
    touchDrag.value = true;
  };

  const handleDown = () => {
    document.addEventListener('pointermove', handleMove);
  };
  const handleUp = () => {
    document.removeEventListener('pointermove', handleMove);
    setTimeout(() => {
      touchDrag.value = false;
    }, 50);
  };
  const navigateToLink = (url: string) => {
    if (!touchDrag.value) {
      bannerClick.value = !bannerClick.value;
      const router = useRouter();
      router.push(url);
    }
  };
  return {
    handleDown,
    handleUp,
    navigateToLink,
  };
};
