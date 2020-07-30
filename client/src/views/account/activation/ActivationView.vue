<template>
    <v-app class="login primary">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <v-card class="elevation-12">
                            <v-form
                                @submit.prevent="activate"
                                ref="form"
                                v-model="isValidForm"
                                lazy-validation
                            >
                                <v-card-text>
                                    <div class="layout column align-center">
                                        <v-avatar v-if="query.image" size="120px">
                                            <v-img
                                                :src="query.image"
                                                :alt="query.username"
                                            />
                                        </v-avatar>
                                        <img
                                            v-else
                                            src="@/assets/logo.svg"
                                            alt="Sifme"
                                            width="120"
                                            height="120"
                                        />
                                        <h1 class="flex my-4 primary--text">
                                            Bienvenido
                                        </h1>
                                        <h3 class="flex my-4 primary--text">
                                            {{ query.username }}
                                        </h3>
                                    </div>
                                    <Password
                                        v-model="password"
                                        :rules="rules.password"
                                        time="1500"
                                    />
                                    <Password
                                        v-model="confirmation"
                                        :rules="[
                                            v =>
                                                (v && v === password) ||
                                                'La contraseña no coincide.'
                                        ]"
                                        time="1500"
                                        label="Confirmar"
                                    />
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
                                    <v-btn
                                        :disabled="!isValidForm"
                                        block
                                        color="primary white--text"
                                        type="submit"
                                        >Activar</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import ActivationController from './ActivationController'
export default ActivationController
</script>

<style lang="sass">
@import "@/views/account/login/LoginView.sass"
</style>
