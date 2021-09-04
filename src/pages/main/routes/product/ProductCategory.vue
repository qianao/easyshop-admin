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
        <div class="container" style="width: 70%; margin:auto">
            <el-table
                    :data="categoryList"
                    border
                    stripe
                    highlight-current-row
                    @current-change="handleColCurrentChange"
                    style="width: 100%;margin:auto">
                <el-table-column
                        prop="categoryId"
                        label="分类id"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="分类名称">
                </el-table-column>
                <el-table-column
                        prop="categoryLevel"
                        label="分类级别"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="parentId"
                        label="父分类id">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template v-if="scope.row.categoryLevel==3" slot-scope="scope">
                        <el-button type="text" @click="getProd(scope.row.categoryId)">查看此类商品</el-button>
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
        <el-dialog title="此类商品" :visible.sync="dialogTableVisible">
            <el-table :data="cateProductList">
                <el-table-column property="productId" label="商品id"></el-table-column>
                <el-table-column property="productName" label="商品名称"></el-table-column>
                <el-table-column property="soldNum" label="累计销量"></el-table-column>
                <el-table-column property="productStatus" label="商品状态">
                    <template slot-scope="props">
                        <span v-if="props.row.productStatus==1">上架</span>
                        <span v-if="props.row.productStatus==0">下架</span>
                    </template>
                </el-table-column>
                <el-table-column property="content" label="商品内容"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProductCategory',
  data () {
    return {
      categoryList: [],
      cateProductList: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      orderStatus: 1,
      currentRow: null,
      stripe: true,
      curCateId: 0,
      dialogTableVisible: false
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      axios.get('api/category/listPage', {params: {
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize}}).then((res) => {
        if (res.status) {
          this.categoryList = res.data.data.records
          this.page = {
            currentPage: res.data.data.current,
            pageSize: res.data.data.size,
            total: res.data.data.total
          }
        }
      }).catch().finally()
    },
    getProd (oid) {
      this.curCateId = oid
      this.getProductList()
      this.dialogTableVisible = true
    },
    getProductList () {
      axios.get('api/product/listProductByCateId', {params: {
        categoryId: this.curCateId}}).then((res) => {
        if (res.status) {
          this.cateProductList = res.data.data
        }
      }).catch().finally()
    },
    handleSizeChange (curSize) {
      this.page.pageSize = curSize
      this.page.currentPage = 1
      this.getCategory()
    },
    handleCurrentChange (curPage) {
      console.info('芜湖')
      console.info(curPage)
      this.page.currentPage = curPage
      this.getCategory()
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
        this.getCategory()
      } else if (status === '待发货') {
        this.orderStatus = 2
        this.page.currentPage = 1
        this.getCategory()
      } else if (status === '待收货') {
        this.orderStatus = 3
        this.page.currentPage = 1
        this.getCategory()
      } else if (status === '待评价') {
        this.orderStatus = 4
        this.page.currentPage = 1
        this.getCategory()
      } else if (status === '已完成') {
        this.orderStatus = 5
        this.page.currentPage = 1
        this.getCategory()
      } else if (status === '已关闭') {
        this.orderStatus = 6
        this.page.currentPage = 1
        this.getCategory()
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
