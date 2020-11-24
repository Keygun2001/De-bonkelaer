<template>
  <div>
    <navbar/>
    <nuxt />
    <footerbar/>
  </div>
</template>

<script>
import footerbar from '~/components/footer.vue';
import navbar from '~/components/navbar.vue';

export default {
  components: {
    navbar,
    footerbar
  },
};
</script>