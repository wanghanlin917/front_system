<template>
  <el-dialog v-model="dialogFormVisible" title="添加权限" width="450px">
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="标题" label-width="80px" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="API代码" label-width="80px" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="方法" label-width="80px" prop="method">
        <el-select
          v-model="form.method"
          placeholder="选择方法"
          style="width: 240px"
        >
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
        <el-button type="primary" @click="addPermission"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { add_permission, get_permission } from '@/api/api.js'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  name: [{ required: true, message: '请输入API代码', trigger: 'blur' }],
  method: [{ required: true, message: '请输入方法', trigger: 'blur' }]
})

const options = [
  {
    value: 'GET',
    label: 'GET'
  },
  {
    value: 'POST',
    label: 'POST'
  },
  {
    value: 'PUT',
    label: 'PUT'
  },
  {
    value: 'DELETE',
    label: 'DELETE'
  }
]

const form = ref({
  title: '',
  name: '',
  method: '',
  router: null
})
const permission_list = ref([])
const emit = defineEmits(['permission_list'])

const props = defineProps({
  routerId: Number
})

const addPermission = () => {
  // console.log("1111",props.routerId);
  formRef.value.validate(valid => {
    console.log(valid)
    if (valid) {
      form.value.router = props.routerId
      add_permission(form.value)
        .then(() => {
          get_permission(props.routerId).then(res => {
            permission_list.value = res.data
            emit('permission_list', permission_list.value)
            formRef.value.resetField()
          })

          ElMessage.success('添加成功')
        })
        .catch(res => {
          console.log(res)
        })
        .finally(() => {
          dialogFormVisible.value = false
        })
    }
  })
}

const dialogFormVisible = ref(false)
const open = () => {
  dialogFormVisible.value = true
}
const close = () => {
  dialogFormVisible.value = false
}
defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped></style>
