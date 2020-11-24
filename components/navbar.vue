<template>
    <div class="w-full mx-auto navbar">
        <div class="navbarcontainer w-full flex">
          <div class="flex items-center lg:w-3/12 md:w-1/12">
              <a class="logo" href="/">
                <Logosm />
              </a>
            </div>
            <div class="flex items-center justify-start md:w-6/12 w-full">
                <nav class="hidden md:flex">
                    <ul class="flex menu">
                        <li>
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
                <nav class="absoluteright md:hidden block w-1/2">
                  <div class="text-right ml-auto h-full">
                    <div class="w-full flex justify-end items-center h-full">
                      <div :class="{'open':showNav}" class="toggle justify-end h-full flex items-center">
                        <div @click="showNav = !showNav" class="lines z-50">
                          <div class="one"></div>
                          <div class="two"></div>
                          <div class="three"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
            </div>
        </div>
        <div :class="{'opennav': showNav}" class="block md:hidden menu-collapse">
          <nav class="flex flex-wrap items-center relative w-auto">
            <ul :class="{'openlink': showNav}" class="hide flex-wrap">
              <li class="mobile">
                  <NuxtLink class="mobilelink" to="/" v-for="(home, index) in allHomepaginas" :key="index">
                      {{ home.contentmatrix[0].titel }}
                  </NuxtLink>
              </li>
              <li class="mobile">
                  <NuxtLink class="mobilelink" to='/actueel' v-for="(actueel, index) in allActueels" :key="index">
                      {{ actueel.contentmatrix[0].titel }}
                  </NuxtLink>
              </li>
              <li class="mobile">
                  <NuxtLink class="mobilelink" to='/tarieven' v-for="(tarieven, index) in allTarievens" :key="index">
                      {{ tarieven.titel }}
                  </NuxtLink>
              </li>
              <li class="mobile">
                  <NuxtLink class="mobilelink" to='/reserveren' v-for="(reserveren, index) in allReserverens" :key="index">
                      {{ reserveren.contentmatrix[0].titel }}
                  </NuxtLink>
              </li>
              <li class="mobile">
                  <NuxtLink class="mobilelink" to='/reglement' v-for="(reglementen, index) in allReglements" :key="index">
                      {{ reglementen.contentmatrix[0].titel }}
                  </NuxtLink>
              </li>
              <li class="mobile">
                  <NuxtLink class="mobilelink" to='/impressies' v-for="(impressies, index) in allImpressies" :key="index">
                      {{ impressies.contentmatrix[0].titel }}
                  </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
    </div>
</template>
<script>

import gql from 'graphql-tag';

export default {
  name: "navbar",

  data: () => {
    return {
      showNav: false
    } 
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
  },
}

</script>

<style scoped src="~/static/css/navbar.css"> </style>