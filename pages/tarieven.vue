<template>
    <div>
        <div v-for="(tarieven, index) in allTarievens" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto">
                <div class="mx-auto w-10/12 py-32">
                    <div class="w-full mr-4">
                        <h1>
                            {{ tarieven.titel }}
                        </h1>
                    </div>
                    <div class="w-full mt-12">
                        <h2>
                            {{ tarieven.seizoen }}
                        </h2>
                    </div>
                    <div class="flex w-full">
                        <div class="flex justify-start flex-col w-6/12">
                            <p>
                                {{ tarieven.prijzen[0].senioren }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].tot17 }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].jongerDan15 }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].zomerarrangement }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].persoon1Exclusief }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].persoon1Inclusief }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].personen2Exclusief }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].personen2Inclusief }}
                            </p>
                        </div>
                        <div class="flex justify-start flex-col w-6/12">
                            <p>
                                {{ tarieven.prijzen[0].seniorenPrijs }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].tot17Prijs }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].jongerDan15Prijs }}
                            </p>
                            <p class="mt-6">
                                {{ tarieven.prijzen[0].persoon1ExclusiefPrijs }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].persoon1InclusiefPrijs }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].personen2ExclusiefPrijs }}
                            </p>
                            <p>
                                {{ tarieven.prijzen[0].personen2InclusiefPrijs }}
                            </p>
                        </div>
                    </div>
                    <div class="w-8/12 mt-4">
                        <p>
                            {{ tarieven.ondertekst }}
                        </p>
                        <a class="downloadbtn mt-4" href="http://www.debonkelaertennis.nl/Inschrijfformulier_TCLievelde2020.doc">
                            {{ tarieven.downloadKnop }}
                        </a>
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
        allTarievens: gql`{
            allTarievens {
                titel
                seizoen
                prijzen {
                    senioren
                    seniorenPrijs
                    tot17
                    tot17Prijs
                    jongerDan15
                    jongerDan15Prijs
                    zomerarrangement
                    persoon1Exclusief
                    persoon1ExclusiefPrijs
                    persoon1Inclusief
                    persoon1InclusiefPrijs
                    personen2Exclusief
                    personen2ExclusiefPrijs
                    personen2Inclusief
                    personen2InclusiefPrijs
                }
                ondertekst
                downloadKnop
            }
        }`
    },
};
</script>