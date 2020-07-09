<template>
    <v-app class="login primary">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <v-card class="elevation-12">
                            <form @submit.prevent="activate()">
                                <v-card-text>
                                    <div class="layout column align-center">
                                        <img
                                            src="@/assets/logo.svg"
                                            alt="Sifme"
                                            width="120"
                                            height="120"
                                        />
                                        <h1 class="flex my-4 primary--text">
                                            Bienvenido
                                        </h1>
                                        <h3 class="flex my-4 primary--text">Usuario</h3>
                                    </div>
                                    <Password v-model="password" time="1500" />
                                    <Password
                                        v-model="confirmation"
                                        time="1500"
                                        label="Confirmar"
                                    />
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn block color="primary white--text" type="submit"
                                        >Activar</v-btn
                                    >
                                </v-card-actions>
                            </form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import LoginView from './ActivationController'
export default LoginView
</script>

<style lang="sass">
@import "@/views/account/login/LoginView.sass"
</style>
