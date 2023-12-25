<script setup lang="ts">
const menuData = reactive({
  list: [
    { key: '1', label: '登录', path: '/login' },
    { key: '2', label: '图片', path: '/image/1' },
    { key: '3', label: 'sql', path: '/sql' },
  ],
  currentKey: '',
})
function handleClick(e: any) {
  const text = e.target?.textContent
  menuData.currentKey = menuData.list.find(item => item.label === text)?.key || ''
}
</script>

<template>
  <div class="common-aside" @click="handleClick">
    <NuxtLink v-for="item in menuData.list" :key="item.key" class="menu-item" :class="[menuData.currentKey === item.key ? 'active-item' : '']" :to="item.path">
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<style>
.common-aside {
  display: flex;
  flex-direction: column;
  width: 96px;
  margin-right: 40px;
}
.menu-item {
  text-align: center;
  padding: 8px 16px;
  margin: 4px;
  border-radius: 4px;
}
.menu-item:hover,
.active-item {
  transition: all 0 2s;
  background-color: #d9d9d9;
}
</style>
