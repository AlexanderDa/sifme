<template>
    <v-app id="sandbox">
        <v-app-bar clipped-left app class="primary">
            <img src="@/assets/logo.svg" alt="logo" width="40" />
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
            <router-view tag="v-container" fluid fill-height></router-view>
        </v-main>

        <v-footer inset app>
            <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import SettingsLayout from '@/layouts/settings/SettingsController'
export default SettingsLayout
</script>
