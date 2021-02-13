<template>
  <div>
    <div v-for="(data, index) in allHomepaginas" :key="index">
      <div class="bg-blue-100 shadow-lg">
        <div class="container mx-auto">
          <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
            <div class="md:w-6/12 w-full md:mr-4 mr-0">
              <h1>
                {{ data.contentmatrix[0].titel }}
              </h1>
              <p class="w-full leading-7 mt-4">
                {{ data.contentmatrix[0].tekst }}
              </p>
            </div>
            <div v-if="data.contentmatrix[0].afbeeldingNaastTitel" class="flex sm:flex-col md:flex-row md:w-6/12 w-full md:mt-0 mt-8">
              <img class="md:w-10/12 w-full" :src="data.contentmatrix[0].afbeeldingNaastTitel.url">
            </div>
          </div>
        </div>
      </div>

      <div class="bg-blue-100 pb-12">
        <div class="container mx-auto"> 
          <swiper />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag';
import swiper from '~/components/Swiper'

export default {
  components: {
    swiper
  },
  apollo: {
    allHomepaginas: gql` {
      allHomepaginas {
        contentmatrix {
          titel
          tekst
          afbeeldingNaastTitel {
            url
          }
        }
      }
    }`
  }
}
</script>

<style scoped src="~/static/css/main.css"></style>
