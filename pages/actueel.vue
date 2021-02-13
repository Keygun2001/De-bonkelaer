<template>
    <div>
        <div v-for="(data, index) in allActueels" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="md:py-32 py-8">
                        <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full" v-for="(item, i) in data.contentmatrix" :key="i">
                            <div class="w-full md:mr-4 mr-0">
                                <h1>
                                    {{ item.titel }}
                                </h1>
                                <p class="leading-7 mt-4">
                                    {{ item.tekst }}
                                </p>
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

export default {
    apollo: {
        allActueels: gql`{
            allActueels {
                contentmatrix {
                    titel
                    tekst
                }
            }
        }`
    }
}
</script>
<style scoped src="~/static/css/main.css"></style>