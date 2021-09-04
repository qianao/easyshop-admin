<template>
    <div>
        <el-card class="crumbs-card">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/main/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/users/adminlist' }">管理员列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-card>
        <el-card class="container">
            {{title}}
        </el-card>
        <div class="container" style="width: 100%;">
            <el-table
                    :data="adminList"
                    border
                    stripe
                    highlight-current-row
                    @current-change="handleColCurrentChange"
                    style="width: 100%;align: center">
                <el-table-column
                        prop="adminId"
                        label="管理员id">
                </el-table-column>
                <el-table-column
                        prop="adminName"
                        label="管理员账号">
                </el-table-column>
                <el-table-column
                        prop="password"
                        label="管理员密码">
                </el-table-column>
                <el-table-column
                        prop="adminMobile"
                        label="管理员手机号">
                </el-table-column>
                <el-table-column
                        prop="adminEmail"
                        label="管理员邮箱">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="status"-->
                <!--label="订单状态"-->
                <!--width="100"-->
                <!--column-key="status"-->
                <!--align='center'-->
                <!--effect="dark"-->
                <!--:filters="[{ text: '待付款', value: '1' }, { text: '待发货', value: '2' }]"-->
                <!--:filter-method="filterStatus"-->
                <!--filter-placement="bottom-end">-->
                <!--<template slot-scope="scope">-->
                <!--<el-tag v-if="scope.row.status == 1" type='danger' disable-transitions>待付款</el-tag>-->
                <!--<el-tag v-else-if="scope.row.status == 2" type='warning' disable-transitions>待发货</el-tag>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="this.page.currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="this.page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminList',
  data () {
    return {
      adminList: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      orderStatus: 1,
      currentRow: null,
      stripe: true
    }
  },
  mounted () {
    this.getAdmin()
  },
  methods: {
    getAdmin () {
      axios.get('api/admin/listPage', {params: {
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize}}).then((res) => {
        if (res.status) {
          this.adminList = res.data.data.records
          this.page = {
            currentPage: res.data.data.current,
            pageSize: res.data.data.size,
            total: res.data.data.total
          }
        }
      }).catch().finally()
    },
    handleSizeChange (curSize) {
      this.page.pageSize = curSize
      this.page.currentPage = 1
      this.getAdmin()
    },
    handleCurrentChange (curPage) {
      console.info('芜湖')
      console.info(curPage)
      this.page.currentPage = curPage
      this.getAdmin()
    },
    handleColCurrentChange (val) {
      this.currentRow = val
    },
    filterStatus (value, row) {
      return row.status === value
    },
    statusChange: function (status) {
      if (status === '待付款') {
        this.orderStatus = 1
        this.page.currentPage = 1
        this.getAdmin()
      } else if (status === '待发货') {
        this.orderStatus = 2
        this.page.currentPage = 1
        this.getAdmin()
      } else if (status === '待收货') {
        this.orderStatus = 3
        this.page.currentPage = 1
        this.getAdmin()
      } else if (status === '待评价') {
        this.orderStatus = 4
        this.page.currentPage = 1
        this.getAdmin()
      } else if (status === '已完成') {
        this.orderStatus = 5
        this.page.currentPage = 1
        this.getAdmin()
      } else if (status === '已关闭') {
        this.orderStatus = 6
        this.page.currentPage = 1
        this.getAdmin()
      }
    }
  }
}
</script>

<style scoped>
    .tab-black{
        color: whitesmoke;
        background-color: darkgray;
    }
    .demo-table-expand {
        font-size:0;
        color: #7c7c7c;
    }
    .demo-table-expand label {
        font-size: 40px;
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
