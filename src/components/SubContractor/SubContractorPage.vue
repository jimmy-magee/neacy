<template>
  <v-container>

    <v-card>
      <v-card-title>
        <h3 class="primary--text">{{ editedSubContractor.name }}</h3>
      </v-card-title>
      <v-card-text>
        <h3 class="primary--text">Trade: {{ editedSubContractor.category }}</h3>
        <div>{{ editedSubContractor.description }}</div>
        <div>{{ editedSubContractor.address }}</div>

        <v-tabs v-model="tab" show-arrows>
          <v-tabs-slider color="green"></v-tabs-slider>

          <v-tab value="tab-1">
            Company Details
          </v-tab>
          <v-tab value="tab-2">
            Health & Safety
          </v-tab>
          <v-tab value="tab-3" v-if="userIsAuthenticatedAndHasRoleAdmin">
            Quotations
          </v-tab>
          <v-tab value="tab-4">
            Projects
          </v-tab>
          <v-tab value="tab-5" v-if="userIsAuthenticatedAndHasRoleAdmin">
            Invoices
          </v-tab>
          <v-tab value="tab-6" v-if="userIsAuthenticatedAndHasRoleAdmin">
            Payments
          </v-tab>
        </v-tabs>

        <v-window v-model="tab">

          <!-- SubContractor Details -->
          <v-window-item value="tab-1">
            <v-card>
              <v-card-title>
                SubContractor Details
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                  <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                    {{ snackText }}
                    <v-btn text @click="snack = false">Close</v-btn>
                  </v-snackbar>
                </v-layout>



                <form @submit.prevent="onUpdateSubContractor">
                  <v-layout row>

                    <v-select :items="subContractorCategories" v-model="editedSubContractor.subContractorCategoryId"
                      label="Category" item-key="id" item-title="name" required></v-select>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorName" label="SubContractor Name" id="subContractorName"
                      v-model="editedSubContractor.name" required></v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-textarea name="subContractorDescription" label="SubContractor Description"
                      id="subContractorDescription" v-model="editedSubContractor.description" required></v-textarea>

                  </v-layout>
                  <v-layout row>

                    <v-textarea name="subContractorAddress" label="SubContractor Address" id="subContractorAddress"
                      v-model="editedSubContractor.address" required></v-textarea>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorWebsite" label="SubContractor Website" id="subContractorWebsite"
                      v-model="editedSubContractor.website">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorEmail" label="SubContractor Email" id="subContractorEmail"
                      v-model="editedSubContractor.email">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorContactName" label="Contact Name" id="subContractorContactName"
                      v-model="editedSubContractor.contactName">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorContactNumber" label="Contact Number" id="subContractorContactNumber"
                      v-model="editedSubContractor.contactNumber">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorHeadOfficeTelephoneNumber" label="Head Office TelephoneNumber"
                      id="subContractorHeadOfficeTelephoneNumber" v-model="editedSubContractor.headOfficeTelephoneNumber">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorCompanyRegistrationNumber" label="Company Registration Number"
                      id="subContractorCompanyRegistrationNumber" v-model="editedSubContractor.companyRegistrationNumber">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorVatNumber" label="Company Vat Number" id="subContractorVatNumber"
                      v-model="editedSubContractor.vatNumber">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorBankAccountNumber" label="Bank Account"
                      id="subContractorBankAccountNumber" v-model="editedSubContractor.bankAccountNumber">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorbiq" label="BIC" id="subContractorbiq"
                      v-model="editedSubContractor.biq">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-text-field name="subContractorban" label="IBAN" id="subContractorban"
                      v-model="editedSubContractor.ban">
                    </v-text-field>

                  </v-layout>
                  <v-layout row>

                    <v-btn class="primary" :disabled="!formIsValid" type="submit">Update Details</v-btn>

                  </v-layout>
                </form>



              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- SubContractor Health & Safety-->
          <v-window-item value="tab-2">

            <v-tabs v-model="healtAndSafetyTab" show-arrows>
              <v-tabs-slider color="green"></v-tabs-slider>

              <v-tab href="#healtAndSafetyTab-1">
                Insurance Cover
              </v-tab>
              <v-tab href="#healtAndSafetyTab-2">
                Operative SafePass
              </v-tab>
              <v-tab href="#healtAndSafetyTab-3">
                Project Health & Safety Plan
              </v-tab>
              <v-tab href="#healtAndSafetyTab-4">
                Project Risk Assessments
              </v-tab>
              <v-tab href="#healtAndSafetyTab-5">
                Certificates
              </v-tab>
            </v-tabs>

            <v-window v-model="healtAndSafetyTab">

              <!-- SubContractor Insurance Policy Details -->

              <v-window-item key="1" :value="'healtAndSafetyTab-' + 1">
                <v-card>
                  <v-card-title>

                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line
                      hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <btn>
                      <v-dialog v-model="subContractorInsurancePolicyDialog" activator="parent">

                        <v-card>
                          <v-card-title>
                            <span>Insurance Policy Details</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedSubContractorInsurancePolicy.description" required>
                                </v-textarea>

                              </v-layout>
                              <v-layout row>

                                <v-select :items="insurancePolicyStatusListSelection"
                                  v-model="editedSubContractorInsurancePolicy.status" label="Cover Status"
                                  single></v-select>


                                <v-text-field v-model="editedSubContractorInsurancePolicy.coverType"
                                  label="Cover Type"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorInsurancePolicy.policyId"
                                  label="Policy Id"></v-text-field>


                                <v-text-field v-model="editedSubContractorInsurancePolicy.coverValue"
                                  label="Cover Value"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorInsurancePolicy.broker"
                                  label="Broker"></v-text-field>


                                <v-text-field v-model="editedSubContractorInsurancePolicy.underwriter"
                                  label="Under Writer"></v-text-field>

                              </v-layout>
                              <v-layout row v-if="editedSubContractorInsurancePolicyIndex < 0">

                                <v-file-input v-model="editedSubContractorInsurancePolicy.insurancePolicyFile"
                                  label="Upload Policy" filled prepend-icon="mdi-camera"></v-file-input>

                              </v-layout>
                              <v-layout row>

                                <v-dialog ref="insurancePolicyCoverStartDateDialog"
                                  v-model="insurancePolicyCoverStartDateModal" persistent width="50%">
                                  <template v-slot:[`activator`]="{ on }">
                                    <v-text-field v-model="editedSubContractorInsurancePolicy.coverStartDate"
                                      label="Cover Start Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedSubContractorInsurancePolicy.coverStartDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                      @click="insurancePolicyCoverStartDateModal = false">Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.insurancePolicyCoverStartDateDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>



                                <v-dialog ref="insurancePolicyCoverExpiryDateDialog"
                                  v-model="insurancePolicyCoverExpiryDateModal" persistent width="50%">
                                  <template v-slot:[`activator`]="{ on }">
                                    <v-text-field v-model="editedSubContractorInsurancePolicy.coverExpiryDate"
                                      label="Cover End Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedSubContractorInsurancePolicy.coverExpiryDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                      @click="insurancePolicyCoverExpiryDateModal = false">Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.insurancePolicyCoverExpiryDateDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeSubContractorInsurancePolicyDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" @click="saveSubContractorInsurancePolicy">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </btn>
                  </v-card-title>
                  <v-card-text>
                    <v-data-table :headers="subContractorInsurancePolicyHeaders" :calculate-widths="true"
                      :items="subContractorInsurancePolicies" :search="search">
                      <template v-slot:[`item.actionEditSubContractorInsurancePolicy`]="{ item }">
                        <v-btn icon @click="showSubContractorInsurancePolicyEditDialog(item)">
                          <v-icon>
                            edit
                          </v-icon>
                        </v-btn>
                      </template>

                      <template v-slot:[`item.actionDeleteSubContractorInsurancePolicy`]="{ item }">
                        <v-btn icon @click="deleteSubContractorInsurancePolicy(item)">
                          <v-icon>
                            delete
                          </v-icon>
                        </v-btn>
                      </template>

                    </v-data-table>
                  </v-card-text>

                </v-card>
              </v-window-item>

              <!-- SubContractor Operative SafePass Details -->

              <v-window-item key="2" :value="'healtAndSafetyTab-' + 2">
                <v-card>
                  <v-card-title>
                    Employee Safe Pass
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line
                      hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <btn>
                      <v-dialog v-model="subContractorOperativeDialog" activator="parent">
                        <v-card>
                          <v-card-title>
                            <span>Operative Safe Pass Details</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorOperative.firstName"
                                  label="First Name"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorOperative.lastName"
                                  label="Last Name"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-textarea name="description" label="Description" id="description"
                                  v-model="editedSubContractorOperative.description" required>
                                </v-textarea>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorOperative.mobileNumber"
                                  label="Mobile Number"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorOperative.email" label="Email"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorOperative.trade" label="Trade"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-text-field v-model="editedSubContractorOperative.safePassId"
                                  label="Safe Pass Id"></v-text-field>

                              </v-layout>
                              <v-layout row>

                                <v-dialog ref="subContractorOperativeSafePassExpiryDialog"
                                  v-model="subContractorOperativeSafePassExpiryModal" persistent width="50%">
                                  <template v-slot:[`activator`]="{ on }">
                                    <v-text-field v-model="editedSubContractorOperative.safePassExpiryDate"
                                      label="Safe Pass Expiry" prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedSubContractorOperative.safePassExpiryDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                      @click="subContractorOperativeSafePassExpiryModal = false">Cancel</v-btn>
                                    <v-btn text color="primary"
                                      @click="$refs.subContractorOperativeSafePassExpiryDialog.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>

                              </v-layout>
                              <v-layout row v-if="editedSubContractorOperativeIndex < 0">

                                <v-file-input v-model="editedSubContractorOperative.safePassImageFile"
                                  label="Upload SafePass Image" filled prepend-icon="mdi-camera"></v-file-input>


                              </v-layout>
                              <v-layout row v-if="editedSubContractorOperativeIndex >= 0">

                                <v-img :src="editedSubContractorOperative.safePassImageUrl"
                                  :lazy-src="editedSubContractorOperative.safePassImageUrl" aspect-ratio="1"
                                  class="grey lighten-2" max-width="400" max-height="250">
                                  <template v-slot:[`placeholder`]>
                                    <v-row class="fill-height ma-0" justify="center">
                                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                  </template>
                                </v-img>

                              </v-layout>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="closeSubContractorOperativeDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" @click="saveSubContractorOperative">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </btn>
                  </v-card-title>
                  <v-card-text>
                    <v-data-table :headers="subContractorOperativeHeaders" :calculate-widths="true"
                      :items="subContractorOperatives" :search="search">
                      <template v-slot:[`item.actionEditSubContractorOperative`]="{ item }">
                        <v-btn icon @click="showSubContractorOperativeEditDialog(item)">
                          <v-icon>
                            edit
                          </v-icon>
                        </v-btn>
                      </template>

                      <template v-slot:[`item.actionDeleteSubContractorOperative`]="{ item }">
                        <v-btn icon @click="deleteSubContractorOperative(item)">
                          <v-icon>
                            delete
                          </v-icon>
                        </v-btn>
                      </template>

                    </v-data-table>
                  </v-card-text>

                </v-card>
              </v-window-item>

            </v-window>

          </v-window-item>

          <!-- SubContractor Quotations-->
          <v-window-item value="tab-3">
            <v-card>
              <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                  hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon color="green">
                  <v-icon icon="mdi-plus"></v-icon>
                  <v-dialog v-model="subContractorQuotationDialog" activator="parent">

                    <v-card>
                      <v-card-title>
                        <span>Quotation Details</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-layout row>

                            <v-select :items="projects" v-model="editedSubContractorQuotation.projectId" item-value="id"
                              item-title="name" label="Select Project" single></v-select>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorQuotation.quotationRef"
                              label="Reference"></v-text-field>

                          </v-layout>
                          <v-layout row v-show="editedSubContractorQuotationIndex >= 0">

                            <v-text-field v-model="editedSubContractorQuotation.status" label="Status"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedSubContractorQuotation.description" required>
                            </v-textarea>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorQuotation.currency" label="Currency"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorQuotation.grossAmount"
                              label="Gross Amount"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorQuotation.netAmount"
                              label="Net Amount"></v-text-field>

                          </v-layout>

                          <v-layout row>

                            <v-dialog ref="subContractorQuotationDateDialog" v-model="subContractorQuotationDateModal"
                              persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedSubContractorQuotation.quotationDate" label="Date Issued"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedSubContractorQuotation.quotationDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary"
                                  @click="subContractorQuotationDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.subContractorQuotationDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>

                          </v-layout>
                          <v-layout row v-if="editedSubContractorQuotationIndex >= 0">

                            <v-dialog ref="subContractorQuotationDateReceivedDialog"
                              v-model="subContractorQuotationDateReceivedModal" persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedSubContractorQuotation.dateRecieved" label="Date Received"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedSubContractorQuotation.dateReceived" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary"
                                  @click="subContractorQuotationDateReceivedModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.subContractorQuotationDateReceivedDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>

                          </v-layout>
                          <v-layout row v-if="editedSubContractorQuotationIndex < 0">

                            <v-file-input ref="file" label="Upload Quotation" filled
                              prepend-icon="mdi-camera"></v-file-input>

                          </v-layout>

                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="closeSubContractorQuotationDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" @click="saveSubContractorQuotation">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <h3>Quotation Summary</h3>
                <v-layout row v-if="subContractorQuotationSummary">

                  <v-text-field v-model="subContractorQuotationSummary.totalQuotationCount" label="Quotations Submitted"
                    readonly></v-text-field>

                </v-layout>
                <v-layout row v-else>

                  <span>Quotation Count 0</span>

                </v-layout>
                <h3>Quotation Details</h3>
                <v-data-table :headers="subContractorQuotationTableHeaders" :calculate-widths="true"
                  :items="subContractorQuotations" :search="search">

                  <template v-slot:[`item.actionDownloadSubContractorQuotation`]="{ item }">
                    <v-btn icon="mdi-download" @click="downloadSubContractorQuotation(item)">

                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionEditSubContractorQuotation`]="{ item }">
                    <v-btn icon="mdi-file-edit-outline" @click="showSubContractorQuotationEditDialog(item)">

                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionDeleteSubContractorQuotation`]="{ item }">
                    <v-btn icon="mdi-delete-alert" @click="deleteSubContractorQuotation(item)">

                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>

            </v-card>
          </v-window-item>

          <!-- SubContractor Project Packages-->
          <v-window-item value="tab-4">
            <v-card>
              <v-card-title>
                Tender Packages
                <v-spacer></v-spacer>
                <v-btn>
                  <v-dialog v-model="showSubContractorProjectProcurementPackageDialog" activator="parent">
                    <v-card>
                      <v-card>
                        <v-card-title>
                          Project Tenders
                        </v-card-title>
                        <v-card-text>

                          Description:
                          <p class="text-justify">
                            {{ editedSubContractorProjectProcurementPackage.packageDescription }}
                          </p>
                          <br>

                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header>Bill of Quantities</v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-card>
                                  <v-card-title>
                                    <v-text-field v-model="searchTenderBillItems" append-icon="search" label="Search"
                                      single-line hide-details></v-text-field>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-card-text>
                                      <v-data-table :headers="subContractorProjectProcurementPackageBillItemsTableHeaders"
                                        :calculate-widths="true"
                                        :items="editedSubContractorProjectProcurementPackage.billItems"
                                        :search="searchTenderBillItems">
                                        <template v-slot:[`item.total`]="{ item }">
                                          {{ item.quantity * item.rate }}
                                        </template>

                                        <template v-slot:[`item.rate`]="props">
                                          <v-edit-dialog v-model="props.item.rate" large persistent
                                            @save="saveContractRate(props.item)" @cancel="cancel">
                                            <div>{{ props.item.rate }}</div>
                                            <template v-slot:[`input`]>
                                              <div class="mt-4 title">Update SubContract Rate</div>

                                              <v-text-field v-model="props.item.rate" :rules="[max25chars]"
                                                label="Update Rate" single-line counter autofocus></v-text-field>
                                            </template>
                                          </v-edit-dialog>
                                        </template>
                                      </v-data-table>
                                    </v-card-text>
                                  </v-card-text>
                                </v-card>
                              </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel>
                              <v-expansion-panel-header>Project Drawings Schedule</v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-card>
                                  <v-card-title>
                                    <v-text-field v-model="searchTenderDrawings" append-icon="search" label="Search"
                                      single-line hide-details></v-text-field>
                                  </v-card-title>
                                  <v-card-text>

                                    <v-data-table :headers="subContractorProjectProcurementPackageDrawingsTableHeaders"
                                      :calculate-widths="true"
                                      :items="editedSubContractorProjectProcurementPackage.drawings"
                                      :search="searchTenderDrawings">
                                      <template v-slot:[`item.actionDownload`]="{ item }">
                                        <v-btn icon @click="downloadProjectDrawing(item)">
                                          <v-icon>
                                            cloud_download
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                            <br>
                            <v-expansion-panel>
                              <v-expansion-panel-header>Project Images</v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-card>
                                  <v-card-title>
                                    <v-text-field v-model="searchTenderImages" append-icon="search" label="Search"
                                      single-line hide-details></v-text-field>
                                  </v-card-title>
                                  <v-card-text>

                                    <v-data-table :headers="subContractorProjectProcurementPackageImagesTableHeaders"
                                      :calculate-widths="true"
                                      :items="editedSubContractorProjectProcurementPackage.images"
                                      :search="searchTenderImages">

                                      <template v-slot:[`item.imageUrl`]="{ item }">
                                        <v-img :src="item.imageUrl" :lazy-src="item.imageUrl" aspect-ratio="1"
                                          class="grey lighten-2" max-width="600" max-height="500"></v-img>

                                      </template>
                                      <template v-slot:[`item.actionViewImage`]="{ item }">
                                        <v-btn icon @click="viewProjectImage(item)">
                                          <v-icon>
                                            pageview
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                    </v-data-table>
                                  </v-card-text>
                                </v-card>
                              </v-expansion-panel-content>
                            </v-expansion-panel>

                          </v-expansion-panels>
                        </v-card-text>
                      </v-card>



                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="closeSubContractorProjectProcurementPackageDialog">Ok</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>

                <v-btn>
                  <v-dialog v-model="projectImageMetaDataDialog" activator="parent">

                    <v-card>
                      <v-card-title>
                        <span>Project Image</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-layout row>

                            <v-text-field v-model="editedProjectImageMetaData.name" label="Name" readonly></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedProjectImageMetaData.description" readonly>
                            </v-textarea>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedProjectImageMetaData.location" label="Location"
                              readonly></v-text-field>

                          </v-layout>

                          <v-row justify="center">
                            <v-img
                              :src="`http://neacy.io/api/resource/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                              :lazy-src="`http://neacy.io/api/resource/projects/${editedProjectImageMetaData.projectId}/images/${editedProjectImageMetaData.id}/download`"
                              aspect-ratio="1" class="grey lighten-2" max-width="700" max-height="600"></v-img>
                          </v-row>

                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="closeProjectImageDialog">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-data-table :headers="subContractorProjectProcurementPackagesTableHeaders" :calculate-widths="true"
                  :items="subContractorProjectProcurementPackages" :search="search">


                  <template v-slot:[`item.image`]="{ item }">
                    <v-img :src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
                      :lazy-src="`http://neacy.io/api/resource/projects/${item.projectId}/images/${item.id}/download`"
                      aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="300"></v-img>
                  </template>

                  <template v-slot:[`item.actionViewSubContractorProjectProcurementPackageBillItems`]="{ item }">
                    <v-btn icon @click="showSubContractorProjectProcurementPackage(item)">
                      <v-icon>
                        pageview
                      </v-icon>
                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- SubContractor Invoices-->
          <v-window-item value="tab-5">
            <v-card>
              <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                  hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn>
                  <v-dialog v-model="subContractorInvoiceDialog" activator="parent">
                    <template v-slot:[`activator`]="{ on }">
                      <v-btn absolute right fab dark color="indigo" v-on="on"><v-icon dark>add</v-icon></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span>Invoice Details</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-layout row>

                            <v-select :items="projects" v-model="editedSubContractorInvoice.projectId" item-value="id"
                              item-title="name" label="Select Project" single></v-select>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorInvoice.invoiceRef"
                              label="Reference"></v-text-field>



                            <v-select :items="invoiceStatusListSelection" v-model="editedSubContractorInvoice.status"
                              item-value="id" item-text="name" label="Status" single></v-select>

                          </v-layout>
                          <v-layout row>

                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedSubContractorInvoice.description" required>
                            </v-textarea>

                          </v-layout>
                          <v-layout row>
                            xs12 sm3 offset-sm1>
                            <v-text-field v-model="editedSubContractorInvoice.currency" label="Currency"></v-text-field>


                            <v-text-field v-model="editedSubContractorInvoice.grossAmount"
                              label="Gross Amount"></v-text-field>


                            <v-text-field v-model="editedSubContractorInvoice.netAmount"
                              label="Net Amount"></v-text-field>

                          </v-layout>


                          <v-layout row>

                            <v-dialog ref="subContractorInvoiceDateDialog" v-model="subContractorInvoiceDateModal"
                              persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedSubContractorInvoice.invoiceDate" label="Date Issued"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedSubContractorInvoice.invoiceDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="subContractorInvoiceDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.subContractorInvoiceDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>


                            <v-dialog ref="subContractorInvoicePaymentDueDateDialog"
                              v-model="subContractorInvoicePaymentDueDateModal" persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedSubContractorInvoice.paymentDueDate" label="Payment Due Date"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedSubContractorInvoice.paymentDueDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary"
                                  @click="subContractorInvoicePaymentDueDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.subContractorInvoicePaymentDueDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>

                          </v-layout>

                          <v-layout row v-if="editedSubContractorInvoiceIndex < 0">

                            <v-file-input ref="invoiceFile" label="Upload Invoice" filled
                              prepend-icon="mdi-camera"></v-file-input>

                          </v-layout>

                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="closeSubContractorInvoiceDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" @click="saveSubContractorInvoice">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <h3>Invoice Summary</h3>
                <v-layout row v-if="subContractorInvoiceSummary">

                  <v-text-field v-model="subContractorInvoiceSummary.totalInvoiceCount" label="Total Invoice Count"
                    readonly></v-text-field>


                  <v-text-field v-model="subContractorInvoiceSummary.invoicesGrossAmountTotal" label="Invoice Total Gross"
                    readonly></v-text-field>


                  <v-text-field v-model="subContractorInvoiceSummary.invoicesNetAmountTotal" label="Invoice Total Net"
                    readonly></v-text-field>

                </v-layout>
                <v-layout row v-if="subContractorInvoiceSummary">

                  <v-text-field v-model="subContractorInvoiceSummary.unPaidInvoicesCount" label="Un Paid Invoices"
                    readonly></v-text-field>


                  <v-text-field v-model="subContractorInvoiceSummary.unPaidInvoicesGrossAmount"
                    label="Invoice Total Gross (to Pay)" readonly></v-text-field>


                  <v-text-field v-model="subContractorInvoiceSummary.unPaidInvoicesNetAmount"
                    label="Invoice Total Net (to Pay)" readonly></v-text-field>

                </v-layout>
                <v-layout row v-if="subContractorInvoiceSummary">

                  <v-text-field v-model="subContractorInvoiceSummary.paidInvoicesCount" label="Paid Invoices"
                    readonly></v-text-field>


                  <v-text-field v-model="subContractorInvoiceSummary.paidInvoicesGrossAmount"
                    label="Invoice Total Gross (Paid)" readonly></v-text-field>


                  <v-text-field v-model="subContractorInvoiceSummary.paidInvoicesNetAmount"
                    label="Invoice Total Net (Paid)" readonly></v-text-field>

                </v-layout>
                <h3>Invoice Details</h3>
                <v-data-table :headers="subContractorInvoiceTableHeaders" :calculate-widths="true"
                  :items="subContractorInvoices" :search="search">

                  <template v-slot:[`item.actionDownloadSubContractorInvoice`]="{ item }">
                    <v-btn icon="mdi-download"  @click="downloadSubContractorInvoice(item)">
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionPaySubContractorInvoice`]="{ item }">
                    <v-btn icon="mdi-payment" @click="approveSubContractorInvoicePayment(item)">
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionEditSubContractorInvoice`]="{ item }">
                    <v-btn icon="mdi-file-edit-outline" @click="showSubContractorInvoiceEditDialog(item)">
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionDeleteSubContractorInvoice`]="{ item }">
                    <v-btn icon="mdi-delete-alert" @click="deleteSubContractorInvoice(item)">
                    
                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>

            </v-card>
          </v-window-item>

          <!-- SubContractor Payments -->
          <v-window-item value="tab-6">
            <v-card>
              <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line
                  hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn>
                  <v-dialog v-model="subContractorPaymentDialog" activator="parent">

                    <v-card>
                      <v-card-title>
                        <span>Payment Details</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-layout row>

                            <v-select :items="projects" v-model="editedSubContractorPayment.projectId" item-value="id"
                              item-text="name" label="Select Project" single></v-select>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorPayment.paymentRef"
                              label="Reference"></v-text-field>

                          </v-layout>
                          <v-layout row v-show="editedSubContractorPaymentIndex >= 0">

                            <v-text-field v-model="editedSubContractorPayment.status" label="Status"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-textarea name="description" label="Description" id="description"
                              v-model="editedSubContractorPayment.description" required>
                            </v-textarea>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorPayment.currency" label="Currency"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorPayment.grossAmount"
                              label="Gross Amount"></v-text-field>

                          </v-layout>
                          <v-layout row>

                            <v-text-field v-model="editedSubContractorPayment.netAmount"
                              label="Net Amount"></v-text-field>

                          </v-layout>

                          <v-layout row>

                            <v-dialog ref="subContractorPaymentDateDialog" v-model="subContractorPaymentDateModal"
                              persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedSubContractorPayment.paymentDate" label="Date Issued"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedSubContractorPayment.paymentDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="subContractorPaymentDateModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.subContractorPaymentDateDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>

                          </v-layout>
                          <v-layout row v-if="editedSubContractorPaymentIndex >= 0">

                            <v-dialog ref="subContractorPaymentDateReceivedDialog"
                              v-model="subContractorPaymentDateReceivedModal" persistent width="50%">
                              <template v-slot:[`activator`]="{ on }">
                                <v-text-field v-model="editedSubContractorPayment.dateRecieved" label="Date Received"
                                  prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedSubContractorPayment.dateReceived" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary"
                                  @click="subContractorPaymentDateReceivedModal = false">Cancel</v-btn>
                                <v-btn text color="primary"
                                  @click="$refs.subContractorPaymentDateReceivedDialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>

                          </v-layout>

                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="closeSubContractorPaymentDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" @click="saveSubContractorPayment">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>

              </v-card-title>
              <v-card-text>
                <h3>Payment Summary</h3>
                <v-layout row v-if="subContractorPaymentSummary">

                  <v-text-field v-model="subContractorPaymentSummary.totalPaymentCount" label="Payments Submitted"
                    readonly></v-text-field>

                </v-layout>
                <v-layout row v-else>

                  <span>Payment Count 0</span>

                </v-layout>
                <h3>Payment Details</h3>
                <v-data-table :headers="subContractorPaymentTableHeaders" :calculate-widths="true"
                  :items="subContractorPayments" :search="search">

                  <template v-slot:[`item.actionEditSubContractorPayment`]="{ item }">
                    <v-btn icon @click="showSubContractorPaymentEditDialog(item)">
                      <v-icon>
                        edit
                      </v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:[`item.actionDeleteSubContractorPayment`]="{ item }">
                    <v-btn icon @click="deleteSubContractorPayment(item)">
                      <v-icon>
                        delete
                      </v-icon>
                    </v-btn>
                  </template>

                </v-data-table>
              </v-card-text>

            </v-card>
          </v-window-item>

        </v-window>

      </v-card-text>
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
    //const router = useRouter();

    const id = route.params.id;

    onMounted(() => {
      store.dispatch('projects/loadProjects')
      store.dispatch('subcontractors/loadSubContractor', id)
      store.dispatch('subcontractors/loadSubContractorInsurancePolicies', id)
      store.dispatch('subcontractors/loadSubContractorOperatives', id)
      store.dispatch('subcontractors/loadSubContractorQuotations', id)
      store.dispatch('subcontractors/loadSubContractorQuotationSummary', id)
      store.dispatch('subcontractors/loadSubContractorInvoices', id)
      store.dispatch('subcontractors/loadSubContractorInvoiceSummary', id)
      store.dispatch('subcontractors/loadSubContractorPayments', id)
      store.dispatch('subcontractors/loadSubContractorPaymentSummary', id)
      store.dispatch('subcontractors/loadSubContractorProcurementPackages', id)
    });
    /*
        beforeUpdate() {
          console.log('Before Update..')
          editedSubContractor = subContractor
          console.log('After Update..')
          console.log(subContractor)
          console.log(editedSubContractor)
        },*/
    const tab = ref(null);
    const healtAndSafetyTab = ref(null);
    const date = new Date().toISOString().substr(0, 10);
    const search = ref('');
    const searchTenderBillItems = ref('');
    const searchTenderDrawings = ref('');
    const searchTenderImages = ref('');
    const snack = ref(false);
    const snackColor = ref('');
    const snackText = ref('');
    const max25chars = v => v.length <= 25 || 'Input too long!';
    const pagination = {};
    const projectImageMetaDataDialog = ref(false);
    const editedProjectImageMetaData = reactive({
      id: '',
      projectId: '',
      packageId: '',
      name: '',
      description: '',
      location: '',
      category: '',
      revision: '',
      imageUrl: '',
      imageFiles: []
    });
    const defaultProjectImageMetadata = reactive({
      projectId: '',
      packageId: '',
      name: '',
      description: '',
      location: '',
      category: '',
      revision: '',
      imageUrl: '',
      imageFiles: []
    });
    const editedSubContractor = reactive({
      id: '',
      subContractorCategoryId: '',
      name: '',
      description: '',
      address: '',
      eamil: '',
      website: '',
      contactName: '',
      contactNumber: '',
      headOfficeTelephoneNumber: '',
      companyRegistrationNumber: '',
      vatRegistered: false,
      vatNumber: '',
      biq: '',
      ban: '',
      bankAccountNumber: ''
    });
    const subContractorOperativeHeaders = [
      { title: 'FirstName', key: 'firstName' },
      { title: 'LastName', key: 'lastName' },
      { title: 'Mobile', key: 'mobileNumber' },
      { title: 'SafePassId', key: 'safePassId' },
      { title: 'SafePassExpiryDate', key: 'safePassExpiryDate' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractorOperative' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorOperative' }
    ];
    const subContractorOperativeDialog = ref(false);
    const subContractorOperativeDoBDialog = ref(false);
    const subContractorOperativeDoBDModal = ref(false);
    const subContractorOperativeSafePassExpiryDialog = ref(false);
    const subContractorOperativeSafePassExpiryModal = ref(false);
    const editedSubContractorOperativeIndex = ref(-1);
    const editedSubContractorOperative = reactive({
      id: '',
      subContractorId: '',
      firstName: '',
      lastName: '',
      description: '',
      mobileNumber: '',
      email: '',
      trade: '',
      safePassId: '',
      safePassExpiryDate: null,
      safePassImageFile: null
    });
    const defaultSubContractorOperative = reactive({
      subContractorId: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      trade: '',
      safePassId: '',
      safePassExpiryDate: null,
      safePassImageFile: null
    });
    const showSubContractorProjectProcurementPackageDialog = ref(false);
    const editedSubContractorProjectProcurementPackageIndex = ref(-1);
    const editedSubContractorProjectProcurementPackage = reactive({
      id: '',
      subContractorId: id,
      projectId: '',
      projectProcurementPackageId: '',
      billItems: null,
      description: '',
      status: ''
    });
    const defaultSubContractorProjectProcurementPackage = reactive({
      subContractorId: id,
      projectId: '',
      projectProcurementPackageId: '',
      billItems: null,
      description: '',
      status: ''
    });
    const subContractorProjectProcurementPackagesTableHeaders = [
      { title: 'Project', key: 'projectName' },
      { title: 'Project Address', key: 'projectAddress', width: "125px" },
      { title: 'Name', key: 'packageName' },
      { title: 'Value', key: 'subContractTotalValue' },
      { title: 'Status', key: 'status' },
      { title: 'Issued', key: 'dateIssued' },
      { title: 'CloseingDate', key: 'closeingDateForTenderReturn' },
      { title: 'View', align: 'left', key: 'actionViewSubContractorProjectProcurementPackageBillItems' }
    ];
    const subContractorProjectProcurementPackageDrawingsTableHeaders = [
      { title: 'Category', key: 'categoryName', width: 150 },
      { title: 'Title', key: 'title' },
      { title: 'Description', key: 'description' },
      { title: 'Revision', key: 'revision' },
      { title: 'Status', key: 'status' },
      { title: 'Dowload', align: 'left', key: 'actionDownload' }
    ];
    const subContractorProjectProcurementPackageImagesTableHeaders = [
      { title: 'Name', key: 'fileName' },
      { title: 'Description', key: 'description' },
      { title: 'Location', key: 'location' },
      { title: 'Category', key: 'category' },
      { title: 'Image', key: 'imageUrl' },
      { title: 'View', align: 'left', key: 'actionViewImage' }
    ];
    const subContractorProjectProcurementPackageBillItemsTableHeaders = [
      { title: 'Ref', key: 'ref' },
      { title: 'Name', key: 'name' },
      { title: 'Description', key: 'description', width: "125px" },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit', key: 'unit' },
      { title: 'Rate', key: 'rate' },
      { title: 'Total', key: 'total' },
    ];
    const subContractorQuotationTableHeaders = [
      { title: 'Project', key: 'projectName' },
      { title: 'Ref', key: 'quotationRef' },
      { title: 'Gross', key: 'grossAmount' },
      { title: 'Currency', key: 'currency' },
      { title: 'Issued', key: 'quotationDate', width: "125px" },
      { title: 'Status', key: 'status' },
      { title: 'Download', align: 'left', key: 'actionDownloadSubContractorQuotation' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractorQuotation' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorQuotation' }
    ];
    const subContractorQuotationDialog = ref(false);
    const subContractorQuotationDateDialog = ref(false);
    const subContractorQuotationDateModal = ref(false);
    const subContractorQuotationDateReceivedDialog = ref(false);
    const subContractorQuotationDateReceivedModal = ref(false);
    const editedSubContractorQuotationIndex = ref(-1);
    const editedSubContractorQuotation = reactive({
      id: '',
      subContractorId: id,
      projectId: '',
      quotationRef: '',
      description: '',
      currency: '',
      netAmount: '',
      quotationDate: null,
      dateReceived: null,
      quotationFile: null,
      status: ''
    });
    const defaultSubContractorQuotation = reactive({
      subContractorId: id,
      projectId: '',
      quotationRef: '',
      description: '',
      currency: '',
      netAmount: '',
      quotationDate: null,
      paymentDueDate: null,
      quotationFile: null,
      status: ''
    });
    const invoiceStatusListSelection = [
      { title: 'UNPAID', key: 'UNPAID' },
      { title: 'APPROVED_FOR_PAYMENT', key: 'APPROVED_FOR_PAYMENT' },
      { title: 'PAID', key: 'PAID' }
    ];
    const subContractorInvoiceTableHeaders = [
      { title: 'Project', key: 'projectName' },
      { title: 'Ref', key: 'invoiceRef' },
      { title: 'Description', key: 'description', width: "1%" },
      { title: 'Status', key: 'status' },
      { title: 'Currency', key: 'currency' },
      { title: 'Gross', key: 'grossAmount' },
      { title: 'Net', key: 'netAmount' },
      { title: 'Issued', key: 'invoiceDate' },
      { title: 'Payment Due', key: 'paymentDueDate', width: "125px" },
      { title: 'Download', align: 'left', key: 'actionDownloadSubContractorInvoice' },
      { title: 'Approve', align: 'left', key: 'actionPaySubContractorInvoice' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractorInvoice' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorInvoice' }
    ];
    const subContractorInvoiceDialog = ref(false);
    const subContractorInvoicePaymentDialog = ref(false);
    const subContractorInvoiceDateDialog = ref(false);
    const subContractorInvoiceDateModal = ref(false);
    const subContractorInvoicePaymentDueDateDialog = ref(false);
    const subContractorInvoicePaymentDueDateModal = ref(false);
    const editedSubContractorInvoiceIndex = ref(-1);
    const editedSubContractorInvoice = reactive({
      id: '',
      subContractorId: id,
      projectId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const defaultSubContractorInvoice = reactive({
      subContractorId: id,
      projectId: '',
      invoiceRef: '',
      description: '',
      currency: '',
      netAmount: '',
      invoiceDate: null,
      paymentDueDate: null,
      invoiceFile: null,
      status: ''
    });
    const subContractorPaymentTableHeaders = [
      { title: 'Project', key: 'projectName' },
      { title: 'InvoiceRef', key: 'invoiceRef' },
      { title: 'Net', key: 'netAmount' },
      { title: 'Currency', key: 'currency' },
      { title: 'Payment Ref', key: 'paymentRef' },
      { title: 'Payment Date', key: 'paymentDate', width: "125px" },
      { title: 'Status', key: 'status' },
      { title: 'Download', align: 'left', key: 'actionDownloadSubContractorPayment' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractorPayment' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorPayment' }
    ];
    const subContractorPaymentDialog = ref(false);
    const subContractorPaymentDateDialog = ref(false);
    const subContractorPaymentDateModal = ref(false);
    const subContractorPaymentDateReceivedDialog = ref(false);
    const subContractorPaymentDateReceivedModal = ref(false);
    const editedSubContractorPaymentIndex = ref(-1);
    const editedSubContractorPayment = reactive({
      id: '',
      subContractorId: id,
      projectId: '',
      paymentRef: '',
      description: '',
      currency: '',
      netAmount: '',
      paymentDate: null,
      dateReceived: null,
      status: ''
    });
    const defaultSubContractorPayment = reactive({
      subContractorId: id,
      projectId: '',
      paymentRef: '',
      description: '',
      currency: '',
      netAmount: '',
      paymentDate: null,
      paymentDueDate: null,
      status: ''
    });
    const insurancePolicyStatusListSelection = [
      { title: 'Valid', key: 'VALID' },
      { title: 'Expired', key: 'EXPIRED' }
    ];
    const subContractorInsurancePolicyHeaders = [
      { title: 'Status', key: 'status' },
      { title: 'Description', key: 'description' },
      { title: 'Policy Id', key: 'policyId' },
      { title: 'Cover Type', key: 'coverType' },
      { title: 'Broker', key: 'broker' },
      { title: 'Edit', align: 'left', key: 'actionEditSubContractorInsurancePolicy' },
      { title: 'Delete', align: 'left', key: 'actionDeleteSubContractorInsurancePolicy' }
    ];
    const subContractorInsurancePolicyDialog = ref(false);
    const editedSubContractorInsurancePolicyIndex = ref(-1);
    const insurancePolicyCoverStartDateDialog = ref(false);
    const insurancePolicyCoverStartDateModal = ref(false);
    const insurancePolicyCoverExpiryDateDialog = ref(false);
    const insurancePolicyCoverExpiryDateModal = ref(false);
    const editedSubContractorInsurancePolicy = reactive({
      id: '',
      subContractorId: id,
      status: '',
      description: '',
      coverType: '',
      policyId: '',
      broker: '',
      underwriter: '',
      coverValue: '',
      coverStartDate: null,
      coverExpiryDate: null,
      insurancePolicyFile: null
    });
    const defaultSubContractorInsurancePolicy = reactive({
      subContractorId: id,
      status: '',
      description: '',
      coverType: '',
      policyId: '',
      broker: '',
      underwriter: '',
      coverValue: '',
      coverStartDate: null,
      coverExpiryDate: null,
      insurancePolicyFile: null
    });

    // computed

    const userIsAuthenticatedAndHasRoleAdmin = computed(() => {
      return store.getters['users/userIsAuthenticatedAndHasRoleAdmin']
    });
    const subContractorCategories = computed(() => {
      return store.getters.loadedSubContractorCategories
    });
    const subContractor = computed(() => {
      return store.getters['subcontractors/loadedSubContractor']
    });
    const subContractorProjectProcurementPackages = computed(() => {
      return store.getters['subcontractors/loadedSubContractorProjectProcurementPackages']
    });
    const subContractorInsurancePolicies = computed(() => {
      return store.getters['subcontractors/loadedSubContractorInsurancePolicies']
    });
    const subContractorOperatives = computed(() => {
      return store.getters['subcontractors/loadedSubContractorOperatives']
    });
    const subContractorQuotationSummary = computed(() => {
      return store.getters['subcontractors/loadedSubContractorQuotationSummary']
    });
    const subContractorQuotations = computed(() => {
      return store.getters['subcontractors/loadedSubContractorQuotations']
    });
    const subContractorInvoiceSummary = computed(() => {
      return store.getters['subcontractors/loadedSubContractorInvoiceSummary']
    });
    const subContractorInvoices = computed(() => {
      return store.getters['subcontractors/loadedSubContractorInvoices']
    });
    const subContractorPaymentSummary = computed(() => {
      return store.getters['subcontractors/loadedSubContractorPaymentSummary']
    });
    const subContractorPayments = computed(() => {
      return store.getters['subcontractors/loadedSubContractorPayments']
    });
    const projects = computed(() => { return store.getters['projects/loadedProjects']  });

    //methods

    /*
        const viewProjectImage = ((item) => {
          console.log('Display dialog for image ')
          console.log(item)
          Object.assign(editedProjectImageMetaData, item)
          projectImageMetaDataDialog.value = true
        });
        const closeProjectImageDialog = (() => {
          projectImageMetaDataDialog.value = false
          setTimeout(() => {
            Object.assign(editedProjectImageMetaData, defaultProjectImageMetadata)
            editedProjectImageMetaDataIndex.value = -1;
          }, 300)
        });
  */
    const onUpdateSubContractor = (() => {
      console.log('Update SubContractor Event Received..')
      console.log(editedSubContractor)
      store.dispatch('subcontractors/updateSubContractor', editedSubContractor)
      save()
    });
    const saveSubContractorInsurancePolicy = (() => {
      editedSubContractorInsurancePolicy.subContractorId = id
      if (editedSubContractorInsurancePolicyIndex.value > -1) {
        console.log('Updating subcontractor insurance policy')
        console.log(editedSubContractorInsurancePolicy)
        store.dispatch('subcontractors/updateSubContractorInsurancePolicy', editedSubContractorInsurancePolicy)

      } else {
        console.log('Creating new subcontractor insurance policy')
        console.log(editedSubContractorInsurancePolicy)
        store.dispatch('subcontractors/createSubContractorInsurancePolicy', editedSubContractorInsurancePolicy)
      }
      closeSubContractorInsurancePolicyDialog()
      save()
    });
    const showSubContractorInsurancePolicyEditDialog = ((item) => {
      editedSubContractorInsurancePolicyIndex.value = subContractorInsurancePolicies.value.findIndex(s => s.id == item.value);
      const obj = subContractorInsurancePolicies.value.find(s => s.id == item.value);
      console.log(obj)
      Object.assign(editedSubContractorInsurancePolicy, obj)
      if (editedSubContractorInsurancePolicy.coverStartDate) {
        var coverStartDate = new Date(editedSubContractorInsurancePolicy.coverStartDate).toISOString().substr(0, 10)
        editedSubContractorInsurancePolicy.coverStartDate = coverStartDate
      }
      if (editedSubContractorInsurancePolicy.coverExpiryDate) {
        var coverExpiryDate = new Date(editedSubContractorInsurancePolicy.coverExpiryDate).toISOString().substr(0, 10)
        editedSubContractorInsurancePolicy.coverExpiryDate = coverExpiryDate
      }
      console.log("Selected SubContractorInsurancePolicy  is ")
      console.log(editedSubContractorInsurancePolicy)
      subContractorInsurancePolicyDialog.value = true
    });
    const closeSubContractorInsurancePolicyDialog = (() => {
      subContractorInsurancePolicyDialog.value = false
      setTimeout(() => {
        Object.assign(editedSubContractorInsurancePolicy, defaultSubContractorInsurancePolicy)
        editedSubContractorInsurancePolicyIndex.value = -1;
      }, 300)
    });
    const deleteSubContractorInsurancePolicy = ((item) => {
      console.log('Delete SubContractorInsurancePolicy Event Received..')
      const formData = {
        id: item.id,
        subContractorId: id
      }
      console.log(formData)
      store.dispatch('subcontractors/deleteSubContractorInsurancePolicy', formData)
    });
    const saveSubContractorOperative = (() => {
      if (editedSubContractorOperativeIndex.value > -1) {
        console.log('Updating subcontractor operative details')
        editedSubContractorOperative.subContractorId = id
        console.log(editedSubContractorOperative)
        store.dispatch('subcontractors/updateSubContractorOperative', editedSubContractorOperative)

      } else {
        console.log('Creating new subcontractor operative details')
        console.log(editedSubContractorOperative)
        editedSubContractorOperative.subContractorId = id
        store.dispatch('subcontractors/createSubContractorOperative', editedSubContractorOperative)
      }
      closeSubContractorOperativeDialog()
      save()
    });
    const showSubContractorOperativeEditDialog = ((item) => {
      console.log('Showing Edit Operative Dialog for operative with id ' + item.id)
      editedSubContractorOperativeIndex.value = subContractorOperatives.value.indexOf(item)
      Object.assign(editedSubContractorOperative, item)
      subContractorOperativeDialog.value = true
    });
    const closeSubContractorOperativeDialog = (() => {
      subContractorOperativeDialog.value = false
      setTimeout(() => {
        Object.assign(editedSubContractorOperative, defaultSubContractorOperative)
        editedSubContractorOperativeIndex.value = -1;
      }, 300)
    });
    const deleteSubContractorOperative = ((item) => {
      console.log('Delete SubContractorOperative Event Received..')
      const formData = {
        id: item.id,
        subContractorId: id
      }
      console.log(formData)
      store.dispatch('subcontractors/deleteSubContractorOperative', formData)
    });
    const saveSubContractorQuotation = (() => {
      if (editedSubContractorQuotationIndex.value > -1) {
        const formData = {
          id: editedSubContractorQuotation.id,
          subContractorId: id,
          projectId: editedSubContractorQuotation.projectId,
          quotationRef: editedSubContractorQuotation.quotationRef,
          status: editedSubContractorQuotation.status,
          description: editedSubContractorQuotation.description,
          currency: editedSubContractorQuotation.currency,
          grossAmount: editedSubContractorQuotation.grossAmount,
          netAmount: editedSubContractorQuotation.netAmount,
          quotationDate: editedSubContractorQuotation.quotationDate,
          dateReceived: editedSubContractorQuotation.dateReceived
        }
        console.log('Updating subcontractor quotation details')
        console.log(formData)
        store.dispatch('subcontractors/updateSubContractorQuotation', formData)
          .then(
            setTimeout(() => {
              store.dispatch('subcontractors/loadSubContractorQuotationSummary', id)
            }, 300)
          )
      } else {
        console.log('Creating new subcontractor quotation details')
        const formData = {
          subContractorId: id,
          projectId: editedSubContractorQuotation.projectId,
          quotationRef: editedSubContractorQuotation.quotationRef,
          description: editedSubContractorQuotation.description,
          status: editedSubContractorQuotation.status,
          currency: editedSubContractorQuotation.currency,
          grossAmount: editedSubContractorQuotation.grossAmount,
          netAmount: editedSubContractorQuotation.netAmount,
          quotationDate: editedSubContractorQuotation.quotationDate,
          quotationFile: file.value
        }
        console.log(formData)
        store.dispatch('subcontractors/createSubContractorQuotation', formData)
          .then(
            setTimeout(() => {
              store.dispatch('subcontractors/loadSubContractorQuotations', id)
            }, 300)
          )

      }
      closeSubContractorQuotationDialog()
      save()
    });
    const showSubContractorQuotationEditDialog = ((item) => {
      console.log('Showing Edit Quotation Dialog for operative with id ' + item.value)
      editedSubContractorQuotationIndex.value = subContractorQuotations.value.findIndex(q => q.id == item.value)
      const obj = subContractorQuotations.value.find(q => q.id == item.value)
      Object.assign(editedSubContractorQuotation, obj)
      subContractorQuotationDialog.value = true
    });
    const closeSubContractorQuotationDialog = (() => {
      subContractorQuotationDialog.value = false
      setTimeout(() => {
        Object.assign(editedSubContractorQuotation, defaultSubContractorQuotation)
        editedSubContractorQuotationIndex.value = -1;
      }, 300)
    });
    const downloadSubContractorQuotation = ((item) => {
      console.log('downloading item requested..')
      const obj = subContractorQuotations.value.find(q => q.id == item.value)
      store.dispatch('subcontractors/downloadSubContractorQuotation', obj)
    });
    const deleteSubContractorQuotation = ((item) => {
      console.log('Delete SubContractorQuotation Event Received..')
      const formData = {
        id: item.value,
        subContractorId: id
      }
      console.log(formData)
      store.dispatch('subcontractors/deleteSubContractorQuotation', formData)
        .then(
          setTimeout(() => {
            store.dispatch('suppliers/loadSubContractorQuotations', id)
            //store.dispatch('suppliers/loadSupplierQuotationSummary', id)
          }, 300)
        )
    });
    const showSubContractorProjectProcurementPackage = ((item) => {
      console.log('Showing Edit SubContractorProjectProcurementPackageBillItems Dialog for procurement package with id ' + item.id)
      editedSubContractorProjectProcurementPackageIndex.value = subContractorProjectProcurementPackages.value.indexOf(item)
      Object.assign(editedSubContractorProjectProcurementPackage, item)
      showSubContractorProjectProcurementPackageDialog.value = true
    });
    const closeSubContractorProjectProcurementPackageDialog = (() => {
      showSubContractorProjectProcurementPackageDialog.value = false
    });
    const saveContractRate = ((item) => {
      console.log('update SubContract BoQItem ContractRate ')
      console.log(item)
      store.dispatch('updateSubContractorProcurementPackageBillItemRate', item)
        .then(
          console.log('Updated SubContract BoQItem Rate successfully')
        )
    });
    const saveSubContractorInvoice = (() => {
      if (editedSubContractorInvoiceIndex.value > -1) {
        const formData = {
          id: editedSubContractorInvoice.id,
          subContractorId: id,
          projectId: editedSubContractorInvoice.projectId,
          invoiceRef: editedSubContractorInvoice.invoiceRef,
          status: editedSubContractorInvoice.status,
          description: editedSubContractorInvoice.description,
          currency: editedSubContractorInvoice.currency,
          grossAmount: editedSubContractorInvoice.grossAmount,
          netAmount: editedSubContractorInvoice.netAmount,
          invoiceDate: editedSubContractorInvoice.invoiceDate,
          paymentDueDate: editedSubContractorInvoice.paymentDueDate
        }
        console.log('Updating subcontractor invoice details')
        console.log(formData)
        store.dispatch('subcontractors/updateSubContractorInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('loadSubContractorInvoiceSummary', id)
            }, 300)
          )
      } else {
        console.log('Creating new subcontractor invoice details')
        const formData = {
          subContractorId: id,
          projectId: editedSubContractorInvoice.projectId,
          invoiceRef: editedSubContractorInvoice.invoiceRef,
          description: editedSubContractorInvoice.description,
          status: editedSubContractorInvoice.status,
          currency: editedSubContractorInvoice.currency,
          grossAmount: editedSubContractorInvoice.grossAmount,
          netAmount: editedSubContractorInvoice.netAmount,
          invoiceDate: editedSubContractorInvoice.invoiceDate,
          paymentDueDate: editedSubContractorInvoice.paymentDueDate,
          invoiceFile: invoiceFile.value
        }
        console.log(formData)
        store.dispatch('subcontractors/createSubContractorInvoice', formData)
          .then(
            setTimeout(() => {
              store.dispatch('loadSubContractorInvoiceSummary', id)
            }, 300)
          )
      }
      closeSubContractorInvoiceDialog()
      save()
    });
    const showSubContractorInvoiceEditDialog = ((item) => {
      console.log('Showing Edit Invoice Dialog  id ' + item.id)
      editedSubContractorInvoiceIndex.value = subContractorInvoices.value.findIndex(i => i.id == item.value)
      const obj = subContractorInvoices.value.find(i => i.id == item.value)
      Object.assign(editedSubContractorInvoice, obj)
      subContractorInvoiceDialog.value = true
    });
    const closeSubContractorInvoiceDialog = (() => {
      subContractorInvoiceDialog.value = false
      setTimeout(() => {
        Object.assign(editedSubContractorInvoice, defaultSubContractorInvoice)
        editedSubContractorInvoiceIndex.value = -1;
      }, 300)
    });
    const approveSubContractorInvoicePayment = ((item) => {
      const obj = subContractorInvoices.value.find(i => i.id == item.value)
      store.dispatch('subcontractors/approveSubContractorInvoicePayment', obj)
      closeSubContractorInvoiceDialog()
      save()
    });
    const showSubContractorInvoicePaymentDialog = ((item) => {
      console.log('Showing Edit Invoice Dialog for operative with id ' + item.id)
      editedSubContractorInvoiceIndex.value = subContractorInvoices.value.indexOf(item)
      Object.assign(editedSubContractorInvoice, item)
      subContractorInvoicePaymentDialog.value = true
    });
    const closeSubContractorInvoicePaymentDialog = (() => {
      subContractorInvoicePaymentDialog.value = false
      setTimeout(() => {
        Object.assign(editedSubContractorInvoice, defaultSubContractorInvoice)
        editedSubContractorInvoiceIndex.value = -1;
      }, 300)
    });
    const downloadSubContractorInvoice = ((item) => {
      const obj = subContractorInvoices.value.find(i => i.id == item.value)
      store.dispatch('subcontractors/downloadSubContractorInvoice', obj)
    });
    const deleteSubContractorInvoice = ((item) => {
      const obj = subContractorInvoices.value.find(i => i.id == item.value)
      store.dispatch('subcontractors/deleteSubContractorInvoice', obj)
    });
    const saveSubContractorPayment = (() => {
      if (editedSubContractorPaymentIndex.value > -1) {
        const formData = {
          id: editedSubContractorPayment.id,
          subContractorId: id,
          projectId: editedSubContractorPayment.projectId,
          paymentRef: editedSubContractorPayment.paymentRef,
          status: editedSubContractorPayment.status,
          description: editedSubContractorPayment.description,
          currency: editedSubContractorPayment.currency,
          grossAmount: editedSubContractorPayment.grossAmount,
          netAmount: editedSubContractorPayment.netAmount,
          paymentDate: editedSubContractorPayment.paymentDate,
          dateReceived: editedSubContractorPayment.dateReceived
        }
        console.log('Updating subcontractor payment details')
        console.log(formData)
        store.dispatch('updateSubContractorPayment', formData)
      } else {
        console.log('Creating new subcontractor payment details')
        const formData = {
          subContractorId: id,
          projectId: editedSubContractorPayment.projectId,
          paymentRef: editedSubContractorPayment.paymentRef,
          description: editedSubContractorPayment.description,
          status: editedSubContractorPayment.status,
          currency: editedSubContractorPayment.currency,
          grossAmount: editedSubContractorPayment.grossAmount,
          netAmount: editedSubContractorPayment.netAmount,
          paymentDate: editedSubContractorPayment.paymentDate
        }
        console.log(formData)
        store.dispatch('createSubContractorPayment', formData)
      }
      closeSubContractorPaymentDialog()
      save()
    });
    const showSubContractorPaymentEditDialog = ((item) => {
      console.log('Showing Edit Payment Dialog for operative with id ' + item.id)
      editedSubContractorPaymentIndex.value = subContractorPayments.value.indexOf(item)
      Object.assign(editedSubContractorPayment, item)
      subContractorPaymentDialog.value = true
    });
    const closeSubContractorPaymentDialog = (() => {
      subContractorPaymentDialog.value = false
      setTimeout(() => {
        Object.assign(editedSubContractorPayment, defaultSubContractorPayment)
        editedSubContractorPaymentIndex.value = -1;
      }, 300)
    });
    const deleteSubContractorPayment = ((item) => {
      console.log('Delete SubContractorPayment Event Received..')
      const formData = {
        id: item.id,
        subContractorId: id
      }
      console.log(formData)
      store.dispatch('deleteSubContractorPayment', formData)
    });
    const downloadProjectDrawing = ((item) => {
      console.log('downloading drawing item requested..')
      console.log(item)
      store.dispatch('downloadProjectDrawing', item)
    });
    const save = (() => {
      snack.value = true
      snackColor.value = 'success'
      snackText.value = 'Data saved successfully'
    });
    const cancel = (() => {
      snack.value = true
      snackColor.value = 'error'
      snackText.value = 'Canceled'
    });
    const open = (() => {
      snack.value = true
      snackColor.value = 'info'
      snackText.value = 'Dialog opened'
    });
    const close = (() => {
      console.log('Dialog closed')
    });
    const formIsValid = (() => {
      return true
    });
    const invoiceFile = ref(null);

    watch(subContractor, (newValue, oldValue) => {
      console.log('computedProperty [ project ]  was ' + oldValue + '. Now it is ' + JSON.stringify(newValue) + '.')
      Object.assign(editedSubContractor, newValue);
    });

    const file = ref(null)
    return {
      search,
      file,
      invoiceFile,
      projects,
      editedProjectImageMetaData,
      projectImageMetaDataDialog,
      pagination,
      snack,
      snackColor,
      snackText,
      healtAndSafetyTab,
      tab,
      date,
      searchTenderBillItems,
      searchTenderDrawings,
      searchTenderImages,
      max25chars,
      subContractorQuotationTableHeaders,
      subContractorProjectProcurementPackageBillItemsTableHeaders,
      subContractorProjectProcurementPackageImagesTableHeaders,
      subContractorProjectProcurementPackageDrawingsTableHeaders,
      subContractorProjectProcurementPackagesTableHeaders,
      defaultSubContractorProjectProcurementPackage,
      editedSubContractorProjectProcurementPackage,
      editedSubContractorProjectProcurementPackageIndex,
      showSubContractorProjectProcurementPackageDialog,
      defaultSubContractorOperative,
      editedSubContractorOperative,
      editedSubContractorOperativeIndex,
      subContractorOperativeSafePassExpiryModal,
      subContractorOperativeSafePassExpiryDialog,
      subContractorOperativeDoBDModal,
      subContractorOperativeDoBDialog,
      subContractorOperativeDialog,

      subContractorOperativeHeaders,
      editedSubContractor,
      defaultProjectImageMetadata,

      invoiceStatusListSelection,
      defaultSubContractorQuotation,
      editedSubContractorQuotation,
      editedSubContractorQuotationIndex,
      subContractorQuotationDateReceivedModal,
      subContractorQuotationDateReceivedDialog,
      subContractorQuotationDateModal,
      subContractorQuotationDateDialog,
      subContractorQuotationDialog,

      subContractorInvoiceTableHeaders,
      subContractorInvoiceDialog,
      subContractorInvoicePaymentDialog,
      subContractorInvoiceDateDialog,
      subContractorInvoiceDateModal,
      subContractorInvoicePaymentDueDateDialog,
      subContractorInvoicePaymentDueDateModal,
      editedSubContractorInvoiceIndex,
      editedSubContractorInvoice,
      defaultSubContractorInvoice,
      subContractorPaymentTableHeaders,
      subContractorPaymentDialog,
      subContractorPaymentDateDialog,
      subContractorPaymentDateModal,
      subContractorPaymentDateReceivedDialog,
      subContractorPaymentDateReceivedModal,
      editedSubContractorPaymentIndex,
      editedSubContractorPayment,

      defaultSubContractorPayment,
      insurancePolicyStatusListSelection,
      subContractorInsurancePolicyHeaders,

      subContractorInsurancePolicyDialog,
      editedSubContractorInsurancePolicyIndex,
      insurancePolicyCoverStartDateDialog,
      insurancePolicyCoverStartDateModal,
      insurancePolicyCoverExpiryDateDialog,
      insurancePolicyCoverExpiryDateModal,
      editedSubContractorInsurancePolicy,
      defaultSubContractorInsurancePolicy,


      userIsAuthenticatedAndHasRoleAdmin,
      subContractorCategories,
      subContractor,
      subContractorProjectProcurementPackages,
      subContractorInsurancePolicies,
      subContractorOperatives,
      subContractorPayments,
      subContractorPaymentSummary,
      subContractorInvoices,
      subContractorInvoiceSummary,
      subContractorQuotations,
      subContractorQuotationSummary,

      saveSubContractorInsurancePolicy,
      saveSubContractorInvoice,
      saveSubContractorOperative,
      saveSubContractorPayment,
      saveSubContractorQuotation,
      closeSubContractorInvoiceDialog,
      closeSubContractorPaymentDialog,
      deleteSubContractorInsurancePolicy,
      deleteSubContractorInvoice,
      deleteSubContractorQuotation,
      deleteSubContractorOperative,
      showSubContractorInsurancePolicyEditDialog,
      showSubContractorInvoiceEditDialog,
      showSubContractorInvoicePaymentDialog,
      showSubContractorOperativeEditDialog,
      showSubContractorPaymentEditDialog,
      showSubContractorProjectProcurementPackage,
      showSubContractorQuotationEditDialog,
      deleteSubContractorPayment,
      downloadProjectDrawing,
      downloadSubContractorInvoice,
      downloadSubContractorQuotation,
      approveSubContractorInvoicePayment,
      saveContractRate,
      closeSubContractorInsurancePolicyDialog,
      closeSubContractorInvoicePaymentDialog,
      closeSubContractorOperativeDialog,
      closeSubContractorProjectProcurementPackageDialog,
      closeSubContractorQuotationDialog,
      onUpdateSubContractor,
      save,
      cancel,
      open,
      close,
      formIsValid
    }
  }
}
</script>
