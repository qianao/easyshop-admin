<template>
    <div>
        <el-card class="crumbs-card">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/main/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/orders/list' }">订单列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-card>
        <el-card class="container">
            {{title}}
        </el-card>
        <div class="container" style="width: 100%;">
            <div style="margin: auto;">
                <el-radio-group v-model="radio1" fill="#3DB6F3" @change="statusChange">
                    <el-radio-button label="待付款"></el-radio-button>
                    <el-radio-button label="待发货"></el-radio-button>
                    <el-radio-button label="待收货"></el-radio-button>
                    <el-radio-button label="待评价"></el-radio-button>
                    <el-radio-button label="已完成"></el-radio-button>
                    <el-radio-button label="已关闭"></el-radio-button>
                </el-radio-group>
            </div>
            <el-table
                    :data="orderList"
                    border
                    stripe
                    highlight-current-row
                    @current-change="handleColCurrentChange"
                    style="width: 100%;align: center">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="物流单号">
                                <span>{{ props.row.deliveryFlowId}}</span>
                            </el-form-item>
                            <el-form-item label="配送方式">
                                <span>{{ props.row.deliveryType }}</span>
                            </el-form-item>
                            <el-form-item label="运费">
                                <span>{{ props.row.orderFreight }}</span>
                            </el-form-item>
                            <el-form-item label="地址">
                                <span>{{ props.row.receiverAddress }}</span>
                            </el-form-item>
                            <el-form-item label="订单价格">
                                <span>{{ props.row.totalAmount }}</span>
                            </el-form-item>
                            <el-form-item label="支付金额">
                                <span>{{ props.row.actualAmount }}</span>
                            </el-form-item>
                            <el-form-item label="支付方式">
                                <span>{{ props.row.payType }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.orderRemark }}</span>
                            </el-form-item>
                            <el-form-item label="付款时间">
                                <span>{{ props.row.payTime }}</span>
                            </el-form-item>
                            <el-form-item label="发货时间">
                                <span>{{ props.row.deliveryTime }}</span>
                            </el-form-item>
                            <el-form-item label="完成时间">
                                <span>{{ props.row.flishTime }}</span>
                            </el-form-item>
                            <el-form-item label="取消时间">
                                <span>{{ props.row.cancelTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="orderId"
                        label="订单号">
                </el-table-column>
                <el-table-column
                        prop="receiverName"
                        label="收货人姓名">
                </el-table-column>
                <el-table-column
                        prop="receiverMobile"
                        label="手机号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="actualAmount"
                        label="支付金额">
                </el-table-column>
                <el-table-column
                        prop="deliveryType"
                        label="配送方式"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="订单状态"
                        width="100"
                        column-key="status"
                        align='center'
                        effect="dark"
                        :filters="[{ text: '待付款', value: '1' }, { text: '待发货', value: '2' },
                             { text: '待收货', value: '3' }, { text: '待评价', value: '4' },
                             { text: '已完成', value: '5' }, { text: '已关闭', value: '6' }]"
                        :filter-method="filterStatus"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 1" type='danger' disable-transitions>待付款</el-tag>
                        <el-tag v-else-if="scope.row.status == 2" type='warning' disable-transitions>待发货</el-tag>
                        <el-tag v-else-if="scope.row.status == 3" type='success' disable-transitions>待收货</el-tag>
                        <el-tag v-else-if="scope.row.status == 4"  disable-transitions>待评价</el-tag>
                        <el-tag v-else-if="scope.row.status == 5" type='info' disable-transitions>已完成</el-tag>
                        <el-tag v-else-if="scope.row.status == 6" class="tab-black" disable-transitions>已关闭</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="400">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteOrder(scope.row.orderId)">删除</el-button>
                        <el-button type="text" @click="getItem(scope.row.orderId)">查看订单项</el-button>
                        <div v-if="scope.row.status == 2" style="display: inline;">
                            <el-button type="text" @click="deliver(scope.row.orderId)">发货</el-button>
                        </div>
                        <div v-if="scope.row.status == 3" style="display: inline;">
                            <el-button type="text" @click="checkDeliver(scope.row.orderId)">确认收货</el-button>
                        </div>
                    </template>
                </el-table-column>
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
        <el-dialog title="订单项" :visible.sync="dialogTableVisible">
            <el-table :data="curOrderItemList">
                <el-table-column property="itemId" label="订单项id"></el-table-column>
                <el-table-column property="productId" label="商品id"></el-table-column>
                <el-table-column property="productName" label="商品名称"></el-table-column>
                <el-table-column property="productPrice" label="商品价格"></el-table-column>
                <el-table-column property="buyCounts" label="购买数量"></el-table-column>
                <el-table-column property="totalAmount" label="商品总金额"></el-table-column>
                <el-table-column property="isComment" label="是否评论"></el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>订单删除成功</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDeliver"
                width="30%"
                :before-close="handleClose">
            <span>订单发货成功</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisibleDeliver = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisibleCheckDeliver"
                width="30%"
                :before-close="handleClose">
            <span>订单收货成功</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisibleCheckDeliver = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OrderList',
  data () {
    return {
      orderList: [],
      curOrderItemList: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      orderStatus: 1,
      radio1: '待付款',
      currentRow: null,
      stripe: true,
      curOrderId: 0,
      dialogTableVisible: false,
      dialogVisible: false,
      dialogVisibleDeliver: false,
      dialogVisibleCheckDeliver: false
    }
  },
  mounted () {
    this.getOrders()
  },
  methods: {
    getOrders () {
      axios.get('api/orders/listPageWithStatus', {params: {
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize,
        status: this.orderStatus}}).then((res) => {
        if (res.status) {
          this.orderList = res.data.data.records
          this.page = {
            currentPage: res.data.data.current,
            pageSize: res.data.data.size,
            total: res.data.data.total
          }
        }
      }).catch().finally()
    },
    getItem (oid) {
      this.curOrderId = oid
      this.getOrderItems()
      this.dialogTableVisible = true
    },
    deleteOrder (oid) {
      this.curOrderId = oid
      axios.get('api/orders/deleteWithItemsById', {params: {
        orderId: this.curOrderId}}).then((res) => {
        if (res.status) {
          this.dialogVisible = true
          this.getOrders()
        }
      }).catch().finally()
    },
    deliver (oid) {
      this.curOrderId = oid
      axios.get('api/orders/updateStatusTo3ById', {params: {
        orderId: this.curOrderId}}).then((res) => {
        if (res.status) {
          this.dialogVisibleDeliver = true
          this.getOrders()
        }
      }).catch().finally()
    },
    checkDeliver (oid) {
      this.curOrderId = oid
      axios.get('api/orders/updateStatusTo4ById', {params: {
        orderId: this.curOrderId}}).then((res) => {
        if (res.status) {
          this.dialogVisibleCheckDeliver = true
          this.getOrders()
        }
      }).catch().finally()
    },

    getOrderItems () {
      axios.get('api/orderItem/listItemsByOrderId', {params: {
        orderId: this.curOrderId}}).then((res) => {
        if (res.status) {
          this.curOrderItemList = res.data.data
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
