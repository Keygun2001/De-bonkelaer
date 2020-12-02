<template>
    <div>
        <div v-for="(impressie, index) in allImpressies" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div v-if="impressie.contentmatrix[0].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                        <div class="w-6/12 mr-4">
                            <h2>
                                {{ impressie.contentmatrix[0].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ impressie.contentmatrix[0].tekst }}
                            </p>
                        </div>
                        <div class="w-6/12">
                            <img class="w-10/12" :src="impressie.contentmatrix[0].afbeeldingnaasttekst.url">
                        </div>
                    </div>
                    <div v-else class="flex items-center mx-auto w-10/12 py-32">
                        <div class="w-full mr-4">
                            <h2>
                                {{ impressie.contentmatrix[0].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ impressie.contentmatrix[0].tekst }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto">
                <div v-if="impressie.contentmatrix[1].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-6/12 mr-4">
                        <img :src="impressie.contentmatrix[1].afbeeldingnaasttekst.url">   
                    </div>
                    <div class="w-6/12">
                        <h2>
                            {{ impressie.contentmatrix[1].titel }}
                        </h2>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ impressie.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
                <div v-else class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-full">
                        <h2>
                            {{ impressie.contentmatrix[1].titel }}
                        </h2>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ impressie.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
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