<template>
  <v-container fill-height fluid>
    <v-layout row v-if="error">
      <v-sheet xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-sheet>
    </v-layout>

    <v-row align="center" justify="center" 
        no-gutters
        style="height: 450px;">
      <v-col cols="7" class="justify-center mx-auto">
        <v-card elevation="12" color="primary" style="min-height: 350px;">
          <v-card-text>
            <form @submit.prevent="onSignin">
              <v-layout row>
                <v-text-field
                  name="email"
                  label="Mail"
                  id="email"
                  v-model="username"
                  type="email"
                  required
                ></v-text-field>
              </v-layout>
              <v-layout row>
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  required
                ></v-text-field>
              </v-layout>
  
                <v-btn type="submit" class="float-right">
                  <!-- :disabled="loading" :loading="loading" -->
                  Sign in
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
            
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const username = ref("");
const password = ref("");

const onSignin = () =>
  store.dispatch("users/signUserIn", {
    username: username.value,
    password: password.value,
  });

const onDismissed = () => store.dispatch("users/clearError");

const user = computed(() => store.getters["users/user"]);

const error = computed(() => store.getters["error"]);

watch(user, (currentValue, oldValue) => {
  console.log(currentValue);
  console.log(oldValue);
  if (currentValue != null && currentValue != undefined) {
    router.push("projects");
  }
});
</script>
