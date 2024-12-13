<script setup>
import { ref, onMounted } from 'vue'
import { get_role } from '@/api/api.js'
import RoleDrawer from '@/components/RoleDrawer.vue'

const roleRef = ref(null)
const state = ref({
  roleLoading: false,
  roleSelected: 0,
  roleList: []
})
// const roleDialog = ref({
//   dialogVisible: false
// })

const showDraw = () => {
  roleRef.value.open()
  console.log('hahah')
}
const clickRoleRow = row => {
  state.value.roleSelected = row.id
}

function doRowClass (target) {
  return function ({ row }) {
    if (row.id === target) {
      return 'row-active'
    }
    return ''
  }
}

const InitRoleList = () => {
  get_role().then(res => {
    // console.log(res)
    state.value.roleList = res.data
  })
}

onMounted(() => {
  InitRoleList()
})
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" v-loading="state.roleLoading">
        <el-card
          class="box-card"
          shadow="never"
          :body-style="{ padding: '0px' }"
        >
          <template #header>
            <div class="card-header">
              <span>角色列表</span>
              <el-button
                @click="showDraw"
                size="small"
                type="success"
                class="button"
                >新建
              </el-button>
            </div>
          </template>
          <el-table
            :data="state.roleList"
            style="width: 100%"
            size="small"
            :row-class-name="doRowClass(state.roleSelected)"
          >
            <el-table-column prop="title" label="标题" align="center">
              <template #default="scope">
                <el-link
                  @click="clickRoleRow(scope.row)"
                  style="font-size: 12px"
                  :underline="false"
                >
                  {{ scope.row.title }}
                </el-link>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-popconfirm
                  cancel-button-type="danger"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="confirmRoleDelete(scope.row)"
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
  <RoleDrawer @submit="onSubmit" title="添加用户" ref="roleRef">
    <el-form ref="roleRef" :rules="roleRules" :model='form' label-width="80px" size="small">
      
      </el-form>
    
  </RoleDrawer>
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
