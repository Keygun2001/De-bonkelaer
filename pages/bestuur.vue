<template>
    <div>
        <div v-for="(item, index) in allBestuurs" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="md:w-6/12 w-full md:mr-4 mr-0">
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].stichting }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].voorzitter }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].secretaris }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].penningmeester }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].tennisclub }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].voorzittertennisclub }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].secretaristennisclub }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].penningmeestertennisclub }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].ledenbestand }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].systeembeheer }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].accomodatie }}
                            </p>
                            <p class="md:mt-0 mt-4">
                                {{ item.contentmatrix[0].comissie }}
                            </p>
                        </div>
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
        allBestuurs: gql`{
            allBestuurs {
                contentmatrix {
                    stichting
                    voorzitter
                    secretaris
                    penningmeester
                    tennisclub
                    voorzittertennisclub
                    secretaristennisclub
                    penningmeestertennisclub
                    ledenbestand
                    systeembeheer
                    accomodatie
                    comissie
                }
            }
        }`
    }
}
</script>