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

  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  },
  
  components: {
    navbar,
    footerbar
  },
};
</script>