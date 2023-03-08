<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Suppliers
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn absolute right fab dark color="indigo">
          <v-dialog v-model="dialog" activator="parent">

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-layout wrap>

                    <v-select v-model="editedItem.supplierCategoryId" :items="supplierCategories" item-key="id"
                      item-title="name" label="Select Supplier Category">
                    </v-select>

                  </v-layout>

                  <v-layout wrap>

                    <v-select v-model="editedItem.productCategoryIdList" :items="productCategories" multiple
                      item-value="id" item-text="name" label="Select Product Categories">
                    </v-select>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.address" label="Address"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.website" label="WebSite"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.landline" label="Landline"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.contact" label="Contact"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.contactNumber" label="Contact Number"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>

                  </v-layout>


                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="updateSupplier">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </v-card-title>

      <v-layout row v-if="error">

        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>

      </v-layout>

      <v-data-table :headers="supplierTableHeaders" :items="suppliers" :search="search">
        <template v-slot:[`item.actionView`]="{ item }">
          <v-btn text :to="'/suppliers/' + item.id">
            <v-icon>description</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn icon @click="editSupplier(item)">
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon @click="deleteSupplier(item)">
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
      store.dispatch('suppliers/loadSupplierCategories')
      store.dispatch('products/loadProductCategories')
      store.dispatch('suppliers/loadSuppliers')
    });

    const supplierTableHeaders = [
      {
        text: 'Id',
        align: 'left',
        sortable: true,
        value: 'supplierCategoryId'
      },
      {
        text: 'Category',
        align: 'left',
        sortable: true,
        value: 'supplierCategoryName'
      },
      {
        text: 'Name',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'Address', value: 'address' },
      { text: 'Website', value: 'website' },
      { text: 'Head Office', value: 'landline' },
      { text: 'Contact', value: 'contact' },
      { text: 'Contact Number', value: 'contactNumber' },
      { text: 'Email', value: 'email' },
      { text: 'View', align: 'left', value: 'actionView' },
      { text: 'Edit', align: 'left', value: 'actionEdit' },
      { text: 'Delete', align: 'left', value: 'actionDelete' }
    ];
    const search = ref('');
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = reactive({
      id: '',
      supplierCategoryId: '',
      supplierCategoryName: '',
      productCategoryIdList: [],
      name: '',
      address: '',
      description: '',
      landline: '',
      contact: '',
      contactNumber: '',
      email: '',
      website: ''
    });
    const defaultItem = reactive({
      id: '',
      supplierCategoryId: '',
      supplierCategoryName: '',
      productCategoryIdList: [],
      name: '',
      address: '',
      description: '',
      landline: '',
      contact: '',
      contactNumber: '',
      email: '',
      website: ''
    })
    const supplierCategories = computed(() => store.getters['suppliers/loadedSupplierCategories']);
    const productCategories = computed(() => store.getters['products/loadedProductCategories']);
    const suppliers = computed(() => store.getters['suppliers/loadedSuppliers']);
    const formTitle = computed(() => editedIndex.value === -1 ? 'New Supplier' : 'Edit Supplier');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editSupplier = ((item) => {
      editedIndex.value = suppliers.value.indexOf(item)
      Object.assign(editedItem, item)
      dialog.value = true
    });

    const updateSupplier = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating  suppliers')
        console.log(editedItem)
        store.dispatch('suppliers/createSupplier', editedItem)
      } else {
        console.log('Updating  suppliers')
        console.log(editedItem)
        store.dispatch('suppliers/updateSupplier', editedItem)
      }
      close()
    });
    const deleteSupplier = ((item) => {
      console.log('Delete supplier Event Received..')
      console.log(item)
      store.dispatch('suppliers/deleteSupplier', item)
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
      supplierTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      supplierCategories,
      productCategories,
      suppliers,
      formTitle,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editSupplier,
      updateSupplier,
      deleteSupplier,
      close,
      onDismissed

    }
  }
}
</script>
