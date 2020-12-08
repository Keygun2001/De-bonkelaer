<template>
    <div>
        <div v-for="(actueel, q) in allActueels" :key="q">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div v-if="actueel.contentmatrix[0].afbeeldingnaasttekst" class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="md:w-6/12 w-full md:mr-4 mr-0">
                            <h1>
                                {{ actueel.contentmatrix[0].titel }}
                            </h1>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[0].tekst }}
                            </p>
                        </div>
                        <div class="md:w-6/12 w-full">
                            <img class="md:w-10/12 w-full" :src="actueel.contentmatrix[0].afbeeldingnaasttekst.url">
                        </div>
                    </div>
                    <div v-else class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="w-full md:mr-4 mr-0">
                            <h1>
                                {{ actueel.contentmatrix[0].titel }}
                            </h1>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[0].tekst }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto">
                <div v-if="actueel.contentmatrix[1].afbeeldingnaasttekst" class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                    <div class="md:w-6/12 w-full md:mr-4 mr-0">
                        <img :src="actueel.contentmatrix[1].afbeeldingnaasttekst.url">   
                    </div>
                    <div class="md:w-6/12 w-full">
                        <h2>
                            {{ actueel.contentmatrix[1].titel }}
                        </h2>
                        <p class="leading-7 mt-4 md:w-10/12 w-full">
                            {{ actueel.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
                <div v-else class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                    <div class="w-full">
                        <h2>
                            {{ actueel.contentmatrix[1].titel }}
                        </h2>
                        <p class="leading-7 mt-4 md:w-10/12 w-full">
                            {{ actueel.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div v-if="actueel.contentmatrix[2].afbeeldingnaasttekst" class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 md:py-32 py-8">
                        <div class="md:w-6/12 w-full md:mr-4 mr-0">
                            <h2>
                                {{ actueel.contentmatrix[2].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[2].tekst }}
                            </p>
                        </div>
                        <div class="md:w-6/12 w-full">
                            <img class="md:w-10/12 w-full" :src="actueel.contentmatrix[0].afbeeldingnaasttekst.url">
                        </div>
                    </div>
                    <div v-else class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="w-full md:mr-4 mr-0">
                            <h2>
                                {{ actueel.contentmatrix[2].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[2].tekst }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto">
                <div v-if="actueel.contentmatrix[3].afbeeldingnaasttekst" class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                    <div class="md:w-6/12 w-full md:mr-4 mr-0">
                        <img :src="actueel.contentmatrix[3].afbeeldingnaasttekst.url">   
                    </div>
                    <div class="md:w-6/12 w-full">
                        <h2>
                            {{ actueel.contentmatrix[3].titel }}
                        </h2>
                        <p class="leading-7 mt-4 md:w-10/12 w-full">
                            {{ actueel.contentmatrix[3].tekst }}
                        </p>
                    </div>
                </div>
                <div v-else class="flex items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                    <div class="w-full">
                        <h2>
                            {{ actueel.contentmatrix[3].titel }}
                        </h2>
                        <p class="leading-7 mt-4 md:w-10/12 w-full">
                            {{ actueel.contentmatrix[3].tekst }}
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
        allActueels: gql`{
            allActueels {
                contentmatrix {
                    titel,
                    tekst,
                    afbeeldingnaasttekst {
                        url
                    }
                }
            }
        }`
    }
}
</script>
<style scoped src="~/static/css/main.css"></style>