<template>
    <div class="drugsList">
        <div class="drugsList-header">
            <ul>
                <!-- <li>
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
                </li> -->
                <li>
                    <span>一级分类</span>
                    <el-select v-model="searchData.drugsValueFir" placeholder="请选择" size="small" @change="changeSortFir">
                        <el-option
                        v-for="item in drugsOptionsFir"
                        :key="item.id"
                        :label="item.drugname"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span>二级分类</span>
                    <el-select v-model="searchData.drugsValueSec" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in selectSortOptions"
                        :key="item.id"
                        :label="item.drugname"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="content-title">药品名称</span>
                    <el-input type="text" size="small" placeholder="请输入内容" v-model="searchData.drugsName"> </el-input>
                </li>
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
                
                <li>
                    <el-button type="success" size="small" @click="addDrugsHandler">添加药品</el-button>
                </li>
            </ul>
        </div>
        <div class="drugsList-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" type="index" label="序号" width=""></el-table-column>
                <!-- <el-table-column align="center" prop="date" label="药品发布时间" width="200"></el-table-column> -->
                <el-table-column align="center" prop="drugcateName" label="药品一级分类" width="180"></el-table-column>
                <el-table-column align="center" prop="drugcate2Name" label="药品二级分类" width="180"></el-table-column>
                <el-table-column align="center" prop="drugName" label="药品名称" width="180"></el-table-column>
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
        <el-dialog title="添加药品" :visible.sync="dialogAddDrugs" :before-close="handleClose">
            <div class="drugs-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="drugs.drugsValueFir" placeholder="请选择" size="small">
                            <el-option v-for="item in drugsOptionsFir" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-select v-model="drugs.drugsValueSec" placeholder="请选择" size="small">
                            <el-option v-for="item in drugsOptionsSec" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">药品名称</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="drugs.name"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">简介</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="drugs.introduction"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">适应症</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="drugs.indication"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">用量用法</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="drugs.dosage"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">注意事项</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="drugs.precaution"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">备注</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="drugs.remark"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改药品" :visible.sync="dialogUpdateDrugs" :before-close="handleClose">
            <div class="drugs-content-dialog">
                <ul>
                     <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="modifyDrugs.drugsValueFir" placeholder="请选择" size="small">
                            <el-option v-for="item in drugsOptionsFir" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-select v-model="modifyDrugs.drugsValueSec" placeholder="请选择" size="small">
                            <el-option v-for="item in drugsOptionsSec" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">药品名称</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifyDrugs.name"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">简介</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDrugs.introduction"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">适应症</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDrugs.indication"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">用量用法</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDrugs.dosage"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">注意事项</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDrugs.precaution"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">备注</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDrugs.remark"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendUpdateData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="药品详情" :visible.sync="dialogDetaileVisible">
            <div class="drugsDetaile">
                <ul>
                    <li>
                        <span class="detaile-title">一级分类</span>
                        <span class="detaile-con">{{drugsDetaile.drugcateName}}</span>
                    </li>
                    <li>
                        <span class="detaile-title">二级分类</span>
                        <span class="detaile-con">{{drugsDetaile.drugcate2Name}}</span>
                    </li>
                    <li>
                        <span class="detaile-title">药品名称</span>
                        <span class="detaile-con">{{drugsDetaile.drugName}}</span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="drugsDetaile.drugTxt">简介</div>
                        <span class="detaile-con" v-html="drugsDetaile.drugTxt"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="drugsDetaile.drugSymptom">适应症</div>
                        <span class="detaile-con" v-html="drugsDetaile.drugSymptom"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="drugsDetaile.drugUsage">用量用法</div>
                        <span class="detaile-con" v-html="drugsDetaile.drugUsage"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="drugsDetaile.drugAtten">注意事项</div>
                        <span class="detaile-con" v-html="drugsDetaile.drugAtten"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="drugsDetaile.text">备注</div>
                        <span class="detaile-con" v-html="drugsDetaile.text"></span>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/content/drugsList.js"
import {formatDate} from '../../util/base'

