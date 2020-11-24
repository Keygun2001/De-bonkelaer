<template>
    <div>
        <div v-for="(data, index) in allIngelogds" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto">
                <div class="flex md:flex-row flex-col items-center mx-auto w-10/12 py-32">
                    <div class="md:w-6/12 w-full mr-4">
                        <h1>
                            {{ data.titeltekst[0].titel }}
                        </h1>
                        <p class="w-full leading-7 mt-4">
                            {{ data.titeltekst[0].tekst }}
                        </p>
                        <button @click="signOut" class="mt-8 downloadbtn"> {{ data.uitloggenKnop }} </button>
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

export default {

    data: function() {
        return {
            events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],

            logoutTimer: null,
        }
    },

     mounted() {
        this.events.forEach(function (event) {
            window.addEventListener(event, this.resetTimer);
        }, this);

        this.setTimer();
    },

    methods: {
        async signOut() {
            try {
                const data = await firebase.auth().signOut();
                console.log(data);
                this.$router.replace({name: 'reserveren'})
            } catch {

            }
        },
        
        setTimer: function() {
            this.logoutTimer = setTimeout(this.logOut, 15 * 60000);
        },

        logOut: async function () {
            try {
                const data = await firebase.auth().signOut();
                console.log(data)
                this.$router.replace({name: 'reserveren'})
            } catch {

            }
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
                uitloggenKnop
            }
        }`
    }
}
</script>