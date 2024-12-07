<script setup>
import { ref, onMounted } from 'vue'
import {
  get_folderlist,
  del_folder,
  get_secondarymenu,
  del_secondarymenu
} from '@/api/api.js'
import { ElMessage } from 'element-plus'

const state = ref({
  firstDialogVisible: false,
  firstLoading: false,
  firstList: [],
  firstSelected: 0,

  secondLoading: false,
  secondList: [],
  secondSelected: 0
})
const initFolder = () => {
  state.value.firstLoading = true
  get_folderlist().then(res => {
    console.log('folder', res)
    state.value.firstList = res.data
    state.value.firstLoading = false
  })
}
const confirmFirstDelete = row => {
  console.log('row', row.id)
  del_folder(row.id)
    .then(res => {
      console.log(res)
      initFolder()
      ElMessage.success('删除成功')
    })
    .catch(() => ElMessage.error('删除失败'))
}
const confirmSecondDelete = row => {
  // console.log(row.id)
  del_secondarymenu(row.id).then(() => {
    state.value.secondList = state.value.secondList.filter(item => {
      return item.id !== row.id
    })
    if (row.id === state.value.secondSelected) {
      state.value.secondSelected = 0
    }
  })
}

const clickFirstRow = row => {
  // console.log(row.id)
  state.value.firstSelected = row.id
  state.value.secondList = []
  state.value.secondSelected = 0
  state.value.secondLoading = true
  get_secondarymenu(row.id).then(res => {
    console.log('second', res)
    state.value.secondList = res.data
    state.value.secondLoading = false
  })
}
const clickSecondRow = row => {
  state.value.secondSelected = row.id
  // console.log(row.id)
}
function doRowClass (target) {
  return function ({ row }) {
    if (row.id === target) {
      return 'row-active'
    }
    return ''
  }
}
onMounted(() => {
  initFolder()
})
</script>
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" v-loading="state.firstLoading">
        <el-card
          class="box-card"
          shadow="never"
          :body-style="{ padding: '0px' }"
        >
          <template #header>
            <div class="card-header">
              <span>一级菜单</span>
              <el-button
                size="small"
                type="success"
                class="button"
                @click="state.firstDialogVisible = true"
                >新建
              </el-button>
            </div>
          </template>
          <el-table
            :data="state.firstList"
            style="width: 100%"
            size="small"
            :row-class-name="doRowClass(state.firstSelected)"
          >
            <el-table-column prop="title" label="标题" align="center">
              <template #default="scope">
                <el-link
                  @click="clickFirstRow(scope.row)"
                  style="font-size: 12px"
                  :underline="false"
                >
                  {{ scope.row.title }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
              <template #default="scope">
                <el-icon>
                  <component :is="scope.row.icon"></component>
                </el-icon>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-popconfirm
                  cancel-button-type="danger"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="confirmFirstDelete(scope.row)"
                  title="是否确定删除?"
                >
                  <template #reference>
                    <el-button
                      size="small"
                      type="danger"
                      icon="Delete"
                      class="confirm-delete"
                    ></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8" v-loading="state.secondLoading">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <template #header>
            <div class="card-header">
              <span>二级菜单（路由）</span>
              <el-button
                v-if="state.firstSelected"
                size="small"
                type="success"
                class="button"
                >新建
              </el-button>
            </div>
          </template>
          <el-table
            :data="state.secondList"
            style="width: 100%"
            size="small"
            :row-class-name="doRowClass(state.secondSelected)"
          >
            <el-table-column prop="title" label="标题" align="center">
              <template #default="scope">
                <el-link
                  @click="clickSecondRow(scope.row)"
                  style="font-size: 12px"
                  :underline="false"
                >
                  {{ scope.row.title }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="路由" align="center" />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-popconfirm
                  cancel-button-type="danger"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="confirmSecondDelete(scope.row)"
                  title="是否确定删除?"
                >
                  <template #reference>
                    <el-button
                      size="small"
                      type="danger"
                      icon="Delete"
                      class="confirm-delete"
                    ></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <template #header>
            <div class="card-header">
              <span>权限列表</span>
              <el-button
                @click="state.thirdDialog.dialogVisible = true"
                v-if="state.secondSelected"
                size="small"
                type="success"
                class="button"
                >新建
              </el-button>
            </div>
          </template>
          <el-table :data="state.thirdList" style="width: 100%" size="small">
            <el-table-column prop="title" label="标题" align="center" />
            <el-table-column prop="name" label="API代码" align="center" />
            <el-table-column prop="method" label="方法" align="center" />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-popconfirm
                  cancel-button-type="danger"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="confirmThirdDelete(scope.row)"
                  title="是否确定删除?"
                >
                  <template #reference>
                    <el-button
                      size="small"
                      type="danger"
                      icon="Delete"
                      class="confirm-delete"
                    ></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.confirm-delete {
  padding: 0 2px;
  font-size: 12px;
  height: 18px;
  width: 18px;
}
</style>
<style>
.el-table .row-active {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}

.el-table .row-active .el-link__inner {
  color: #409eff;
}
</style>
