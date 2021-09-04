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
        <div class="container" style="width: 90%; margin:auto">
            <el-table
                    :data="getCategory"
                    border
                    stripe
                    highlight-current-row
                    @current-change="handleColCurrentChange"
                    style="width: 90%;margin:auto">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="创建时间">
                                <span>{{ props.row.gmtCreat}}</span>
                            </el-form-item>
                            <el-form-item label="商品状态">
                                <span v-if="props.row.productStatus=='1'">正常上架</span>
                                <span v-if="props.row.productStatus=='0'">下架</span>
                            </el-form-item>
                            <el-form-item label="商品内容">
                                <span>{{ props.row.content}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productId"
                        label="商品id"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="productName"
                        label="商品名称">
                </el-table-column>
                <el-table-column
                        prop="categoryId"
                        label="分类id"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="rootCategoryId"
                        label="根分类id">
                </el-table-column>
                <el-table-column
                        prop="soldNum"
                        label="累计销量">
                </el-table-column>
                <el-table-column
                        prop="rootCategoryId"
                        label="根分类id">
                </el-table-column>
                <el-table-column
                        prop="gmtCreat"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="getCom(scope.row.productId)">查看评价</el-button>
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
                    :total="this.page.total"
                    style="margin:auto">
            </el-pagination>
        </div>
        <el-dialog title="商品评价" :visible.sync="dialogTableVisible">
            <el-table :data="productCommentList">
                <el-table-column property="commId" label="评论id"></el-table-column>
                <el-table-column property="orderItemId" label="订单项id"></el-table-column>
                <el-table-column property="userId" label="评论用户id"></el-table-column>
                <el-table-column property="isAnonymous" label="是否匿名">
                    <template slot-scope="props">
                        <span v-if="props.row.isAnonymous==1">是</span>
                        <span v-if="props.row.isAnonymous==0">否</span>
                    </template>
                </el-table-column>
                <el-table-column property="commLevel" label="评价级别">
                    <template slot-scope="props">
                        <span v-if="props.row.commLevel==1">好评</span>
                        <span v-if="props.row.commLevel==2">中评</span>
                        <span v-if="props.row.commLevel==3">差评</span>
                    </template>
                </el-table-column>
                <el-table-column property="commContent" label="评论内容"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Product',
  data () {
    return {
      productList: [],
      productCommentList: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      orderStatus: 1,
      currentRow: null,
      stripe: true,
      dialogTableVisible: false,
      curProdId: 0
    }
  },
  mounted () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      axios.get('api/product/listPage', {params: {
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize}}).then((res) => {
        if (res.status) {
          this.getCategory = res.data.data.records
          this.page = {
            currentPage: res.data.data.current,
            pageSize: res.data.data.size,
            total: res.data.data.total
          }
        }
      }).catch().finally()
    },
    getProductComment () {
      axios.get('api/productComments/listProdCommentsByProdId', {params: {
        productId: this.curProdId}}).then((res) => {
        if (res.status) {
          this.productCommentList = res.data.data
        }
      }).catch().finally()
    },
    getCom (pid) {
      this.curProdId = pid
      this.getProductComment()
      this.dialogTableVisible = true
    },
    handleSizeChange (curSize) {
      this.page.pageSize = curSize
      this.page.currentPage = 1
      this.getProduct()
    },
    handleCurrentChange (curPage) {
      console.info('芜湖')
      console.info(curPage)
      this.page.currentPage = curPage
      this.getProduct()
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
        this.getProduct()
      } else if (status === '待发货') {
        this.orderStatus = 2
        this.page.currentPage = 1
        this.getProduct()
      } else if (status === '待收货') {
        this.orderStatus = 3
        this.page.currentPage = 1
        this.getProduct()
      } else if (status === '待评价') {
        this.orderStatus = 4
        this.page.currentPage = 1
        this.getProduct()
      } else if (status === '已完成') {
        this.orderStatus = 5
        this.page.currentPage = 1
        this.getProduct()
      } else if (status === '已关闭') {
        this.orderStatus = 6
        this.page.currentPage = 1
        this.getProduct()
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
