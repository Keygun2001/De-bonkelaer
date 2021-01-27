<template>
    <div>
        <div v-for="(actueel, q) in allActueels" :key="q">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex md:flex-row flex-col items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="w-full md:mr-4 mr-0">
                            <h1>
                                {{ actueel.contentmatrix[0].titel }}
                            </h1>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[0].aanhef }}
                            </p>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[0].paragraaf1 }}
                            </p>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[0].paragraaf2 }}
                            </p>
                            <p class="leading-7 mt-4">
                                {{ actueel.contentmatrix[0].afsluiting }}
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
        allActueels: gql`{
            allActueels {
                contentmatrix {
                    titel,
                    paragraaf1,
                    paragraaf2,
                    aanhef,
                    afsluiting
                }
            }
        }`
    }
}
</script>
<style scoped src="~/static/css/main.css"></style>