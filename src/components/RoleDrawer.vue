<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      @close="resetForm"
      :title="title"
      width="450px"
    >
      <slot></slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit" :loading="loading">
            确定
          </el-button>
          <el-button type="default" @click="close">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialogFormVisible = ref(false)
const props = defineProps({
  title: String
})
const open = () => {
  dialogFormVisible.value = true
}
const close = () => {
  dialogFormVisible.value = false
}
// 提交
const emit = defineEmits(['submit'])
const submit = () => emit('submit')
defineExpose({
  open,
  close
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
