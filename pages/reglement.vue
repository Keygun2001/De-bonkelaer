<template>
    <div>
        <div v-for="(reglement, index) in allReglements" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="pt-4 flex justify-center">
                        <h1>
                            {{ reglement.titelpagina }}
                        </h1>
                    </div>
                    <div v-if="reglement.contentmatrix[0].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                        <div class="w-6/12 mr-4">
                            <h2>
                                {{ reglement.contentmatrix[0].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].tekst }}
                            </p>
                        </div>
                        <div class="w-6/12">
                            <img class="w-10/12" :src="reglement.contentmatrix[0].afbeeldingnaasttekst.url">
                        </div>
                    </div>
                    <div v-else class="flex items-center mx-auto w-10/12 py-32">
                        <div class="w-full mr-4">
                            <h2>
                                {{ reglement.contentmatrix[0].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].tekst }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto">
                <div v-if="reglement.contentmatrix[1].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-6/12 mr-4">
                        <img :src="reglement.contentmatrix[1].afbeeldingnaasttekst.url">   
                    </div>
                    <div class="w-6/12">
                        <h2>
                            {{ reglement.contentmatrix[1].titel }}
                        </h2>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ reglement.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
                <div v-else class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-full">
                        <h2>
                            {{ reglement.contentmatrix[1].titel }}
                        </h2>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ reglement.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div v-if="reglement.contentmatrix[2].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                        <div class="w-6/12 mr-4">
                            <h2>
                                {{ reglement.contentmatrix[2].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[2].tekst }}
                            </p>
                        </div>
                        <div class="w-6/12">
                            <img class="w-10/12" :src="reglement.contentmatrix[2].afbeeldingnaasttekst.url">
                        </div>
                    </div>
                    <div v-else class="flex items-center mx-auto w-10/12 py-32">
                        <div class="w-full mr-4">
                            <h2>
                                {{ reglement.contentmatrix[2].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[2].tekst }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto">
                <div v-if="reglement.contentmatrix[3].afbeeldingnaasttekst" class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-6/12 mr-4">
                        <img :src="reglement.contentmatrix[3].afbeeldingnaasttekst.url">   
                    </div>
                    <div class="w-6/12">
                        <h2>
                            {{ reglement.contentmatrix[3].titel }}
                        </h2>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ reglement.contentmatrix[3].tekst }}
                        </p>
                    </div>
                </div>
                <div v-else class="flex items-center mx-auto w-10/12 py-32">
                    <div class="w-full">
                        <h2>
                            {{ reglement.contentmatrix[3].titel }}
                        </h2>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ reglement.contentmatrix[3].tekst }}
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
        allReglements: gql`{
            allReglements {
                titelpagina
                contentmatrix {
                    titel
                    tekst
                }
            }
        }`
    },
}
</script>