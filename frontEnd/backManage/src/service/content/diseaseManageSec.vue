<template>
    <div class="diseasesManageSec">
        <div class="diseasesManageSec-header">
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
                    <span>疾病一级分类</span>
                    <el-select v-model="searchData.diseasesSortFir" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in diseasesOptionsFir"
                        :key="item.id"
                        :label="item.diseasename"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <!-- <li>
                    <span>疾病二级分类</span>
                    <el-input size="small" v-model="searchData.diseasesSortSec" placeholder="请输入内容"></el-input>
                </li> -->
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
                <li>
                    <el-button type="success" size="small" @click="addDiseasesHandler">添加疾病分类</el-button>
                </li>
            </ul>
        </div>
        <div class="diseasesManageSec-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <!-- <el-table-column align="center" prop="date" label="修改时间" width="200"></el-table-column> -->
                <el-table-column align="center" prop="diseasecateName" label="疾病一级分类名称" width="180"></el-table-column>
                <el-table-column align="center" prop="diseasename" label="疾病二级分类名称" width="180"></el-table-column>
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
        <el-dialog title="添加疾病二级分类" :visible.sync="dialogAddSSort" :before-close="handleClose">
            <div class="diseases-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="diseases.diseasesSortFir" placeholder="请选择" size="small">
                            <el-option v-for="item in diseasesOptionsFir" :key="item.id" :label="item.diseasename" :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="diseases.diseasesSortSec"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改疾病二级分类" :visible.sync="dialogModifySort" :before-close="handleClose">
            <div class="diseases-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="modifysort.diseasesSortFir" placeholder="请选择" size="small">
                            <el-option v-for="item in diseasesOptionsFir" :key="item.id" :label="item.diseasename" :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifysort.diseasesSortSec"> </el-input>
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
import PageData from "../../api/content/diseaseManageSec.js"
import {formatDate} from '../../util/base'

export default {
    name: 'diseasesManageSec',
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
            diseasesOptionsFir:{},//疾病一级分类
            dialogAddSSort:false,//是否显示添加弹窗
            dialogModifySort:false,//是否显示修改弹窗
            modifysortId:'',//修改的内容ID
            diseases:{diseasesSortFir:'',diseasesSortSec:''},
            modifysort:{diseasesSortFir:'',diseasesSortSec:''}
        }
    },
    created(){
        this.getdiseasesortFir();
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
            let searchDiv = document.querySelector('.diseasesManageSec-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.diseasesManageSec-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
            var _this = this;
            var data = {diseasecate:this.searchData.diseasesSortFir}
            PageData.getSecond(data).then(d => {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.tableData = d.data.array;
                        _this.tableData.forEach((item) => {
                            for(let i=0;i<_this.diseasesOptionsFir.length;i++){
                                if(_this.diseasesOptionsFir[i].id == item.diseasecate){
                                    item.diseasecateName = _this.diseasesOptionsFir[i].diseasename
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
        //添加疾病分类点击事件
        addDiseasesHandler(){
            this.dialogAddSSort = true;
        },
        //添加疾病二级分类确定事件
        sendData(){
            this.dialogAddSSort = false
            var data = {
                diseasecate:this.diseases.diseasesSortFir,
                diseasename:this.diseases.diseasesSortSec
            }
            PageData.addSecond(data).then(d => {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        this.dialogAddSSort = false;
                        this.getTableData();
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
            this.diseases = {
                diseasesSortFir:'',diseasesSortSec:''
            }
            this.modifysort = {
                diseasesSortFir:'',diseasesSortSec:''
            }
        },
        //取消添加或修改
        cancelData(){
            this.dialogAddSSort = false;
            this.dialogModifySort = false;
            this.diseases = {
                diseasesSortFir:'',diseasesSortSec:''
            }
            this.modifysort = {
                diseasesSortFir:'',diseasesSortSec:''
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
                        console.log(_this.tableData)
                        _this.tableData.forEach((item) => {
                            for(let i=0;i<_this.diseasesOptionsFir.length;i++){
                                if(_this.diseasesOptionsFir[i].id == item.diseasecate){
                                    item.diseasecateName = _this.diseasesOptionsFir[i].diseasename
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
        getdiseasesortFir(){
            var _this = this;
            PageData.getdiseasesortFir().then(function(d) {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.diseasesOptionsFir = d.data.array;
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
            this.modifysort.diseasesSortSec = item.diseasename;
            for(let i=0;i<this.diseasesOptionsFir.length;i++){
                if(this.diseasesOptionsFir[i].id == item.diseasecate){
                    this.modifysort.diseasesSortFir = this.diseasesOptionsFir[i].diseasename;
                    return;
                }
            }
        },
        //修改确定提交
        sendModifyData(){
            var _this = this;
            var data = {
                updatename:this.modifysort.diseasesSortSec,
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
        //删除疾病二级分类
        deleteItemHandler(){
            var _this = this;
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                PageData.deleteSecond().then(function(d) {
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
.diseasesManageSec-header ul {
    list-style: none;
    overflow: auto;
}
.diseasesManageSec-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.diseasesManageSec-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.diseasesManageSec-con{
    margin-top:10px;
}
.diseasesManageSec-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.diseasesManageSec-con .text-danger{
  color: #F56C6C;
}
.diseasesManageSec-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.diseases-content-dialog ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.diseases-content-dialog .content-title {
    width: 70px;
}
</style>
