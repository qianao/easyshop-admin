<template>
    <div>
        <el-card class="crumbs-card">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/main/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/users/useraddrlist' }">用户地址管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-card>
        <el-card class="container">
            {{title}}
        </el-card>
        <div class="container" style="width: 100%;">
            <el-table
                    :data="userAddrList"
                    border
                    stripe
                    highlight-current-row
                    @current-change="handleColCurrentChange"
                    style="width: 100%;align: center">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="省份">
                                <span>{{ props.row.province}}</span>
                            </el-form-item>
                            <el-form-item label="城市">
                                <span>{{ props.row.city}}</span>
                            </el-form-item>
                            <el-form-item label="区县">
                                <span>{{ props.row.area}}</span>
                            </el-form-item>
                            <el-form-item label="详细地址">
                                <span>{{ props.row.addr}}</span>
                            </el-form-item>
                            <el-form-item label="邮政编码">
                                <span>{{ props.row.postCode}}</span>
                            </el-form-item>
                            <el-form-item label="是否默认地址">
                                <span v-if="props.row.commonAddr==0">否</span>
                                <span v-if="props.row.commonAddr==1">是</span>
                            </el-form-item>
                            <el-form-item label="地址创建时间">
                                <span>{{ props.row.gmtCreate}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="addrId"
                        label="地址id">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="用户id">
                </el-table-column>
                <el-table-column
                        prop="receiverName"
                        label="收件人">
                </el-table-column>
                <el-table-column
                        prop="receiverMobile"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="城市">
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
  name: 'UserAddrList',
  data () {
    return {
      userAddrList: [],
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
    this.getUsers()
  },
  methods: {
    getUsers () {
      axios.get('api/userAddr/listPage', {params: {
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize}}).then((res) => {
        if (res.status) {
          this.userAddrList = res.data.data.records
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
      this.getOrders()
    },
    handleCurrentChange (curPage) {
      console.info('芜湖')
      console.info(curPage)
      this.page.currentPage = curPage
      this.getOrders()
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
        this.getOrders()
      } else if (status === '待发货') {
        this.orderStatus = 2
        this.page.currentPage = 1
        this.getOrders()
      } else if (status === '待收货') {
        this.orderStatus = 3
        this.page.currentPage = 1
        this.getOrders()
      } else if (status === '待评价') {
        this.orderStatus = 4
        this.page.currentPage = 1
        this.getOrders()
      } else if (status === '已完成') {
        this.orderStatus = 5
        this.page.currentPage = 1
        this.getOrders()
      } else if (status === '已关闭') {
        this.orderStatus = 6
        this.page.currentPage = 1
        this.getOrders()
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
