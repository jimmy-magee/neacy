<template>
  <v-container>
    <!--
    <v-layout row v-if="error">
      <v-sheet xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-sheet>
    </v-layout>
    -->
    <v-layout row>
      <v-sheet xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-sheet xs12>
                    <v-text-field name="name" label="Name" id="username" v-model="username" required></v-text-field>
                  </v-sheet>
                </v-layout>
                <v-layout row>
                  <v-sheet xs12>
                    <v-text-field name="email" label="Mail" id="email" v-model="email" type="email"
                      required></v-text-field>
                  </v-sheet>
                </v-layout>
                <v-layout row>
                  <v-sheet xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password"
                      required></v-text-field>
                  </v-sheet>
                </v-layout>
                <v-layout row>
                  <v-sheet xs12>
                    <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword"
                      v-model="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>
                  </v-sheet>
                </v-layout>
                <v-layout row>
                  <v-sheet xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign up
                      <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-sheet>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-layout>
  </v-container>
</template>

<script>
import { ref, computed, watchEffect} from 'vue'
import { useStore } from 'vuex'

export default {

  setup() {
    const store = useStore();
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const confirmPassword = ref('');
    const clientId = ref('123');

    const onSignup = () => ( 
          store.dispatch('users/signUserUp', { username: email.value, password: password.value, clientId: clientId.value })
          // user above does not work - quick fix.
          // this.$router.push('/signin')
    );
  
    return {
      username,
      password,
      email,
      confirmPassword,
      onSignup,
      loading:  computed(() => store.getters.loading),
      user:  computed(() => store.getters.user),
      error:  computed(() => store.getters.error),
      conparePasswords: computed(() => password.value === confirmPassword.value ? true : 'Passwords don\'t match'),
      authenticated: watchEffect((user) => {
        console.log('watching user '+user)
          if (user !== null && user !== undefined) {
            console.log('watching user '+user)
            //this.$router.push('/')
          }
        }),
      clientId,
    }
  }

}
</script>
