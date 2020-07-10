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
