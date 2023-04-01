<template>
  <v-container fluid>
    <v-card fluid>
      <v-tabs v-model="outerTab" show-arrows>
        <v-tab value="detailsTab">
          Product Details
        </v-tab>
        <v-tab value="technicalTab">
          Technical Details
        </v-tab>
        <v-tab value="quotationsTab" v-if="userIsAuthenticatedAndHasRoleAdmin">
          Supplier Quotations
        </v-tab>
        <v-tab value="ordersTab" v-if="userIsAuthenticatedAndHasRoleAdmin">
          Product Orders
        </v-tab>
      </v-tabs>

      <v-window v-model="outerTab">
        <v-window-item value="detailsTab">
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-card-text>
              <v-row v-if="product">
                Product :
                {{ product.name }}
              </v-row>
              <v-row v-if="product">
                {{ product.description }}
              </v-row>
              <v-row v-if="product">
                <v-btn icon :href="product.url" target="_blank">
                  <v-icon>window</v-icon> Website
                </v-btn>
              </v-row>
              <v-row v-if="product">
                {{ product.manufacturer }}
              </v-row>
              <v-row v-if="product">
                <v-carousel :continuous="false" :cycle="false" :show-arrows="true" delimiter-icon="mdi-minus"
                  height="500px" show-arrows-on-hover>
                  <v-carousel-item v-for="(image, i) in product.productImages" :key="i">
                    <v-sheet :color="colors[i]" height="100%" tile>
                      <v-row class="fill-height" align="center" justify="center">
                        <div class="display-3">
                          <v-img
                            :src="`http://localhost:8080/api/resource/products/${product.id}/images/${image.id}/download`"
                            :lazy-src="`http://localhost:8080/api/resource/products/${product.id}/images/${image.id}/download`"
                            aspect-ratio="2" height="500px" width="700px">

                          </v-img>
                          {{ image.title }}
                        </div>
                      </v-row>

                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </v-row>


            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="technicalTab">
          <v-card>
            <v-card-title>

              <v-data-table :headers="productTechnicalDocTableHeaders" :items="product.productTechnicalDocuments"
                :search="search">
                <template v-slot:[`item.actionDownload`]="{ item }">
                  <v-btn icon @click="downloadProductTechnicalDocument(item)">
                    <v-icon>
                      cloud_download
                    </v-icon>
                  </v-btn>
                </template>
              </v-data-table>

            </v-card-title>
          </v-card>
        </v-window-item>
        <v-window-item value="quotationsTab">
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-data-table :headers="quotationTableHeaders" :items="quotations" :search="search">
              <template v-slot:[`item.actionOrderSupplierProduct`]="{ item }">
                <v-btn text :to="'/products/' + item.id + '/order'">
                  <v-icon>miscellaneous_services</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-window-item>

        <v-window-item value="ordersTab">
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-data-table :headers="orderTableHeaders" :items="orders" :search="search">
            </v-data-table>
          </v-card>
        </v-window-item>
      </v-window>

    </v-card>
  </v-container>
</template>

<script>
import { computed, ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();

    const route = useRoute();
    //const router = useRouter();

    const id = route.params.id;

    onMounted(() => {
      store.dispatch('products/loadProduct', id)
      store.dispatch('products/loadProductQuotations', id)
      store.dispatch('products/loadProductOrders', id)
    });


    const search = ref('');
    const dialog = ref(false);
    const formHasErrors = ref(false);
    const editedIndex = ref(-1);
    const outerTab = ref(null);
    const date = new Date().toISOString().substr(0, 10);
    const snack = ref(false);
    const snackColor = ref('');
    const snackText = ref('');

    const defaultItem = reactive({
      productCategoryId: '',
      productCategoryName: '',
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: ''

    });
    const editedItem = reactive({
      productCategoryId: '',
      productCategoryName: '',
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: ''

    });

    const productTechnicalDocTableHeaders = [
      {
        title: 'Id',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      { title: 'Name', value: 'title' },
      { title: 'Description', value: 'description' },
      { title: 'Download', value: 'actionDownload' },
    ];
    const quotationTableHeaders = [
      {
        title: 'Supplier',
        align: 'left',
        sortable: true,
        value: 'supplierName'
      },
      { title: 'Cost', value: 'cost' },
      { title: 'Lead In (Days)', value: 'leadInTimeInDays' },
      { title: 'Order', align: 'left', value: 'actionOrderSupplierProduct' },
    ];
    const orderTableHeaders = [
      {
        title: 'Project',
        align: 'left',
        sortable: true,
        value: 'projectName'
      },
      {
        title: 'Supplier',
        align: 'left',
        sortable: true,
        value: 'supplierName'
      },
      { title: 'Quantity', value: 'quantity' },
      { title: 'Unit Cost', value: 'unitCost' },
      { title: 'Total Cost', value: 'totalCost' },
      { title: 'Delivery Date', value: 'deliveryDate' },
      { title: 'Status', value: 'status' },
    ];

    const productCategories = computed(() => store.getters['products/loadedProductCategories']);
    const products = computed(() => store.getters['products/loadedProducts']);
    const product = computed(() => store.getters['products/loadedProduct']);
    const quotations = computed(() => store.getters['products/loadedProductQuotations']);
    const orders = computed(() => store.getters['products/loadedProductOrders']);
    const error = computed(() => {
      return store.getters.error
    });
    const formTitle = computed(() => editedIndex.value === -1 ? 'New Product' : 'Edit Product');

    const formValidationError = computed(() => {
      return store.getters.formValidationError
    });
    const loading = computed(() => {
      return store.getters.loading
    });
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => {
      return store.getters['users/userIsAuthenticatedAndHasRoleAdmin']
    });

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

    const downloadProductTechnicalDocument = ((item) => {
      console.log('Downloading item..' + item)
      console.log(item)
      editedIndex.value = products.value.findIndex(u => u.id == item)
      const obj = products.value.find(u => u.id == item)
      this.$store.dispatch('downloadProductTechnicalDocument', obj)
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

    return { 
      productCategories,
      products,
      product,
      productTechnicalDocTableHeaders,
      quotations,
      quotationTableHeaders,
      orders,
      orderTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      formTitle,
      formHasErrors,
      formValidationError,
      outerTab,
      date,
      snack,
      snackColor,
      snackText,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      downloadProductTechnicalDocument,
      editProduct,
      updateProduct,
      deleteProduct,
      close,
      onDismissed }
  }
}
</script>
<style scoped>
.hidden {
  display: none;
}
</style>
