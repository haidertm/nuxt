<template>
  <div>
    <h2>Starlink Launches</h2>

    Something
    <!--    <p v-for="(entry, i) of data?.getPro" :key="entry.id">-->
    <!--      {{ i + 1 }}. Mission Name: {{ entry.mission_name }} ({{-->
    <!--        entry.launch_year-->
    <!--      }})-->
    <!--    </p>-->
  </div>
</template>

<script setup lang="ts">
import getPromotionalBanners from '~/queries/promotionalBanners';
import { print } from 'graphql/index';
import { queryFormatter } from '~/utils';

const fetchProducts = async () => {
  console.log('queryingTest', JSON.stringify(getPromotionalBanners))
  try {
    const response = await $fetch('/graphql/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: queryFormatter(getPromotionalBanners)
    });

    // const data = await response.json();
    console.log('responding>>>', response);
  } catch (error) {
    console.error('responding>>>');
    console.error('Failed to fetch products:', error);
  }
}

onMounted(async () => {
  // console.info('responding>>>', 'onMounted');
  await fetchProducts();
});

// const { data, error } = await useAsyncGql({
//   operation: 'getPromotionalBanners'
// });
</script>
