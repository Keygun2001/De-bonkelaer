<template>
    <div>
        <div v-for="(data, index) in allTarievens" :key="index" class="bg-blue-100 shadow-lg">
            <div class="container mx-auto">
                <div class="mx-auto md:w-10/12 w-full md:py-32 py-8">
                    <div class="w-full md:mr-4 mr-0">
                        <h1>
                            {{ data.titel }}
                        </h1>
                    </div>
                    <div class="w-full md:mt-12 mt-4">
                        <h2>
                            {{ data.contentmatrix[0].titel }}
                        </h2>
                    </div>
                    <div class="flex w-full">
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {{ data.contentmatrix[0].rij }}
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            {{ data.contentmatrix[1].rij }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {{ data.contentmatrix[2].rij }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            {{ data.contentmatrix[3].titel }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="md:py-0 py-4">
                                            {{ data.contentmatrix[3].rij }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="md:py-0 py-4">
                                            {{ data.contentmatrix[4].rij }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="md:py-0 py-4">
                                            {{ data.contentmatrix[5].rij }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="md:py-0 py-4">
                                            {{ data.contentmatrix[6].rij }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="md:w-8/12 w-full mt-4">
                        <p>
                            {{ data.tekstbutton[0].tekst }}
                        </p>
                        <a class="downloadbtn mt-4" @click="downloadWithAxios(title, src)">
                            {{ data.tekstbutton[0].downloadKnop }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import gql from 'graphql-tag';
import axios from 'axios'

export default {

    data() {
        return {
            title: 'Inschrijfformulier_TClievelde2021.docx',
            src: 'Inschrijfformulier_TClievelde2021.docx'
        }
  },

    methods: {
    forceFileDownload(response, title) {
      console.log(title)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', title)
      document.body.appendChild(link)
      link.click()
    },
    downloadWithAxios(url, title) {
      axios({
        method: 'get',
        url,
        responseType: 'arraybuffer',
      })
        .then((response) => {
          this.forceFileDownload(response, title)
        })
        .catch((err) => console.log(err))
    },
  },

    apollo: {
        allTarievens: gql`{
            allTarievens {
                titel
                contentmatrix {
                    titel
                    rij
                }
                tekstbutton {
                    tekst
                    downloadKnop
                }
            }
        }`
    },
};
</script>