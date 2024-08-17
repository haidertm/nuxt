<template>
  <div class="pb-5 pt-3" v-if="showPopUp">
    <SfIconClose
        onclick="document.querySelector('.unsupported-device').remove()"
        class="absolute right-1 h-[20px] fill-[#4A4A4A] cursor-pointer"
    />
    <h2 class="text-base flex font-medium text-[#4A4A4A] px-5">
      <IconsAlert />
      <span class="pl-1">Unsupported Device Detected </span>
    </h2>
    <p class="text-sm px-6 text-[#4A4A4A] font-normal pr-5 pl-[50px]">
      We apologize for any inconvenience, but our website currently does not support
      <span class="pink-span font-medium">iPhones</span> below <span class="pink-span font-medium">iPhone X</span>, or
      iOS and OS versions below <span class="pink-span font-medium">13</span>. For the best experience, please consider
      upgrading your device and software.
    </p>
  </div>
</template>
<script setup lang="ts">
import { SfIconClose } from '@storefront-ui/vue';

// const { $IOSVersion } = useNuxtApp();
const showPopUp = computed(() => {
  return false;
  // const iosVersion = $IOSVersion();
  // return iosVersion !== null && iosVersion < 13;
});
</script>
