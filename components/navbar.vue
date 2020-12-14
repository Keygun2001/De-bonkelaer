<template>
    <div class="w-full">
        <div class="navbarcontainer w-full flex">
          <div class="w-full flex justify-center">
            <div class="flex justify-start items-center lg:w-2/12 w-full">
              <a class="logo" href="/">
                <Logosm />
              </a>
            </div>
            <div class="flex items-center">
                <nav class="hidden lg:flex">
                    <ul class="flex menu">
                        <li class="menu--list">
                            <NuxtLink to="/" v-for="(home, index) in allHomepaginas" :key="index">
                                {{ home.contentmatrix[0].titel }}
                            </NuxtLink>
                        </li>
                        <li class="menu--list">
                            <NuxtLink to='/actueel' v-for="(actueel, index) in allActueels" :key="index">
                                {{ actueel.contentmatrix[0].titel }}
                            </NuxtLink>
                        </li>
                        <li class="menu--list">
                            <NuxtLink to='/tarieven' v-for="(tarieven, index) in allTarievens" :key="index">
                                {{ tarieven.titel }}
                            </NuxtLink>
                        </li>
                        <li class="menu--list">
                            <NuxtLink to='/reserveren' v-for="(reserveren, index) in allReserverens" :key="index">
                                {{ reserveren.contentmatrix[0].titel }}
                            </NuxtLink>
                        </li>
                        <li class="menu--list">
                            <NuxtLink to='/reglement' v-for="(reglementen, index) in allReglements" :key="index">
                                {{ reglementen.contentmatrix[0].titel }}
                            </NuxtLink>
                        </li>
                        <li class="menu--list">
                            <NuxtLink to='/impressies' v-for="(impressies, index) in allImpressies" :key="index">
                                {{ impressies.contentmatrix[0].titel }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <div v-if="ingelogd">
                  <div class="w-2/12 hidden lg:flex" v-for="(data, index) in allIngelogds" :key="index">
                    <button @click="uitloggen" class="downloadbtn">
                      {{ data.uitloggenKnop }}
                    </button>
                  </div>
                </div>
            </div>
        </div>
        <div class="lg:w-1/12 w-full">
          <nav class="mobile-menu absolute pin-r50 lg:hidden block w-1/2">
            <div class="text-right ml-auto h-full">
              <div class="w-full flex justify-end items-center h-full">
                <div :class="{'is-active':showNav}" class="hamburger hamburger--emphatic" type="button">
                  <span class="hamburger-box">
                    <span @click="showNav = !showNav" class="hamburger-inner"></span>
                  </span>
                </div>
              </div>
            </div>
          </nav>
          <div :class="{'opennav': showNav}" class="menu-collapse flex flex-col">
            <nav class="flex flex-wrap items-center relative w-auto">
              <ul class="container">
                <h2 v-for="(menu, index) in allMenus" :key="index" class="pb-4 pl-4">
                  {{ menu.menuTitel }}
                </h2>
                <li class="mobile">
                  <NuxtLink @click.native="showNav = !showNav" class="mobilelink" to="/" v-for="(home, index) in allHomepaginas" :key="index">
                    {{ home.contentmatrix[0].titel }}
                  </NuxtLink>
                </li>
                <li class="mobile">
                  <NuxtLink  @click.native="showNav = !showNav" class="mobilelink" to='/actueel' v-for="(actueel, index) in allActueels" :key="index">
                    {{ actueel.contentmatrix[0].titel }}
                  </NuxtLink>
                </li>
                <li class="mobile">
                  <NuxtLink  @click.native="showNav = !showNav" class="mobilelink" to='/tarieven' v-for="(tarieven, index) in allTarievens" :key="index">
                    {{ tarieven.titel }}
                  </NuxtLink>
                </li>
                <li class="mobile">
                  <NuxtLink  @click.native="showNav = !showNav" class="mobilelink" to='/reserveren' v-for="(reserveren, index) in allReserverens" :key="index">
                    {{ reserveren.contentmatrix[0].titel }}
                  </NuxtLink>
                </li>
                <li class="mobile">
                  <NuxtLink  @click.native="showNav = !showNav" class="mobilelink" to='/reglement' v-for="(reglementen, index) in allReglements" :key="index">
                    {{ reglementen.contentmatrix[0].titel }}
                  </NuxtLink>
                </li>
                <li class="mobile">
                  <NuxtLink  @click.native="showNav = !showNav" class="mobilelink" to='/impressies' v-for="(impressies, index) in allImpressies" :key="index">
                    {{ impressies.contentmatrix[0].titel }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <div v-if="ingelogd">
              <div class="lg:hidden flex justify-center w-10/12 mt-8" v-for="(data, index) in allIngelogds" :key="index">
                <button @click="uitloggen" class="downloadbtn">
                  {{ data.uitloggenKnop }}
                </button>
              </div>
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
  name: "navbar",

  data: () => {
    return {
      showNav: false,
      uitloggenknop: false,
      ingelogd: false
    } 
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.ingelogd = true;
      } else {
        this.ingelogd = false;
      }
    })
  },
  methods: {
    async uitloggen() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.replace({name: 'reserveren'})
        this.ingelogd = false;
      } catch {

      }
    },
  },
    apollo: {
    allHomepaginas: gql`{
      allHomepaginas {
        contentmatrix {
          titel
          tekst
        }
      }
    }`,
    allMenus: gql`{
      allMenus{
        menuTitel
      }
    }`,
    allActueels: gql`{
      allActueels {
        contentmatrix {
          titel
          tekst
        }
      }
    }`,
    allTarievens: gql`{
      allTarievens {
        titel
        seizoen
        prijzen {
          senioren
          seniorenPrijs
          tot17
          tot17Prijs
          jongerDan15
          jongerDan15Prijs
          zomerarrangement
          persoon1Exclusief
          persoon1ExclusiefPrijs
          persoon1Inclusief
          persoon1InclusiefPrijs
          personen2Exclusief
          personen2ExclusiefPrijs
          personen2Inclusief
          personen2InclusiefPrijs
        }
        ondertekst
        downloadKnop
      }
    }`,
    allImpressies: gql`{
      allImpressies {
        contentmatrix {
          titel
          tekst
        }
      }
    }`,
    allReglements: gql`{
      allReglements {
        contentmatrix {
          titel
          tekst
        }
      }
    }`,
    allReserverens: gql`{
      allReserverens {
        navbarButton
        contentmatrix {
          titel
          tekst
        }
      }
    }`,
    allIngelogds: gql`{
      allIngelogds {
          titeltekst {
              titel
              tekst
          }
          uitloggenKnop
        }
    }`
  },
}

</script>

<style scoped src="~/static/css/main.css"> </style>
<style scoped src="~/static/css/navbar.css"> </style>
<style scoped src="~/static/css/hamburgers.css"> </style>