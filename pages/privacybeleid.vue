<template>
    <div>
        <div v-for="(item, index) in allPrivacies" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="w-full md:mr-4 mr-0">
                            <h3 class="font-bold">
                                {{ item.contentmatrix[0].titel }}
                            </h3>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea1 }}
                            </p>
                            <h3 class="w-full leading-7 mt-4 font-bold">
                                {{ item.contentmatrix[0].titel2 }}
                            </h3>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea2 }}
                            </p>
                            <h3 class="w-full leading-7 mt-4 font-bold">
                                {{ item.contentmatrix[0].titel3 }}
                            </h3>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea3 }}
                            </p>
                            <h3 class="w-full leading-7 mt-4 font-bold">
                                {{ item.contentmatrix[0].titel4 }}
                            </h3>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea4 }}
                            </p>
                            <h3 class="w-full leading-7 mt-4 font-bold">
                                {{ item.contentmatrix[0].titel5 }}
                            </h3>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea5 }}
                            </p>
                            <h3 class="w-full leading-7 mt-4 font-bold">
                                {{ item.contentmatrix[0].titel6 }}
                            </h3>
                            <p class="w-full leading-7 mt-4">
                                {{ item.contentmatrix[0].alinea6 }}
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
        allPrivacies: gql`{
            allPrivacies {
                contentmatrix {
                    titel
                    alinea1
                    titel2
                    alinea2
                    titel3
                    alinea3
                    titel4
                    alinea4
                    titel5
                    alinea5
                    titel6
                    alinea6
                }
            }
        }`
    }
}
</script>