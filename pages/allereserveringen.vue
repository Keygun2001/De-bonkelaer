<template>
    <div>
        <div v-for="(data, i) in allAlleReserveringens" :key="i">
            <div class="bg-blue-100 md:py-32 py-8">
                <div class="container mx-auto">
                    <div class="md:w-10/12 w-full mx-auto">
                        <h1>
                            {{ data.titel }}
                        </h1>
                        <p class="mt-8">
                            {{ data.tekst }}
                        </p>
                    </div>
                    <div class="md:w-10/12 w-full mx-auto mt-8">
                        <table class="lg:block hidden reserveringtable">
                            <!-- Voor een of andere reden pakt hij hem zonder client-only niet -->
                            <client-only>
                                <div class="revall">
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].lidnummer }}
                                        <td v-for="(item, index) in lidnummers" :key="index" v-html="lidnummers[index]"></td>  
                                    </tr>
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].baan }}
                                        <td v-for="(item, index) in banen" :key="index" v-html="banen[index]"></td>  
                                    </tr>
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].medespeler1 }}
                                        <td v-for="(item, index) in medespeler1s" :key="index" v-html="medespeler1s[index]"></td>  
                                    </tr>
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].medespeler2 }}
                                        <td v-for="(item, index) in medespeler2s" :key="index" v-html="medespeler2s[index]"></td>  
                                    </tr>
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].medespeler3 }}
                                        <td v-for="(item, index) in medespeler3s" :key="index" v-html="medespeler3s[index]"></td>  
                                    </tr>
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].datum }}
                                        <td v-for="(item, index) in datums" :key="index" v-html="datums[index]"></td>  
                                    </tr>
                                    <tr class="flex flex-col">
                                        {{ data.tabel[0].tijd }}
                                        <td v-for="(item, index) in tijden" :key="index" v-html="tijden[index]"></td>  
                                    </tr>
                                </div>
                            </client-only>
                        </table>
                        <table class="lg:hidden block reserveringtable">
                            <!-- Voor een of andere reden pakt hij hem zonder client-only niet -->
                            <client-only>
                                <div class="revall">
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].lidnummer }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in lidnummers" :key="index" v-html="lidnummers[index]"></td>  
                                    </tr>
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].baan }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in banen" :key="index" v-html="banen[index]"></td>  
                                    </tr>
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].medespeler1 }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in medespeler1s" :key="index" v-html="medespeler1s[index]"></td>  
                                    </tr>
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].medespeler2 }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in medespeler2s" :key="index" v-html="medespeler2s[index]"></td>  
                                    </tr>
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].medespeler3 }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in medespeler3s" :key="index" v-html="medespeler3s[index]"></td>  
                                    </tr>
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].datum }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in datums" :key="index" v-html="datums[index]"></td>  
                                    </tr>
                                    <tr class="flex">
                                        <div class="w-6/12">
                                            {{ data.tabel[0].tijd }}
                                        </div>
                                        <td class="w-6/12" v-for="(item, index) in tijden" :key="index" v-html="tijden[index]"></td>  
                                    </tr>
                                </div>
                            </client-only>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import gql from 'graphql-tag'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {

    data: function(){
        return {
            lidnummer: '',
            baan: '',
            medespeler1: '',
            medespeler2: '',
            medespeler3: '',
            datum: '',
            tijd: '',
            lidnummers: [],
            banen: [],
            medespeler1s: [],
            medespeler2s: [],
            medespeler3s: [],
            datums: [],
            tijden: []
        }
    },

    mounted() {
        self = this

        const reserveringsref = firebase.database().ref('Reserveringen/')
        
        reserveringsref.once('value', function(snapshot){

            var lidnummer = ''
            var baan = ''
            var medespeler1 = ''
            var medespeler2 = ''
            var medespeler3 = ''
            var datum = ''
            var tijd = ''

            const lidnummers = []
            const banen = []
            const medespeler1s = []
            const medespeler2s = []
            const medespeler3s = []
            const datums = []
            const tijden = []

            snapshot.forEach(function(childSnapshot){
                const data = childSnapshot.val()

                self.lidnummer = data.Lidnummer
                self.baan = data.Baan
                self.medespeler1 = data.Medespeler1
                self.medespeler2 = data.Medespeler2
                self.medespeler3 = data.Medespeler3
                self.datum = data.Datum
                self.tijd = data.Tijd

                lidnummers.push(
                    "<td>" + data.Lidnummer + "</td>"
                )
                banen.push(
                   "<td>" + data.Baan + "</td>"
                )
                medespeler1s.push(
                    "<td>" + data.Medespeler1 + "</td>"
                )
                medespeler2s.push(
                    "<td>" + data.Medespeler2 + "</td>"
                )
                medespeler3s.push(
                    "<td>" + data.Medespeler3 + "</td>"
                )
                datums.push(
                    "<td>" + data.Datum + "</td>"
                )
                tijden.push(
                    "<td>" + data.Tijd + "</td>"
                )

            });
            self.lidnummers = lidnummers; 
            self.banen = banen; 
            self.medespeler1s = medespeler1s; 
            self.medespeler2s = medespeler2s; 
            self.medespeler3s = medespeler3s; 
            self.datums = datums; 
            self.tijden = tijden; 
        });
    },

    apollo: {
        allAlleReserveringens: gql`{
            allAlleReserveringens {
                titel
                tekst
                tabel {
                    lidnummer
                    baan
                    medespeler1
                    medespeler2
                    medespeler3
                    datum
                    tijd
                }
            }
        }`
    }
}
</script>

<style scoped src="~/static/css/main.css"></style>