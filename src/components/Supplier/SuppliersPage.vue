<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Suppliers
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-search" label="Search" single-line hide-details></v-text-field>
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

                  <v-layout wrap>

                    <v-select v-model="editedItem.supplierCategoryId" :items="supplierCategories" item-key="id"
                      item-title="name" label="Select Supplier Category" required>
                    </v-select>

                  </v-layout>

                  <v-layout wrap>

                    <v-select v-model="editedItem.productCategoryList" :items="productCategories" multiple
                      item-value="id" item-title="name" label="Select Product Categories">
                    </v-select>

                  </v-layout>

                  <v-layout row>

                    <v-text-field v-model="editedItem.name" label="Name" required></v-text-field>

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
      <v-card-text>      
        <v-data-table :headers="supplierTableHeaders" :items="suppliers" :calculate-widths="true" :search="search">
        
        <template v-slot:[`item.actionView`]="{ item }">
  
          <v-btn icon="mdi-view-compact" @click="viewSupplier(item.id)">
    
          </v-btn>
        </template>
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn icon="mdi-file-edit-outline" @click="editSupplier(item.id)">

          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon="mdi-delete-alert" @click="deleteSupplier(item.id)">
    
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    </v-card>
  </v-container>
</template>

<script>

import { computed, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {

  setup() {

    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch('suppliers/loadSupplierCategories')
      store.dispatch('products/loadProductCategories')
      store.dispatch('suppliers/loadSuppliers')
    });

    const supplierTableHeaders = [
      {
        title: 'ID',
        align: ' d-none',
        sortable: true,
        key: 'id'
      },
      {
        title: 'Category',
        align: 'left',
        sortable: true,
        key: 'supplierCategoryName'
      },
      {
        title: 'Name',
        align: 'left',
        sortable: true,
        key: 'name'
      },
      { title: 'Address', key: 'address' },
      { title: 'Website', key: 'website' },
      { title: 'Head Office', key: 'landline' },
      { title: 'Contact', key: 'contact' },
      { title: 'Contact Number', key: 'contactNumber' },
      { title: 'Email', key: 'email' },
      { title: 'View', align: 'left', key: 'actionView' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
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
    const suppliers = computed(() => { return store.getters['suppliers/loadedSuppliers']});
    const formTitle = computed(() => editedIndex.value === -1 ? 'New Supplier' : 'Edit Supplier');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const viewSupplier = ((id) => {
      router.push('/suppliers/'+id)
    });

    const editSupplier = ((id) => {
      console.log('Edit suppliers')
      console.log(id)

      editedIndex.value  = suppliers.value.findIndex(s =>  s.id == id);
      console.log(editedIndex.value)
      const obj  = suppliers.value.find(s =>  s.id == id);
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const updateSupplier = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating  supplier')
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
      store.dispatch('suppliers/deleteSupplier', item.value)
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
      viewSupplier,
      editSupplier,
      updateSupplier,
      deleteSupplier,
      close,
      onDismissed
    }
  }
}
</script>
