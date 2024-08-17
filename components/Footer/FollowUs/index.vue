<template>
  <div class="flex flex-col items-center md:items-start gap-3 md:gap-8 pt-2 md:pt-3">
    <div class="block self-start pl-4 mp:pl-0 md:hidden">
      <span class="text-white mp:text-lg mp:not-italic mp:leading-[normal] mp:font-arcamajora">Follow Us</span>
    </div>
    <div class="flex flex-col items-start gap-3 md:gap-8 w-[196px] mp:w-full md:w-full">
      <FooterSocial />
    </div>
    <div class="w-full pt-2 py-4 md:pt-0">
      <div
          class="pl-4 md:pl-0 tab:text-[15px] text-xl not-italic leading-[normal] font-arcamajora text-white antialiased mp:hidden"
      >
        Payment Methods
      </div>
      <div class="text-lg not-italic leading-[normal] font-arcamajora text-white md:hidden">Accepted Cards</div>
      <div class="flex items-center md:justify-start gap-2 pt-4 md:pt-5 mp:pt-[19px]">
        <div>
          <NuxtImg src="/images/footer/mastercard.svg" alt="mastercard" width="55" height="32" loading="lazy" />
        </div>
        <div>
          <NuxtImg src="/images/footer/maestro.svg" alt="maestro" width="55" height="32" loading="lazy" />
        </div>
        <div>
          <NuxtImg src="/images/footer/visa.svg" alt="visa" width="55" height="32" loading="lazy" />
        </div>
        <div class="hidden">
          <NuxtImg src="/images/footer/american.svg" alt="american express" width="55" height="32" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>
