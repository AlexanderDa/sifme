<template>
    <v-app id="sandbox">
        <v-app-bar clipped-left app dense class="primary">
            <img src="@/assets/logo.svg" alt="logo" width="30" />
            <v-toolbar-title class="ml-4 white--text">Configuraciones</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom open-delay="1000">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon large dark @click="goBack">
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>
                <span>Cerrar</span>
            </v-tooltip>
        </v-app-bar>

        <v-main>
            <router-view
                tag="v-container"
                fluid
                fill-height
                class="settings-container"
            ></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import SettingsLayout from './SettingsController'
export default SettingsLayout
</script>
<style scoped>
.settings-container {
    height: calc(100vh - 50px);
    width: 100vw;
    margin-left: 0px;
    overflow: auto;
}
</style>
