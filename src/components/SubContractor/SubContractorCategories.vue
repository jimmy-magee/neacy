<template>
  <v-container>
    <v-card>
      <v-card-title>
        SubContractor Categories
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

                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>

                  </v-layout>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="updateSubContractorCategory">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </v-card-title>
      <!--
      <v-layout row v-if="error">
        <v-flex xs12 sm6 md10 offset-sm2>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
    -->

      <v-data-table :headers="subContractorCategoryTableHeaders" :items="subContractorCategories" :search="search">
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn  icon="mdi-file-edit-outline" @click="editSubContractorCategory(item)">
    
          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn  icon="mdi-delete-alert" @click="deleteSubContractorCategory(item)">
         
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
      store.dispatch('subcontractors/loadSubContractorCategories')
    });

    const subContractorCategoryTableHeaders = [
      {
        title: 'Name',
        align: 'left',
        sortable: true,
        key: 'name'
      },
      { title: 'Description', key: 'description' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];

    const search = ref('');
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = reactive({
      id: '',
      name: '',
      description: '',
    });
    const defaultItem = reactive({
      id: '',
      name: '',
      description: '',
    });

    const subContractorCategories = computed(() => store.getters['subcontractors/loadedSubContractorCategories']);
    const formTitle = computed(() => editedIndex.value === -1 ? 'New SubContractor Category' : 'Edit SubContractor Category');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editSubContractorCategory = ((item) => {
      editedIndex.value = subContractorCategories.value.indexOf(item)
      Object.assign(editedItem, item)
      dialog.value = true
    });

    const updateSubContractorCategory = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating  subContractor category')
        console.log(editedItem)
        store.dispatch('subcontractors/createSubContractorCategory', editedItem)
      } else {
        console.log('Updating  subContractor category')
        console.log(editedItem)
        store.dispatch('subcontractors/updateSubContractorCategory', editedItem)
      }
      close()
    });
    const deleteSubContractorCategory = ((item) => {
      console.log('Delete subContractor category Event Received..')
      console.log(item)
      store.dispatch('subcontractors/deleteSubContractorCategory', item)
    });
    const close = (() => {
      dialog.value = false;
      setTimeout(() => {
        Object.assign(editedItem, defaultItem)
        editedIndex.value = -1
      }, 300);
    });
    const onDismissed = (() => {
      store.dispatch('clearError', { root: true })
    });

    return {
      subContractorCategoryTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      subContractorCategories,
      formTitle,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editSubContractorCategory,
      updateSubContractorCategory,
      deleteSubContractorCategory,
      close,
      onDismissed
    }
  }

}
</script>
