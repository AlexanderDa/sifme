<template>
    <div class="drawer-panel">
        <div v-show="position === 'left'" v-if="drawer" class="sidebar">
            <div class="search">
                <v-text-field
                    style="height: 50px; border-radius: 30px;"
                    @click:append="onSearch()"
                    @keyup.enter="onSearch()"
                    @click:clear="onClearSearch()"
                    @input="v => v !== '' || onClearSearch()"
                    v-model="value"
                    append-icon="search"
                    autocomplete="off"
                    label="Buscar ..."
                    clearable
                    dense
                    solo
                ></v-text-field>
            </div>
            <div class="drawer-content">
                <slot name="drawer" />
            </div>
        </div>
        <div class="body">
            <v-card class="overflow-hidden">
                <v-app-bar
                    scroll-target="#scrolling-techniques-4"
                    color="#fff"
                    absolute
                    dense
                >
                    <v-app-bar-nav-icon
                        v-if="position === 'left'"
                        @click="drawer = !drawer"
                    />
                    <v-toolbar-title>{{ title.toUpperCase() }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <slot name="actions" />
                    <v-app-bar-nav-icon
                        v-if="position === 'right'"
                        @click="drawer = !drawer"
                    />
                </v-app-bar>
                <v-sheet id="scrolling-techniques-4" class="overflow-y-auto">
                    <v-container :fluid="fluid">
                        <slot name="content" />
                    </v-container>
                </v-sheet>
            </v-card>
        </div>
        <div class="sidebar" v-show="position === 'right'" v-if="drawer">
            <div class="search">
                <v-text-field
                    style="height: 50px; border-radius: 30px;"
                    @click:append="onSearch()"
                    @keyup.enter="onSearch()"
                    @click:clear="onClearSearch()"
                    @input="v => v !== '' || onClearSearch()"
                    v-model="value"
                    append-icon="search"
                    autocomplete="off"
                    label="Buscar ..."
                    clearable
                    dense
                    solo
                ></v-text-field>
                <v-switch
                    v-if="filter"
                    v-model="includeRemoveds"
                    class="ma-0"
                    label="Incluir eliminados"
                />
            </div>
            <div class="drawer-content">
                <slot name="drawer" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import Search from '../utils/search'

@Component({ name: 'v-drawer-panel' })
export default class DawerPanel extends Vue {
    @Prop() title!: string
    @Prop({ default: 'right' }) position!: 'left' | 'right'
    @Prop({ default: false }) fluid!: boolean
    @Prop({ default: false }) filter!: boolean
    private drawer: boolean = true
    private value: string = ''
    private includeRemoveds: boolean = false

    onClearSearch(): void {
        this.value = ''
        this.includeRemoveds = false
        this.onSearch()
    }

    @Emit('onSearch')
    onSearch(): Search | null {
        return this.value
            ? {
                  value: this.value,
                  includeRemoveds: this.includeRemoveds
              }
            : null
    }

    private mounted(): void {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 800) {
                this.drawer = false
            } else {
                this.drawer = true
            }
        })
    }
}
</script>

<style lang="sass">
.drawer-panel
    width: 100%
    height: 100%
    display: flex
    justify-content: flex-end
    background-color: #f5f5f5

    .body
        width: 100%
        & .v-toolbar__title
            font-size: 1em
            color: #505050
        & .v-sheet
            height: 100%
            background-color: #f5f5f5
            & .container
                margin-top: 50px

    .sidebar
        width: 400px
        background-color: white
        & .search
            background-color: #f5f5f5
            padding: 0px 10px
        & .drawer-content
            height: calc( 100% - 50px )

            & .container
                margin-top: 50px
                overflow-y: auto
</style>
