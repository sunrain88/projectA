<script setup lang="ts">

</script>

<template>
  <div class="page-wrapper">
    <aside class="common-aside-wrapper">
      <CommonAside />
    </aside>
    <main class="common-content-wrapper">
      <CommonHeader />
      <slot />
      <Footer />
    </main>
  </div>
</template>

<style>
.page-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.common-aside-wrapper {
  padding-top: 48px;
}
.common-content-wrapper {
  flex-grow: 1;
}
</style>
