<template>
  <div class="home">
    <Header imgUrl="./userLogo.png" />
    <UserProfileData msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserProfileData from '@/components/UserProfileData.vue'; // @ is an alias to /src
import Header from '@/components/Header.vue';

const images = require.context('../assets/', false, /\.png$/);

export default Vue.extend({
    name: 'UserProfile',
    components: {
        UserProfileData,
        Header
    },
    
    methods: {
        imgUrl: (path: string) => images(path)
    },
});
</script>
