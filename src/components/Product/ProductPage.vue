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
       

              <v-row >
                Product :
                {{ editedProduct.name }}
              </v-row>
              <v-row>
                {{ editedProduct.description }}
              </v-row>
              <!--
              <v-row v-if="product">
                <v-btn icon :href="editProduct.url" target="_blank">
                  <v-icon>window</v-icon> Website
                </v-btn>
              </v-row>
              -->
              <v-row>
                {{ editedProduct.manufacturer }}
              </v-row>
              <!--
              <v-row v-if="product.images">
                <v-carousel :continuous="false" :cycle="false" :show-arrows="true" delimiter-icon="mdi-minus"
                  height="500px" show-arrows-on-hover>
                  <v-carousel-item v-for="(image, i) in product.productImages" :key="i">
                  
                      <v-row class="fill-height" justify="center">
                        <div class="display-3">
                          <v-img
                            :src="`http://localhost:8080/api/resource/products/${product.id}/images/${image.id}/download`"
                            :lazy-src="`http://localhost:8080/api/resource/products/${product.id}/images/${image.id}/download`"
                            aspect-ratio="2" height="500px" width="700px">

                          </v-img>
                          {{ image.title }}
                        </div>
                      </v-row>

              
                  </v-carousel-item>
                </v-carousel>
              </v-row>
