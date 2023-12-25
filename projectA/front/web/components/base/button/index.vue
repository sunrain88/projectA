<template>
  <button class="button-type-1">
    <slot />
  </button>
</template>

  <style>
    .button-type-1 {
  height: 32px;
  line-height: 32px;
  padding: 0 24px;
  border-radius: 4px;
  border: 1px solid #5264ae;
  color: #5264ae;
  background-color: #fff;
  transition: all 0.1s;
}
.button-type-1:hover {
  background-color: #5264ae;
  color: #fff;
}
.button-type-1:focus {
  box-shadow: 0px 0px 4px 0;
}

.button-type-1:focus-visible {
  outline: none;
}
</style>
