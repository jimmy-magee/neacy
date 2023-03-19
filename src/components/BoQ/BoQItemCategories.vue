<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        BoQItem Categories
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon color="green">
          <v-icon icon="mdi-plus"></v-icon>
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
          <v-btn icon="mdi-file-edit-outline" @click="editBoQItemCategory(item.value)">
           
          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon="mdi-delete-alert" @click="deleteBoQItemCategory(item.value)">

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
      store.dispatch('projects/loadBoQItemCategories')
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
        title: 'ID',
        align: 'left',
        sortable: true,
        key: 'id'
      },
      {
        title: 'Name',
        align: 'left',
        sortable: true,
        key: 'name'
      },
      {
        title: 'Code',
        align: 'left',
        sortable: true,
        key: 'code'
      },
      { title: 'Description', key: 'description' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];

    const boQItemCategories = computed(() => { return store.getters['projects/loadedBoQItemCategories']});
    const formTitle = computed(() => editedIndex.value === -1 ? 'New BoQItemCategory' : 'Edit BoQItemCategory');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editBoQItemCategory = ((id) => {
      console.log('Edit item '+id)
      editedIndex.value = boQItemCategories.value.findIndex(bc => bc.id == id)
      const obj = boQItemCategories.value.find(bc => bc.id == id)
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const updateBoQItemCategory = (() => {
        if (editedIndex.value === -1) {
          console.log('Creating  boQItem category')
          console.log(editedItem)
          store.dispatch('projects/createBoQItemCategory', editedItem)
        } else {
          console.log('Updating  boQItem category')
          console.log(editedItem)
          store.dispatch('projects/updateBoQItemCategory', editedItem)
        }
        close()
      });

      const deleteBoQItemCategory = ((id) => {
        console.log('Delete BoQItemCategory Event Received..')
        console.log(id)
        store.dispatch('projects/deleteBoQItemCategory', id)
      });

      const close = (() => {
        dialog.value = false
        setTimeout(() => {
          Object.assign(editedItem, defaultItem)
          editedIndex.value = -1
        }, 300)
      });

      const onDismissed = (() => {
         store.dispatch('clearError', { root: true })
      });

      return {
        boQItemCategories,
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
        close,
        onDismissed

      }

    }

  }
</script>
  