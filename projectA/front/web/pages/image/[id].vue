<script setup lang="ts">
import { upload_image } from '~/api'
import { getFileHashAsync } from '#imports'

const route = useRoute<'image-id'>()
const id = route.params.id

const imageData = reactive<{ fileList: File[] }>({
  fileList: [],
})

async function uploadImage(data: { file: File, onProgress?: any, onSuccess?: any }) {
  const { file, onSuccess } = data
  // const fileNameList = imageData.fileList.map(it => it.name)
  // const fileIndex = fileNameList.lastIndexOf(file.name)
  // const currenFile = imageData.fileList[fileIndex]
  const formData = new FormData()
  const hash = await getFileHashAsync(file)
  const originalname = file.name
  const newFileName = `${hash}.${originalname.split('.').pop()}`
  console.log(file)
  const newFile = new File([file.slice(0, file.size)], newFileName, { type: file.type })
  console.log(newFile)
  formData.append('file', newFile)
  formData.append('file_hash', hash)
  formData.append('image_type', id)
  formData.append('originalname', originalname)
  const res = handleRes(await upload_image(formData))
  onSuccess(res, data)
}
</script>

<template>
  <div>
    图片页
    <a-upload :custom-request="uploadImage">
      <a-button flex items-center>
        <upload-outlined />
        Click to Upload
      </a-button>
    </a-upload>
  </div>
</template>
