<template>
  <div class="w-full group-hover:!inline-block md:inline-block bg-white" v-if="menu.hasMegaMenu">
    <div
        :key="menu._path"
        ref="megaMenuReference"
        class="w-full flex items:stretch bg-white outline-none"
        tabindex="0"
        @mouseleave="$emit('close')"
        @keydown.esc="$emit('keydown-esc')"
    >
      <div
          :class="[
          menu.title !== 'By Style'
            ? '2xl:px-[60px] px-5 border-r border-[#E4E4E7]'
            : '2xl:pr-[47px] pr-5 pl-[30px] 1tab:pl-[15px]',
          menu.title === 'By Colour' ? '!border-r-0' : '',
          menu.title === 'By Room' ? 'tab:!border-r-0' : '',
        ]"
      >
        <p class="font-gillSansBold text-black pb-2 text-base">{{ menu.title }}</p>
        <ul class="flex flex-col flex-auto h-full">
          <template v-for="node in menu.children" :key="node._path">
            <li class="flex items-start flex-col">
              <NuxtLink
                  :to="node.slug"
                  class="font-gillSansRegular 2lg:text-sm md:text-xs font-normal text-[#484340] py-1.5 hover:text-[#E4AB2C]"
                  :class="
                  menu.title === 'By Room' ? 'md:min-w-[145px] 1tab:min-w-[90px]' : 'md:min-w-[92px] 1tab:min-w-[115px]'
                "
                  @click="topHeadSubNavClick(node.title, '', node.slug)"
              >
                {{ node.title }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </div>
      <div
          class="flex flex-col items-end justify-center overflow-hidden 2xl:h-[280px] 2xl:pl-[60px] pl-5 pr-8 1tab-pr-[15px] h-full tab:hidden"
          v-if="menu.bannerDesktop?.image"
      >
        <NuxtImg
            :src="menu.bannerDesktop.image"
            width="650"
            height="280"
            :alt="menu.banner.title"
            class="h-full 2xl:w-full"
            loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps(['menu', 'isOpen']);
defineEmits(['close', 'keydown-esc']);
</script>
