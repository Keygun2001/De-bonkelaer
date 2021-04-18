<template>
    <div>
        <div v-for="(data, index) in allIngelogds" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex items-center md:mx-auto md:w-10/12 w-full md:py-32 py-8">
                        <div class="md:w-10/12 w-full md:mr-4">
                            <h1>
                                {{ data.contentmatrix[0].titel }}
                            </h1>
                            <p v-if="isAdmin" class="w-full leading-7 mt-4">
                                {{ data.contentmatrix[0].tekst }} {{ voornaam }} {{ achternaam }} {{ data.tekst2admin }}
                            </p>
                            <p v-else class="w-full leading-7 mt-4">
                                {{ data.contentmatrix[0].tekst }} {{ voornaam }} {{ achternaam }} {{ data.tekst2 }}
                            </p>
                            <div class="mt-8">
                                <div v-if="isAdmin">
                                    <div class="lg:block hidden">
                                        <NuxtLink to="/allereserveringen" class="reserveringadmin">{{ data.allreserveringen }}</NuxtLink>
                                    </div>
                                    <NuxtLink to="/gebruikertoevoegen" class="reserveringadmin mt-4">{{ data.gebruikerToevoegen }}</NuxtLink>
                                </div>
                                <NuxtLink to="/mijnreservering" class="reservering mt-4">{{ data.mijnreserveringen }}</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="flex items-center mx-auto md:w-10/12 w-full md:pt-32 pt-8 mb-8">
                    <div class="w-full">
                        <h1>
                            {{ data.contentmatrix[1].titel }}
                        </h1>
                        <p class="leading-7 mt-4 md:w-10/12 w-full">
                            {{ data.contentmatrix[1].tekst }}
                        </p>
                    </div>
                </div>
                <div v-for="(data, i) in allAlleReserveringens" :key="i" class="md:w-10/12 w-full mx-auto md:mb-8 mb-4">
                    <table class="lg:block hidden reserveringtable">
                        <client-only>
                            <div class="revall">
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].lidnummer }}
                                    <td v-for="(item, index) in lidnummers" :key="index" v-html="lidnummers[index]"></td>  
                                </tr>
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].baan }}
                                    <td v-for="(item, index) in banen" :key="index" v-html="banen[index]"></td>  
                                </tr>
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].medespeler1 }}
                                    <td v-for="(item, index) in medespeler1s" :key="index" v-html="medespeler1s[index]"></td>  
                                </tr>
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].medespeler2 }}
                                    <td v-for="(item, index) in medespeler2s" :key="index" v-html="medespeler2s[index]"></td>  
                                </tr>
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].medespeler3 }}
                                    <td v-for="(item, index) in medespeler3s" :key="index" v-html="medespeler3s[index]"></td>  
                                </tr>
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].datum }}
                                    <td v-for="(item, index) in datums" :key="index" v-html="datums[index]"></td>  
                                </tr>
                                <tr class="flex flex-col">
                                    {{ data.contentmatrix[0].tijd }}
                                    <td v-for="(item, index) in gekozentijden" :key="index" v-html="gekozentijden[index]"></td>  
                                </tr>
                            </div>
                        </client-only>
                    </table>
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
                        <p class="md:mb-4 mb-0">
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
                        <select v-model="gekozentijd" class="inputbox rounded md:mt-0 mt-4" required>
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
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/functions';

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
            tijden: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-00:00'],
            gekozentijd: '',
            error: '',
            succesvol: '',
            afschermbaan: '',
            afschermdatum: '',
            error2 : '',
            succesvol2: '',
            lidnummers: [],
            banen: [],
            medespeler1s: [],
            medespeler2s: [],
            medespeler3s: [],
            datums: [],
            gekozentijden: [],
            timestampdate: ''
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
                self.achternamen = data.Achternaam
                self.lidnummers = data.Lidnummer
                if(data.IsAdmin == false) {
                    medespelers.push(self.voornamen + " " + self.achternamen + " - " + self.lidnummers);
                }
                if(data.Email == email) {
                    self.voornaam = data.Voornaam;
                    self.achternaam = data.Achternaam;
                    self.lidnummer = data.Lidnummer;
                    self.isAdmin = data.IsAdmin
                } 
            });
            medespelers.sort(function(a, b) {
                if(a < b) { return -1}
                if(a > b) { return 1 }
                return 0
            })
            self.medespelers = medespelers; 
        });

        const reserveringsref = firebase.database().ref('Reserveringen/')
        reserveringsref.once('value', function(snapshot){

            const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
            const timestampday = timestamp.toDate().getUTCDate()
            const timestampmonth = timestamp.toDate().getUTCMonth() + 1
            const timestampyear = timestamp.toDate().getUTCFullYear()

            const timestamphours = timestamp.toDate().getUTCHours()
            const timestamphourplus1 = timestamphours + 1

            var timestampdate = timestampyear.toString() + "-" + timestampmonth.toString() + "-" + timestampday.toString()
            const timestamptime = timestamphours.toString() + ":00-" + timestamphourplus1.toString() + ":00"

            var email = self.email
            let datadatum = ""
            let datatijd = ""

            const lidnummers = []
            const banen = []
            const medespeler1s = []
            const medespeler2s = []
            const medespeler3s = []
            const datums = []
            const gekozentijden = []

            snapshot.forEach(function(childSnapshot){
                const data = childSnapshot.val()
                if(data.Email == email) {
                    datatijd = data.Tijd
                    datadatum = data.Datum
                }
                if(timestampmonth < 10) {
                    timestampdate = timestampyear.toString() + "-" + "0" + timestampmonth.toString() + "-" + timestampday.toString()
                } else {
                    timestampdate = timestampyear.toString() + "-" + timestampmonth.toString() + "-" + timestampday.toString()
                }
                if(data.Lidnummer) {
                    if(data.Lidnummer != '923483927598') {
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
                        gekozentijden.push(
                            "<td>" + data.Tijd + "</td>"
                        )
                    }
                }
            });
            self.lidnummers = lidnummers; 
            self.banen = banen; 
            self.medespeler1s = medespeler1s; 
            self.medespeler2s = medespeler2s; 
            self.medespeler3s = medespeler3s; 
            self.datums = datums; 
            self.gekozentijden = gekozentijden;
            if(datatijd != "") {
                if(timestampdate > datadatum) {
                    const ref = firebase.database().ref('Reserveringen/')
                    const abcd = ref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                    abcd.once('value', function(abcdSnap){
                        var a = abcdSnap.val();
                        var b = Object.keys(a)[0];
                        ref.child(b).remove();
                    })
                } else if(timestampdate == datadatum) {
                    if(timestamptime > datatijd){
                        const ref = firebase.database().ref('Reserveringen/')
                        const abcd = ref.orderByChild('Lidnummer').equalTo(self.lidnummer);
                        abcd.once('value', function(abcdSnap){
                            var a = abcdSnap.val();
                            var b = Object.keys(a)[0];
                            ref.child(b).remove();
                        })
                    }
                } else {
                    return
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

                const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
                const timestampday = timestamp.toDate().getUTCDate()
                const timestampmonth = timestamp.toDate().getUTCMonth() + 1
                const timestampyear = timestamp.toDate().getUTCFullYear()
                var timestampdate = self.timestampdate

                const timestamphours = timestamp.toDate().getUTCHours()
                const timestamphourplus1 = timestamphours + 1

                const timestamptime = timestamphours.toString() + ":00-" + timestamphourplus1.toString() + ":00" 

                //get filled in data
                const email = self.email
                const lidnummer = self.lidnummer
                const court = self.court
                const medespeler1 = self.medespeler1
                var medespeler2 = self.medespeler2
                var medespeler3 = self.medespeler3
                const datum = self.datum
                const tijd = self.gekozentijd
                const voornaam = self.voornaam
                const achternaam = self.achternaam

                //get database data
                let datanummer = ''
                let dataspelernummer = ''
                let databaan = ''
                let datadatum = ''
                let datatijd = ''
                let datamedespeler1 = 'speler1'
                let datamedespeler2 = 'speler2'
                let datamedespeler3 = 'speler3'
                let error = self.error
                let dataafschermbaan = ""
                let dataafschermdatum = ""
                let datareserveerdatum = ""
                let datareserveertijd = ""

                snapshot.forEach(function(childSnapshot){
                    const data = childSnapshot.val()
                    if (self.lidnummer == data.Lidnummer) {
                        datanummer = data.Lidnummer
                        datareserveerdatum = data.Datum
                        datareserveertijd = data.Tijd
                    }
                    if(data.Medespeler1 == voornaam + " " + achternaam + " - " + self.lidnummer) {
                        datanummer = data.Medespeler1
                        datareserveerdatum = data.Datum
                        datareserveertijd = data.Tijd
                    }
                    if(data.Medespeler2 == voornaam + " " + achternaam + " - " + self.lidnummer) {
                        datanummer = data.Medespeler2
                        datareserveerdatum = data.Datum
                        datareserveertijd = data.Tijd
                    }
                    if(data.Medespeler3 == voornaam + " " + achternaam + " - " + self.lidnummer) {
                        datanummer = data.Medespeler3
                        datareserveerdatum = data.Datum
                        datareserveertijd = data.Tijd
                    }
                    if(self.medespeler1 == data.Voornaam + " " + data.Achternaam + " - " + data.Lidnummer) {
                        dataspelernummer = self.medespeler1
                    }
                    if(self.medespeler2 == data.Voornaam + " " + data.Achternaam + " - " + data.Lidnummer) {
                        dataspelernummer = self.medespeler2
                    }
                    if(self.medespeler3 == data.Voornaam + " " + data.Achternaam + " - " + data.Lidnummer) {
                        dataspelernummer = self.medespeler3
                    }
                    if(self.voornaam + " " + self.achternaam + " - " + data.Lidnummer == data.Lidnummer) {
                        dataspelernummer = self.voornaam + " " + self.achternaam + " - " + data.Lidnummer
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
                    if(self.court == data.Baan) {
                        databaan = data.Baan
                    }
                    if(self.datum == data.Datum) {
                        datadatum = data.Datum
                        if(self.gekozentijd == data.Tijd) {
                            datatijd = data.Tijd
                        }
                    }
                    if(self.court == data.Afschermbaan) {
                        dataafschermbaan = data.Afschermbaan
                    }
                    if(self.datum == data.Afschermdatum) {
                        dataafschermdatum = data.Afschermdatum
                    }
                    if(timestampmonth < 10) {
                        timestampdate = timestampyear.toString() + "-" + "0" + timestampmonth.toString() + "-" + timestampday.toString()
                    } else {
                        timestampdate = timestampyear.toString() + "-" + timestampmonth.toString() + "-" + timestampday.toString()
                    }
                });
                if(self.isAdmin == true) {
                    self.error = ""
                    self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                    reserveringref.push({
                        Lidnummer: lidnummer,
                        Baan: court,
                        Medespeler1: medespeler1,
                        Medespeler2: medespeler2,
                        Medespeler3: medespeler3,
                        Datum: datum,
                        Tijd: tijd,
                        Email: email,
                        Voornaam: voornaam,
                        Achternaam: achternaam
                    })

                } else {
                if(dataafschermbaan) {
                    if(dataafschermdatum) {
                        self.error = "Deze baan is op deze datum afgeschermd."
                    } else {
                        if(datanummer) {
                            self.error = "U heeft al een reservering in ons systeem staan, u kunt weer reserveren vanaf: " + datareserveerdatum + " " + datareserveertijd
                        }
                        if(timestampdate > datum){
                            self.error = "U kunt niet in het verleden reserveren."
                            return
                        } 
                        if(timestampdate == datum && timestamptime >= tijd) {
                            self.error = "U kunt niet in het verleden reserveren."
                            return
                        }
                        if(dataspelernummer) {
                            self.error = dataspelernummer + " heeft al een reservering in ons systeem staan"
                        } else if(medespeler1 == datamedespeler1) {
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
                                                Email: email,
                                                Voornaam: voornaam,
                                                Achternaam: achternaam
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
                                            Email: email,
                                            Voornaam: voornaam,
                                            Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                            Email: email,
                                            Voornaam: voornaam,
                                            Achternaam: achternaam
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
                                            Email: email,
                                            Voornaam: voornaam,
                                            Achternaam: achternaam
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
                                            Email: email,
                                            Voornaam: voornaam,
                                            Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
                                })
                            }
                            } else {
                                self.error = medespeler2 + " heeft al een reservering in ons systeem staan"
                            }
                        }
                        else if(medespeler2 == datamedespeler2) {
                                if(datamedespeler2 == "" || datamedespeler2 == "-" && medespeler3 != "-") {
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
                                                        Email: email,
                                                        Voornaam: voornaam,
                                                        Achternaam: achternaam
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
                                                    Email: email,
                                                    Voornaam: voornaam,
                                                    Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
                                })
                            }
                            } else {
                                self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                            }
                        } else {
                            self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email,
                                Voornaam: voornaam,
                                Achternaam: achternaam
                            })
                        }
                    }
                } else {
                    if(datanummer) {
                        self.error = "U heeft al een reservering in ons systeem staan, u kunt weer reserveren vanaf: " + datareserveerdatum + " " + datareserveertijd
                    }
                    if(timestampdate > datum){
                            self.error = "U kunt niet in het verleden reserveren."
                            return
                        } 
                        if(timestampdate == datum && timestamptime >= tijd) {
                            self.error = "U kunt niet in het verleden reserveren."
                            return
                        }
                    if(dataspelernummer) {
                        self.error = dataspelernummer + " heeft al een reservering in ons systeem staan"
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
                                })
                            }
                            } else {
                                self.error = medespeler2 + " heeft al een reservering in ons systeem staan"
                            }
                        }
                        else if(medespeler2 == datamedespeler2) {
                                if(datamedespeler2 == "" || datamedespeler2 == "-" && medespeler3 != "-") {
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
                                                        Email: email,
                                                        Voornaam: voornaam,
                                                        Achternaam: achternaam
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
                                                    Email: email,
                                                    Voornaam: voornaam,
                                                    Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
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
                                        Email: email,
                                        Voornaam: voornaam,
                                        Achternaam: achternaam
                                })
                            }
                            } else {
                                self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                            }
                        } else {
                            self.succesvol = "Reservering succesvol aangemaakt, u tennist op " + datum + " om " + tijd + " samen met " + medespeler1 + ", " + medespeler2 + " en " + medespeler3
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                                Email: email,
                                Voornaam: voornaam,
                                Achternaam: achternaam
                            })
                        }
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
                contentmatrix {
                    titel
                    tekst
                }
                tekst2
                tekst2admin
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
        }`,
        allAlleReserveringens: gql`{
            allAlleReserveringens {
                titel
                tekst
                contentmatrix {
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