<template>
  <div class="fixed right-4 sm:right-8 md:right-12 bottom-[50px] z-[999] hover:cursor-pointer">
    <NuxtLink :to="'https://wa.me/' + whatsapp" target="_blank" @click="handleWhatsappEvent">
      <IconsFloatingWhatsapp />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const $config = useRuntimeConfig();
const whatsapp = $config?.public.$config?.contact.whatsapp.replace(/^0/, '+971') ?? '';
// const { triggerGA4Event } = useGoogleTagManager();
const handleWhatsappEvent = () => {
  // triggerGA4Event('whatsapp_click', {});
};
</script>
