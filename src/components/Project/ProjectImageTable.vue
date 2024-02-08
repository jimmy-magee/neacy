<template>

    <v-card>
    </v-card>
</template>

<script setup>
import { computed, ref, reactive, defineProps, onMounted } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line
/* eslint-disable */
const { id, title, color } = defineProps(["id", "title", "color"]);
const store = useStore();

onMounted(() => {
  console.log("Loading images for project id " + id);
  store.dispatch("projects/loadProjectImageMetadata", id);
});

const projectImageMetadata = computed(() => {
      return store.getters["projects/loadedProjectImageMetadata"];
    });

    const projectImageFormTitle = computed(() => {
      return editedImageMetadataIndex.value === -1
        ? "New Project Image"
        : "Edit Project Image";
    });
const editedImageMetadataIndex = ref(-1);
const editedProjectImageIndex = ref(-1);
const editedProjectImagesIndex = ref(-1);
const editedProjectImages = reactive({
  projectId: id,
  imageFiles: [],
});
const defaultProjectImages = reactive({
  projectId: id,
  imageFiles: [],
});
const editedProjectImageMetaDataIndex = ref(-1);
const editedProjectImageMetaData = reactive({
  id: "",
  projectId: id,
  title: "",
  description: "",
  location: "",
  categoryId: "",
});
const defaultProjectImageMetadata = reactive({
  projectId: id,
  title: "",
  description: "",
  location: "",
  categoryId: "",
});

const imageMetadataTableHeaders = [
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Location", key: "location" },
  { title: "Category", key: "categoryId" },
  { title: "Image", key: "image" },
  { title: "Edit", align: "left", key: "actionEditImageMetadata" },
  { title: "Delete", align: "left", key: "actionDeleteImageMetadata" },
];

const projectImageDialog = ref(false);
    const projectImageMetaDataDialog = ref(false);
    

const editProjectImageMetaData = (item) => {
  editedProjectImageMetaDataIndex.value = projectImageMetadata.value.findIndex(
    (image) => image.id == item.value
  );
  const obj = projectImageMetadata.value.find((image) => image.id == item.value);
  Object.assign(editedProjectImageMetaData, obj);
  projectImageMetaDataDialog.value = true;
};
const downloadProjectImage = (item) => {
  const obj = projectImageMetadata.value.find((image) => image.id == item.value);
  console.log(obj);
  store.dispatch("projects/downloadProjectImage", obj);
};

const saveProjectImageMetaData = () => {
  // if (editedProjectImageMetaDataIndex > -1) {
  const formData = {
    id: editedProjectImageMetaData.id,
    projectId: id,
    title: editedProjectImageMetaData.title,
    description: editedProjectImageMetaData.description,
    revision: editedProjectImageMetaData.revision,
    categoryId: editedProjectImageMetaData.categoryId,
    location: editedProjectImageMetaData.location,
    status: editedProjectImageMetaData.status,
  };
  console.log("Saving project image meta data");
  console.log(formData);
  store.dispatch("projects/saveProjectImageMetaData", formData);

  // }
  closeProjectImageMetaDataDialog();
};

const saveProjectImages = () => {
  const formData = {
    projectId: id,
    imageFiles: editedProjectImages.imageFiles,
  };
  store.dispatch("projects/uploadProjectImages", formData);
  console.log("Uploading project images");
  console.log(formData);

  closeProjectImageDialog();
};
const deleteProjectImageMetaData = (item) => {
  console.log("Deleting project image meta data");

  console.log(item.value);
  const obj = projectImageMetadata.value.find((image) => image.id == item.value);
  store.dispatch("projects/deleteProjectImageMetaData", obj);
  closeProjectImageMetaDataDialog();
};

const closeProjectImageDialog = () => {
  projectImageDialog.value = false;
  // remove previously selected image files
  editedProjectImages.imageFiles = [];

  setTimeout(() => {
    Object.assign(editedProjectImages, defaultProjectImages);
    editedProjectImageIndex.value = -1;
  }, 300);
};
const closeProjectImageMetaDataDialog = () => {
  projectImageMetaDataDialog.value = false;
  setTimeout(() => {
    Object.assign(editedProjectImageMetaData, defaultProjectImageMetadata);
    editedProjectImageMetaDataIndex.value = -1;
  }, 300);
};
</script>
