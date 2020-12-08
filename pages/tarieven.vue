<template>
    <div>
        <div v-for="(tarieven, index) in allTarievens" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto">
                <div class="mx-auto md:w-10/12 w-full md:py-32 py-8">
                    <div class="w-full md:mr-4 mr-0">
                        <h1>
                            {{ tarieven.titel }}
                        </h1>
                    </div>
                    <div class="w-full md:mt-12 mt-4">
                        <h2>
                            {{ tarieven.seizoen }}
                        </h2>
                    </div>
                    <div class="flex w-full">
                        <div class="">
                            <table>
                                <tr>
                                    <td>
                                        {{ tarieven.prijzen[0].senioren }}
                                    </td>
                                    <td class="flex justify-end">
                                        {{ tarieven.prijzen[0].seniorenPrijs }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {{ tarieven.prijzen[0].tot17 }}
                                    </td>
                                    <td class="flex justify-end">
                                        {{ tarieven.prijzen[0].tot17Prijs }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {{ tarieven.prijzen[0].jongerDan15 }}
                                    </td>
                                    <td class="flex justify-end">
                                        {{ tarieven.prijzen[0].jongerDan15Prijs }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        {{ tarieven.prijzen[0].zomerarrangement }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="md:py-0 py-4">
                                        {{ tarieven.prijzen[0].persoon1Exclusief }}
                                    </td>
                                    <td class="flex justify-end md:mt-0 mt-4">
                                        {{ tarieven.prijzen[0].persoon1ExclusiefPrijs }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="md:py-0 py-4">
                                        {{ tarieven.prijzen[0].persoon1Inclusief }}
                                    </td>
                                    <td class="flex justify-end md:mt-0 mt-4">
                                        {{ tarieven.prijzen[0].persoon1InclusiefPrijs }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="md:py-0 py-4">
                                        {{ tarieven.prijzen[0].personen2Exclusief }}
                                    </td>
                                    <td class="flex justify-end md:mt-0 mt-4">
                                        {{ tarieven.prijzen[0].personen2ExclusiefPrijs }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="md:py-0 py-4">
                                        {{ tarieven.prijzen[0].personen2Inclusief }}
                                    </td>
                                    <td class="flex justify-end md:mt-0 mt-4">
                                        {{ tarieven.prijzen[0].personen2InclusiefPrijs }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="md:w-8/12 w-full mt-4">
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