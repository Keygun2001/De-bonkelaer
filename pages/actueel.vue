<template>
    <div>
        <div v-for="(actueel, index) in allActueels" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto">
                <div v-if="actueel.contentmatrix[0].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-6/12 mr-4">
                        <h1>
                            {{ actueel.contentmatrix[0].titel }}
                        </h1>
                        <p class="leading-7 mt-4">
                            {{ actueel.contentmatrix[0].tekst }}
                        </p>
                    </div>
                    <div class="w-6/12">
                        <img class="w-10/12" :src="actueel.contentmatrix[0].afbeeldingnaasttekst.url">
                    </div>
                </div>
                <div v-else class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-full mr-4">
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

        <div v-for="(actueel, index) in allActueels" :key="index" class="container mx-auto">
            <div v-if="actueel.contentmatrix[1].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                <div class="w-6/12 mr-4">
                    <img :src="actueel.contentmatrix[1].afbeeldingnaasttekst.url">   
                </div>
                <div class="w-6/12">
                    <h2>
                        {{ actueel.contentmatrix[1].titel }}
                    </h2>
                    <p class="leading-7 mt-4 w-10/12">
                        {{ actueel.contentmatrix[1].tekst }}
                    </p>
                </div>
            </div>
            <div v-else class="flex items-center mx-auto w-10/12 py-32">
                <div class="w-full">
                    <h2>
                        {{ actueel.contentmatrix[1].titel }}
                    </h2>
                    <p class="leading-7 mt-4 w-10/12">
                        {{ actueel.contentmatrix[1].tekst }}
                    </p>
                </div>
            </div>
        </div>

        <div v-for="(actueel, index) in allActueels" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto">
                <div v-if="actueel.contentmatrix[2].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-6/12 mr-4">
                        <h2>
                            {{ actueel.contentmatrix[2].titel }}
                        </h2>
                        <p class="leading-7 mt-4">
                            {{ actueel.contentmatrix[2].tekst }}
                        </p>
                    </div>
                    <div class="w-6/12">
                        <img class="w-10/12" :src="actueel.contentmatrix[0].afbeeldingnaasttekst.url">
                    </div>
                </div>
                <div v-else class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-full mr-4">
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

        <div v-for="(actueel, index) in allActueels" :key="index" class="container mx-auto">
            <div v-if="actueel.contentmatrix[3].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                <div class="w-6/12 mr-4">
                    <img :src="actueel.contentmatrix[3].afbeeldingnaasttekst.url">   
                </div>
                <div class="w-6/12">
                    <h2>
                        {{ actueel.contentmatrix[3].titel }}
                    </h2>
                    <p class="leading-7 mt-4 w-10/12">
                        {{ actueel.contentmatrix[3].tekst }}
                    </p>
                </div>
            </div>
            <div v-else class="flex items-center mx-auto w-10/12 py-32">
                <div class="w-full">
                    <h2>
                        {{ actueel.contentmatrix[3].titel }}
                    </h2>
                    <p class="leading-7 mt-4 w-10/12">
                        {{ actueel.contentmatrix[3].tekst }}
                    </p>
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