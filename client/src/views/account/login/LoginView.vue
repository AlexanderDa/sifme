<template>
    <v-app class="login primary">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <v-card class="elevation-12">
                            <form @submit.prevent="login()">
                                <v-card-text>
                                    <div class="layout column align-center">
                                        <img
                                            src="@/assets/logo.svg"
                                            alt="Sifme"
                                            width="120"
                                            height="120"
                                        />
                                        <h1 class="flex my-4 primary--text">Sifme</h1>
                                    </div>

                                    <v-text-field
                                        color="primary"
                                        append-icon="email"
                                        label="Usuario"
                                        type="email"
                                        required
                                        v-model="email"
                                    ></v-text-field>
                                    <Password v-model="password" time="1500" />
                                    <v-alert
                                        transition="scale-transition"
                                        v-model="alert"
                                        type="error"
                                        dismissible
                                        text
                                    >
                                        {{ error }}
                                    </v-alert>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn block color="primary white--text" type="submit"
                                        >entrar</v-btn
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
import LoginController from './LoginController'
export default LoginController
</script>

<style lang="sass">
@import "@/views/account/login/LoginView.sass"
</style>
