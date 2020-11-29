<template>
    <div>
        <div v-for="(data, index) in allGebruikersToevoegens" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="mx-auto w-10/12 py-32">
                        <div class="md:w-6/12 w-full">
                            <h1>
                                {{ data.paginaTitel }}
                            </h1>
                            <p class="w-full leading-7 mt-4">
                                {{ data.welkom }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ data.stap1 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ data.stap2 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ data.stap3 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ data.stap4 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ data.stap5 }}
                            </p>
                            <p class="w-full leading-7 mt-4">
                                {{ data.stap6 }}
                            </p>
                        </div>
                        <div class="mt-8">
                            <formulier />
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>    
</template>

<script>
    import gql from 'graphql-tag'
    import formulier from '../components/formulier'
export default {
    components: {
        formulier
    },
    apollo: {
        allGebruikersToevoegens: gql`{
            allGebruikersToevoegens {
                paginaTitel
                welkom
                stap1
                stap2
                stap3
                stap4
                stap5
                stap6
                formulier {
                    voornaam
                    achternaam
                    email
                    lidnummer
                    toevoegen
                }
            }
        }`
    },
}
</script>