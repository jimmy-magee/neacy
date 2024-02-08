<script setup>

</script>
<template>

    <TabView>
        <TabPanel header="Products">
            <ProductsTable />
        </TabPanel>
        <TabPanel>
            <template #header>
                <i class="pi pi-calendar mr-2"></i>
                <span>Customers</span>
            </template>
          
            <CustomersTable />
        </TabPanel>
    </TabView>
</template>

<style lang="scss" scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
}
</style>
