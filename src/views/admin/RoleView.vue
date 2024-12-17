<script setup>
import { ref, onMounted } from 'vue'
import { get_role, add_role, del_role,get_permissionValue } from '@/api/api.js'
import RoleDrawer from '@/components/RoleDrawer.vue'
import { ElMessage } from 'element-plus'
import { id } from 'element-plus/es/locales.mjs';

const doSavePermission = () => {

  console.log('save')
}
const defaultProps = ref({
  label:"title"
})
const roleRef = ref(null)
const roleDataRef = ref(null)
const state = ref({
  roleLoading: false,
  permissionLoading: false,
  roleSelected: 0,
  roleList: [],
  treeList: []
})
// state.value.treeList = [{id:1,title:"m1",children:[{id:10,title:"c1",children:[{id:30,title:"d1"}]}]},{id:2,title:"m2"},{id:3,title:"m3"}]
const form = ref({
  role: ''  
})
const roleRules = ref({
  role: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
})
const confirmRoleDelete = row => {
  console.log(row.id)
  del_role(row.id).then(() => {
    InitRoleList()
    ElMessage.success('删除成功')
  })
}
const showDraw = () => {
  roleRef.value.open()
  console.log('hahah')
}
const onClose = () => {
  roleDataRef.value.resetFields()
  roleRef.value.close()
  // console.log("hahahah",roleRef.value);
}
const onSubmit = () => {
  // roleRef.value.showLoading()
  // console.log("hhddlk");
  roleDataRef.value.validate(valid => {
    if (!valid) return
    roleRef.value.showLoading()
    add_role({ title: form.value.role })
      .then(res => {
        console.log(res)
        get_role().then(res => {
          state.value.roleList = res.data
        })
        ElMessage.success('添加成功')
      })
      .finally(() => {
        roleRef.value.hideLoading()
        onClose()
      })
  })
}
const clickRoleRow = row => {
  state.value.roleSelected = row.id
}

// function doRowClass (target) {
//   return function ({ row }) {
//     if (row.id === target) {
//       return 'row-active'
//     }
//     return ''
//   }
// }
const doRowClass = (target) =>{
  return ({row}) => {
    console.log({row});
    if(row.id===target){
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
const InitPermissionTotal = () =>{
  state.value.permissionLoading = true
  get_permissionValue().then(res=>{
    state.value.treeList =res.data
    console.log("全部权限",res);
    state.value.permissionLoading = false
  })
}

onMounted(() => {
  InitRoleList()
  InitPermissionTotal()
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
      <el-col :span="19" v-loading="state.permissionLoading">
        <el-card
          class="box-card"
          shadow="never"
          :body-style="{ padding: '0px' }"
        >
          <template #header>
            <div class="card-header">
              <span>分配权限</span>
              <el-button
                @click="doSavePermission"
                v-if="state.roleSelected > 0"
                size="small"
                type="success"
                class="button"
                >保存
              </el-button>
            </div>
          </template>
          <div
            style="
              color: #d4d4d4;
              padding: 10px 5px;
              font-size: 13px;
              border-bottom: 1px solid #e4e7ed;
            "
          >
            提示：请先选择角色，然后再分配权限
          </div>
          <div class="tree-wrapper">
          <div v-for="item in state.treeList" :key="item.id" class="tree-item">
            <div class="tree-title">{{ item.title }}</div>
            <el-tree ref="treeRef" :show-checkbox="state.roleSelected>0" :data="item.children" node-key="id" :props="defaultProps" show-checkbox :default-expand-all="true"></el-tree>
          </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <role-drawer
    @closed="onClose"
    @submit="onSubmit"
    title="添加角色"
    ref="roleRef"
  >
    <el-form
      ref="roleDataRef"
      :rules="roleRules"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="角色名称" label-width="80px" prop="role">
        <el-input
          v-model="form.role"
          placeholder="请输入角色"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
  </role-drawer>
</template>

<style lang="scss" scoped>
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
.tree-wrapper{
  display: flex;
  justify-content: space-between;
  .tree-item{
    flex: 1;
    border-right: 1px solid #e4e7ec;
    padding: 0px 4px;
    text-align: center;
    .tree-title{
      background:#f5f7fa;
      text-align: center;
      padding: 10px 0;
      margin-bottom: 12px;
    }
  }
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
