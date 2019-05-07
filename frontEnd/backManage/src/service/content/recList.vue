<template>
    <div class="recList">
        <div class="recList-header">
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
                    <span>文章标题</span>
                    <el-input size="small" v-model="searchData.articleName" placeholder="请输入文章标题进行查询"></el-input>
                </li>
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
                
                <li>
                    <el-button type="success" size="small" @click="addArticleHandler">添加文章</el-button>
                </li>
            </ul>
        </div>
        <div class="recList-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column  align="center" type="index" label="序号" width=""></el-table-column>
                <el-table-column align="center" prop="date" label="文章发布时间" width="200"></el-table-column>
                <el-table-column align="center" prop="articleName" label="文章标题" width="180"></el-table-column>
                <el-table-column align="center" label="内容" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showItemHandler(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateItemHandler(scope.row,scope.$index)">修改</el-button>
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
        <el-dialog title="添加文章" :visible.sync="dialogAddArticle" :before-close="handleClose">
            <div class="article-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">标题</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="article.name"></el-input>
                    </li>
                    <li>
                        <span class="content-title">内容</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="article.con"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改文章" :visible.sync="dialogUpdateArticle" :before-close="handleClose">
            <div class="article-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">标题</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifyArticle.name"></el-input>
                    </li>
                    <li>
                        <span class="content-title">内容</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyArticle.con"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendUpdateData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="文章详情" :visible.sync="dialogDetaileVisible">
            <div v-html="articleDetaile" class="articleDetaile"></div>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/content/recList.js"
import {formatDate} from '../../util/base'

export default {
    name: 'recList',
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
            loading:true,//表格加载
            dialogAddArticle:false,//是否显示添加文章弹窗
            dialogUpdateArticle:false,//是否显示修改文章弹窗
            article:{name:'',con:''},//添加的文章内容
            modifyArticle:{},//修改的文章内容
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
            let searchDiv = document.querySelector('.recList-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.recList-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
        },
        //添加文章
        addArticleHandler() {
            this.dialogAddArticle = true;
        },
        //关闭添加、修改弹窗
        handleClose() {
            this.dialogAddArticle = false;
            this.dialogUpdateArticle = false;
            this.article = {
                name: '',
                con: '',
            };
            this.modifyArticle = {};
        },
        //保存新增文章
        sendData(){
            var _this = this;
            var data = {
                advername:this.article.name,
                advertext:this.article.con
            }
            PageData.addItem(data).then(function(d) {
                if (d.resultcode == '0000') {
                    _this.$message({
                        type: "sucess",
                        message: d.data.text
                    });
                } else {
                    _this.$message({
                        type: "warning",
                        message: d.data.text
                    });
                }
            });
        },
        //取消新增或修改
        cancelData() {
            this.dialogAddArticle = false;
            this.dialogUpdateArticle = false;
            this.article = {
                name: '',
                con: '',
            };
            this.modifyArticle = {};
        },
        //获取表格数据
        getTableData(){
            var _this = this;
            PageData.listInfo().then(function(d) {
                if (d.resultcode == '0000') {
                    _this.loading = false;
                    _this.tableData = d.data.array;
                } else {
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            });
        },
        //点击详情
        showItemHandler(val){
            this.dialogDetaileVisible = true;
            this.articleDetaile = val.articleCon
        },
        //修改推荐
        updateItemHandler(row,idx) {
            this.modifyArticle = row;
            this.dialogUpdateArticle = true;
        },
        //删除推荐
        deleteItemHandler(){
            this.$confirm('此操作将永久删除该推荐文章, 是否继续?', '提示', {
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
.recList-header ul {
    list-style: none;
    overflow: auto;
}
.recList-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.recList-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.recList-con{
    margin-top:10px;
}
.recList-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.recList-con .text-danger{
  color: #F56C6C;
}
.recList-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.article-content-dialog ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.article-content-dialog .content-title {
    width: 60px;
}
.articleDetaile{
    line-height: 25px;
    height: 400px;
    overflow-y: auto;
}
</style>
