<template>
    <div class="bg-blue-100">
        <div class="container" v-for="(data, index) in allResetPasswords" :key="index">
            <div class="lg:py-32 py-8">
                <div class="flex flex-col">
                    <div>
                        <h1>
                            {{ data.titel }}
                        </h1>
                        <p class="mt-4">
                            {{ data.tekst }}
                        </p>
                    </div>
                    <div class="mt-8">
                        <div class="flex items-center">
                            <p>
                                {{ data.emailinput }}
                            </p>
                            <input placeholder="uwnaam@gmail.com" class="ml-4 inputbox rounded" type="email" v-model="emailadres" required> 
                        </div>
                        <div class="mt-8">
                            <button @click="Verzenden" class="downloadbtn">
                                {{ data.verzendenKnop }}
                            </button>
                        </div>
                    </div>
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

import gql from 'graphql-tag'
import firebase from 'firebase'
require('firebase/auth')

export default {
    data() {
        return {
            emailadres: '',
            error: '',
            succesvol: ''
        }
    },

    methods: {
        Verzenden: function() {
            self = this;
            const auth =  firebase.auth()
            const email = self.emailadres
            if(email != '') {
                auth.sendPasswordResetEmail(email).then(function(){
                    self.succesvol = "De email is succesvol verzonden naar uw mailbox, u kunt daar uw wachtwoord herstellen."
                })
                .catch(function(error){
                    self.error = error
                });
            } else {
                self.error = "Geef een emailadres op om te verzenden."
            }
        }
    },


    apollo: {
        allResetPasswords: gql`{
            allResetPasswords {
                titel
                tekst
                emailinput
                verzendenKnop
            }
        }`
    }
}
</script>