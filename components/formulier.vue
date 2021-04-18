<template>
    <div>
        <div v-for="(data, index) in allGebruikersToevoegens" :key="index">
            <form @submit.prevent="submit">
                <p>
                    {{ data.contentmatrix[0].voornaam }}
                </p>
                <input class="rounded inputbox my-4" v-model="voornaam" type="text" name="voornaam"/>
                <p>
                    {{ data.contentmatrix[0].achternaam }}
                </p>
                <input class="rounded inputbox my-4" v-model="achternaam" type="text" name="achternaam"/>
                <p>
                    {{ data.contentmatrix[0].email }}
                </p>
                <input class="rounded inputbox my-4" v-model="email" type="email" name="email"/>
                <p>
                    {{ data.contentmatrix[0].password }}
                </p>
                <input class="rounded inputbox my-4" v-model="wachtwoord" type="password" name="password"/>
                <p>
                    {{ data.contentmatrix[0].lidnummer }}
                </p>
                <input class="rounded inputbox my-4" v-model="lidnummer" type="number" name="lidnummer"/>
                <p>
                    {{ data.contentmatrix[0].isAdmin }}
                </p>
                <input class="my-4 admin" type="checkbox" name="admin" v-model="admin"/>
                <input class="downloadbtn my-8" type="submit" :value="data.contentmatrix[0].toevoegen" />
            </form>
            <div>
                <p class="rodetekst">
                    {{ error }}
                </p>
                <p class="groenetekst">
                    {{ beschikbaar }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import firebase from 'firebase'
import auth from 'firebase/auth'

export default {

    data() {
        return {
            voornaam: '',
            achternaam: '',
            email: '',
            wachtwoord: '',
            lidnummer: '',
            error: '',
            beschikbaar: '',
            admin: false
        }
    },
    apollo: {
        allGebruikersToevoegens: gql`{
            allGebruikersToevoegens {
                contentmatrix {
                    voornaam
                    achternaam
                    email
                    password
                    lidnummer
                    isAdmin
                    aanmakenKnop
                }
            }
        }`
    },
    methods: {
        submit: function() {
            const gebruikersref = firebase.database().ref('Gebruikers/')
            var self = this
            gebruikersref.once('value', function(snapshot) {
                const lid = self.lidnummer;
                const voornaam = self.voornaam;
                const achternaam = self.achternaam;
                const email = self.email;
                const admin = self.admin;
                let gelijklidnummer = '';
                let gelijkemail = '';

                snapshot.forEach(function(childSnapshot) {
                    const data = childSnapshot.exportVal()
                    if(data.Lidnummer == lid) {
                        gelijklidnummer = data.Lidnummer;
                    }
                    if(data.Email == email) {
                        gelijkemail = data.Email
                    }
                });

                if(lid == gelijklidnummer) {
                    self.error = "Dit lidnummer is al gekoppeld aan een gebruiker";
                    self.beschikbaar = "";
                } else if(email == gelijkemail) {
                    self.error ="Dit emailadres is al gekoppeld aan een gebruiker";
                    self.beschikbaar = "";
                } else {
                    self.beschikbaar = 'Gebruiker is succesvol toegevoegd!';
                    self.error = "";
                    gebruikersref.push({
                        Voornaam: voornaam,
                        Achternaam: achternaam,
                        Email: email,
                        Lidnummer: lid,
                        IsAdmin: admin
                    });
                }
            });
            firebase.auth().createUserWithEmailAndPassword(this.email, this.wachtwoord)
        }
    }
}
</script>