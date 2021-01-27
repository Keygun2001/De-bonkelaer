<template>
    <div>
        <div v-for="(reglement, index) in allReglements" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="pt-4 flex md:justify-center">
                        <h1>
                            {{ reglement.titelpagina }}
                        </h1>
                    </div>
                    <div class="flex items-center mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="w-full md:mr-4">
                            <h2>
                                {{ reglement.contentmatrix[0].titel }}
                            </h2>
                            <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].ondertitel }}
                            </p>
                            <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf1titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf1 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf2titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf2 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf3titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf3 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf4titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf4 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf5titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf5 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf6titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf6 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf7titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf7 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf8titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf8 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf9titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf9 }}
                            </p>
                             <p class="leading-7 mt-4">
                                {{ reglement.contentmatrix[0].paragraaf10titel }}
                            </p>
                            <p class="leading-7">
                                {{ reglement.contentmatrix[0].paragraaf10 }}
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
        allReglements: gql`{
            allReglements {
                titelpagina
                contentmatrix {
                    titel
                    ondertitel
                    paragraaf1titel
                    paragraaf1
                    paragraaf2titel
                    paragraaf2
                    paragraaf3titel
                    paragraaf3
                    paragraaf4titel
                    paragraaf4
                    paragraaf5titel
                    paragraaf5
                    paragraaf6titel
                    paragraaf6
                    paragraaf7titel
                    paragraaf7
                    paragraaf8titel
                    paragraaf8
                    paragraaf9titel
                    paragraaf9
                    paragraaf10titel
                    paragraaf10
                }
            }
        }`
    },
}
</script>