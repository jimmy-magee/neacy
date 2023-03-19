<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Product Categories
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
                <v-btn color="blue darken-1" @click="updateProductCategory">Save</v-btn>
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

      <v-data-table :headers="productCategoryTableHeaders" :items="productCategories" :search="search">
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn icon="mdi-file-edit-outline" @click="editProductCategory(item.value)">

          </v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon="mdi-delete-alert" @click="deleteProductCategory(item.value)">
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
      store.dispatch('products/loadProductCategories')
    });

    const productCategoryTableHeaders = [
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
    const productCategories = computed(() => store.getters['products/loadedProductCategories']);
    const formTitle = computed(() => editedIndex.value === -1 ? 'New Product Category' : 'Edit Product Category');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editProductCategory = ((selectedId) => {
      console.log('Edit product category ' + selectedId)
      editedIndex.value = productCategories.value.findIndex(pc => pc.id == selectedId)
      const obj = productCategories.value.find(pc => pc.id == selectedId)
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const updateProductCategory = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating  product category')
        console.log(editedItem)
        store.dispatch('products/createProductCategory', editedItem)
      } else {
        console.log('Updating  product category')
        console.log(editedItem)
        store.dispatch('products/updateProductCategory', editedItem)
      }
      close()
    });
    const deleteProductCategory = ((item) => {
      console.log('Delete product category Event Received..')
      console.log(item)
      store.dispatch('products/deleteProductCategory', item)
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
      productCategoryTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      productCategories,
      formTitle,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editProductCategory,
      updateProductCategory,
      deleteProductCategory,
      close,
      onDismissed
    }
  }

}
</script>
