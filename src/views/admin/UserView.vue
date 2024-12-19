<script setup>
import { ref } from 'vue'
const employeeList = ref([])

employeeList.value = [
  {
    name: 'jk',
    username: 'jk',
    phoneNumber: '12520332666',
    roleName: 'CEO',
    createTime: '2024.12.19'
  }
]

const params = ref({
  page: 1,
  pageSize: 2,
  name: ''
})

const searchData = ref({ username: '' })

const total = ref(10)
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
        <el-button type="primary" @click="addEmployee">添加员工</el-button>
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
          <el-table-column
            label="角色"
            width="200"
            prop="roleName"
            align="center"
          />
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
        <!-- <template> -->
        <el-pagination
          layout="total,prev, pager, next"
          :page-size="params.pageSize"
          :current-page="params.page"
          :total="total"
          @current-change="pageChange"
        >
          <template #total> 共 {{ total }} 条 </template>
        </el-pagination>
        <!-- </template> -->
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
// .employee-container {
//   // display: flex;
//   // justify-content: space-between;
//   // margin-bottom: 20px;
//   padding: 10px;
// }

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
// .create-container {
//   margin: 10px 0px;
// }
// .page-container {
//   padding: 4px 0px;
//   // text-align: right;
//   // float: right;
//   margin-left: 777px;
// }
// .form-container {
//   padding: 0px 80px;
// }
</style>
