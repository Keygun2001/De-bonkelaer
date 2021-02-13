<template>
    <div>
        <div class="bg-blue-900">
            <div class="container">
                <div class="flex md:justify-center md:items-center md:flex-no-wrap flex-wrap mx-auto md:py-32 py-8 border-grey-bottom">
                    <div class="md:w-3/12 w-full">
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
                    <div class="md:w-9/12 w-full">
                        <div v-for="(footer, index) in footer" :key="index" class="leading-8">
                            <p class="text-white nuxtfooterlinkp">
                                {{ footer[0].titel2 }}
                            </p>
                            <div class="flex md:justify-center md:flex-no-wrap flex-wrap">
                                <p class="mr-4 md:mt-0 mt-4 nuxtfooterlink">
                                    {{ footer[0].adres }}
                                </p>
                                <p class="md:mx-4 mx-0 md:mt-0 mt-4 nuxtfooterlink">
                                    {{ footer[0].adres2 }}
                                </p>
                                <p class="md:ml-4 ml-0 md:mt-0 mt-4 nuxtfooterlink">
                                    {{ footer[0].adres3 }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(footer, index) in footer" :key="index" class="flex mt-2 justify-center"> 
                    <NuxtLink to="/disclaimer" class="nuxtfooterlink text-xs mx-2">
                        {{ footer[0].disclaimer }}
                    </NuxtLink>
                    <NuxtLink to="/privacybeleid" class="nuxtfooterlink text-xs mx-2">
                        {{ footer[0].privacyBeleid }}
                    </NuxtLink>
                    <NuxtLink to="/bestuur" class="nuxtfooterlink text-xs mx-2">
                        {{ footer[0].bestuur }}
                    </NuxtLink>
                    <p class="nuxtfooterlink text-xs mx-2">
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
                titelLink {
                    titel
                    link1
                    link2
                    link3
                    link4
                    link5
                }
                adressen {
                    titel2
                    adres
                    adres2
                    adres3
                }
                copyright {
                    copyright
                    disclaimer
                    privacyBeleid
                    bestuur
                }
            }
        }`,
    },
};
</script>
<style scoped src="~/static/css/footer.css"> </style>