<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Supplier Categories
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
              <v-btn color="blue darken-1" @click="updateSupplierCategory">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      </v-card-title>
<!--
      <v-layout row v-if="error">
     
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      
      </v-layout>
    -->

      <v-data-table :headers="supplierCategoryTableHeaders" :items="supplierCategories" :search="search">
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn  icon="mdi-file-edit-outline" @click="editSupplierCategory(item.value)">
     
          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn  icon="mdi-delete-alert" @click="deleteSupplierCategory(item.value)">
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
      store.dispatch('suppliers/loadSupplierCategories')
    });

    const supplierCategoryTableHeaders = [
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
    })
    const supplierCategories = computed(() => store.getters['suppliers/loadedSupplierCategories']);
    const formTitle = computed(() => editedIndex.value === -1 ? 'New Supplier Category' : 'Edit Supplier Category');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editSupplierCategory = ((id) => {
      editedIndex.value = supplierCategories.value.findIndex(sc => sc.id == id)
      const obj = supplierCategories.value.find(sc => sc.id == id)
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const updateSupplierCategory = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating  supplier category')
        console.log(editedItem)
        store.dispatch('suppliers/createSupplierCategory', editedItem)
      } else {
        console.log('Updating  supplier category')
        console.log(editedItem)
        store.dispatch('suppliers/updateSupplierCategory', editedItem)
      }
      close()
    });
    const deleteSupplierCategory = ((item) => {
      console.log('Delete supplier category Event Received..')
      console.log(item)
      store.dispatch('suppliers/deleteSupplierCategory', item)
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
      supplierCategoryTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      supplierCategories,
      formTitle,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editSupplierCategory,
      updateSupplierCategory,
      deleteSupplierCategory,
      close,
      onDismissed
    }
  }

}
</script>
