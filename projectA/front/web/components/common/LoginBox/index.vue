<script setup lang="ts">
import { message as AMessage } from 'ant-design-vue'
import sha256 from 'crypto-js/sha256'
import { login_password, register } from '@/api/index'

const REGISTER = 1
const LOGIN = 2
interface formDataType {
  phone_number: string
  password: string
  nick?: string
  state: typeof REGISTER | typeof LOGIN
}
const formData = reactive<formDataType>({ phone_number: '', password: '', state: REGISTER })
function submit() {
  if (formData.state === REGISTER)
    registerAccount(formData)
  else
    loginPassword(formData)
}
async function registerAccount(params: Omit<formDataType, 'state'>) {
  const { password, phone_number, nick } = params
  const password_hash = sha256Hash(password).toString()
  const res = handleRes(await register({ password_hash, phone_number, nick }))
  console.log(res)
}
async function loginPassword(params: Omit<formDataType, 'state' | 'nick'>) {
  const { password, phone_number } = params
  const password_hash = await md5Hash(password)
  const res = handleRes(await login_password({ password_hash, phone_number }))
  const token = res.data.token
  console.log(token)
  localStorage.setItem('token', token)
}
async function md5Hash(input: string) {
  const crypto = window.crypto
  if (crypto) {
    const hash = crypto.subtle.digest('SHA-1', new TextEncoder().encode(input)) // 使用SHA-1算法进行哈希
    return hash.then((result) => {
      return Array.from(new Uint8Array(result))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('') // 转换为16进制字符串
    })
  }
  else {
    console.error('Your browser does not support MD5 hashing.')
    return null
  }
}

function sha256Hash(input: string) {
  return sha256(input)
}

function handleClick(state: formDataType['state']) {
  formData.state = state
}
</script>

<template>
  <div class="login-box text-left">
    <div class="flex">
      <div class="cursor-pointer p-2" :class="formData.state === REGISTER ? 'color-blue' : ''" @click="handleClick(REGISTER)">
        注册
      </div>
      <div class="cursor-pointer p-2" :class="formData.state === LOGIN ? 'color-blue' : ''" @click="handleClick(LOGIN)">
        登录
      </div>
    </div>
    <div class="form">
      <UiInputWrapper label="phone_number" class="mb-8">
        <BaseInput v-model="formData.phone_number" />
      </UiInputWrapper>
      <UiInputWrapper label="password" class="mb-8">
        <BaseInput v-model="formData.password" />
      </UiInputWrapper>
      <UiInputWrapper v-if="formData.state === REGISTER" label="nick" class="mb-8">
        <BaseInput v-model="formData.nick" />
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
</style>
