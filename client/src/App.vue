<template>
    <div>
        <!-- for example router view -->
        <router-view />
        <!-- set progressbar -->
        <vue-progress-bar />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'App',
    components: {},
    data: () => ({
        //
    })
})
</script>
<style lang="sass">
html
    overflow: hidden!important

::-webkit-scrollbar
    width: 5px
::-webkit-scrollbar-track
    background: transparent
::-webkit-scrollbar-thumb
    background: rgb(230,230,230)
    &:vertical
        &:active
            background: rgb(150,150,150)
</style>
