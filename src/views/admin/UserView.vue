<script setup>
import { ref, onMounted } from 'vue'
import { get_AdminList, get_role, add_User } from '@/api/api.js'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'

const handleCreateOrUpdate = () => {
  formRef.value.validate(flag => {
    if (!flag) return
    add_User(formData.value).then(res => {
      console.log(res)
      ElMessage.success("添加成功")
      resetForm()
      InitAdminList()
    })
  })
}
const formRef = ref(null)
const resetForm = () => {
  formRef.value.resetFields()
  dialogVisible.value = false
}
const getRoleList = () => {
  get_role().then(res => {
    console.log(res)
    roleList.value = res.data
  })
}
const employeeList = ref([])
const roleList = ref([])
const formData = ref({
  id: undefined,
  name: '',
  username: '',
  password: '',
  phoneNumber: '',
  roles: ''
})
const formRules = ref({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  phoneNumber: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
  roles: [{ required: true, message: '请选择角色', trigger: 'blur' }]
})
const dialogVisible = ref(false)
const params = ref({
  page: 1,
  pageSize: 2,
  name: ''
})
const InitAdminList = () => {
  get_AdminList().then(res => {
    employeeList.value = res.data
  })
}
const searchData = ref({ username: '' })
const total = ref(10)
const loading = false

onMounted(() => {
  InitAdminList()
})
</script>
<template>
  <div class="employee-container">
    <!-- 搜索区域 -->
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="create-container">
        <el-button type="primary" @click="dialogVisible = true"
          >添加员工</el-button
        >
      </div>
      <div class="table">
        <el-table :data="employeeList">
          <el-table-column
            type="index"
            label="序号"
            :index="indexMethod"
            width="100"
            align="center"
          />
          <el-table-column
            label="员工姓名"
            prop="name"
            width="200"
            align="center"
          />
          <el-table-column
            label="登录账号"
            prop="username"
            width="200"
            align="center"
          />
          <el-table-column
            label="联系方式"
            prop="phoneNumber"
            width="300px"
            align="center"
          />
          <el-table-column label="角色" width="200" prop="roles" align="center">
            <template #default="scope">
              <el-tag>
                {{ scope.row.roles_display.title }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            width="400px"
            align="center"
          />
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
            align="center"
          >
            <template #default="scope">
              <el-button size="mini" type="text">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="delEmployee(scope.row.id)"
                >删除</el-button
              >
              <el-button size="mini" type="text">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container">
        <el-pagination
          layout="total,prev, pager, next"
          :page-size="params.pageSize"
          :current-page="params.page"
          :total="total"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? '新增用户' : '修改用户'"
      @close="resetForm"
      @open="getRoleList"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="formData.password" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话号码">
          <el-input v-model="formData.phoneNumber" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="roles" label="角色">
          <el-select v-model="formData.roles" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleCreateOrUpdate"
          :loading="loading"
          >确认</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.table {
  margin-bottom: 20px;
}
.page-container {
  display: flex;
  justify-content: flex-end;
}
</style>
