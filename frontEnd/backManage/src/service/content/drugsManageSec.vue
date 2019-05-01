<template>
    <div class="drugsManageSec">
        <div class="drugsManageSec-header">
            <ul>
                <!-- <li>
                    <span>修改时间</span>
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
                </li> -->
                <li>
                    <span>药品一级分类</span>
                    <el-select v-model="searchData.drugsSortFir" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in drugsOptionsFir"
                        :key="item.id"
                        :label="item.drugname"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <!-- <li>
                    <span>药品二级分类</span>
                    <el-input size="small" v-model="searchData.drugsSortSec" placeholder="请输入内容"></el-input>
                </li> -->
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
                <li>
                    <el-button type="success" size="small" @click="addDrugsHandler">添加药品分类</el-button>
                </li>
            </ul>
        </div>
        <div class="drugsManageSec-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <!-- <el-table-column align="center" prop="date" label="修改时间" width="200"></el-table-column> -->
                <el-table-column align="center" prop="drugcateName" label="药品一级分类名称" width="180"></el-table-column>
                <el-table-column align="center" prop="drugname" label="药品二级分类名称" width="180"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteItemHandler(scope.row)" class="text-danger" :disabled="scope.row.status == 0">删除</el-button>
                        <el-button type="text" size="small" @click="modifyItemHandler(scope.row)" class="text-primary">修改</el-button>
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
        <el-dialog title="添加药品二级分类" :visible.sync="dialogAddSSort" :before-close="handleClose">
            <div class="drugs-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="drugs.drugsSortFir" placeholder="请选择" size="small">
                            <el-option v-for="item in drugsOptionsFir" :key="item.id" :label="item.drugname" :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="drugs.drugsSortSec"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改药品二级分类" :visible.sync="dialogModifySort" :before-close="handleClose">
            <div class="drugs-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="modifysort.drugsSortFir" placeholder="请选择" size="small">
                            <el-option v-for="item in drugsOptionsFir" :key="item.id" :label="item.drugname" :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifysort.drugsSortSec"> </el-input>
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
import PageData from "../../api/content/drugsManageSec.js"
import {formatDate} from '../../util/base'

export default {
    name: 'drugsManageSec',
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
            drugsOptionsFir:{},//药品一级分类
            dialogAddSSort:false,//是否显示添加弹窗
            dialogModifySort:false,//是否显示修改弹窗
            modifysortId:'',//修改的内容ID
            drugs:{drugsSortFir:'',drugsSortSec:''},
            modifysort:{drugsSortFir:'',drugsSortSec:''}
        }
    },
    created(){
        this.getdrugsortFir();
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
            let searchDiv = document.querySelector('.drugsManageSec-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.drugsManageSec-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
            var _this = this;
            var data = {drugcate:this.searchData.drugsSortFir}
            PageData.getSecond(data).then(d => {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.tableData = d.data.array;
                        _this.tableData.forEach((item) => {
                            for(let i=0;i<_this.drugsOptionsFir.length;i++){
                                if(_this.drugsOptionsFir[i].id == item.drugcate){
                                    item.drugcateName = _this.drugsOptionsFir[i].drugname
                                }
                            }
                        })
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
            })
        },
        //添加药品分类点击事件
        addDrugsHandler(){
            this.dialogAddSSort = true;
        },
        //添加药品二级分类确定事件
        sendData(){
            this.dialogAddSSort = false
            var data = {
                drugcate:this.drugs.drugsSortFir,
                drugname:this.drugs.drugsSortSec
            }
            PageData.addSecond(data).then(d => {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        this.dialogAddSSort = false;
                        this.getTableData();
                        this.drugs = {drugsSortFir:'',drugsSortSec:''}
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
            })
        },
        //关闭添加或修改弹窗
        handleClose(){
            this.dialogAddSSort = false;
            this.dialogModifySort = false;
            this.drugs = {
                drugsSortFir:'',drugsSortSec:''
            }
            this.modifysort = {
                drugsSortFir:'',drugsSortSec:''
            }
        },
        //取消添加或修改
        cancelData(){
            this.dialogAddSSort = false;
            this.dialogModifySort = false;
            this.drugs = {
                drugsSortFir:'',drugsSortSec:''
            }
            this.modifysort = {
                drugsSortFir:'',drugsSortSec:''
            }
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
                    if(d.data.result == '00'){
                        _this.loading = false;
                        _this.tableData = d.data.array;
                        _this.tableData.forEach((item) => {
                            for(let i=0;i<_this.drugsOptionsFir.length;i++){
                                if(_this.drugsOptionsFir[i].id == item.drugcate){
                                    item.drugcateName = _this.drugsOptionsFir[i].drugname
                                }
                            }
                        })
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
        //获取一级分类
        getdrugsortFir(){
            var _this = this;
            PageData.getdrugsortFir().then(function(d) {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.drugsOptionsFir = d.data.array;
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
            this.modifysortId = item.id;
            this.modifysort.drugsSortSec = item.drugname;
            for(let i=0;i<this.drugsOptionsFir.length;i++){
                if(this.drugsOptionsFir[i].id == item.drugcate){
                    this.modifysort.drugsSortFir = this.drugsOptionsFir[i].drugname;
                    return;
                }
            }
        },
        //修改确定提交
        sendModifyData(){
            var _this = this;
            var data = {
                updatename:this.modifysort.drugsSortSec,
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
        //删除药品二级分类
        deleteItemHandler(item){
            var _this = this;
            var data = {id:item.id}
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                PageData.deleteSecond(data).then(function(d) {
                    if (d.resultcode == "0000") {
                        if(d.data.result == "00"){
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            _this.getTableData();
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
.drugsManageSec-header ul {
    list-style: none;
    overflow: auto;
}
.drugsManageSec-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.drugsManageSec-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.drugsManageSec-con{
    margin-top:10px;
}
.drugsManageSec-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.drugsManageSec-con .text-danger{
  color: #F56C6C;
}
.drugsManageSec-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.drugs-content-dialog ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.drugs-content-dialog .content-title {
    width: 70px;
}
</style>
