<template>
<div>
 <v-alert
    dismissible
    close-text="Close Alert"
    type="error"
    @input="onClose"
  >
    {{text}}
  </v-alert>
  </div>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>
