<template>
  <v-container fluid>
    <!--
    <v-layout row v-if="error">
      <v-sheet xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-sheet>
    </v-layout>
    -->


      <v-card>
        <v-card-text>
          <v-container fluid>
            <form @submit.prevent="onSignin">
              <v-layout row>

                <v-text-field name="email" label="Mail" id="email" v-model="username" type="email"
                  required></v-text-field>

              </v-layout>
              <v-layout row>

                <v-text-field name="password" label="Password" id="password" v-model="password" type="password"
                  required></v-text-field>

              </v-layout>
              <v-layout row>

                <v-btn type="submit"> <!-- :disabled="loading" :loading="loading" -->
                  Sign in
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>

              </v-layout>
            </form>
          </v-container>
        </v-card-text>
    
      </v-card>

  </v-container>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const onSignin = () => (
      store.dispatch('users/signUserIn', { username: username.value, password: password.value })
    );

    const onDismissed = () => (
      store.dispatch('users/clearError')
    );

    const user = computed(() => store.getters['users/user']);

    watch(user, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
      if(currentValue != null && currentValue != undefined) {
        router.push('projects')
      }
    });


    return {
      username,
      password,
      onSignin,
      onDismissed,
      loading:  computed(() => store.state['users/loading']),
      user,
      
      watch: {
        user(user) {
          if (user !== null && user !== undefined) {
            console.log('Redirecting to home.')
            router.push('/')
          }
        }
      },
    }
  }
}
</script>
