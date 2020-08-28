<template>
    <v-app id="sandbox">
        <v-navigation-drawer mini-variant clipped permanent app fixed>
            <v-list>
                <v-list-item
                    v-for="item in sideBarItems"
                    :key="item.title"
                    @click="changeRoute(item)"
                >
                    <v-list-item-icon>
                        <v-tooltip right open-delay="1000">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
                            </template>
                            <span>{{ item.title }}</span>
                        </v-tooltip>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar clipped-left app dense class="primary">
            <img src="@/assets/logo.svg" alt="Sifme" width="30" />
            <v-toolbar-title class="ml-4 white--text">Sifme</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu
                offset-y
                origin="top bottom"
                :nudge-bottom="10"
                transition="scale-transition"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon large dark>
                        <v-icon>account_circle</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img
                                    :src="
                                        $store.state.session.profile.image ||
                                        require('@/assets/user.svg')
                                    "
                                    alt="avatar"
                                />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title
                                    >{{ $store.state.session.profile.lastName }}
                                    {{
                                        $store.state.session.profile.firstName
                                    }}</v-list-item-title
                                >
                                <v-list-item-subtitle>{{
                                    $store.state.session.profile.email
                                }}</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-item
                            v-for="item in optionItems"
                            :key="item.title"
                            @click="changeRoute(item)"
                        >
                            <v-list-item-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>

        <v-main>
            <router-view
                class="admin-container"
                tag="v-container"
                fluid
                fill-height
            ></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import AdminLayout from '@/layouts/admin/AdminController'
export default AdminLayout
</script>

<style scoped>
.admin-container {
    height: calc(100vh - 50px);
    overflow: hidden;
}
</style>
