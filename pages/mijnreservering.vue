<template>
    <div>
        <div v-for="(reservering, index) in allMijnReserverings" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto lg:py-32 py-8">
                <div class="flex lg:flex-row flex-col items-center mx-auto lg:w-10/12 w-full mb-12">
                    <div class="lg:w-6/12 w-full">
                        <h1>
                            {{ reservering.titel }}
                        </h1>
                        <p class="mt-4">
                            {{ reservering.tekst }}
                        </p>
                    </div>
                </div>
                <div v-if="lidnummer" class="lg:flex inline lg:w-10/12 w-full mx-auto">
                    <table v-if="aanpassen == false" class="reserveringtable lg:inline flex lg:w-9/12 w-full">
                        <tr class="rev">
                            <td>
                                {{ reservering.reservering[0].lidnummer }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].baan }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].medespeler1 }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].medespeler2 }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].medespeler3 }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].datum }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].tijd }}
                            </td>
                        </tr>
                        <tr class="rev">
                            <td>
                                {{ lidnummer }}
                            </td>
                            <td>
                                {{ baan }}
                            </td>
                            <td>
                                {{ medespeler1 }}
                            </td>
                            <td>
                                {{ medespeler2 }}
                            </td>
                            <td>
                                {{ medespeler3 }}
                            </td>
                            <td>
                                {{ datum }}
                            </td>
                            <td>
                                {{ tijd }}
                            </td>
                        </tr>
                    </table>
                    <table v-else class="reserveringtable lg:inline flex w-full">
                        <tr class="rev">
                            <td>
                                {{ reservering.reservering[0].lidnummer }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].baan }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].medespeler1 }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].medespeler2 }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].medespeler3 }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].datum }}
                            </td>
                            <td>
                                {{ reservering.reservering[0].tijd }}
                            </td>
                        </tr>
                        <tr class="rev">
                            <td>
                                {{ lidnummer }}
                            </td>
                            <td>
                                {{ baan }}
                            </td>
                            <td>
                                <select v-model="medespeler1" class="inputbox rounded" required>
                                    <option v-for="(option, z) in medespelers" :key="z">{{ medespelers[z] }}</option>
                                </select>
                            </td>
                            <td>
                                <select v-model="medespeler2" class="inputbox rounded" required>
                                    <option v-for="(option, x) in medespelers" :key="x">{{ medespelers[x] }}</option>
                                </select>
                            </td>
                            <td>
                                <select v-model="medespeler3" class="inputbox rounded" required>
                                    <option v-for="(option, y) in medespelers" :key="y">{{ medespelers[y] }}</option>
                                </select>
                            </td>
                            <td>
                                {{ datum }}
                            </td>
                            <td>
                                {{ tijd }}
                            </td>
                        </tr>
                    </table>
                    <div class="lg:inline flex lg:justify-center py-4" v-if="aanpassen == false">
                        <button @click="aanpassen = !aanpassen" class="downloadbtn">{{ reservering.aanpassenKnop }}</button>
                    </div>
                    <div class="lg:inline flex lg:mt-0 mt-4 lg:py-0 py-8" v-else>
                        <button @click="reserveren" class="downloadbtn">{{ reservering.doorvoerenKnop }}</button>
                        <div class="lg:mt-8 mt-4">
                            <div @click="verwijderen" class="kruis">
                                <div class="een"></div>
                                <div class="twee"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="error || succesvol" class="flex w-10/12 mx-auto">
                    <p class="rodetekst">
                        {{ error }}
                    </p>
                    <p class="groenetekst">
                        {{ succesvol }}
                    </p>
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

    data() {
        return {
            aanpassen: false,
            email: firebase.auth().currentUser.email,
            lidnummer: '',
            baan: '',
            medespeler1: '',
            medespeler2: '',
            medespeler3: '',
            medespelers: [],
            tijden: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            datum: '',
            tijd: '',
            error: '',
            succesvol: ''
        }
    },

    mounted() {
        self = this
        const gebruikersref = firebase.database().ref('Gebruikers/')

        gebruikersref.once('value', function(snapshot){
            var voornamen = ''
            var lidnummers = ''
            const medespelers = []

            snapshot.forEach(function(childSnapshot){
                const data = childSnapshot.exportVal();
                self.voornamen = data.Voornaam
                self.lidnummers = data.Lidnummer
                medespelers.push(self.voornamen + " - " + self.lidnummers);
            });
            self.medespelers = medespelers;
        });

        const reserveringsref = firebase.database().ref('Reserveringen/')
        reserveringsref.once('value', function(snapshot){
            const email = self.email
            const lidnummer = ''

            const datalidnummer = ''
            const medespeler1 = ''
            const medespeler2 = ''
            const medespeler3 = ''
            const datum = ''
            const tijd = ''
            const baan = ''
            const error = ''
            

            snapshot.forEach(function(childSnapShot){
                const data = childSnapShot.exportVal()
                if(email == data.Email) {
                    self.lidnummer = data.Lidnummer
                    self.medespeler1 = data.Medespeler1
                    self.medespeler2 = data.Medespeler2
                    self.medespeler3 = data.Medespeler3
                    self.datum = data.Datum
                    self.tijd = data.Tijd
                    self.baan = data.Baan
                }
            });
            if(self.lidnummer) {
                return
            } else {
                console.log(self.lidnummer)
                self.error = "U heeft geen reservering in ons systeem staan"
            }
        });
    },

    methods: {

        verwijderen: function() {
            const ref = firebase.database().ref('Reserveringen/')
            const abcd = ref.orderByChild('Lidnummer').equalTo(this.lidnummer);
            abcd.once('value', function(abcdSnap){
                var a = abcdSnap.val();
                var b = Object.keys(a)[0];
                ref.child(b).remove();
            })
        },

        reserveren: function() {
            const reserveringsref = firebase.database().ref('Reserveringen/')
            reserveringsref.once('value', function(snapshot){
                //get filled in data
                const email = self.email
                const lidnummer = self.lidnummer
                const baan = self.baan
                const medespeler1 = self.medespeler1
                const medespeler2 = self.medespeler2
                const medespeler3 = self.medespeler3
                const datum = self.datum
                const tijd = self.tijd

                //get database data
                let databaan = ''
                let datadatum = ''
                let datatijd = ''
                let datamedespeler1 = 'speler1'
                let datamedespeler2 = 'speler2'
                let datamedespeler3 = 'speler3'

                let datagelijkbaan = ''
                let datagelijkdatum = ''
                let datagelijktijd = ''
                let datagelijkmedespeler1 = 'speler1'
                let datagelijkmedespeler2 = 'speler2'
                let datagelijkmedespeler3 = 'speler3'
                let error = self.error

                snapshot.forEach(function(childSnapshot){
                    const data = childSnapshot.val()
                    if(self.baan == data.Baan) {
                        if(self.email == data.Email) {
                            datagelijkbaan = data.Baan
                        } else {
                            databaan = data.Baan
                        }
                    }
                    if(self.medespeler1 == data.Medespeler1) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler1 = data.Medespeler1
                        } else {
                            datamedespeler1 = data.Medespeler1
                        }
                    }
                    if(self.medespeler2 == data.Medespeler1) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler2 = data.Medespeler2
                        } else {
                            datamedespeler2 = data.Medespeler1
                        }
                    }
                    if(self.medespeler3 == data.Medespeler1) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler3 = data.Medespeler1
                        } else {
                            datamedespeler3 = data.Medespeler1
                        }
                    }
                    if(self.medespeler1 == data.Medespeler2) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler2 = data.Medespeler2
                        } else {
                            datamedespeler2 = data.Medespeler2
                        }
                    }
                    if(self.medespeler2 == data.Medespeler2) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler2 = data.Medespeler3
                        } else {
                            datamedespeler2 = data.Medespeler3
                        }
                    }
                    if(self.medespeler3 == data.Medespeler2) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler1 = data.Medespeler1
                        } else {
                            datamedespeler1 = data.Medespeler1
                        }
                    }
                    if(self.medespeler1 == data.Medespeler3) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler1 = data.Medespeler3
                        } else {
                            datamedespeler1 = data.Medespeler3
                        }
                    }
                    if(self.medespeler2 == data.Medespeler3) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler2 = data.Medespeler3
                        } else {
                            datamedespeler2 = data.Medespeler3
                        }
                    }
                    if(self.medespeler3 == data.Medespeler3) {
                        if(self.email == data.Email) {
                            datagelijkmedespeler3 = data.Medespeler3
                        } else {
                            datamedespeler3 = data.Medespeler3
                        }
                    }
                    if(self.datum == data.Datum) {
                        if(self.email == data.Email) {
                            datagelijkdatum = data.Datum
                        } else {
                            datadatum = data.Datum
                        }
                    }
                    if(self.tijd == data.Tijd) {
                        if(self.email == data.Email) {
                            datagelijktijd = data.Tijd
                        } else {
                            datatijd = data.Tijd
                        }
                    }
                    if(self.email == data.Email) {
                        if(medespeler1 == datamedespeler1) {
                    if(datamedespeler1 == "" || datamedespeler1 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                          self.aanpassen = false
                          const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler1 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler1 == datamedespeler2) {
                    if(datamedespeler1 == "" || datamedespeler1 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                        self.aanpassen = false
                        
                        const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler1 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler1 == datamedespeler3) {
                    if(datamedespeler1 == "" || datamedespeler1 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                        self.aanpassen = false
                        
                        const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler1 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler2 == datamedespeler1) {
                    if(datamedespeler2 == "" || datamedespeler2 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                        self.aanpassen = false
                        
                        const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler2 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler2 == datamedespeler2) {
                        if(datamedespeler2 == "" && medespeler3 != "") {
                            self.error = "Kies eerst een 2e medespeler voordat u een 3e medespeler kiest"
                        } else {
                            if(datamedespeler2 == "" || datamedespeler2 == "-") {
                                if(baan == databaan) {
                                    self.succesvol = 'baan beschikbaar'
                                    console.log(baan)
                                    if(datum == datadatum) {
                                        self.succesvol = "datum beschikbaar"
                                        console.log(datum)
                                        if(tijd == datatijd) {
                                            self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                            self.succesvol = ""
                                        } else {
                                            self.aanpassen = false
                                            
                                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                                        }
                                    } else {
                                        self.aanpassen = false
                                        
                                        const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                                    }
                                } else{
                                    self.aanpassen = false
                                    
                                }
                            } else {
                                self.error = medespeler2 + " heeft al een reservering in ons systeem staan" 
                            }
                        }
                    }
                else if(medespeler2 == datamedespeler3) {
                    if(datamedespeler2 == "" || datamedespeler2 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                          self.aanpassen = false
                          
                          const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler2 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler3 == datamedespeler1) {
                    if(datamedespeler3 == "" || datamedespeler3 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                          self.aanpassen = false
                          
                          const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler3 == datamedespeler2) {
                    if(datamedespeler3 == "" || datamedespeler3 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                          self.aanpassen = false
                          
                          const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler3 == datamedespeler3) {
                    if(datamedespeler3 == "" || datamedespeler3 == "-") {
                        if(baan == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(baan)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.aanpassen = false
                                
                                const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                              }
                          } else {
                            self.aanpassen = false
                            
                            const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                          }
                      } else{
                          self.aanpassen = false
                          const abcd = reserveringsref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                                abcd.once('value', function(abcdSnap){
                                    var a = abcdSnap.val();
                                    var b = Object.keys(a)[0];
                                    reserveringsref.child(b).remove();
                                })
                                reserveringsref.push({
                                    Lidnummer: lidnummer,
                                    Baan: baan,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                    Email: email
                                })
                      }
                    } else {
                        self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                    }
                }
                    }
                });
            });
        }
    },

    apollo: {
        allMijnReserverings: gql`{
            allMijnReserverings {
                titel
                tekst
                baanEen
                baanTwee
                reservering {
                    lidnummer
                    medespeler1
                    medespeler2
                    medespeler3
                    datum
                    tijd
                    baan
                }
                aanpassenKnop
                doorvoerenKnop
            }
        }`
    }    
}
</script>

<style scoped src="~/static/css/main.css"></style>