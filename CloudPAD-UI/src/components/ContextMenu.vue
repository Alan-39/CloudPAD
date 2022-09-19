<template>
  <div class="context-menu bg-white rounded-lg border border-gray-200 w-48"
    v-show=show :style="style()" ref="context" tabindex="0" @blur="close">
    <slot></slot>
  </div>

</template>
    
<script setup>
import { ref, nextTick } from 'vue';
defineExpose({
  open,
  close
});

const left = ref(0);
const top = ref(0);
const show = ref(false);

function style() {
  return {
    top: top.value + 'px',
    left: left.value + 'px',
  };
}

function open(evt) {
  // updates position of context menu 
  left.value = evt.pageX || evt.clientX;
  top.value = evt.pageY || evt.clientY;
  
  // make element focused 
  nextTick(() => this.$refs.context.focus());

  show.value = true;
}

function close() {
  show.value = false;
  left.value = 0;
  top.value = 0;
}
</script>

<style>
.context-menu {
  position: fixed;
  background: white;
  z-index: 999;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}
</style>