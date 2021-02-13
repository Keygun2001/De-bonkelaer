<template>
    <div class="swiper-container">
        <div v-for="(data, index) in allSliders" :key="index" class="swiper-wrapper">
            <div v-for="(item, i) in data.contentmatrix" :key="i" class="swiper-slide w-4/12">
                <div class="bg-blue-800 p-16 rounded">
                    <h3 class="text-white">
                        {{ item.titel }}
                    </h3>
                    <p class="my-4">
                        {{ item.tekst }}
                    </p>
                    <img class="w-4/12" :src="item.afbeelding.url" />
                </div>
            </div>
        </div>
        <div class="swiper-pagination "></div>
        <div class="swiper-button-prev swiper-button-white"></div>
        <div class="swiper-button-next swiper-button-white"></div>
    </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
import gql from 'graphql-tag'

Swiper.use([ Navigation, Pagination, Autoplay ])

export default {
  mounted() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
  apollo: {
    allSliders: gql` {
        allSliders {
            contentmatrix {
            titel
            tekst
            afbeelding {
                url
            }
        }
        }
    }`
  },
}
</script>
<style scoped src="../static/css/swiper.css"></style>