<template>
    <div>
        <div v-for="(data, index) in allIngelogds" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex items-center md:mx-auto w-10/12 md:py-32 py-8">
                        <div class="md:w-6/12 w-full md:mr-4">
                            <h1>
                                {{ data.titeltekst[0].titel }}
                            </h1>
                            <p class="w-full leading-7 mt-4">
                                {{ data.titeltekst[0].tekst }} {{ voornaam }} {{ achternaam }}
                            </p>
                            <div class="mt-8">
                                <div v-if="isAdmin">
                                    <NuxtLink to="/allereserveringen" class="reserveringadmin">{{ data.allreserveringen }}</NuxtLink>
                                    <NuxtLink to="/gebruikertoevoegen" class="reserveringadmin mt-4">{{ data.gebruikerToevoegen }}</NuxtLink>
                                    <NuxtLink to="/mijnreservering" class="reservering mt-4">{{ data.mijnreserveringen }}</NuxtLink>
                                </div>
                                <div v-else>
                                    <NuxtLink to="/mijnreservering" class="reservering">{{ data.mijnreserveringen }}</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto">
                <div class="flex items-center mx-auto md:w-10/12 w-full md:pt-32 pt-8 mb-8">
                    <div class="w-full">
                        <h1>
                            {{ data.titeltekst[1].titel }}
                        </h1>
                        <p class="leading-7 mt-4 md:w-10/12 w-full">
                            {{ data.titeltekst[1].tekst }}
                        </p>
                    </div>
                </div>
                <div class="md:w-10/12 w-full md:mx-auto">
                    <form @submit.prevent="reserveren">
                        <p>
                            {{ data.lidnummer }}
                        </p>
                        <input class="rounded inputbox my-4" v-model="lidnummer" type="email" name="emailadres" readonly/>
                        <p>
                            {{ data.baan }}
                        </p>
                        <div class="my-4">
                            <select required class="inputbox rounded" v-model="court" name="banen" id="banen">
                                <option value="baan1">{{ data.baanEen }}</option>
                                <option value="baan2">{{ data.baanTwee }}</option>
                            </select>
                        </div>
                        <p>
                            {{ data.medespeler }}
                        </p>
                        <div class="my-4 flex flex-col md:inline md:flex-row">
                            <select v-model="medespeler1" class="inputbox rounded" required>
                                <option v-for="(option, i) in medespelers" :key="i" :selected="option">{{ medespelers[i] }}</option>
                            </select>
                            <div class="md:py-0 py-4 md:inline flex md:flex-row flex-col">
                                <select v-model="medespeler2" class="inputbox rounded">
                                    <option selected="selected" v-for="(option, z) in medespelers" :key="z">{{ medespelers[z] }}</option>
                                </select>
                            </div>
                            <select v-model="medespeler3" class="inputbox rounded">
                                <option selected="selected" v-for="(option, x) in medespelers" :key="x">{{ medespelers[x] }}</option>
                            </select>
                        </div>
                        <p class="my-4">
                            {{ data.datumtijdinput }}
                        </p>
                        <input class="rounded inputbox" type="date" id="today" v-model="datum" required />
                        <select v-model="gekozentijd" class="inputbox rounded" required>
                            <option v-for="(tijd, y) in tijden" :key="y">{{ tijden[y] }}</option>
                        </select>
                        <input class="downloadbtn my-8" type="submit" :value="data.reserverenKnop" />
                    </form>
                    <div v-if="error || succesvol">
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
    </div>
