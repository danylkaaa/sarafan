<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created () {
            FB.init({
                appId: '917524868428631',
                status: false,
                cookie: false,
                xfbml: false,
                version: 'v2.8'
            });
        }
    }
</script>

<style>
</style>
