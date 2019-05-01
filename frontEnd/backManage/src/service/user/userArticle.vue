<template>
    <div class="userArticle">
        <div class="userArticle-header">
            <ul>
                <li>
                    <span>发布时间</span>
                    <el-date-picker
                        v-model="searchData.newsDate"
                        size="small"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp">
                    </el-date-picker>
                </li>
                <li>
                    <span>作者</span>
                    <el-input size="small" v-model="searchData.userName" placeholder="请输入用户名进行查询"></el-input>
                </li>
                <li>
                    <span>文章标题</span>
                    <el-input size="small" v-model="searchData.articleName" placeholder="请输入文章标题进行查询"></el-input>
                </li>
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
            </ul>
        </div>
        <div class="userArticle-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <!-- <el-table-column align="center" prop="date" label="文章发布时间" width="200"></el-table-column> -->
                <el-table-column align="center" prop="articleName" label="文章标题" width="180"></el-table-column>
                <el-table-column align="center" prop="userName" label="作者" width="180"></el-table-column>
                <el-table-column align="center" label="内容" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showItemHandler(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteItemHandler(scope.row)" class="text-danger" :disabled="scope.row.status == 0">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="pager.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pager.total">
        </el-pagination>
        <el-dialog title="文章详情" :visible.sync="dialogDetaileVisible">
            <div v-html="articleDetaile" class="articleDetaile"></div>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/user/userArticle.js"
import {formatDate} from '../../util/base'

export default {
    name: 'userArticle',
    data () {
        return {
            searchData:{},//搜索的信息
            tableData:[],//列表数组
            multipleSelection: [],//选中的数据
            pager: {    //分页相关数据
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            tableListHeight:0,//表格高度
            loading: true,//表格加载
            dialogDetaileVisible:false,//是否显示详情弹窗
            articleDetaile:'',//文章详情
        }
    },
    created(){
        this.getTableData();
    },
    mounted() {
        setTimeout(() => {
            this.resizeTableHeight1();
        }, 200)
    },
    methods:{
        //设置表格高度
        resizeTableHeight1() {
            let searchDiv = document.querySelector('.userArticle-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.userArticle-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
        },
        //获取表格数据
        getTableData(){
            var _this = this;
            // var data = {
            //     userId: userId,
            //     pageNo: this.pager.currentPage,
            //     pageSize: this.pager.pageSize
            // };
            PageData.listInfo().then(function(d) {
                if (d.resultcode == '0000') {
                    _this.loading = false;
                    _this.tableData = d.data.array;
                    // _this.pager.pageNo = d.resultJson.pageNum;
                    // _this.pager.totalPage = d.resultJson.totalPage;
                    // _this.pager.total = d.resultJson.count;
                } else {
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            });
        },
        //删除用户
        deleteItemHandler(){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //全部删除
        allDelete(){
            var data = [];
            if(this.multipleSelection.length!=0){
                this.$confirm('此操作将永久删除所有选中的用户, 是否继续?', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    for(var i=0;i<this.multipleSelection.length;i++){
                        data.push(this.multipleSelection[i].id)
                    }
                    PageData.deleteAll(data).then(d => {
                        if (d.resultCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.multipleSelection = []
                            this.getTableData();
                        } else {
                            this.$message({
                                type: "warning",
                                message: d.resultMessage
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选中后再删除'
                }); 
            } 
        },
        //点击详情
        showItemHandler(val){
            this.dialogDetaileVisible = true;
            this.articleDetaile = val.articleTxt
        },
        //表格选中项有变化时触发
        handleSelectionChange(val){
            this.multipleSelection = val;
            if(val.length!=0){
                this.resizeTableHeight2()
            }else{
                this.resizeTableHeight1();
            } 
        },
        //每页显示条目个数改变时会触发
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //当前页数改变时会触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style scoped>
.userArticle-header ul {
    list-style: none;
    overflow: auto;
}
.userArticle-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.userArticle-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.userArticle-con{
    margin-top:10px;
}
.userArticle-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.userArticle-con .text-danger{
  color: #F56C6C;
}
.userArticle-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.articleDetaile{
    line-height: 25px;
    height: 400px;
    overflow-y: auto;
}
</style>
