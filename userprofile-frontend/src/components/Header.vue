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
            <p class="userName">{{ getUserName }}</p>
            <img src="@/assets/userLogo.png" width="40px" height="40px">
            <p class="logout" @click="logout()">Exit</p>
        </div>
    </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import userService from '@/services/userService';
import userTokenService from '@/services/userTokenService';
import themeService, { Theme } from '@/services/themeService';

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
    },
    computed: {
        getUserName() {
            return userTokenService.getUserName();
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
        background: var(--blocksBackground);
        border-bottom: 1px solid var(--blocksBorder);
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
            background: var(--accentBackground);
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
            color: var(--textColor);
            &.active {
                color: var(--accentTextColor);
                background-color: var(--accentBackground);
            }

            &:not(.active):hover {
                background-color: var(--accentHover);
                color: var(--textColor);
            }
        }
    }

    .user-data {
        display: flex;
        align-items: center;
        img {
            cursor: pointer;
            background-color: var(--accentBackground);
            border-radius: 25px;

            &:hover {
                background-color: var(--accentHover);
            }
        }
        p {
            color: var(--textColor);

            &.logout {
                text-decoration: underline;
                cursor: pointer;
                margin-left: 10px;
                font-size: 12px;
                &:hover {
                    text-decoration: none;
                }
            }

            &.userName {
                margin-right: 10px;
            }
        }
    }
</style>