<template>
    <div>
        <div v-for="(impressie, index) in allImpressies" :key="index">
            <div class="bg-blue-100 shadow-top">
                <div class="container mx-auto"> 
                    <div class="flex items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="flex justify-center items-center w-full">
                            <div class="md:w-1/12 w-3/12" @click="prev">
                                <img class="prev" src="../assets/Images/arrow_left.png"/>
                            </div>
                            <carousel @next="next" @prev="prev">
                                <carousel-slide v-for="(slide, index) in slides" :key="slide" :index="index" :visibleSlide="visibleSlide"
                                :direction="direction">
                                <img :src="slide" />
                                </carousel-slide> 
                            </carousel>
                            <div class="md:w-1/12 w-3/12" @click="next">
                                <img class="next" src="../assets/Images/arrow_right.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Carousel from '../components/Carousel.vue'
import CarouselSlide from '../components/CarouselSlide.vue'

export default {
    components: {
        Carousel,
        CarouselSlide
    },
    data() {
    return {
      slides: [
        'https://www.datocms-assets.com/37434/1605298197-20100327a.jpg',
        'https://www.datocms-assets.com/37434/1605298200-20100327b.jpg',
        'https://www.datocms-assets.com/37434/1605298203-20100327c.jpg',
        'https://www.datocms-assets.com/37434/1605298205-20100327d.jpg'

      ],
      visibleSlide: 0,
      direction: 'left',

    }
  },
  computed: {
    slideLen() {
      return this.slides.length
    }
  },
  methods: {
    next() {
      if(this.visibleSlide >= this.slideLen - 1) {
        this.visibleSlide = 0;
      }
      else {
        this.visibleSlide++;
      }
      this.direction = "left"
    },
    prev () {
      if(this.visibleSlide <= 0) {
        this.visibleSlide = this.slideLen - 1;
      }
      else {
        this.visibleSlide--;
      }
      this.direction = "right"
    },
  },
    apollo: {
        allImpressies: gql`{
            allImpressies {
                contentmatrix {
                    titel
                    tekst
                    afbeeldingnaasttekst {
                        url
                    }
                }
            }
        }`
    },
}
</script>