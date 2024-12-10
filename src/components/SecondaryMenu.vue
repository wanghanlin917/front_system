<template>
<el-dialog v-model="dialogFormVisible" title="添加二级菜单" width="450px">
  <el-form :model="form" >
    <el-form-item label="标题" label-width="85px">
        <el-input v-model="form.title"  />
      </el-form-item>
      <el-form-item label="路由名称" label-width="85px">
        <el-input v-model="form.name"  />
      </el-form-item>
      <el-form-item label="是否是路由" label-width="85px">
        <el-select v-model="form.is_menu" placeholder="选择是否是菜单" style="width: 240px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
      </el-form-item>
  </el-form>
  <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSecondMenu">
          提交
        </el-button>
      </div>
    </template>
</el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {add_secondarymenu,get_secondarymenu} from '@/api/api.js'
import { ElMessage } from 'element-plus'

const second_list = ref([])
const emit = defineEmits(["onSecond_list"])
const props = defineProps({
  folderId:Number
    }) 

const addSecondMenu = () =>{
  console.log("folderId",props.folderId);
  form.value.folder = props.folderId
  add_secondarymenu(form.value).then(() =>{
    get_secondarymenu(props.folderId).then((res) =>{
      second_list.value = res.data
        emit("onSecond_list",second_list.value )
    })  
    ElMessage.success("添加成功")
  }).catch(() =>{
    ElMessage.error("添加失败")
  }).finally(()=>{
    dialogFormVisible.value = false
  })


}


const options =  [
  {
    value:0,
    label:"否"
  },
  {
    value:1,
    label:"是"
  }
]

const form = ref({
  title:"",
  name:"",
  is_menu:null,
  folder:null,
})
const dialogFormVisible = ref(false)
const open = () => {
  dialogFormVisible.value = true
}
const close = () => {
  dialogFormVisible.valuue = false
}

defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>

</style>