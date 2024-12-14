<script setup>
import { ref, onMounted } from 'vue'
import { get_role } from '@/api/api.js'
import RoleDrawer from '@/components/RoleDrawer.vue'

const roleRef = ref(null)
const role = ref(null)
const state = ref({
  roleLoading: false,
  roleSelected: 0,
  roleList: []
})
const form = ref({
  role:""
})
const roleRules = ref({
  role:[{require:true,message:'角色不能为空',trigger:'blur'}]
})
const showDraw = () => {
  roleRef.value.open()
  console.log('hahah')
}
const onClose = () =>{
  roleRef.value.close()
  console.log("hahahah",roleRef.value);
}
const onSubmit = () =>{
  console.log("hhddlk");
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
  <role-drawer @closed="onClose" @submit="onSubmit" title="添加角色" ref="roleRef">
    <el-form ref="role" :rules="roleRules" :model='form' label-width="80px" size="small">
        <!-- <el-input v-model="form.role" placeholder="请输入角色"></el-input> -->
      </el-form>
    
  </role-drawer>
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
