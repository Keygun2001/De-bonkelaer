<template>
    <div>
        <div class="bg-blue-100">
            <div class="container mx-auto">
                <div v-for="(item, index) in allReserverens" :key="index" class="w-10/12 mx-auto py-32">
                    <div class="w-6/12">
                        <h1>
                            {{ item.contentmatrix[0].titel }}
                        </h1>
                        <p>
                            {{ item.contentmatrix[0].tekst }}
                        </p>
                    </div>
                    <div class="mt-12">
                        <form @submit.prevent="pressed" class="w-4/12">
                            <div class="flex items-center">
                                <p>
                                    {{ item.inloggen[0].lidnummer }}
                                </p>
                                <input class="ml-4 rounded inputbox" v-model="email" type="email" name="lidnummer" />
                            </div>
                            <div class="flex items-center mt-2">
                                <p>
                                    {{ item.inloggen[0].wachtwoord }}
                                </p>
                                <input class="ml-2 rounded inputbox" v-model="password" type="password" name="wachtwoord" />
                            </div>
                            <div class="w-9/12">
                                <div class="mt-4 flex justify-end">
                                    <input class="submit rounded" type="submit" value="Inloggen" />
                                </div>
                            </div>
                        </form>
                        <div class="rodetekst">{{ error }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import gql from 'graphql-tag';
import axios from 'axios';

import firebase from 'firebase'
require('firebase/auth')

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
        }
    },

    methods: {
        async pressed() {
            try {
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                this.$router.replace({name: "ingelogd"})
            }catch(err){
                this.error = "Uw Email/Wachtwoord is onjuist"
            };
        }
    },

    apollo: {
        allReserverens: gql`{
            allReserverens {
                contentmatrix {
                    titel
                    tekst
                }
                inloggen {
                    lidnummer
                    wachtwoord
                }
            }
        }`
    },
};
</script>