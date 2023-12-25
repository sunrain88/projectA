<script setup lang="ts">
import { reactive } from 'vue'

// import { login_password, register } from '@/api/index'
const sqlResult = reactive({
  dataArr: [],
  fields: [],
  loading: false,
})
function handleChange(val) {
  if (!val)
    return

  if (!val.data.length) {
    sqlResult.fields = Object.keys(val.data).map((key) => {
      return { key, title: key, dataIndex: key }
    }) as any
  }

  sqlResult.dataArr = val.data
  sqlResult.fields = Object.keys(val.data[0]).map((key) => {
    return { key, title: key, dataIndex: key }
  }) as any

  console.log(sqlResult)
}
</script>

<template>
  <div>
    <CommonSql @on-change="handleChange" />
    <div class="p-r-8">
      <!-- <div class="flex justify-between">
        <div v-for="item in sqlResult.fields" :key="item">
          {{ item }}
        </div>
      </div>
      <div v-for="item, index in sqlResult.dataArr" :key="index" class="flex justify-between">
        <div v-for="value, key in item" :key="key">
          {{ item[key] }}
        </div>
      </div>
    </div> -->

      <a-table :data-source="sqlResult.dataArr" :columns="sqlResult.fields" />
    </div>
  </div>
</template>

<style></style>

<style></style>
