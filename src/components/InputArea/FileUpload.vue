<template>
  <FileUpload ref="fileupload" mode="basic" severity="secondary" name="demo[]" url="/api/upload" accept="image/*"
    :maxFileSize="1000000" @upload="onUpload" chooseIcon="pi pi-plus" chooseLabel="" class="icon-only-upload"
    :auto="true" @select="onFileSelect" @clear="onFileClear" />

</template>


<script setup lang="ts">
import { FileUpload } from "primevue";
import { ref, watch } from 'vue'

const fileSelected = ref(false)

watch(fileSelected, (newVal) => {
  const el = document.querySelector('.icon-only-upload')
  if (el) {
    if (newVal) {
      el.classList.add('has-file')
    } else {
      el.classList.remove('has-file')
    }
  }
})

function onFileSelect() {
  fileSelected.value = true
}

function onFileClear() {
  fileSelected.value = false
}

const onUpload = () => {
  console.log("file uploaded")
};

</script>

<style>
.icon-only-upload .p-button-label {
  display: none;
}

.icon-only-upload .p-button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-only-upload:not(.has-file) .p-fileupload-filename {
  display: none !important;
}
</style>
