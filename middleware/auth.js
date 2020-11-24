export default function ({ app, route, store, redirect }) {
    const user = store.state.user;
    const blockedRoute = /\/ingelogd\/*/g;
    const homeRoute = "/reserveren";

    if (!user && route.path.match(blockedRoute)) {
        redirect("/reserveren");
    }

    if (user && route.path === homeRoute) {
        redirect("/ingelogd");
    }
}