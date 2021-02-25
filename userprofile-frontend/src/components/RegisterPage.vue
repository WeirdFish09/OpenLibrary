<template>
  <div class="container">
    <div class="register-form">
      <div class="form-name">
        Register
      </div>
      <div class="inputs">
        <div class="email">
            <label for="current-password">User name</label>
            <input name="current-password" placeholder="User name" v-model="userName">
        </div>
        <div class="password">
            <label for="current-password">Password</label>
            <input name="current-password" placeholder="Password" v-model="password" type="password">
        </div>
        <div class="confirm-password">
            <label for="confirm-password">Confirm password</label>
            <input name="confirm-password" placeholder="Confirm password" v-model="confirmPassword" type="password">
        </div>
      </div>
      <div class="confirm-button">
        <div class="toLogin" @click="toLogin()">Login</div>
        <button @click="register()">Register</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import userService from '@/services/userService';

export default Vue.extend({
  name: 'LoginPage',
  props: {
    msg: String,
  },
  data: () => ({ 
    userName: '',
    password: '',
    confirmPassword: ''
  }),
  // data: {
  //   current: ''
  // },
  methods: {
    register() {
      if (this.password != this.confirmPassword) {
        alert('Passwords are different');
        return;
      }

      userService.register(this.userName, this.password);
    },
    toLogin() {
      this.$router.push({ name: 'Login' });
    }
  }
});
</script>

<style scoped lang="scss">
.container {
  background: #1e1e1e;
  height: calc(100vh);
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  background: url('../assets/background.jpg') center center;
  background-size: 100% 100%;

  .register-form {
    background: rgba(#303030, 0.98);
    color: #cccccc;
    border-radius: 3px;
    border: 1px solid #494949;
    padding: 20px;
    width: 400px;
  }

  .form-name {
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
  }

  .inputs {
    label {
      display: block;
      font-size: 12px;
      color: #f5f5f5;
    }
    input {
      outline: none;
      background: none;
      border: none;
      color: white;
      border-bottom: 1px solid #494949;
      width: 100%;
      padding: 3px;
    }
    > div {
      margin: 10px;
    }
  }

  .confirm-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 10px 0 10px;

    .toLogin {
      color: #cccccc;
      text-decoration: underline;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        text-decoration: none;
        color: white;
      }
    }

    button {
      width: 150px;
      background: #646464;
      border: none;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
      &:hover {
        color: #141414;
        background: #cccccc;
      }
    }
  }
}
</style>
