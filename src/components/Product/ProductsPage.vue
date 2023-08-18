<template>
  <v-container fluid>
    <v-card ref="form">
      <v-card-title>
        Products
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

                  <v-layout wrap>
                 
                      <v-select v-model="editedItem.productCategoryId" :items="productCategories" item-value="id"
                        item-title="name" label="Select Product Category">
                      </v-select>
                    
                  </v-layout>

                  <v-layout row>
                    
                      <v-text-field ref="nameField" v-model="editedItem.name" label="Name"></v-text-field>
                    
                  </v-layout>

                  <v-layout row>
                    
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    
                  </v-layout>

                  <v-layout row>
                    
                      <v-text-field v-model="editedItem.manufacturer" label="Manufacturer"></v-text-field>
                    
                  </v-layout>

                  <v-layout row>
                    
                      <v-text-field v-model="editedItem.productCode" label="Product Code"></v-text-field>
                    
                  </v-layout>

                  <v-layout row>
                    
                      <v-text-field v-model="editedItem.productStandard" label="Product Standard"></v-text-field>
                    
                  </v-layout>

                  <v-layout row>
                    
                      <v-text-field v-model="editedItem.units" label="Units of Measurement"></v-text-field>
                    
                  </v-layout>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click.="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click.="updateProduct">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>

      </v-card-title>

      <v-layout row v-if="error">

        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>

      </v-layout>

      <v-layout row v-if="formValidationError">

        <app-alert @dismissed="onDismissed" :text="formValidationError.message"></app-alert>

      </v-layout>

      <v-data-table :headers="productTableHeaders" :items="products" :search="search">
        <template v-slot:[`item.actionView`]="{ item }">
          <v-btn icon  :to="'/products/' + item.value">
            <v-icon color="orange darken-4" right>mdi-open-in-new</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn icon="mdi-file-edit-outline" @click="editProduct(item.value)"></v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon="mdi-delete-alert" @click="deleteProduct(item.value)"></v-btn>
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
      store.dispatch('products/loadProducts')
    });

    const productTableHeaders = [
      {
        title: 'Id',
        sortable: true,
        align: ' d-none',
        key: 'productCategoryId'
      },
      {
        title: 'Category',
        align: 'left',
        sortable: true,
        key: 'productCategoryName'
      },
      {
        title: 'Name',
        align: 'left',
        sortable: true,
        key: 'name'
      },
      { title: 'Units', key: 'units' },
      { title: 'Manufacturer', key: 'manufacturer' },
      { title: 'Product Code', key: 'productCode' },
      { title: 'Product Standard', key: 'productStandard' },
      { title: 'Image', key: 'imageUrl' },
      { title: 'View', align: 'left', key: 'actionView' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];

    const search = ref('');
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = reactive({
      id: '',
      productCategoryId: '',
      productCategoryName: '',
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: '',
    });
    const defaultItem = reactive({
      id: '',
      productCategoryId: '',
      productCategoryName: '',
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: '',
    });

    const formHasErrors = ref(false);

    const productCategories = computed(() => store.getters['products/loadedProductCategories']);
    const products = computed(() => store.getters['products/loadedProducts']);

    const formTitle = computed(() => editedIndex.value === -1 ? 'New Product' : 'Edit Product');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editProduct = ((item) => {
      console.log('Edit item..' + item)
      console.log(item)
      editedIndex.value = products.value.findIndex(u => u.id == item)
      const obj = products.value.find(u => u.id == item)
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const updateProduct = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating Product')
        console.log(editedItem)
        store.dispatch('products/createProduct', editedItem)
      } else {
        console.log('Updating Product')
        console.log(editedItem)
        store.dispatch('products/updateProduct', editedItem)
      }
      close()
    });
    const deleteProduct = ((productId) => {
      console.log('Delete Product..')
      console.log(productId)
      store.dispatch('products/deleteProduct', productId)
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

    const formValidationError = computed(() => {
      return store.getters.formValidationError
    });

    return {
      productCategories,
      products,
      productTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      formTitle,
      formHasErrors,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editProduct,
      formValidationError,
      updateProduct,
      deleteProduct,
      close,
      onDismissed
    }
  }

}
</script>
