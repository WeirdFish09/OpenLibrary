<template>
  <RegisterPage />
</template>

<script lang="ts">
import Vue from 'vue';
import RegisterPage from '@/components/RegisterPage.vue'; 

export default Vue.extend({
    name: 'Register',
    components: {
        RegisterPage
    }
});
</script>
