<template>
    <div class="header">
        <div class="left-part">
            <div class="icon-block">
                <a routerLink="/">
                    <img src="@/assets/logo.png" />
                </a>
            </div>
            
            <div class="menu">
                <div class="menu-item active">Library</div>
                <div class="menu-item">Chat</div>
            </div>
        </div>

        <div class="user-data">
            <img src="@/assets/userLogo.png" width="40px" height="40px" @click="logout()">
            
            <!--<mat-menu #menu="matMenu" >
                <button mat-menu-item class="user-menu">Settings</button>
                <button mat-menu-item>Logout</button>
            </mat-menu>-->
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
        }
    }
})
</script>

<style template lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        padding: 10px 3%;
        background: #2d2d2d;
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
            background: #494949;
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
            color: #cccccc;
            &.active {
                color: #ffffff;
                background-color: #494949;
            }

            &:not(.active):hover {
                background-color: #606060;
                color: white;
            }
        }
    }

    .user-data {
        display: flex;
        align-items: center;
        img {
            cursor: pointer;
            background-color: #494949;
            border-radius: 25px;

            &:hover {
                background-color: #606060;
            }
        }
    }
</style>