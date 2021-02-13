<template>
    <div>
        <div v-for="(data, index) in allImpressies" :key="index">
            <div class="bg-blue-100 shadow-top">
                <div class="container mx-auto md:py-32 py-8"> 
                  <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full">
                    <div class="md:w-6/12 w-full md:mr-4 mr-0">
                      <h1>
                        {{ data.contentmatrix[0].titel }}
                      </h1>
                      <p class="w-full leading-7 mt-4 mb-12">
                        {{ data.contentmatrix[0].tekst }}
                      </p>
                    </div>
                  </div>
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
    allImpressies: gql`{
        allImpressies {
            contentmatrix {
                titel
                tekst
            }
        }
    }`
  }
}
</script>