-->

            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="technicalTab">
          <v-card>
            <v-card-title>
              Product Documentation
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
              <v-spacer></v-spacer>
              <v-btn icon color="green">
                <v-icon icon="mdi-plus"></v-icon>
                <v-dialog v-model="techDialog" activator="parent">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Upload Product Technical Documentation</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>

                        <v-layout row>

                          <v-file-input ref="techFiles" filled multiple prepend-icon="mdi-camera"
                            label="Upload Product Files" type="file"></v-file-input>


                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" @click="closeTechDialog">Cancel</v-btn>
                      <v-btn color="blue darken-1" @click="uploadProductTechnicalDocs">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="productTechnicalDocTableHeaders" :items="productTechnicalDocs" :search="search">
                <template v-slot:[`item.actionDownload`]="{ item }">
                  <v-btn icon="mdi-download" @click="downloadProductTechnicalDocument(item)">
                 
                  </v-btn>
                </template>
                <template v-slot:[`item.actionEditTechnicalDoc`]="{ item }">
                  <v-btn icon="mdi-file-edit-outline" @click="editProductTechnicalDoc(item)">
                
                  </v-btn>
                </template>
              </v-data-table>

            </v-card-text>
          </v-card>

          <v-dialog v-model="productTechnicalDocDialog">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Edit Product Technical Documentation</span>
                    </v-card-title>
                    <v-card-text>
         
                        <v-layout row>
                          <v-text-field v-model="editedProductTechnicalDoc.title" label="Name"></v-text-field>
                        </v-layout>
                        <v-layout row>
                          <v-text-field v-model="editedProductTechnicalDoc.description" label="Description"></v-text-field>
                        </v-layout>
    
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" @click="closeProductTechnicalDocDialog">Cancel</v-btn>
                      <v-btn color="blue darken-1" @click="updateProductTechnicalDoc">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </v-window-item>
        <v-window-item value="quotationsTab">
          <v-card>
            <v-card-title>
              Supplier Prices
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="mdi-search" label="Search" single-line
                hide-details></v-text-field>
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

                          <v-select v-model="editedItem.supplierId" :items="suppliers" item-value="id" item-title="name"
                            label="Select Supplier">
                          </v-select>

                        </v-layout>

                        <v-layout row>

                          <v-text-field v-model="editedItem.cost" label="Cost"></v-text-field>

                        </v-layout>

                        <v-layout row>

                          <v-text-field v-model="editedItem.leadInTimeInDays" label="Lead in Time(Days)"></v-text-field>

                        </v-layout>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" @click.="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" @click.="updateSupplierProduct">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>

              <v-dialog v-model="projectDialog">

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ projectFormTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>

                      <v-layout wrap v-if="projects">

                        <v-select :items="projects" v-model="boqItem.projectId" item-value="id" item-title="name"
                          label="Select Project" aria-required="true">
                        </v-select>

                      </v-layout>
                      <v-layout wrap>

                        <v-select v-model="boqItem.categoryId" :items="boQItemCategories" item-value="id"
                          item-title="name" label="Select Category" aria-required="true">
                        </v-select>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.materialCosts" label="Product Costs"></v-text-field>

                      </v-layout>


                      <v-layout row>

                        <v-text-field v-model="boqItem.materialMargin" label="Product Margin"></v-text-field>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.labourCosts" label="Labour Cost"></v-text-field>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.measuredQuantity" label="Quantity"></v-text-field>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.name" label="Name"></v-text-field>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.description" label="Description"></v-text-field>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.unit" label="Units of Measurement"></v-text-field>

                      </v-layout>

                      <v-layout row>

                        <v-text-field v-model="boqItem.contractRate" label="Contract Rate"></v-text-field>

                      </v-layout>


                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeProjectDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click="addProductToProject">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-data-table :headers="quotationTableHeaders" :items="quotations" :search="search">
              <template v-slot:[`item.actionAddSupplierProductToProject`]="{ item }">
                <v-btn icon @click="addSupplierProduct(item)">
                  <v-icon icon="mdi-file-edit-outline"></v-icon>
                </v-btn>
              </template>
              <template v-slot:[`item.actionEditSupplierProduct`]="{ item }">
                <v-btn icon @click="editSupplierProduct(item)">
                  <v-icon>
                    cloud_download
                  </v-icon>
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
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();

    const route = useRoute();

    const id = route.params.id;

    onMounted(() => {
      console.log('dispactching actions..')
      store.dispatch('suppliers/loadSuppliers');
      store.dispatch('projects/loadProjects')
      store.dispatch('projects/loadBoQItemCategories', id)
      store.dispatch('products/loadProduct', id);
      store.dispatch('products/loadProductTechnicalDocs', id);
      store.dispatch('products/loadProductQuotations', id);
      store.dispatch('products/loadProductOrders', id);
    });


    const search = ref('');
    const dialog = ref(false);
    const techDialog = ref(false);
    const productTechnicalDocDialog =  ref(false);
    const techFiles = ref(null);
    const formHasErrors = ref(false);
    const editedIndex = ref(-1);
    const outerTab = ref(null);
    const date = new Date().toISOString().substr(0, 10);
    const snack = ref(false);
    const snackColor = ref('');
    const snackText = ref('');
  

    const defaultProduct = reactive({
      productCategoryId: '',
      productCategoryName: '',
      productId: id,
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: ''
    });
    const editedProduct = reactive({
      productCategoryId: '',
      productCategoryName: '',
      productId: id,
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: ''
    });

    const defaultItem = reactive({
      productCategoryId: '',
      productCategoryName: '',
      productId: id,
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: '',
      supplierId: '',
      cost: 0.0,
      leadInTimeInDays: 5,

    });
    const editedItem = reactive({
      productCategoryId: '',
      productCategoryName: '',
      productId: id,
      name: '',
      description: '',
      manufacturer: '',
      productCode: '',
      standard: '',
      imageUrl: '',
      units: '',
      supplierId: '',
      cost: 0.0,
      leadInTimeInDays: 5,

    });

    const defaultProductTechnicalDoc = reactive({
      id: '',
      title: '',
      description: '',
    });

    const editedProductTechnicalDoc = reactive({
      id: '',
      title: '',
      description: '',
    });

    const productTechnicalDocTableHeaders = [
   
      { title: 'Name', key: 'title' },
      { title: 'Description', key: 'description' },
      { title: 'Download', key: 'actionDownload' },
      { title: 'Edit', key: 'actionEditTechnicalDoc' },
    ];
    const quotationTableHeaders = [
      {
        title: 'Supplier',
        align: 'left',
        sortable: true,
        key: 'supplierName'
      },
      { title: 'Cost', key: 'cost' },
      { title: 'Lead In (Days)', key: 'leadInTimeInDays' },
      { title: 'Add', key: 'actionAddSupplierProductToProject' },
      { title: 'Edit', align: 'left', key: 'actionEditSupplierProduct' },
    ];
    const orderTableHeaders = [
      {
        title: 'Project',
        align: 'left',
        sortable: true,
        key: 'projectName'
      },
      {
        title: 'Supplier',
        align: 'left',
        sortable: true,
        key: 'supplierName'
      },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit Cost', key: 'unitCost' },
      { title: 'Total Cost', key: 'totalCost' },
      { title: 'Delivery Date', key: 'deliveryDate' },
      { title: 'Status', key: 'status' },
    ];

    const projects = computed(() => store.getters['projects/loadedProjects']);
    const boQItemCategories = computed(() => { return store.getters['projects/loadedBoQItemCategories'] });
    const productCategories = computed(() => store.getters['products/loadedProductCategories']);
    const products = computed(() => store.getters['products/loadedProducts']);
    const suppliers = computed(() => { return store.getters['suppliers/loadedSuppliers'] });
    const product = computed(() => store.getters['products/loadedProduct']);
    const productTechnicalDocs = computed(() => store.getters['products/loadedProductTechnicalDocs']);
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



    const uploadProductTechnicalDocs = (() => {
      const formData = {
        productId: id,
        techFiles: techFiles.value
      }
      console.log('Uploading technical docs..')
      console.log(formData)
      store.dispatch('products/uploadProductTechnicalDocuments', formData);
      closeTechDialog();
    });

    const editProduct = ((item) => {
      console.log('Edit item..' + item)
      console.log(item)
      editedIndex.value = products.value.findIndex(u => u.id == item)
      const obj = products.value.find(u => u.id == item)
      Object.assign(editedProduct, obj)
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

    const updateSupplierProduct = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating Product')
        console.log(editedItem)
        store.dispatch('suppliers/createSupplierProductQuote', editedItem)
      } else {
        console.log('Updating Product')
        console.log(editedItem)
        store.dispatch('suppliers/updateSupplierProduct', editedItem)
      }
      close()
    });

    const editSupplierProduct = ((item) => {
      console.log('Showing Edit Product Dialog  ' + item.value)
      editedIndex.value = quotations.value.findIndex(s => s.id == item.value)
      const obj = quotations.value.find(i => i.id == item.value)
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const editProductTechnicalDoc = ((item) => {
      console.log('Showing Edit Product Technical Doc Dialog  ' + item.value);
      const obj = productTechnicalDocs.value.find(i => i.id == item.value);
      Object.assign(editedProductTechnicalDoc, obj);
      productTechnicalDocDialog.value = true;
    });

    const updateProductTechnicalDoc = ( () => {
      console.log(editedProductTechnicalDoc);
      store.dispatch('products/updateProductTechnicalDocument', editedProductTechnicalDoc);
      closeProductTechnicalDocDialog();
    });

    const closeProductTechnicalDocDialog = ( () => {
      productTechnicalDocDialog.value = false;
      setTimeout(() => {
        Object.assign(editedProductTechnicalDoc, defaultProductTechnicalDoc)
      }, 300)
    });

    const downloadProductTechnicalDocument = ((item) => {
      console.log('Downloading item..' + item.value)
      console.log(item)
      const formData = {
        productId: id,
        fileName: item.title,
        id: item.value,
      }
      console.log(formData)
      store.dispatch('products/downloadProductTechnicalDocument', formData)
    });

    const deleteProduct = ((productId) => {
      console.log('Delete Product..')
      console.log(productId)
      store.dispatch('products/deleteProduct', productId)
    });

    const projectDialog = ref(false);

    const projectFormTitle = 'Add Product to Project Form';

    const boqItem = reactive({
      id: '',
      clientId: localStorage.clientId,
      projectId: '',
      categoryId: '',
      name: '',
      description: '',
      supplierId: id,
      productId: '',
      productQuotationId: '',
      materialCosts: 0,
      materialMargin: 0.2,
      labourCosts: 0,
      labourMargin: 0.1,
      unit: '',
      contractRate: 0.0,
    });

    const addSupplierProduct = ((item) => {
      console.log('Showing Add Product to Project Dialog  Form' + item.value)
      const obj = quotations.value.find(i => i.id == item.value)
      boqItem.name = "Supply & Fit " + obj.productName
      boqItem.productId = obj.productId;
      boqItem.productQuotationId = obj.id;
      boqItem.description = obj.productDescription;
      boqItem.unit = obj.units;
      boqItem.materialCosts = obj.cost;

      projectDialog.value = true
    });

    const addProductToProject = (() => {


      boqItem.quantity = boqItem.measuredQuantity


      console.log('creating project boqItem')
      console.log(boqItem)
      store.dispatch('projects/createProjectBoQItem', boqItem)

      closeProjectDialog()
    });

    const closeProjectDialog = (() => {
      projectDialog.value = false
      setTimeout(() => {
        Object.assign(editedItem, defaultItem)
        editedIndex.value = -1
      }, 300)
    });

    const closeTechDialog = (() => {
      techDialog.value = false
      setTimeout(() => {
        Object.assign(editedItem, defaultItem)
        editedIndex.value = -1
      }, 300)
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

    watch(product, (newValue, oldValue) => {
      console.log('computedProperty was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
      console.log('setting edited customer..')
      const rawObject = JSON.parse(JSON.stringify(newValue))
      Object.assign(editedProduct, rawObject);
      console.log(editedProduct)
    })

    return {
      editedProduct,
      defaultProduct,
      productTechnicalDocs,
      productTechnicalDocTableHeaders,
      defaultProductTechnicalDoc,
      editedProductTechnicalDoc,
      productTechnicalDocDialog,
      editProductTechnicalDoc,
      updateProductTechnicalDoc,
      closeProductTechnicalDocDialog,
      techDialog,
      techFiles,
      uploadProductTechnicalDocs,
      closeTechDialog,
      projects,
      boqItem,
      boQItemCategories,
      projectDialog,
      projectFormTitle,
      addSupplierProduct,
      addProductToProject,
      closeProjectDialog,
      productCategories,
      products,
      suppliers,
      product,
      
      quotations,
      updateSupplierProduct,
      quotationTableHeaders,
      editSupplierProduct,
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
      onDismissed
    }
  }
}
</script>
<style scoped>
.hidden {
  display: none;
}
</style>