export default {
    name: 'drugsList',
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
            dialogAddDrugs:false,//是否显示添加药品弹窗
            dialogUpdateDrugs:false,//是否显示修改药品弹窗
            drugs:{drugsValueFir:'',drugsValueSec:'',name:'',introduction:'',indication:'',dosage:'',precaution:'',remark:''},//添加的药品内容
            modifyDrugs:{},//修改的药品内容
            dialogDetaileVisible:false,//是否显示详情弹窗
            drugsDetaile:{},//药品详情
            drugsOptionsFir:[{value:1,label:'drugsOptions'}],//一级药品分类
            drugsValueFir:'',//当前被选中的value属性值
            drugsOptionsSec:[{value:1,label:'drugsOptions'}],//二级药品分类
            drugsValueSec:'',//当前被选中的value属性值
            selectSortOptions:[],
        }
    },
    created(){
        this.getdrugsortFir();
        this.getdrugsortSec();
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
            let searchDiv = document.querySelector('.drugsList-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.drugsList-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
            var _this = this;
            var data = {drugcate2:this.searchData.drugsValueSec}
            PageData.getThird(data).then(function(d) {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.tableData = d.data.array;
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
        //一级分类选中事件
        changeSortFir(){
            var _this = this;
            var data = {drugcate:this.searchData.drugsValueFir}
            PageData.getSecond(data).then(function(d) {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.selectSortOptions = d.data.array;
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
        //获取二级分类
        getdrugsortSec(){
            var _this = this;
            PageData.getdrugsortSec().then(function(d) {
                if (d.resultcode == "0000") {
                    if(d.data.result == "00"){
                        _this.drugsOptionsSec = d.data.array;
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
        //添加药品
        addDrugsHandler() {
            this.dialogAddDrugs = true;
        },
        //关闭添加、修改弹窗
        handleClose() {
            this.dialogAddDrugs = false;
            this.dialogUpdateDrugs = false;
            this.drugs = {
                drugsValueFir:'',drugsValueSec:'',name:'',introduction:'',indication:'',dosage:'',precaution:'',remark:''
            };
            this.modifyDrugs = {};
        },
        //保存新增药品
        sendData(){
            console.log(this.drugs.con)
        },
        //取消新增或修改
        cancelData() {
            this.dialogAddDrugs = false;
            this.dialogUpdateDrugs = false;
            this.drugs = {
                drugsValueFir:'',drugsValueSec:'',name:'',introduction:'',indication:'',dosage:'',precaution:'',remark:''
            };
            this.modifyDrugs = {};
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
                    _this.tableData.forEach((item) => {
                        for(let i=0;i<_this.drugsOptionsFir.length;i++){
                            if(_this.drugsOptionsFir[i].id == item.drugCate){
                                item.drugcateName = _this.drugsOptionsFir[i].drugname
                            }
                        }
                        for(let i=0;i<_this.drugsOptionsSec.length;i++){
                            if(_this.drugsOptionsSec[i].id == item.drugCate){
                                item.drugcate2Name = _this.drugsOptionsSec[i].drugname
                            }
                        }
                    })
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
            this.drugsDetaile = val
            for(let i=0;i<this.drugsOptionsFir.length;i++){
                if(this.drugsOptionsFir[i].id == val.drugCate){
                    val.drugcateName = this.drugsOptionsFir[i].drugname
                }
            }
            for(let i=0;i<this.drugsOptionsSec.length;i++){
                if(this.drugsOptionsSec[i].id == val.drugCate2){
                    val.drugcate2Name = this.drugsOptionsSec[i].drugname
                }
            }
        },
        //修改推荐
        updateItemHandler(row,idx) {
            this.modifyDrugs = row;
            this.dialogUpdateDrugs = true;
        },
        //删除推荐
        deleteItemHandler(){
            this.$confirm('此操作将永久删除该推荐药品, 是否继续?', '提示', {
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
.drugsList-header ul {
    list-style: none;
    overflow: auto;
}
.drugsList-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.drugsList-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.drugsList-con{
    margin-top:10px;
}
.drugsList-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.drugsList-con .text-danger{
  color: #F56C6C;
}
.drugsList-con .text-danger.is-disabled{
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
.drugsDetaile{
    line-height: 25px;
    height: 400px;
    overflow-y: auto;
}
.drugsDetaile .detaile-title{
    font-weight: bold;
}
.drugsDetaile .detaile-con{
    margin-left: 20px;
}
</style>
