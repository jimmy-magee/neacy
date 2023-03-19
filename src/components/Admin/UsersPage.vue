

<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Users
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="green">
          <v-icon icon="mdi-plus"></v-icon>
          <v-dialog v-model="dialog" activator="parent">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              editedItem:  {{ editedItem }}
              <v-card-text>
                <v-container>

                  <v-layout row>

                    <v-text-field v-model="editedItem.username" label="Email/Username" :disabled="true"></v-text-field>

                  </v-layout>

                  <v-layout row>

                    <v-select :items="clients" v-model="editedItem.clientId" label="Client" item-value="id"
                      item-text="name"></v-select>


                  </v-layout>

                  <v-layout row>

                    <v-select :items="userRoles" v-model="editedItem.roles" label="Roles" multiple></v-select>

                  </v-layout>

                  <v-layout row v-if="editedItem.roles.includes('ROLE_SUBCONTRACTOR')">

                    <v-select :items="subContractors" v-model="editedItem.companyId" item-value="id" item-text="name"
                      label="Company"></v-select>

                  </v-layout>

                  <v-layout row v-if="editedItem.roles.includes('ROLE_SUPPLIER')">

                    <v-select :items="suppliers" v-model="editedItem.companyId" item-value="id" item-text="name"
                      label="Company"></v-select>

                  </v-layout>

                  <v-layout row
                    v-if="!editedItem.roles.includes('ROLE_SUBCONTRACTOR') && !editedItem.roles.includes('ROLE_SUPPLIER')">

                    <v-select :items="clients" v-model="editedItem.companyId" item-value="id" item-text="name"
                      label="Company"></v-select>

                  </v-layout>

                  <v-layout row>
                    <v-switch v-model="editedItem.enabled" :label="`Enabled`"></v-switch>

                  </v-layout>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="updateUser">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="userTableHeaders" :items="users" :search="search">
        <template v-slot:[`item.blocked`]="{ item }">
          <v-chip color="primary" dark>{{ item.blocked }}</v-chip>
        </template>
        <template v-slot:[`item.admin`]="{ item }">
          <v-chip color="primary" dark>{{ item.admin }}</v-chip>
        </template>
        <template v-slot:[`item.goodUser`]="{ item }">
          <v-chip color="primary" dark>{{ item.goodUser }}</v-chip>
        </template>
        <template v-slot:[`item.goodAdmin`]="{ item }">
          <v-chip color="primary" dark>{{ item.goodAdmin }}</v-chip>
        </template>
        <template v-slot:[`item.unverified`]="{ item }">
          <v-chip color="primary" dark>{{ item.unverified }}</v-chip>
        </template>
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-btn icon="mdi-file-edit-outline" @click="editUser(item.value.username)"></v-btn>
        </template>
        <template v-slot:[`item.actionDelete`]="{ item }">
          <v-btn icon="mdi-delete-alert" @click="deleteUser(item.value.username)"></v-btn>
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
      store.dispatch('users/loadUsers')
      store.dispatch('users/loadUserRoles')
      store.dispatch('clients/loadClients')
      store.dispatch('subcontractors/loadSubContractors')
      store.dispatch('suppliers/loadSuppliers')
    });

    const userTableHeaders = [
      {
        title: 'userame',
        align: 'left',
        sortable: true,
        key: 'username'
      },
      { title: 'Roles', key: 'roles' },
      { title: 'Client', key: 'clientName' },
      { title: 'Company', key: 'companyName' },
      { title: 'Enabled', key: 'enabled' },
      { title: 'Edit', align: 'left', key: 'actionEdit' },
      { title: 'Delete', align: 'left', key: 'actionDelete' }
    ];

    const search = ref('');
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = reactive({
      username: '',
      clientId: '',
      companyId: '',
      roles: [],
      enabled: false,
    });
    const defaultItem = reactive({
      username: '',
      clientId: '',
      companyId: '',
      roles: [],
      enabled: false,
    })

    const users = computed(() => store.getters['users/loadedUsers']);
    const userRoles = computed(() => store.getters['users/loadedUserRoles']);
    const clients = computed(() => store.getters['clients/loadedClients']);
    const subContractors = computed(() => store.getters['subcontractors/loadedSubContractors']);
    const suppliers = computed(() => store.getters['suppliers/loadedSuppliers']);
    const formTitle = computed(() => editedIndex.value === -1 ? 'New User' : 'Edit User');
    const loading = computed(() => store.getters['loading', { root: true }]);
    const error = computed(() => store.getters['error', { root: true }]);
    const userIsAuthenticatedAndHasRoleAdmin = computed(() => store.getters['users/userIsAuthenticatedAndHasRoleAdmin']);

    const editUser = ((item) => {
      console.log('Edit item..' + item)
      console.log(item)
      editedIndex.value = users.value.findIndex(u => u.username == item)
      const obj = users.value.find(u => u.username == item)
      Object.assign(editedItem, obj)
      dialog.value = true
    });

    const updateUser = (() => {
      if (editedIndex.value === -1) {
        console.log('Creating User')
        console.log(editedItem)
        store.dispatch('users/createUser', editedItem)
      } else {
        console.log('Updating user')
        console.log(editedItem)
        store.dispatch('users/updateUser', editedItem)
      }
      close()
    });
    const deleteUser = ((username) => {
      console.log('Delete user..')
      console.log(username)
      store.dispatch('users/deleteUser', username)
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
      users,
      userRoles,
      clients,
      subContractors,
      suppliers,
      userTableHeaders,
      search,
      dialog,
      editedIndex,
      editedItem,
      defaultItem,
      formTitle,
      loading,
      error,
      userIsAuthenticatedAndHasRoleAdmin,
      editUser,
      updateUser,
      deleteUser,
      close,
      onDismissed
    }
  }
}
</script>
