<template>
    <v-card>
        <v-card-title>
            <v-spacer></v-spacer>

            <!--  <v-btn icon color="green">
                <v-icon icon="mdi-plus"></v-icon>
               <v-dialog v-model="projectProcurementPackageDialog" activator="parent"> -->

            <v-card>
                <v-card-title>
                    <span>{{ projectProcurementPackageFormTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>

                        <v-layout row>

                            <v-select :items="procurementStatusTypes" v-model="editedProjectProcurementPackage.status"
                                label="Status"></v-select>

                        </v-layout>
                        <v-layout row>

                            <v-text-field v-model="editedProjectProcurementPackage.name" label="Name">
                            </v-text-field>

                        </v-layout>
                        <v-layout row>

                            <v-textarea name="description" label="Description" id="description"
                                v-model="editedProjectProcurementPackage.description" required>
                            </v-textarea>

                        </v-layout>
                        <v-layout row>



                            <v-dialog ref="dialog1" v-model="modal1" persistent width="50%" activator="parent">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.anticipatedStartDate"
                                        label="Anticipated Start Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectProcurementPackage.anticipatedStartDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>



                            <v-dialog ref="dialog2" v-model="modal2" persistent width="50%">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.anticipatedCompletionDate"
                                        label="Anticipated Completion Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectProcurementPackage.anticipatedCompletionDate"
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog2.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>

                        </v-layout>
                        <v-layout row>


                            <v-dialog ref="dialog3" v-model="modal3" persistent width="50%" activator="parent">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.actualStartDate"
                                        label="Actual Start Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectProcurementPackage.actualStartDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog3.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>



                            <v-dialog ref="dialog4" v-model="modal4" persistent width="50%">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.actualCompletionDate"
                                        label="Actual Completion Date" prepend-icon="event" readonly v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectProcurementPackage.actualCompletionDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog4.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>

                        </v-layout>

                        <v-layout row>

                            <v-dialog ref="dialog5" v-model="modal5" persistent width="50%" activator="parent">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editedProjectProcurementPackage.closeingDateForTenderReturn"
                                        label="Closing Date for Receipt of Tender" prepend-icon="event" readonly
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="editedProjectProcurementPackage.closeingDateForTenderReturn"
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal5 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog5.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>

                        </v-layout>

                        <v-layout row>

                            <v-card>
                                <v-card-title>
                                    <v-btn absolute right fab dark color="indigo" v-on="on">
                                        <v-dialog v-model="projectProcurementSubContractorDialog" activator="parent">
                                            <template v-slot:activator="{ on }">
                                                <v-btn absolute right fab dark color="indigo" v-on="on">
                                                    <v-icon dark>add</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">Add SubContractor</span>
                                                    <v-spacer></v-spacer>
                                                    <v-text-field v-model="searchSubContractors" append-icon="search"
                                                        label="Search" single-line hide-details></v-text-field>
                                                    <v-spacer></v-spacer>
                                                </v-card-title>
                                                <v-card-text>

                                                    <v-data-table :headers="subContractorTableHeaders"
                                                        :calculate-widths="true" :items="subContractors" :show-select=true
                                                        item-key="id" v-model="selectedSubContractorIds"
                                                        :search="searchSubContractors">

                                                    </v-data-table>


                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1"
                                                        @click="projectProcurementSubContractorDialog = false">Add
                                                    </v-btn>

                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-btn>
                                    SubContract Tender List

                                    <v-layout>

                                        <v-select v-model="selectedSubContractorIds" :items="subContractors" item-value="id"
                                            item-title="name" label="Select SubContractor Tender List" />


                                        <v-btn text color="primary" v-if='selectedSubContractorIds.length > 0'
                                            @click="createProjectSubContractorProcurementPackage">
                                            Create SubContractor Package</v-btn>

                                    </v-layout>


                                </v-card-title>
                                <v-card-text>

                                    <v-data-table :headers="projectSubContractorProcurementPackagesTableHeaders"
                                        :calculate-widths="true"
                                        :items="projectSubContractorProcurementPackages"
                                        :search="search">
                                        <template
                                            v-slot:[`item.actionViewSubContractorProcurementPackageBillItems`]="{ item }">
                                            <v-btn icon @click="viewSubContractorProcurementPackageBillItems(item)">
                                                <v-icon>
                                                    edit
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <template v-slot:[`item.actionDeleteSubContractorProcurementPackage`]="{ item }">
                                            <v-btn icon @click="deleteProjectSubContractorProcurementPackage(item)">
                                                <v-icon>
                                                    delete
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>

                        </v-layout>

                    

                        <v-layout row>

                            <v-card>
                                <v-card-title>
                                    SubContract Bill Items
                                    <v-spacer>
                                    </v-spacer>
                                    <v-btn>
                                        <v-dialog v-model="projectProcurementPackageBoQItemsDialog" activator="parent">
                                            <template v-slot:activator="{ on }">
                                                <v-btn absolute right fab dark color="indigo" v-on="on">
                                                    <v-icon dark>add</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">Add Bill Item</span>
                                                    <v-spacer></v-spacer>
                                                    <v-text-field v-model="searchBoQ" append-icon="search" label="Search"
                                                        single-line hide-details></v-text-field>
                                                    <v-spacer></v-spacer>
                                                </v-card-title>
                                                <v-card-text>

                                                    <v-data-table :headers="boqTableHeaders" :calculate-widths="true"
                                                        :items="boq" :show-select=true item-key="id" multiple
                                                        v-model="selectedBillItems" :search="searchBoQ">

                                                    </v-data-table>

                                                    <!--
                                                    <v-data-table :headers="boqTableHeaders" :items="boq" item-key="id"
                                                        v-model="selectedBillItems" :show-select=true :return-object=true>
                                                       
                                                        <template v-slot:item="{ item, isSelected, select }">
                                                            <tr :class="isSelected ? 'cyan' : ''"
                                                                @click="toggle(isSelected, select, $event)">
                                                                <td class="d-flex align-center">{{ item.value.name }}
                                                                    <v-icon class="px-1" color="black"
                                                                        v-if="isSelected">mdi-check</v-icon>
                                                                </td>
                                                        
                                                                <td>{{ item.value.ref }}</td>
                                                                <td>{{ item.value.category }}</td>
                                                                <td>{{ item.value.name }}</td>
                                                                <td>{{ item.value.quantity }}</td>
                                                                <td>{{ item.value.unit }}</td>
                                                                <td>{{ item.value.contractRate }}</td>
                                                                <td> {{ item.value.name }}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>Edit</td>
                                                                <td>Delete</td>
                                                            </tr>
                                                        </template>
                                                    </v-data-table>
-->
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" @click="addSelectedBoQItems">Add
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-data-table :headers="projectProcurementSubContractBoQItemsTableHeaders"
                                        :calculate-widths="true" :items="editedProjectProcurementPackage.billItems"
                                        :search="search">
                                    </v-data-table>
                                </v-card-text>
                            </v-card>

                        </v-layout>

                        <br>

                        <v-layout row>

                            <v-card>
                                <v-card-title>
                                    SubContract Drawings
                                    <v-spacer>
                                    </v-spacer>
                                    <v-btn absolute right fab dark color="indigo" v-on="on">

                                        <v-dialog v-model="projectProcurementPackageDrawingsDialog" activator="parent">

                                            <v-card>
                                                <v-card-title>
                                                    <span class="Subtitle 2">Select Tender Drawings</span>
                                                    <v-spacer></v-spacer>
                                                    <v-text-field v-model="searchProjectDrawings" append-icon="search"
                                                        label="Search" single-line hide-details></v-text-field>
                                                    <v-spacer></v-spacer>
                                                </v-card-title>
                                                <v-card-text>

                                                    <v-data-table :headers="drawingTableHeaders" :calculate-widths="true"
                                                        :items="drawings" :show-select="true" item-key="id"
                                                        v-model="selectedSubContractDrawings"
                                                        :search="searchProjectDrawings">
                                                    </v-data-table>

                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" @click="addSelectedDrawings">Close
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-btn>

                                </v-card-title>
                                <v-card-text>
                                    <v-data-table :headers="projectProcurementSubContractDrawingsTableHeaders"
                                        :calculate-widths="true" :items="editedProjectProcurementPackage.drawings">
                                    </v-data-table>
                                </v-card-text>
                            </v-card>

                        </v-layout>

                        <br>

                        <v-layout row>

                            <v-card>
                                <v-card-title>
                                    SubContract Images
                                    <v-spacer>
                                    </v-spacer>
                                    <v-btn absolute right fab dark color="indigo" v-on="on">
                                        <v-dialog v-model="projectProcurementPackageImagesDialog" activator="parent">

                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">Add Image</span>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-container>

                                                        <v-data-table :headers="imageMetadataTableHeaders"
                                                            :calculate-widths="true" :items="projectImageMetadata"
                                                            :search="search" show-select item-key="id"
                                                            v-model="selectedSubContractImages">
                                                        </v-data-table>
                                                        images :: {{ selectedSubContractImages }}
                                                    </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" @click="addSelectedImages">Add
                                                    </v-btn>

                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-btn>
                                </v-card-title>
                                <v-data-table :headers="imageMetadataTableHeaders" :calculate-widths="true"
                                    :items="editedProjectProcurementPackage.images" :search="search">
                                </v-data-table>


                            </v-card>

                        </v-layout>


                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeProjectProcurementPackageDialog">Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" @click="saveProjectProcurementPackage">Update</v-btn>
                </v-card-actions>
            </v-card>
            <!--  </v-dialog> 
            </v-btn> -->
        </v-card-title>


    </v-card>
</template>
<script>
import { computed, onMounted, reactive, ref, watch, toRaw } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router';

export default {


    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const projectId = route.params.projectId;

        const id = route.params.id;

        const formData = {
            projectId: projectId,
            id: id
        }

        onMounted(() => {

            store.dispatch('projects/loadProjectProcurementPackageById', formData);
            store.dispatch('projects/loadProject', projectId);
            store.dispatch('projects/loadProjectProcurementPackages', projectId);
            store.dispatch('subcontractors/loadSubContractors');
            store.dispatch('projects/loadProjectBoQItems', projectId);
            store.dispatch('projects/loadProjectImageMetadata', projectId);
            store.dispatch('projects/loadProjectDrawingMetadata', projectId);
            store.dispatch('projects/loadProjectSubContractorProcurementPackages', formData);

        });

        const projectProcurementPackageDialog = ref(false);
        const editedProjectProcurementPackageIndex = ref(-1);
        const editedProjectProcurementPackage = reactive({
            id: '',
            projectId: id,
            packageId: '',
            name: '',
            description: '',
            anticipatedStartDate: null,
            anticipatedCompletionDate: null,
            actualStartDate: null,
            actualCompleteionDate: null,
            closeingDateForTenderReturn: null,
            billItems: [],
            drawings: [],
            images: [],
            subContractorProcurementPackages: [],
            status: '',
            imageMetadata: null
        });
        const defaultProjectProcurementPackage = reactive({
            projectId: id,
            packageId: '',
            name: '',
            description: '',
            anticipatedStartDate: null,
            anticipatedCompletionDate: null,
            actualStartDate: null,
            actualCompletionDate: null,
            closeingDateForTenderReturn: null,
            billItems: [],
            drawings: [],
            images: [],
            subContractorProcurementPackages: [],
            status: '',
            imageMetadata: null
        });
        const procurementStatusTypes = [
            'TO TENDER',
            'OUT TO TENDER',
            'QUOTATIONS RECEIVED',
            'CONTRACT AWARDED',
            'CONTRACT COMPLETED'
        ];
        const search = ref('');
        const searchBoQ = ref('');
        const dialog5 = ref(false);
        const modal5 = ref(false);
        const dialog4 = ref(false);
        const modal4 = ref(false);
        const dialog3 = ref(false);
        const modal3 = ref(false);
        const dialog2 = ref(false);
        const modal2 = ref(false);
        const dialog1 = ref(false);
        const modal1 = ref(false);

        const projectProcurementSubContractorDialog = ref(false);
        const searchSubContractors = ref('');
        const searchDrawings = ref('');

        const projectProcurementPackageBoQItemsDialog = ref(false);

        const projectProcurementPackageDrawingsDialog = ref(false);

        const projectProcurementPackageImagesDialog = ref(false);

        const selectedSubContractorIds = ref([]);

        const subContractorTableHeaders = [
            { title: 'Category', key: 'subContractorCategoryName' },
            { title: 'Name', key: 'name' },
            { title: 'Description', key: 'description' },
            { title: 'Contact Name', key: 'contactName' },
            { title: 'Number', key: 'headOfficeTelephoneNumber' },
            { title: 'Email', key: 'email' },
            { title: 'Edit', align: 'left', key: 'actionEditSubContractor' },
            { title: 'View', align: 'left', key: 'actionShowSubContractorDetails' }
        ];

        const projectSubContractorProcurementPackagesTableHeaders = [
            { title: 'Company', key: 'subContractorName' },
            { title: 'Address', key: 'subContractorAddress' },
            { title: 'DateIssued', key: 'dateIssued' },
            { title: 'SubContract Value', key: 'subContractTotalValue' },
            { title: 'Comments', key: 'comments' },
            { title: 'View', align: 'left', key: 'actionViewSubContractorProcurementPackageBillItems' },
            { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorProcurementPackage' }
        ];

        const selectedBillItems = ref([]);
        const selectedSubContractDrawings = ref([]);
        const selectedSubContractImages = ref([]);
        const selectedSubContractors = ref([]);

        const boqTableHeaders = [
            { title: 'Ref', key: 'ref' },
            {
                title: 'Category',
                align: 'left',
                sortable: true,
                key: 'categoryName'
            },
            { title: 'Name', key: 'name' },
            { title: 'Qty (Contract)', key: 'quantity' },
            { title: 'Unit', key: 'unit' },
            { title: 'Material', key: 'materialCost' },
            { title: 'Labour', key: 'labourCost' },
            { title: 'Rate', key: 'contractRate' },
            { title: 'Total Contracted', key: 'total', sortable: true },
            { title: 'Edit', align: 'left', key: 'actionEditBoQItem' },
            { title: 'Delete', align: 'left', key: 'actionDeleteBoQItem' }
        ];

        const drawingTableHeaders = [
            { title: 'Category', key: 'categoryName' },
            { title: 'Title', key: 'title' },
            { title: 'Description', key: 'description' },
            { title: 'Status', key: 'status' },
            { title: 'Revision', key: 'revision' },
            { title: 'Dowload', align: 'left', key: 'actionDownload' },
            { title: 'Edit', align: 'left', key: 'actionEdit' },
            { title: 'Delete', align: 'left', key: 'actionDelete' }
        ];

        const projectProcurementSubContractBoQItemsTableHeaders = [
            { title: 'Ref', key: 'ref' },
            {
                title: 'Section',
                align: 'left',
                sortable: true,
                key: 'category'
            },
            { title: 'Name', key: 'name' },
            { title: 'Description', key: 'description', width: '200px' },
            { title: 'Quantity', key: 'quantity' },
            { title: 'Unit', key: 'unit' },
            { title: 'Contract Rate', key: 'contractRate' },
            { title: 'SubContract Rate', key: 'subContractRate' },
            { title: 'Total', key: 'total' },
            // { title: 'Edit', align: 'left', key: 'actionEditBoQItem'}
        ];

        const projectProcurementSubContractDrawingsTableHeaders = [
            { id: 'id' },
            {
                title: 'Category',
                align: 'left',
                sortable: true,
                key: 'categoryName'
            },
            { title: 'Title', key: 'title' },
            { title: 'Description', key: 'description' },
            { title: 'Revision', key: 'revision' },
            { title: 'Status', key: 'status' },
        ];

        const imageMetadataTableHeaders = [
            { title: 'Title', key: 'title' },
            { title: 'Description', key: 'description' },
            { title: 'Location', key: 'location' },
            { title: 'Category', key: 'categoryId' },
            { title: 'Image', key: 'image' },
            { title: 'Edit', align: 'left', key: 'actionEditImageMetadata' },
            { title: 'Delete', align: 'left', key: 'actionDeleteImageMetadata' }
        ];

        const projectProcurementPackageFormTitle = computed(() => {
            return editedProjectProcurementPackageIndex.value === -1 ? 'New Project Procurement Package' : 'Edit Project Procurement Package'
        });

        const subContractors = computed(() => { return store.getters['subcontractors/loadedSubContractors'] });

        const drawings = computed(() => {
            return store.getters['projects/loadedProjectDrawings']
        });

        const projectImageMetadata = computed(() => {
            return store.getters['projects/loadedProjectImageMetadata']
        });

        const projectProcurementPackageSummary = computed(() => {
            return store.getters['projects/loadedProjectProcurementPackageSummary']
        });

        const projectProcurementPackages = computed(() => {
            return store.getters['projects/loadedProjectProcurementPackages']
        });

        const projectProcurementPackage = computed(() => {
            return store.getters['projects/loadedProjectProcurementPackage']
        });

        const subContractorProcurementPackageBillItems = computed(() => {
            return store.getters['projects/loadedSubContractorProcurementPackageBillItems']
        });

        const projectProcurementPackagesListSelection = computed(() => {
            return store.getters['projects/loadedProjectProcurementPackages'].map(function (item) {
                return { text: item.name, value: item.id }
            })
        });
        const boq = computed(() => {
            return store.getters['projects/loadedProjectBoQ']
        });

        const projectSubContractorProcurementPackages = computed(() => {
            return store.getters['projects/loadedProjectSubContractorProcurementPackages']
        });

        const addSelectedDrawings = (() => {
            projectProcurementPackageDrawingsDialog.value = false;

            const drawingIds = selectedSubContractDrawings.value;

            const selectedDrawings = Object.assign([], drawingIds.map(id => drawings.value.find(image => image.id == id)));

            editedProjectProcurementPackage.drawings = selectedDrawings;

            console.log(editedProjectProcurementPackage.drawings);
        });
        const addSelectedBoQItems = (() => {
            projectProcurementPackageBoQItemsDialog.value = false;

            const boqIds = selectedBillItems.value;

            const selectedBoQItems = Object.assign([], boqIds.map(id => boq.value.find(image => image.id == id)));

            editedProjectProcurementPackage.billItems = selectedBoQItems;

            console.log(editedProjectProcurementPackage.billItems);
        });
        const addSelectedImages = (() => {
            projectProcurementPackageImagesDialog.value = false;
            console.log('Adding selected images')
            console.log(toRaw(selectedSubContractImages.value))
            const imageIds = selectedSubContractImages.value;
            //const images =  Object.assign([], imageIds.map(id => toRaw(projectImageMetadata.value.find(image => image.id == id))));

            const images = Object.assign([], imageIds.map(id => projectImageMetadata.value.find(image => image.id == id)));

            editedProjectProcurementPackage.images = images;

            console.log(editedProjectProcurementPackage.images);
        });

        const viewSubContractorProcurementPackageBillItems = (()=> {
           console.log("Retrieve subcontractor tenders for package " + id)
        });

        const editProjectProcurementPackage = ((item) => {
            router.push('/projects/' + projectId + '/procurement/' + item.id)
            editedProjectProcurementPackageIndex.value = projectProcurementPackages.value.indexOf(item)
            Object.assign(editedProjectProcurementPackage, item)

            if (editedProjectProcurementPackage.anticipatedStartDate) {
                var anticipatedStartDate = new Date(editedProjectProcurementPackage.anticipatedStartDate).toISOString().substr(0, 10)
                editedProjectProcurementPackage.anticipatedStartDate = anticipatedStartDate
            }
            if (editedProjectProcurementPackage.anticipatedCompletionDate) {
                var anticipatedCompletionDate = new Date(editedProjectProcurementPackage.anticipatedCompletionDate).toISOString().substr(0, 10)
                editedProjectProcurementPackage.anticipatedCompletionDate = anticipatedCompletionDate
            }
            if (editedProjectProcurementPackage.actualStartDate) {
                var actualStartDate = new Date(editedProjectProcurementPackage.actualStartDate).toISOString().substr(0, 10)
                editedProjectProcurementPackage.actualStartDate = actualStartDate
            }
            if (editedProjectProcurementPackage.actualCompletionDate) {
                var actualCompletionDate = new Date(editedProjectProcurementPackage.actualCompletionDate).toISOString().substr(0, 10)
                editedProjectProcurementPackage.actualCompletionDate = actualCompletionDate
            }
            if (editedProjectProcurementPackage.closeingDateForTenderReturn) {
                var closeingDateForTenderReturn = new Date(editedProjectProcurementPackage.closeingDateForTenderReturn).toISOString().substr(0, 10)
                editedProjectProcurementPackage.closeingDateForTenderReturn = closeingDateForTenderReturn
            }

            const formData = {
                projectId: id,
                projectProcurementPackageId: item.id,

            }
            store.dispatch('loadProjectSubContractorProcurementPackages', formData)
            setTimeout(() => {
                projectProcurementPackageDialog.value = true
            }, 300)

        });
        const deleteProjectSubContractorProcurementPackage = ((item) => {
            console.log('Delete SubContractor Procurement Package ')
            console.log(item)
            store.dispatch('projects/deleteProjectSubContractorProcurementPackage', item)
        });

        const saveProjectProcurementPackage = (() => {

            const formData = {
                id: id,
                projectId: projectId,
                name: editedProjectProcurementPackage.name,
                description: editedProjectProcurementPackage.description,
                anticipatedStartDate: editedProjectProcurementPackage.anticipatedStartDate,
                anticipatedCompletionDate: editedProjectProcurementPackage.anticipatedCompletionDate,
                actualStartDate: editedProjectProcurementPackage.actualStartDate,
                actualCompletionDate: editedProjectProcurementPackage.actualCompletionDate,
                closeingDateForTenderReturn: editedProjectProcurementPackage.closeingDateForTenderReturn,
                status: editedProjectProcurementPackage.status,
                boQItemIds: selectedBillItems.value,
                drawingIds: selectedSubContractDrawings.value,
                imageIds: selectedSubContractImages.value
            }
            console.log('dispatching update project procurement package, form data is')
            console.log(formData)
            store.dispatch('projects/updateProjectProcurementPackage', formData)
            router.push('/projects/' + projectId + '/procurement')

        });
        const createProjectSubContractorProcurementPackage = (() => {

            selectedSubContractorIds.value.map(subId => {
                console.log('Creating subContractor project procurement package')

                console.log(subId)
                const formData = {
                    projectId: projectId,
                    subContractorId: subId,
                    projectProcurementPackageId: id,
                }
                store.dispatch('projects/createProjectSubContractorProcurementPackage', formData)
                console.log('Creating SubContractorProjectProcurementPackage')
                console.log(formData)

            });

        });


        const deleteProjectProcurementPackage = ((item) => {
            console.log('onDeleteDrawing Event Received..')
            console.log(item)
            // const index = projectProcurementPackages.indexOf(item)
            store.dispatch('projects/deleteProjectProcurementPackage', item.value)
            // confirm('Are you sure you want to delete drawing ' + $event.title + ' from the project register?') && drawings.splice(index, 1)
        });

        const toggle = ((isSelected, select, e) => {
            console.log(e)
            select(!isSelected)
        });

        watch(projectProcurementPackage, (newValue, oldValue) => {
            console.log('computedProperty [ projectProcurementPackage ]  was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
            Object.assign(editedProjectProcurementPackage, newValue);
            if (newValue.billItems) {
                const ids = newValue.billItems.map(b => b.id);
                selectedBillItems.value = ids;
            }
            if (newValue.drawings) {
                const ids = newValue.drawings.map(b => b.id);
                selectedSubContractDrawings.value = ids;
            }
            if (newValue.images) {
                const ids = newValue.images.filter(i => i != null).map(b => b.id);
                selectedSubContractImages.value = ids;
            }
        });


        return {
            id,
            projectId,
            projectProcurementPackage,
            projectProcurementPackageDialog,
            projectProcurementPackageFormTitle,
            procurementStatusTypes,
            search,
            modal1,
            dialog1,
            modal2,
            dialog2,
            modal3,
            dialog3,
            modal4,
            dialog4,
            modal5,
            dialog5,
            subContractorTableHeaders,
            subContractors,
            selectedSubContractorIds,
            searchSubContractors,
            projectProcurementSubContractorDialog,
            projectProcurementPackageBoQItemsDialog,
            projectProcurementPackageDrawingsDialog,
            drawingTableHeaders,
            drawings,
            searchDrawings,
            boqTableHeaders,
            boq,
            toggle,
            searchBoQ,
            projectProcurementSubContractBoQItemsTableHeaders,
            selectedBillItems,
            addSelectedBoQItems,
            selectedSubContractDrawings,
            addSelectedDrawings,
            selectedSubContractImages,
            addSelectedImages,
            selectedSubContractors,
            viewSubContractorProcurementPackageBillItems,
            projectProcurementSubContractDrawingsTableHeaders,
            projectSubContractorProcurementPackagesTableHeaders,
            projectProcurementPackageImagesDialog,
            imageMetadataTableHeaders,
            projectImageMetadata,
            projectProcurementPackages,
            projectProcurementPackagesListSelection,
            projectProcurementPackageSummary,
            editedProjectProcurementPackageIndex,
            defaultProjectProcurementPackage,
            editedProjectProcurementPackage,
            subContractorProcurementPackageBillItems,
            projectSubContractorProcurementPackages,
            editProjectProcurementPackage,
            deleteProjectProcurementPackage,
            saveProjectProcurementPackage,
            createProjectSubContractorProcurementPackage,
            deleteProjectSubContractorProcurementPackage,

        }
    }
}
</script>