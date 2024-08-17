<template>
  <div class="hidden md:block fixed right-12 bottom-[219px] z-[999] hover:cursor-pointer" @click="scrollToTop">
    <IconsBackToTop />
  </div>
</template>
<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>
