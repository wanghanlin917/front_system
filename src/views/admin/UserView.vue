<script setup>
import {ref} from 'vue'
const employeeList = ref([])

employeeList.value = [{'name':'jk','username':'jk','phonenumber':'12520332','roleName':'CEO','createTime':'2024.12.19'}]

const params = ref({
  page: 1,
  pageSize: 2,
  name: ''
})

const total = ref(10)


</script>
<template>
  <div class="employee-container">
        <!-- 搜索区域 -->
        <div class="search-container">
      <div class="search-label">员工姓名：</div>
      <el-input clearable placeholder="请输入内容" class="search-main" />
      <el-button type="primary">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="addEmployee">添加员工</el-button>
    </div>
    <div class="table">
      <el-table style="width: 100%" :data="employeeList" >
        <el-table-column type="index" label="序号" :index="indexMethod" width='100px' />
        <el-table-column label="员工姓名" width="180" prop="name" />
        <el-table-column label="登录账号" width="180" prop="username" />
        <el-table-column label="联系方式" width="120" prop="phonenumber" />
        <el-table-column label="角色" width="120" prop="roleName" />
        <el-table-column label="添加时间" prop="createTime" width="100px" />
        <el-table-column label="操作" fixed="right" width="200">
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
        layout="prev, pager, next"
        :page-size="params.pageSize"
        :total="total"
        @current-change="pageChange"
      />
    </div>

    </div>
</template>



<style lang="scss" scoped>
.employee-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container {
  margin: 10px 0px;
}
.page-container {
  padding: 4px 0px;
  text-align: right;
}
.form-container {
  padding: 0px 80px;
}
</style>
