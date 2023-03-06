<template>
  <v-container>
    <v-card>
      <v-card-title>
        BoQItem Categories
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn>Show
        <v-dialog v-model="dialog" activator="parent">
     
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>

                <v-layout row>
                  
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
               
                </v-layout>

                <v-layout row>
                  
                    <v-text-field v-model="editedItem.code" label="Code"></v-text-field>
                
                </v-layout>

                <v-layout row>
                 
                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                  
                </v-layout>

              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="updateBoQItemCategory">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      </v-card-title>

      <v-layout row v-if="error">
      
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
       
      </v-layout>

      <v-data-table :headers="boQItemCategoryTableHeaders" :items="boQItemCategories" :search="search">
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn icon @click="editBoQItemCategory(item)">
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon @click="deleteBoQItemCategory(item)">
            <v-icon>
              delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>

    </v-card>
  </v-container>
</template>
  
<script>
import { computed, ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {

  setup() {

    const store = useStore();


    onMounted(() => {
      store.dispatch('loadBoQItemCategories')
    });

    const search = ref('');
    const dialog = ref(false);
    const editedIndex = ref(-1);

    const editedItem = reactive({
      id: '',
      name: '',
      code: '',
      description: ''
    });
    const defaultItem = reactive({
      id: '',
      name: '',
      code: '',
      description: ''
    });
    const boQItemCategoryTableHeaders = [
      {
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Name',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Code',
        align: 'left',
        sortable: true,
        value: 'code'
      },
      { text: 'Description', value: 'description' },
      { text: 'Edit', align: 'left', value: 'actionEdit' },
      { text: 'Delete', align: 'left', value: 'actionDelete' }
    ];

    const boQItemCategories = computed(() => { return store.getters.loadedBoQItemCategories });
    const formTitle = computed(() => editedIndex.value === -1 ? 'New BoQItemCategory' : 'Edit BoQItemCategory');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editBoQItemCategory = ((item) => {
      editedIndex.value = boQItemCategories.value.indexOf(item)
      Object.assign(editedItem, item)
      dialog.value = true
    });

    const updateBoQItemCategory = (() => {
        if (editedIndex.value === -1) {
          console.log('Creating  boQItem category')
          console.log(this.editedItem)
          store.dispatch('projects/createBoQItemCategory', this.editedItem)
        } else {
          console.log('Updating  boQItem category')
          console.log(this.editedItem)
          store.dispatch('projects/updateBoQItemCategory', this.editedItem)
        }
        close()
      });

      const deleteBoQItemCategory = ((item) => {
        console.log('Delete BoQItemCategory Event Received..')
        console.log(item)
        store.dispatch('projects/deleteBoQItemCategory', item)
      });

      const close = (() => {
        dialog.value = false
        setTimeout(() => {
          Object.assign(editedItem, this.defaultItem)
          editedIndex.value = -1
        }, 300)
      });

      const onDismissed = (() => {
         store.dispatch('clearError', { root: true })
      });

      return {
        search,
        dialog,
        editedIndex,
        editedItem,
        defaultItem,
        boQItemCategoryTableHeaders,
        formTitle,
        loading,
        error,
        userIsAuthenticatedAndHasRoleAdmin,
        editBoQItemCategory,
        updateBoQItemCategory,
        deleteBoQItemCategory,
        onDismissed

      }

    }

  }
</script>
  