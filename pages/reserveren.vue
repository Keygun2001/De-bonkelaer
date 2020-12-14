<template>
    <div>
        <div class="bg-blue-100">
            <div class="container mx-auto">
                <div v-for="(item, index) in allReserverens" :key="index" class="md:w-10/12 w-full mx-auto md:py-32 py-8">
                    <div class="w-full">
                        <h1>
                            {{ item.contentmatrix[0].titel }}
                        </h1>
                        <p class="mt-4">
                            {{ item.contentmatrix[0].tekst }}
                        </p>
                    </div>
                    <div class="mt-12">
                        <form @submit.prevent="pressed" class="w-full">
                            <div class="flex items-center">
                                <div class="sm:w-2/12 w-4/12">
                                    <p>
                                        {{ item.inloggen[0].lidnummer }}
                                    </p>
                                </div>
                                <input class="rounded emailbox" v-model="email" type="email" name="lidnummer" />
                            </div>
                            <div class="flex items-center mt-2">
                                <div class="sm:w-2/12 w-4/12">
                                    <p>
                                        {{ item.inloggen[0].wachtwoord }}
                                    </p>
                                </div>
                                <div class="flex items-center w-8/12">
                                    <input class="rounded emailbox" v-model="password" :type="visibility" :class="{'u-full-width' : !onlyunder, 'u-full-width onlyunder': onlyunder}"  :maxlength='maxlength' :placeholder="placeholder" v-bind:value="value"  v-on:input="$emit('input', $event.target.value)">

                                    <!-- shows the password -->
                                    <a class="notunderlined" v-if="visibility == 'password'">
                                        <div icon-name="show password" >
                                            <img @click="showPassword()" class="kleinoogaan" src="../assets/Images/icon_eye_off.png"/>                      
                                        </div>
                                    </a>

                                    <!-- hides the password -->
                                    <a class="notunderlined" v-if="visibility == 'text'">
                                        <div icon-name="hide password" >
                                            <img @click="hidePassword()" class="kleinooguit" src="../assets/Images/icon_eye.png"/>                    
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <nuxt-link to="/resetpassword" class="linktekst lg:w-2/12 sm:w-4/12 w-full">
                                    {{ item.wachtwoordVergeten }}
                                </nuxt-link>
                            </div>
                            <div class="md:w-9/12 w-full">
                                <div class="mt-4 flex md:justify-start">
                                    <input class="downloadbtn rounded" type="submit" value="Inloggen" />
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
            visibility: 'password'
        }
    },

    props: {    	
        placeholder: {type: String, default: ''},
        value: '',
        maxlength: {type: Number, default: 50},
        onlyunder: {type: Boolean, default: false}    
    },

    methods: {
        showPassword() {
            this.visibility = 'text';
        },

        hidePassword() {
            this.visibility = 'password';
        },

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
                wachtwoordVergeten
            }
        }`
    },
};
</script>