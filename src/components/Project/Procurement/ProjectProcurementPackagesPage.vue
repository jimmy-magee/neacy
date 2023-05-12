<template>
    <v-card>
        <v-card-text>
            <h2>Procurement Packages </h2>
            <br>
            <v-layout row>

                <div v-if="projectProcurementPackageSummary">Total Contract Value
                    {{ projectProcurementPackageSummary.totalContractValue }}</div>


                <div v-if="projectProcurementPackageSummary">Total SuContract Value
                    {{ projectProcurementPackageSummary.totalSubContractValue }}</div>


                <div v-if="projectProcurementPackageSummary">Difference
                    {{ projectProcurementPackageSummary.margin }} (Euro)</div>

            </v-layout>

            <br>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
        
            <v-data-table :headers="projectProcurementPackagesTableHeaders" :calculate-widths="true"
                :items="projectProcurementPackages" :search="search">

                <template v-slot:[`item.actionEditProjectProcurementPackage`]="{ item }">
                    <v-btn icon @click="editProjectProcurementPackage(item)">
                        <v-icon>
                            edit
                        </v-icon>
                    </v-btn>
                </template>

                <template v-slot:[`item.actionDeleteProjectProcurementPackage`]="{ item }">
                    <v-btn icon @click="deleteProjectProcurementPackage(item)">
                        <v-icon>
                            delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router';

export default {


    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const projectId = route.params.projectId;

      

        onMounted(() => {
     
            store.dispatch('projects/loadProjectProcurementPackages', projectId);

        });

        const search = ref('');

        const projectProcurementPackagesTableHeaders = [
            { title: 'Status', key: 'status' },
            { title: 'Name', key: 'name' },
            { title: 'Contract Value', key: 'totalContractValue' },
            { title: 'SubContract Value', key: 'totalSubContractValue' },
            { title: 'Margin', key: 'margin' },
            { title: 'AnticipatedStartDate', key: 'anticipatedStartDate' },
            { title: 'AnticipatedCompletionDate', key: 'anticipatedCompletionDate', align: ' d-none' },
            { title: 'ActualStartDate', key: 'actualStartDate', align: ' d-none' },
            { title: 'ActualCompletionDate', key: 'actualCompletionDate', align: ' d-none' },
            { title: 'Edit', align: 'left', key: 'actionEditProjectProcurementPackage' },
            { title: 'Delete', align: 'left', key: 'actionDeleteProjectProcurementPackage' }
        ];


        const projectProcurementPackageSummary = computed(() => {
            return store.getters['projects/loadedProjectProcurementPackageSummary']
        });

        const projectProcurementPackages = computed(() => {
            return store.getters['projects/loadedProjectProcurementPackages']
        });

        const editProjectProcurementPackage = ((item) => {
            router.push('/projects/' + projectId + '/procurement/' + item.value)
        })

        return {
            projectProcurementPackageSummary,
            projectProcurementPackages,
            projectProcurementPackagesTableHeaders,
            search,
            editProjectProcurementPackage,

        }
    }
}

</script>