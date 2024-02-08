<script setup>
import { computed, ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

import { useStore } from "vuex";

const store = useStore();
//const customers1 = ref([{ "id": "63853e8e5b7fa55148e2b806", "clientId": null, "rating": null, "name": "Ganson", "description": "General Building", "address": "Balbriggan", "contactName": "David Rogers", "contactNumber": "087 1053325", "contactEmail": null, "headOfficeTelephoneNumber": "01 22222222", "website": "http://ganson.ie", "companyRegistrationNumber": "123", "vatNumber": "456", "billingName": null, "billingAddress": null, "billingEmail": null }, {"id": "123", "name": "abc name", "address": "address 123"}]);

onMounted(() => {
  store.dispatch("customers/loadCustomers");
  store.dispatch("products/loadProducts");
});

const customers = computed(() => store.getters["customers/loadedCustomers"]);

const selectedCustomers = ref();

const filters = ref();

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    address: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  };
};

const clearFilter = () => {
  initFilters();
};
initFilters();

const rowStyle = () => { return 'height: 5px' }

const editingRows = ref([]);

const onRowEditSave = (event) => {
  let { newData, index } = event;
  console.log("Saving " + index + " new data is ");
  console.log(newData);
  store.dispatch("customers/updateCustomer", newData);
  //customers.value[index] = newData;
};
</script>

<template>
  <div>customers : {{ selectedCustomers }}</div>

  <div>
    <DataTable
      :value="customers"
      v-model:selection="selectedCustomers"
      v-model:filters="filters"
      paginator
      showGridlines
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      :globalFilterFields="['name', 'address']"
      stripedRows
      :rowsPerPageOptions="[5, 10, 25]"
      v-model:editingRows="editingRows"
      editMode="row"
      :rowStyle="rowStyle"
      @row-edit-save="onRowEditSave"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            class: [{ 'pt-0 pb-0': state['d_editing'] }],
          }),
        },
      }"
    >
      <template #header>
        <div class="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="name" header="Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            style="width: 100%"
            placeholder="Search by name"
          />
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column field="address" header="Address">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            style="width: 100%"
            placeholder="Search by address"
          />
        </template>
      </Column>

      <template #footer>
        In total there are {{ customers ? customers.length : 0 }} customers.
      </template>
      <Column
        :rowEditor="true"
        header="InLine"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>
</template>

<style>
#yourCustomSelector {
    height : 5px;
}
.p-datatable-table {
    height: 5px;
}
</style>
