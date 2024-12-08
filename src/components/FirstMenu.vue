<template>
  <el-dialog v-model="dialogFormVisible" title="添加一级菜单" width="450px">
    <el-form :model="form" >
      <el-form-item label="标题" label-width="80px">
        <el-input v-model="form.title"  />
      </el-form-item>
      <el-form-item label="图标" label-width="80px">
        <el-input v-model="form.icon" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addFirstMenu">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {add_folder} from '@/api/api.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  message:Array
})


const addFirstMenu = () =>{
  add_folder(form.value).then(() =>{
    console.log("11111");
    ElMessage.success("添加成功")
  }).catch((res) => {
    ElMessage.error("添加失败")
    console.log(res);
  }).finally(() => {
    dialogFormVisible.value = false
    location.reload()

  })

}
const dialogFormVisible = ref(false)
const form = ref({
  title:"",
  icon:""
})
const open = () => {
  dialogFormVisible.value = true
}

const close = () =>{dialogFormVisible.value =false}

defineExpose({
  open,
  close
})



</script>

<style lang="scss" scoped>

</style>