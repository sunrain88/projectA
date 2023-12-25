<script setup lang="ts">
import { message as AMessage } from 'ant-design-vue'
import { get_user_info } from '~/api'

interface AccountTblData {
  id: number
  nick: string
  phone_number: string
  password_hash: string
}

const userInfo = reactive<AccountTblData>({
  id: 0,
  nick: '',
  phone_number: '',
  password_hash: '',

})

async function getUserInfo() {
  await nextTick()
  const { code, message, data } = handleRes(await get_user_info())
  if (code === 200)
    Object.assign(userInfo, data)
  else
    AMessage.info(message)
}
onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div>
    <div class="common-header">
      <div class="user-nick">
        {{ userInfo.nick }}
      </div>
    </div>
  </div>
</template>

<style>
.common-header {
  width: 100%;
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  height: 48px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  /* box-shadow: 0 2px 4px #00000014; */
  /* background-color: #fff; */
}
.user-nick {
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
</style>
