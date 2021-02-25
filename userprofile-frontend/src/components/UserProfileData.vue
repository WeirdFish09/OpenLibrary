<template>
  <div class="container">
    <div class="user-profile">
      <div class="top">
        <div class="usr-image">
          <img src="@/assets/userLogo.png" width="300px">
          <div class="change_url_button" v-if="false">
            <img src="@/assets/svgs/pencil.svg" alt="Edit">
          </div>
        </div>
        <div class="user">
          <div class="user-name">
            {{ name }}
          </div>
          <div class="theme-name">
            Theme
          </div>
          <select name="theme" id="theme-select" @change="onChange($event)">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
          </select>

          <div class="change-password" @click="changePasswordButton()" v-if="!changePasswordFormOpened">
            Change password
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="change-password-form" v-if="changePasswordFormOpened">
          <div class="form-name">
            Change password
          </div>
          <div class="form-field">
            <label for="current-password">Current password</label>
            <input name="current-password" placeholder="Current password" type="password" v-model="changePasswordModel.currentPassword">
          </div>
          <div class="form-field">
            <label for="current-password">New password</label>
            <input name="password" placeholder="New password" type="password" v-model="changePasswordModel.newPassword">
          </div>
          <div class="form-field">
            <label for="current-password">Confirm password</label>
            <input name="confirm-password" placeholder="Confirm new password" type="password" v-model="changePasswordModel.confirmPassword">
          </div>
          <div class="confirm-button">
            <button @click="cancel()">Cancel</button>
            <button type="submit" @click="changePassword($event)">Confirm</button>
          </div>
        </div>
      </div>
      <div class="change-logo-form" v-if="false">
        <div>
          <label for="imageUrl">Enter new image Url</label>
          <input name="image-url" placeholder="Image Url" v-model="imageUrl">
        </div>
        <div class="confirm-button">
          <button type="submit" @click="changeImage($event)">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import userService from '@/services/userService';

export default Vue.extend({
  name: 'UserProfileData',
  props: {
    msg: String,
  },
  data: () => ({ 
    name: 'User name',
    theme: '',
    changePasswordFormOpened: false,
    changePasswordModel: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    imageUrl: ''
  }),
  // data: {
  //   current: ''
  // },
  methods: {
    getImageUrl() {
      return "";
    },
    onChange(event: any) {
      console.log(event.target.value)
    },
    changePassword(event: any) {
      console.log(event, this.changePasswordModel.currentPassword);
      if (this.changePasswordModel.newPassword != this.changePasswordModel.confirmPassword) {
        alert('New passwords are not the same');
        return;
      }
      if (this.changePasswordModel.newPassword.length < 5) {
        alert('Password minimum length is 5 symbols');
        return;
      }

      userService.changePassword(this.changePasswordModel.currentPassword, this.changePasswordModel.newPassword)
        .then(() => {
          alert('Password successfully changed');
          this.cancel();
        }, error => {
          const errorData = error.response.data; 
          alert(errorData.ErrorMessage);
          console.log(errorData);
        });
    },
    changeImage(event: any) {
      console.log(event, this.imageUrl);
    },
    changePasswordButton() {
      this.changePasswordFormOpened = true;
    },
    cancel() {
      this.changePasswordFormOpened = false;
      this.changePasswordModel = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
  },
  mounted () {
    userService.getCurrentUser()
      .then(response => {
        this.name = response.data.userName;
        this.theme = response.data.uiTheme;
      }, error => {
          const errorData = error.response.data; 
          console.log(errorData);
      });
  }
});
</script>

<style scoped lang="scss">
.container {
  background: #1e1e1e;
  height: calc(100vh - 75px);
  padding-top: 10px;
  text-align: left;
  
  .user-profile {
    max-width: 820px;
    min-width: 320px;
    margin: 0 auto;
    padding: 10px;
    background: #303030;
    border-radius: 10px;
    min-height: 200px;

    .top {
      margin: 20px;
      display: flex;
      .usr-image {
        height: 300px;
        width: 300px;
        border-radius: 50%;
        background: #414141;
      }

      .user {
        margin-left: 30px;

        .user-name {
          color: #cccccc;
          font-size: 36px;
        }

        .theme-name {
          color: #cccccc;
          margin: 20px 0 5px 0;
          font-size: 16px;
        }

        select {
          background: #414141;
          border: 1px solid #494949;
          color: #cccccc;
          width: 300px;
          padding: 5px;
          border-radius: 3px;
        }

        .change-password {
          color: #cccccc;
          text-decoration: underline;
          font-size: 12px;
          cursor: pointer;
          margin-top: 20px;

          &:hover {
            text-decoration: none;
            color: white;
          }
        }
      }
    }

    .bottom {
      margin: 20px 0;
      display: flex;
      justify-content: center;

      .change-password-form {
        background: #141414;
        border-radius: 5px;
        border: 1px solid #494949;
        padding: 20px;
        width: 400px;

        .form-name {
          font-size: 24px;
          margin-bottom: 15px;
          text-align: center;
          color: #cccccc;
        }

        .form-field {
          margin: 10px;

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
        }

        .confirm-button {
          display: flex;
          justify-content: space-between;
          margin: 20px 10px 0 10px;

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
    }
  }
}
</style>
