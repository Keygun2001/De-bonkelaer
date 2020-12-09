<template>
  <div>
    <div v-for="(data, index) in allPage404s" :key="index" class="bg-blue-100">
        <div class="container mx-auto">
            <div class="inline md:flex justify-center items-center md:w-9/12 w-full md:mx-auto">
                <div class="md:py-32 py-8 md:w-6/12 w-full">
                    <h1 class="text-center">
                        {{ data.titel }}
                    </h1>
                    <p>
                       {{ data.tekst }}
                    </p>
                    <NuxtLink to="/" class="errorlink">
                        {{ data.link }}
                    </NuxtLink>
                </div>
                <div class="md:w-6/12 w-full md:mt-0 mt-8">
                    <img class="md:w-10/12 w-full" :src="data.afbeeldingNaastTekst.url" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
  export default {
    props: ['error'],
    layout: 'error',

    apollo: {
        allPage404s: gql`{
            allPage404s {
                titel
                tekst
                link
                afbeeldingNaastTekst {
                    url
                }
            }
        }`
    }
  }
</script>