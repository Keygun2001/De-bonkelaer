import firebase from 'firebase'
import 'firebase/database'

export default function ({ app, route, store, redirect }) {
    const user = store.state.user;
    const gebruikersref = firebase.database().ref('Gebruikers/')
    const blockedRoute = /\/ingelogd\/*/g;
    const blockedRoute2 = /\/gebruikertoevoegen\/*/g;
    const blockedRoute3 = /\/mijnreservering\/*/g;
    const blockedRoute4 = /\/allereserveringen\/*/g;
    const homeRoute = "/reserveren";
    const curuser = firebase.auth().currentUser

    if (user && route.path == '/gebruikertoevoegen') {
        gebruikersref.once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                const data = childSnapshot.exportVal()
                if(curuser.email == data.Email) {
                    if(data.IsAdmin === true) {
                        redirect('/gebruikertoevoegen')
                    } else {
                        redirect('/ingelogd')
                    }
                }
            });
        });
    } else if (!user && route.path.match(blockedRoute2)) {
        redirect("/reserveren");
    }

    if (user && route.path == '/allereserveringen') {
        gebruikersref.once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                const data = childSnapshot.exportVal()
                if(curuser.email == data.Email) {
                    if(data.IsAdmin === true) {
                        redirect('/allereserveringen')
                    } else {
                        redirect('/ingelogd')
                    }
                }
            });
        });
    } else if (!user && route.path.match(blockedRoute4)) {
        redirect("/reserveren");
    }

    if (!user && route.path.match(blockedRoute)) {
        redirect("/reserveren");
    }

    if (user && route.path === homeRoute) {
        redirect("/ingelogd");
    }
    if (!user && route.path.match(blockedRoute3)) {
        redirect("/reserveren");
    }
}