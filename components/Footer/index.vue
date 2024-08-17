<template>
  <footer class="bg-dark-black md:border-0 md:pt-10" data-testid="footer">
    <div
        class="flex justify-center container flex-col gap-4 md:flex-row md:gap-0 md:pb-10 md:pt-0"
        data-testid="section-top"
    >
      <template v-if="FooterContent">
        <div class="block md:hidden pt-2">
          <div class="flex flex-col">
            <template v-for="footer in FooterContent" :key="footer.id">
              <template v-if="footer && footer.order !== 4">
                <SfAccordionItem
                    v-if="footer.title"
                    :model-value="isOpen(footer.title)"
                    @update:model-value="toggle(footer.title, $event)"
                    class="mp:py-2"
                >
                  <template #summary>
                    <div class="flex justify-between hover:bg-transparent">
                      <span class="text-lg not-italic leading-[normal] font-arcamajora text-white">
                        {{ footer.title }}
                      </span>
                      <NuxtImg
                          src="/images/trepanel/remove.svg"
                          class="text-white"
                          width="24px"
                          height="24px"
                          v-if="isOpen(footer.title)"
                      />
                      <NuxtImg
                          src="/images/trepanel/expand.svg"
                          class="text-white"
                          width="24px"
                          height="24px"
                          alt="expand"
                          v-else
                      />
                    </div>
                  </template>
                  <ul class="pt-2">
                    <SfListItem
                        v-for="itemData in footer.items"
                        :key="itemData.id"
                        class="py-2 !px-0 !bg-transparent typography-text-sm font-body mp:pb-0 mp:pt-[7px]"
                    >
                      <div class="flex items-center tab:break-all">
                        <template v-if="itemData.src">
                          <NuxtImg
                              :src="itemData.src"
                              :alt="itemData.alt ? itemData.alt : ''"
                              class="h-6 w-5 tab:w-4 tab:h-5 mp:h-6 mp:w-6"
                              :class="footer.order === 3 && itemData.id === 0 ? 'w-[15px] tab:w-3' : ''"
                              width="15"
                              height="24"
                              loading="lazy"
                          />
                        </template>
                        <p
                            v-if="itemData.id === 0"
                            class="no-underline text-white text-xs not-italic font-bold leading-[normal] font-arcamajora hover:no-underline hover:!text-white active:no-underline active:!text-white"
                        >
                          {{ itemData.title }}
                        </p>
                        <SfLink
                            v-else
                            :tag="NuxtLink"
                            :class="[
                            'no-underline text-white text-xs not-italic font-bold leading-[normal] font-arcamajora hover:no-underline hover:!text-white active:no-underline active:!text-white',
                            { 'tab:pl-1 pl-2.5': footer.order === 3 },
                          ]"
                            variant="secondary"
                            :to="itemData.path"
                        >
                          {{ itemData.title }}
                        </SfLink>
                      </div>
                    </SfListItem>
                  </ul>
                </SfAccordionItem>
              </template>
              <template v-if="footer.menuAttached">
                <FooterFollowUs :data="footer.items || []" />
              </template>
            </template>
          </div>
        </div>
        <div v-for="footer in FooterContent" :key="footer.id" class="flex-1 hidden md:flex flex-col">
          <div class="tab:text-[15px] text-xl not-italic leading-[normal] text-white font-arcamajora antialiased">
            {{ footer.title }}
          </div>
          <template v-if="footer.menuAttached">
            <FooterFollowUs :data="footer.items || []" />
          </template>
          <template v-else>
            <ul class="pt-2" v-if="footer.items && footer.items.length > 0">
              <TMUISFListItem
                  v-for="subFoot in footer.items"
                  :key="subFoot.id"
                  class="py-2 pl-0 !bg-transparent typography-text-sm font-body hover:cursor-auto"
                  :display-inline="true"
              >
                <div class="flex items-center">
                  <template v-if="subFoot.src">
                    <NuxtImg
                        :src="subFoot.src"
                        :alt="subFoot.alt ? subFoot.alt : ''"
                        class="h-6 w-5 tab:w-4 tab:h-5"
                        :class="footer.order === 3 && subFoot.id === 0 ? 'w-[15px] tab:w-3' : ''"
                        width="15"
                        height="24"
                        loading="lazy"
                    />
                  </template>
                  <p
                      v-if="subFoot.id === 0"
                      class="'tab:pl-1 pl-2.5 w-4/5 no-underline text-white hover:!text-white active:no-underline active:!text-white focus-visible:outline-offset-0 focus-visible:outline-0 text-sm tab:text-[13px] leading-[normal] font-arcamajora antialiased'"
                  >
                    {{ subFoot.title }}
                  </p>
                  <SfLink
                      v-else
                      :tag="NuxtLink"
                      :class="[
                      'no-underline text-white hover:!text-white active:no-underline active:!text-white focus-visible:outline-offset-0 focus-visible:outline-0 text-sm tab:text-[13px] leading-[normal] font-arcamajora antialiased',
                      { 'tab:pl-1 pl-2.5': footer.order === 3 },
                      { 'w-[85%]': footer.order === 3 && subFoot.id === 1 },
                    ]"
                      variant="secondary"
                      :to="subFoot.path"
                  >
                    {{ subFoot.title }}
                  </SfLink>
                </div>
              </TMUISFListItem>
            </ul>
          </template>
        </div>
      </template>
      <template v-else>
        <span>Footer</span>
      </template>
    </div>
    <TrepanelFooterBottom />
  </footer>
  <TrepanelSamplesBooklet />
</template>
<script setup lang="ts">
import { SfAccordionItem, SfLink, SfListItem } from '@storefront-ui/vue';
import { TREPANEL_FOOTER } from '~/mocks/footer/trepanelFooter';

// const { triggerGA4Event } = useGoogleTagManager();
// const handlePhoneEvent = () => {
//   triggerGA4Event('phone_click', {});
// };
const FooterContent = computed(() => {
  return TREPANEL_FOOTER.map((footer) => ({
    id: footer.id,
    order: footer.order,
    title: footer.title,
    menuAttached: footer.menuAttached,
    items: footer.items.filter((item) => !item.menuAttached)
  }));
});
const NuxtLink = resolveComponent('NuxtLink');
const opened = ref<string[]>([]);
const isOpen = (id: string) => opened.value.includes(id);
const toggle = (id: string, open: boolean) => {
  if (open) {
    opened.value.push(id);
  } else {
    opened.value = opened.value.filter((item) => item !== id);
  }
};
</script>
