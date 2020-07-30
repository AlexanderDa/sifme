<template>
    <DrawerPanel @onSearch="findProfiles" title="usuarios" :fluid="true" :filter="true">
        <template slot="actions">
            <v-btn
                v-if="elementIndex !== -1 && !user.emailVerified && !element.deleted"
                @click="sendWelcomeEmail()"
                icon
            >
                <v-icon>mail</v-icon>
            </v-btn>
            <v-btn :disabled="!isValidForm || element.deleted" @click="submit()" icon>
                <v-icon>save</v-icon>
            </v-btn>
            <Delete
                :disabled="elementIndex === -1 || element.deleted"
                @onDelete="deleteElement()"
            />
            <v-btn icon @click="clear()">
                <v-icon>clear</v-icon>
            </v-btn>
        </template>
        <template slot="drawer">
            <v-list-item
                v-for="item in elements"
                :key="item.id"
                @click="toShowElement(item)"
            >
                <v-list-item-avatar>
                    <v-img
                        :src="item.image || require('@/assets/user.svg')"
                        :alt="item.lastName"
                    />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="item.lastName"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.firstName"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-icon v-if="item.deleted" color="red lighten-3"
                        >remove_circle</v-icon
                    >
                </v-list-item-action>
            </v-list-item>
        </template>
        <template slot="content">
            <v-form
                @submit.prevent="submit"
                ref="form"
                v-model="isValidForm"
                lazy-validation
            >
                <v-row>
                    <v-col cols="12" sm="5" md="4">
                        <v-card color="white" height="300">
                            <v-system-bar>
                                <v-icon>account_circle</v-icon>Cuenta
                                <v-spacer />
                            </v-system-bar>
                            <v-card-text>
                                <Roles v-model="user.roleId" :rules="rules.required" />
                                <v-switch
                                    v-model="user.isActive"
                                    class="ma-0"
                                    :label="
                                        user.isActive
                                            ? 'Cuenta activa'
                                            : 'Cuenta inactiva'
                                    "
                                />
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="7" md="8">
                        <v-card color="white">
                            <v-system-bar>
                                <v-icon>info</v-icon>
                                <span v-if="elementIndex === -1">Crear nuevo perfil</span>
                                <span v-else>Editar información personal</span>
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
                                                element.image ||
                                                require('@/assets/user.svg')
                                            "
                                            @onUpload="updateImage"
                                            :disabled="elementIndex === -1"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="element.firstName"
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Nombres"
                                            outlined
                                            dense
                                        />
                                        <v-text-field
                                            v-model="element.lastName"
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Apellidos"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="element.dni"
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
                                            v-model="element.passport"
                                            autocomplete="off"
                                            label="Pasaporte"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="element.telephone"
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
                                            v-model="element.mobile"
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
                                            v-model="element.email"
                                            :rules="rules.email"
                                            autocomplete="off"
                                            label="Correo electrónico"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                            v-model="element.address"
                                            :rules="rules.required"
                                            autocomplete="off"
                                            label="Dirección"
                                            outlined
                                            dense
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-form>
        </template>
    </DrawerPanel>
</template>

<script lang="ts">
import UserController from './UserController'
export default UserController
</script>
<style lang="sass">
.v-menu__content
    margin-top: 40px
</style>
