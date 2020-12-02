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
                            <div class="mt-8">
                                <div v-if="lidnummer == '9999'">
                                    <NuxtLink to="/" class="reservering">{{ data.allreserveringen }}</NuxtLink>
                                </div>
                                <div v-else>
                                    <NuxtLink to="/" class="reservering">{{ data.mijnreserveringen }}</NuxtLink>
                                </div>
                            </div>
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
                            <select required class="inputbox rounded" v-model="court" name="banen" id="banen">
                                <option value="baan1">{{ data.baanEen }}</option>
                                <option value="baan2">{{ data.baanTwee }}</option>
                            </select>
                        </div>
                        <p>
                            {{ data.medespeler }}
                        </p>
                        <div class="my-4">
                            <select v-model="medespeler1" class="inputbox rounded" required>
                                <option v-for="(option, i) in medespelers" :key="i">{{ medespelers[i] }}</option>
                            </select>
                            <select v-model="medespeler2" class="inputbox rounded">
                                <option v-for="(option, z) in medespelers" :key="z">{{ medespelers[z] }}</option>
                            </select>
                            <select v-model="medespeler3" class="inputbox rounded">
                                <option v-for="(option, x) in medespelers" :key="x">{{ medespelers[x] }}</option>
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
            court: '',
            email: firebase.auth().currentUser.email,
            voornaam: '',
            achternaam: '',
            lidnummer: '',
            medespelers: [],
            medespeler1: '',
            medespeler2: '',
            medespeler3: '',
            tijden: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            beschikbaretijden: [],
            bezettetijden: [],
            gekozentijd: '',
            dagen: ['Vandaag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
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
        opzeggen: function() {
            const ref = firebase.database().ref('Reserveringen/')
            const abcd = ref.orderByChild('Lidnummer').equalTo(this.lidnummer);
            abcd.on('value', function(abcdSnap){
                var a = abcdSnap.val();
                var b = Object.keys(a)[0];
                ref.child(b).remove();
            })
        },

        reserveren: function() {
            const reserveringref = firebase.database().ref('Reserveringen/')
            reserveringref.once('value', function(snapshot){
                //get filled in data
                const lidnummer = self.lidnummer
                const court = self.court
                const medespeler1 = self.medespeler1
                const medespeler2 = self.medespeler2
                const medespeler3 = self.medespeler3
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
                    if(datamedespeler1 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                          })
                      }
                    } else {
                        self.error = medespeler1 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler1 == datamedespeler2) {
                    if(datamedespeler1 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test2')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                          })
                      }
                    } else {
                        self.error = medespeler1 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler1 == datamedespeler3) {
                    if(datamedespeler1 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test3')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                          })
                      }
                    } else {
                        self.error = medespeler1 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler2 == datamedespeler1) {
                    if(datamedespeler2 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test4')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
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
                            if(datamedespeler2 == "") {
                                if(court == databaan) {
                                    self.succesvol = 'baan beschikbaar'
                                    console.log(court)
                                    if(datum == datadatum) {
                                        self.succesvol = "datum beschikbaar"
                                        console.log(datum)
                                        if(tijd == datatijd) {
                                            self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                            self.succesvol = ""
                                        } else {
                                            reserveringref.push({
                                                Lidnummer: lidnummer,
                                                Baan: court,
                                                Medespeler1: medespeler1,
                                                Medespeler2: medespeler2,
                                                Medespeler3: medespeler3,
                                                Datum: datum,
                                                Tijd: tijd,
                                            })
                                        }
                                    } else {
                                        reserveringref.push({
                                            Lidnummer: lidnummer,
                                            Baan: court,
                                            Medespeler1: medespeler1,
                                            Medespeler2: medespeler2,
                                            Medespeler3: medespeler3,
                                            Datum: datum,
                                            Tijd: tijd,
                                        })
                                    }
                                } else{
                                    console.log('test5')
                                    console.log(datamedespeler3)
                                    reserveringref.push({
                                            Lidnummer: lidnummer,
                                            Baan: court,
                                            Medespeler1: medespeler1,
                                            Medespeler2: medespeler2,
                                            Medespeler3: medespeler3,
                                            Datum: datum,
                                            Tijd: tijd,
                                    })
                                }
                            } else {
                                self.error = medespeler2 + " heeft al een reservering in ons systeem staan" 
                            }
                        }
                    }
                else if(medespeler2 == datamedespeler3) {
                    if(datamedespeler2 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test6')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                          })
                      }
                    } else {
                        self.error = medespeler2 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler3 == datamedespeler1) {
                    if(datamedespeler3 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test7')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                          })
                      }
                    } else {
                        self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler3 == datamedespeler2) {
                    if(datamedespeler3 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test8')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                          })
                      }
                    } else {
                        self.error = medespeler3 + " heeft al een reservering in ons systeem staan"
                    }
                }
                else if(medespeler3 == datamedespeler3) {
                    if(datamedespeler3 == "") {
                        if(court == databaan) {
                          self.succesvol = 'baan beschikbaar'
                          console.log(court)
                          if(datum == datadatum) {
                              self.succesvol = "datum beschikbaar"
                              console.log(datum)
                              if(tijd == datatijd) {
                                  self.error = "Deze tijd is helaas niet beschikbaar op deze baan kies een andere tijd/baan"
                                  self.succesvol = ""
                              } else {
                                reserveringref.push({
                                    Lidnummer: lidnummer,
                                    Baan: court,
                                    Medespeler1: medespeler1,
                                    Medespeler2: medespeler2,
                                    Medespeler3: medespeler3,
                                    Datum: datum,
                                    Tijd: tijd,
                                })
                              }
                          } else {
                            reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
                            })
                          }
                      } else{
                          console.log('test9')
                          reserveringref.push({
                                Lidnummer: lidnummer,
                                Baan: court,
                                Medespeler1: medespeler1,
                                Medespeler2: medespeler2,
                                Medespeler3: medespeler3,
                                Datum: datum,
                                Tijd: tijd,
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
            }
        }`
    }
}
</script>