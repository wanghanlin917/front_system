<script setup>
import { ref, onMounted } from 'vue'
import { get_folderlist } from '@/api/api.js'

const state = ref({
  firstLoading: false,
  firstList: [],
  firstSelected: 1
})
const initFolder = () => {
  get_folderlist().then(res => {
    console.log('folder', res)
    state.value.firstList = res.data
  })
}
function doRowClass (target) {
  return function ({ row }) {
    console.log('row', row)
    console.log(target)

    if (row.id === target) {
      console.log('hahah')
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
      <el-col :span="6" v-loading="state.firstLoading">
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
            :row-class-name="doRowClass(1)"
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
