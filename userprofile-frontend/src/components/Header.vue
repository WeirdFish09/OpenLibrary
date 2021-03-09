<template>
    <div class="header">
        <div class="left-part">
            <div class="icon-block">
                <a routerLink="/">
                    <img src="@/assets/logo.png" />
                </a>
            </div>
            
            <div class="menu">
                <div class="menu-item" @click="toLibrary()">Library</div>
                <div class="menu-item" @click="toChat()">Chat</div>
            </div>
        </div>

        <div class="user-data active">
            <p>Profile</p>
            <img src="@/assets/userLogo.png" width="40px" height="40px" @click="logout()">
        </div>
    </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import userService from '@/services/userService';

export default Vue.extend({
    name: 'Header',
    props: {
        userLogoLink: String
    },
    methods: {
        logout() {
            userService.logout();
        },
        toLibrary() {
            window.location.pathname = '/';
        },
        toChat() {
            window.location.pathname = '/chat';
        }
    }
})
</script>

<style template lang="scss">
    @import '../styles/variables.scss';

    .header {
        display: flex;
        justify-content: space-between;
        padding: 10px 3%;
        background: $blocksBackground;
        height: 75px;
    }

    .left-part {
        display: flex;
        align-items: center;
        .icon-block {
            width: 50px;
            margin: 0 30px;
            cursor: pointer;
            border-radius: 30px;
            background: $accentBackground;
            img {
                width: 50px;
                height: 50px;
            }
        }
    }

    .menu {
        display: flex;

        .menu-item {
            width: 100px;
            font-size: 16px;
            border-radius: 10px;
            margin-right: 10px;
            text-align: center;
            padding: 5px;
            cursor: pointer;
            color: $textColor;
            &.active {
                color: $accentTextColor;
                background-color: $accentBackground;
            }

            &:not(.active):hover {
                background-color: $accentHover;
                color: $textColor;
            }
        }
    }

    .user-data {
        display: flex;
        align-items: center;
        img {
            cursor: pointer;
            background-color: $accentBackground;
            border-radius: 25px;

            &:hover {
                background-color: $accentHover;
            }
        }
        p {
            color: $textColor;
            text-decoration: underline;
            cursor: pointer;
            margin-right: 10px;
            font-size: 12px;

            &:hover {
                text-decoration: none;
            }
        }
    }
</style>