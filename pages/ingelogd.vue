<template>
    <div>
        <div v-for="(data, index) in allIngelogds" :key="index">
            <div class="bg-blue-100 shadow-lg">
                <div class="container mx-auto">
                    <div class="flex md:flex-row flex-col items-center mx-auto w-10/12 py-32">
                        <div class="md:w-6/12 w-full mr-4">
                            <h1>
                                {{ data.titeltekst[0].titel }}
                            </h1>
                            <p class="w-full leading-7 mt-4">
                                {{ data.titeltekst[0].tekst }} {{ voornaam }} {{ achternaam }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto">
                <div class="flex items-center mx-auto w-10/12 pt-32 mb-8">
                    <div class="w-full">
                        <h1>
                            {{ data.titeltekst[1].titel }}
                        </h1>
                        <p class="leading-7 mt-4 w-10/12">
                            {{ data.titeltekst[1].tekst }}
                        </p>
                    </div>
                </div>
                <div class="w-10/12 mx-auto">
                    <form @submit.prevent="reserveren">
                        <p>
                            {{ data.lidnummer }}
                        </p>
                        <input class="rounded inputbox my-4" v-model="lidnummer" type="email" name="emailadres" readonly/>
                        <p>
                            {{ data.baan }}
                        </p>
                        <div class="my-4">
                            <select class="banen rounded" v-model="court" name="banen" id="banen">
                                <option value="baan1">{{ data.baanEen }}</option>
                                <option value="baan2">{{ data.baanTwee }}</option>
                            </select>
                        </div>
                        <p>
                            {{ data.medespeler }}
                        </p>
                        <div class="my-4">
                            <select class="banen rounded">
                                <option v-for="(option, index) in medespelers" :key="index">{{ medespelers[index] }}</option>
                            </select>
                            <select class="banen rounded">
                                <option v-for="(option, index) in medespelers" :key="index">{{ medespelers[index] }}</option>
                            </select>
                            <select class="banen rounded">
                                <option v-for="(option, index) in medespelers" :key="index">{{ medespelers[index] }}</option>
                            </select>
                            <select class="banen rounded">
                                <option v-for="(option, index) in medespelers" :key="index">{{ medespelers[index] }}</option>
                            </select>
                        </div>
                        <p class="my-4">
                            {{ data.datumtijdinput }}
                        </p>
                        <input id="date" class="rounded inputbox" v-model="datum" type="datetime-local" required/>
                        <input class="downloadbtn my-8" type="submit" :value="data.reserverenKnop" />
                    </form>
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
            logoutTimer: null,
            datum: '',
            court: '',
            email: firebase.auth().currentUser.email,
            voornaam: '',
            achternaam: '',
            lidnummer: '',
            medespelers: []
        }
    },

     mounted() {
        const gebruikersref = firebase.database().ref('Gebruikers/')
        self = this
        gebruikersref.once('value', function(snapshot){
            var email = self.email
            var voornaam = ''
            var achternaam = ''
            var lidnummer = ''
            const medespelers = [];
            var voornamen = ''
            var lidnummers = ''
            var childlength = snapshot.numChildren()

            snapshot.forEach(function(childSnapshot){
                const data = childSnapshot.exportVal();
                self.voornamen = data.Voornaam
                self.lidnummers = data.Lidnummer
                medespelers.push(self.voornamen + " - " + self.lidnummers);
                if(data.Email == email) {
                    self.voornaam = data.Voornaam;
                    self.achternaam = data.Achternaam;
                    self.lidnummer = data.Lidnummer;
                }
            });
            self.medespelers = medespelers; 
        });

        this.events.forEach(function (event) {
            window.addEventListener(event, this.resetTimer);
        }, this);

        this.setTimer();
    },

    methods: { 

        reserveren: function() {
            const dataref = firebase.database();
            const datumtijd = dataref.ref('Reserveringen/').Datumtijd;
            const name = dataref.ref('Reserveringen/').Naam;
            const baan = dataref.ref('Reserveringen/').Baan;
            if(this.naam == name) {
                console.log('er is al een reservering')
            } else {
                if(this.court == 'baan1') {
                    if(this.datum == datumtijd) {
                        console.log('deze tijd is al gereserveerd voor deze baan')
                    } else {
                        dataref.ref('Reserveringen/').set({
                            Datumtijd: this.datum,
                            Naam: this.email,
                            Baan: this.court
                        });
                    }
                } else {
                    dataref.ref('Reserveringen/').set({
                        Datumtijd: this.datum,
                        Naam: this.email,
                        Baan: this.court
                    });
                }
            }
        },

        setTimer: function() {
            this.logoutTimer = setTimeout(this.logOut, 15 * 60000);
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
            }
        }`
    }
}
</script>