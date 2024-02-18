<template>
    <v-container fluid height="100%" class="hero">
    

      <v-row
        no-gutters
        style="padding-top: 300px; height: 650px;">
        <v-img 
        :src="require('../assets/front_page_graphic.svg')"></v-img>
      <v-col>
        <h3 class="display-1 text-xs-center font-weight-bold mb-3">
          Neacy Mechanical & Electrical
        </h3>
        <v-layout
          text-xs-center
          wrap
        >
        <h5 class="font-weight-regular">
         <v-icon>
            lock
          </v-icon>
          Enterprise Services Platform
        </h5>
        </v-layout>
      </v-col>
  </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
