<template>
    <div>
        <div v-for="(data, index) in allGebruikersToevoegens" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="md:w-6/12 w-full">
                            <h1>
                                {{ data.paginaTitel }}
                            </h1>
                            <p class="w-full leading-7 mt-4">
                                {{ data.tekst }}
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
                tekst
            }
        }`
    },
}
</script>