</template>
<script>
import gql from 'graphql-tag';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {

    data: function() {
        return {
            events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
            logoutTimer: "",
            datum: '',
            court: 'baan1',
            email: firebase.auth().currentUser.email,
            voornaam: '',
            achternaam: '',
            lidnummer: '',
            isAdmin: false,
            medespelers: [],
            medespeler1: '-',
            medespeler2: '-',
            medespeler3: '-',
            tijden: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            beschikbaretijden: [],
            bezettetijden: [],
            gekozentijd: '',
            error: '',
            succesvol: ''
        }
    },

     mounted() {
        self = this
        const gebruikersref = firebase.database().ref('Gebruikers/')
        gebruikersref.once('value', function(snapshot){
            var email = self.email
            var voornaam = ''
            var achternaam = ''
            var lidnummer = ''
            const medespelers = [];
            var voornamen = ''
            var lidnummers = ''
            var isAdmin = false

            snapshot.forEach(function(childSnapshot){
                const data = childSnapshot.exportVal();
                self.voornamen = data.Voornaam
                self.lidnummers = data.Lidnummer
                medespelers.push(self.voornamen + " - " + self.lidnummers);
                if(data.Email == email) {
                    self.voornaam = data.Voornaam;
                    self.achternaam = data.Achternaam;
                    self.lidnummer = data.Lidnummer;
                    self.isAdmin = data.IsAdmin
                }
            });
            self.medespelers = medespelers; 
        });

        const reserveringsref = firebase.database().ref('Reserveringen/')
        reserveringsref.once('value', function(snapshot){

            const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
            const timestampday = timestamp.toDate().getUTCDate()
            const timestampmonth = timestamp.toDate().getUTCMonth() + 1
            const timestampyear = timestamp.toDate().getUTCFullYear()

            const timestamphours = timestamp.toDate().getUTCHours()

            const timestampdate = timestampyear.toString() + "-" + timestampmonth.toString() + "-" + timestampday.toString()
            const timestamptime = timestamphours.toString() + ":00"

            var email = self.email
            let datadatum = ""
            let datatijd = ""

            snapshot.forEach(function(childSnapshot){
                const data = childSnapshot.val()
                if(data.Email == email) {
                    datatijd = data.Tijd
                    datadatum = data.Datum
                }
            });
            if(timestampdate >= datadatum) {
                if(timestamptime == datatijd){
                    const ref = firebase.database().ref('Reserveringen/')
                    const abcd = ref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                    abcd.once('value', function(abcdSnap){
                        var a = abcdSnap.val();
                        var b = Object.keys(a)[0];
                        ref.child(b).remove();
                    })
                }
            }
        });

        this.events.forEach(function (event) {
            window.addEventListener(event, this.resetTimer);
        }, this);

        this.setTimer();
    },

    methods: { 

        reserveren: function() {
            const reserveringref = firebase.database().ref('Reserveringen/')
            reserveringref.once('value', function(snapshot){
                //get filled in data

                const email = self.email
                const lidnummer = self.lidnummer
                const court = self.court
                const medespeler1 = self.medespeler1
                var medespeler2 = self.medespeler2
                var medespeler3 = self.medespeler3
                const datum = self.datum
                const tijd = self.gekozentijd

                //get database data
                const beschikbaretijden = []
                const bezettetijden = []
                let datanummer = ''
                let databaan = ''
                let datadatum = ''
                let datatijd = ''
                let datamedespeler1 = 'speler1'
                let datamedespeler2 = 'speler2'
                let datamedespeler3 = 'speler3'
                let error = self.error

                snapshot.forEach(function(childSnapshot){
                    const data = childSnapshot.val()
                    if (self.lidnummer == data.Lidnummer) {
                        datanummer = data.Lidnummer
                    }
                    if(self.court == data.Baan) {
                        databaan = data.Baan
                    }
                    if(self.medespeler1 == data.Medespeler1) {
                        datamedespeler1 = data.Medespeler1
                    }
                    if(self.medespeler2 == data.Medespeler1) {
                        datamedespeler2 = data.Medespeler1
                    }
                    if(self.medespeler3 == data.Medespeler1) {
                        datamedespeler3 = data.Medespeler1
                    }
                    if(self.medespeler1 == data.Medespeler2) {
                        datamedespeler2 = data.Medespeler2
                    }
                    if(self.medespeler2 == data.Medespeler2) {
                        datamedespeler2 = data.Medespeler3
                    }
                    if(self.medespeler3 == data.Medespeler2) {
                        datamedespeler1 = data.Medespeler1
                    }
                    if(self.medespeler1 == data.Medespeler3) {
                        datamedespeler1 = data.Medespeler3
                    }
                    if(self.medespeler2 == data.Medespeler3) {
                        datamedespeler2 = data.Medespeler3
                    }
                    if(self.medespeler3 == data.Medespeler3) {
                        datamedespeler3 = data.Medespeler3
                    }
                    if(self.datum == data.Datum) {
                        datadatum = data.Datum
                    }
                    if(self.gekozentijd == data.Tijd) {
                        datatijd = data.Tijd
                    }
                });
                //bcs we checked in the foreach loop we can set the error messages
                if(lidnummer == datanummer) {
                    self.error = "U heeft al een reservering in ons systeem staan."
                }
                else if(medespeler1 == datamedespeler1) {
                    if(datamedespeler1 == "" || datamedespeler1 == "-") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                              self.error = ""
                              self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                              if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                          self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                              self.error = ""
                              self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                          self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                            self.error = ""
                            self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                          self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                            self.error = ""
                            self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                          self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                                if(court == databaan) {
                                    self.succesvol = 'baan beschikbaar'
                                    if(datum == datadatum) {
                                        self.succesvol = "datum beschikbaar"
                                        if(tijd == datatijd) {
                                            self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                            self.succesvol = ""
                                        } else {
                                            self.error = ""
                                            self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                            if(medespeler2 == "") {
                                                medespeler2 = "-"
                                            }
                                            if(medespeler3 == "") {
                                                medespeler3 = "-"
                                            }
                                            reserveringref.push({
                                                Lidnummer: lidnummer,
                                                Baan: court,
                                                Medespeler1: medespeler1,
                                                Medespeler2: medespeler2,
                                                Medespeler3: medespeler3,
                                                Datum: datum,
                                                Tijd: tijd,
                                                Email: email
                                            })
                                        }
                                    } else {
                                        self.error = ""
                                        self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                        if(medespeler2 == "") {
                                            medespeler2 = "-"
                                        }
                                        if(medespeler3 == "") {
                                            medespeler3 = "-"
                                        }
                                        reserveringref.push({
                                            Lidnummer: lidnummer,
                                            Baan: court,
                                            Medespeler1: medespeler1,
                                            Medespeler2: medespeler2,
                                            Medespeler3: medespeler3,
                                            Datum: datum,
                                            Tijd: tijd,
                                            Email: email
                                        })
                                    }
                                } else{
                                    self.error = ""
                                    self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                    if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                    }
                else if(medespeler2 == datamedespeler3) {
                    if(datamedespeler2 == "" || datamedespeler2 == "-") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                            self.error = ""
                            self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                          self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                              self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                  self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                              self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                            })
                          }
                      } else{
                         self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                  self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                                if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                              }
                          } else {
                              self.error = ""
                                self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email
                          })
                          }
                      } else{
                          self.error = ""
                          self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                          if(medespeler2 == "") {
                                    medespeler2 = "-"
                                }
                                if(medespeler3 == "") {
                                    medespeler3 = "-"
                                }
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
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
            })
        },

        setTimer: function() {
            this.logoutTimer = setTimeout(this.logOut, 6000);
        },

        resetTimer: function() {
            clearTimeout(this.logoutTimer);

            this.setTimer();
        }
    },
    apollo: {
        allIngelogds: gql`{
            allIngelogds {
                titeltekst {
                    titel
                    tekst
                }
                reserverenKnop
                lidnummer
                datumtijdinput
                baan
                baanEen
                baanTwee
                medespeler
                allreserveringen
                mijnreserveringen
                gebruikerToevoegen
            }
        }`
    }
}
</script>