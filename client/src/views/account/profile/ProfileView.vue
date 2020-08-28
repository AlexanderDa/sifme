<template>
    <v-row align="center" justify="center">
        <v-col cols="8">
            <v-row>
                <v-col cols="12">
                    <v-form
                        @submit.prevent="updateInfo"
                        ref="formInfo"
                        v-model="isValidFormInfo"
                        lazy-validation
                    >
                        <v-card color="white">
                            <v-system-bar>
                                <v-icon>info</v-icon>
                                <span>Editar perfil</span>
                            </v-system-bar>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        style="display: flex; justify-content: center;"
                                    >
                                        <ImageUploader
                                            :src="
                                                profile.image ||
                                                require('@/assets/user.svg')
                                            "
                                            @onUpload="updateImage"
                                            :disabled="true"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="profile.firstName"
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Nombres"
                                            outlined
                                            dense
                                        />
                                        <v-text-field
                                            v-model="profile.lastName"
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Apellidos"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.dni"
                                            :rules="rules.dni"
                                            v-mask="'#########-#'"
                                            autocomplete="off"
                                            label="Cédula"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.passport"
                                            autocomplete="off"
                                            label="Pasaporte"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.telephone"
                                            v-mask="['# ### ###', '### ### ###']"
                                            :rules="rules.telephone"
                                            autocomplete="off"
                                            label="Teléfono fijo"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="profile.mobile"
                                            v-mask="['### ### ####']"
                                            :rules="rules.mobile"
                                            autocomplete="off"
                                            label="Teléfono móvil"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="profile.email"
                                            :rules="rules.email"
                                            autocomplete="off"
                                            label="Correo electrónico"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                            v-model="profile.address"
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Dirección"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                    :disabled="!isValidFormInfo"
                                    color="secondary"
                                    type="submit"
                                    text
                                >
                                    <v-icon left>save</v-icon>Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>

                <v-col cols="12">
                    <v-form
                        @submit.prevent="changePass"
                        ref="formPass"
                        v-model="isValidFormPass"
                        lazy-validation
                    >
                        <v-card color="white">
                            <v-system-bar>
                                <v-icon>info</v-icon>
                                <span>Cambiar contraseña</span>
                            </v-system-bar>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" xs="12" sm="6">
                                        <v-text-field
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Contraseña"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6">
                                        <v-text-field
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Nombres"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                    :disabled="!isValidFormPass"
                                    color="secondary"
                                    type="submit"
                                    text
                                >
                                    <v-icon left>save</v-icon>Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import ProfileController from './ProfileController'
export default ProfileController
</script>
