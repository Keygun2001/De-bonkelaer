<template>
    <div>
        <div class="bg-blue-900">
            <div class="container mx-auto">
                <div class="flex justify-center items-center mx-auto w-10/12 py-32 border-grey-bottom">
                    <div class="w-3/12">
                        <div v-for="(footer, index) in footer" :key="index" class="w-24 leading-8">
                            <p class="text-white nuxtfooterlinkp">
                                {{ footer[0].titel }}
                            </p>
                            <NuxtLink to="/" class="nuxtfooterlink">
                                {{ footer[0].link1 }}
                            </NuxtLink>
                            <NuxtLink to="/actueel" class="nuxtfooterlink">
                                {{ footer[0].link2 }}
                            </NuxtLink>
                            <NuxtLink to="/reserveren" class="nuxtfooterlink">
                                {{ footer[0].link3 }}
                            </NuxtLink>
                            <NuxtLink to="/reglement" class="nuxtfooterlink">
                                {{ footer[0].link4 }}
                            </NuxtLink>
                            <NuxtLink to="/impressies" class="nuxtfooterlink">
                                {{ footer[0].link5 }}
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="w-9/12">
                        <div v-for="(footer, index) in footer" :key="index" class="leading-8">
                            <p class="text-white nuxtfooterlinkp">
                                {{ footer[0].titel2 }}
                            </p>
                            <div class="flex justify-center">
                                <p class="mr-4 nuxtfooterlink">
                                    {{ footer[0].adres1 }}
                                </p>
                                <p class="mx-4 nuxtfooterlink">
                                    {{ footer[0].adres2 }}
                                </p>
                                <p class="ml-4 nuxtfooterlink">
                                    {{ footer[0].adres3 }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(footer, index) in footer" :key="index" class="flex mt-2 justify-center"> 
                    <p class="nuxtfooterlink text-xs">
                        {{ footer[0].copyright }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import gql from 'graphql-tag';

export default {
    name: "footerbar",
    apollo: {
        footer: gql`{
            footer {
                footerTekstLinks {
                    titel
                    link1
                    link2
                    link3
                    link4
                    link5
                }
                footerTekstRechts {
                    titel2
                    adres1
                    adres2
                    adres3
                }
                copyright {
                    copyright
                }
            }
        }`,
    },
};
</script>
<style scoped src="~/static/css/footer.css"> </style>