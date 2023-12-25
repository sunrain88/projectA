<script setup lang="ts">
import { get_sql_data } from '@/api/index'

const emit = defineEmits(['onChange'])
const sqlStr = ref('')
async function getSqlData(sqlStr: string) {
  const res: any = handleRes(await get_sql_data({ sqlStr }))
  emit('onChange', res)
}
function submit() {
  getSqlData(sqlStr.value)
}
</script>

<template>
  <div class="login-box text-left">
    <div class="form">
      <UiInputWrapper label="sql" class="mb-8">
        <BaseInput v-model="sqlStr" @on-press-enter="submit" />
      </UiInputWrapper>
      <BaseButton @click="submit">
        提交
      </BaseButton>
    </div>
  </div>
</template>

<style>
.login-box {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.login-box input,
.login-box .bar {
  width: calc(100% - 100px);
}
</style>
