<template>
    <div class="drugsManageFir">
        <div class="drugsManageFir-con">
            
            <div class="allDelete">
                <el-button type="success" size="small" @click="sortAddHandler">添加</el-button>
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" type="index" label="序号" width=""></el-table-column>
                <!-- <el-table-column align="center" prop="date" label="修改时间"></el-table-column> -->
                <el-table-column align="center" prop="drugname" label="药品一级分类名称"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteItemHandler(scope.row)" class="text-danger">删除</el-button>
                        <el-button type="text" size="small" @click="modifyItemHandler(scope.row)" class="text-primary">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogAddSort">
            <div class="addSort">
                <ul>
                    <li>
                        <span class="sortTitle">一级分类名称</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="addsortName"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改分类" :visible.sync="dialogModifySort">
            <div class="addSort">
                <ul>
                    <li>
                        <span class="sortTitle">一级分类名称</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifysortName"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendModifyData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/content/drugsManageFir.js"
import {formatDate} from '../../util/base'

export default {
    name: 'drugsManageFir',
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
            dialogAddSort:false,//是否显示添加弹窗
            dialogModifySort:false,//是否显示修改弹窗
            addsortName:'',//添加的分类名称
            modifysortName:'',//修改的分类名称
            modifysortId:'',//修改的分类id
            dialogTitle:'',//弹窗名称
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
        //添加药品分类
        sortAddHandler(){
            this.dialogAddSort = true;
            this.dialogTitle = '添加分类'
        },
        //取消新增
        cancelData(){
            this.dialogAddSort = false;
            this.addsortName = "";
            this.dialogModifySort = false;
            this.modifysortName = "";
            this.modifysortId = '';
        },
        //确认新增
        sendData(){
            var _this = this;
            var data = {drugname:this.addsortName}
            PageData.sendData(data).then(function(d){
                if(d.resultcode=='0000'){
                    if(d.data.result=='00'){
                        _this.dialogAddSort = false;
                        _this.dialogTitle = '';
                        _this.addsortName = ""; 
                        _this.getTableData();
                    }else{
                        _this.$message({
                            type: "warning",
                            message: d.data.text
                        });
                    }
                }else{
                    _this.$message({
                        type: "warning",
                        message: d.data.text
                    });
                }
            })
        },
        //确认修改
        sendModifyData(){
            var _this = this;
            var data = {
                drugname:this.modifysortName,
                id:this.modifysortId
            }
            PageData.sendModifyData(data).then(function(d){
                if(d.resultcode=='0000'){
                    if(d.data.result=='00'){
                        _this.dialogModifySort = false;
                        _this.modifysortName = ""; 
                        _this.modifysortId = "";
                        _this.getTableData();
                    }else{
                        _this.$message({
                            type: "warning",
                            message: d.data.text
                        });
                    }
                }else{
                    _this.$message({
                        type: "warning",
                        message: d.data.text
                    });
                }
            })
        },
        //设置表格高度
        resizeTableHeight1() {
            let searchDiv = document.querySelector('.drugsManageFir-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.drugsManageFir-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //获取表格数据
        getTableData(){
            var _this = this;
            var data = {
                userId: userId,
                pageNo: this.pager.currentPage,
                pageSize: this.pager.pageSize
            };
            PageData.listInfo().then(function(d) {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.loading = false;
                        _this.tableData = d.data.array;
                        // _this.pager.pageNo = d.resultJson.pageNum;
                        // _this.pager.totalPage = d.resultJson.totalPage;
                        // _this.pager.total = d.resultJson.count;
                    }else{
                        _this.$message({
                            type: "warning",
                            message: d.data.text
                        });
                    }
                } else {
                    _this.$message({
                        type: "warning",
                        message: d.data.text
                    });
                }
            });
        },
        //修改分类
        modifyItemHandler(item){
            this.dialogModifySort = true;
            this.modifysortName = item.drugname;
            this.modifysortId = item.id;
        },
        //删除分类
        deleteItemHandler(item){
            var data = {id:item.id}
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                PageData.deleteItem(data).then(function(res){
                    if(res.resultcode=="0000"){
                        if(d.data.result=="00"){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getTableData();
                        }else{
                            this.$message({
                                type: 'warnning',
                                message: d.data.text
                            }); 
                        }
                    }else{
                        this.$message({
                            type: 'warnning',
                            message: d.data.text
                        }); 
                    }
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //全部删除
        allDelete(){
            var data = {};
            if(this.multipleSelection.length!=0){
                this.$confirm('此操作将永久删除所有选中的分类, 是否继续?', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // for(var i=0;i<this.multipleSelection.length;i++){
                    //     data.push(this.multipleSelection[i].id)
                    // }
                    data = {id:this.multipleSelection[0].id}
                    PageData.deleteAll(data).then(d => {
                        if (d.resultcode == "0000") {
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
    }
}
</script>

<style scoped>
.drugsManageFir-con{
    margin-top:10px;
}
.drugsManageFir-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.drugsManageFir-con .text-danger{
  color: #F56C6C;
}
.drugsManageFir-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.addSort ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.addSort .sortTitle{
    width:125px;
}
</style>
