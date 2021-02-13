<template>
    <div>
        <div v-for="(item, index) in allDisclaimers" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="w-full md:mr-4 mr-0">
                            <h1>
                                {{ item.contentmatrix[0].titel }}
                            </h1>
                            <p>
                                {{ item.contentmatrix[0].alinea1 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea2 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea3 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea4 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea5 }}
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
        allDisclaimers: gql`{
            allDisclaimers {
                contentmatrix {
                    titel
                    alinea1
                    alinea2
                    alinea3
                    alinea4
                    alinea5
                }
            }
        }`
    }
}
</script>