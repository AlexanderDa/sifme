<template>
    <v-app class="primary">
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="text-center">
                        <v-progress-circular :size="125" color="primary" indeterminate>
                            <img src="@/assets/logo.svg" alt="Sifme" width="60" />
                        </v-progress-circular>
                        <h1 class="secondary--text" style="margin-top: 50px;">Sifme</h1>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import RootController from './RootController'
export default RootController
</script>
