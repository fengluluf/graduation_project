<template>
    <div class="diseaseList">
        <div class="diseaseList-header">
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
                    <span>一级分类</span>
                    <el-select v-model="searchData.diseaseValueFir" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in diseaseOptionsFir"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span>二级分类</span>
                    <el-select v-model="searchData.diseaseValueSec" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in diseaseOptionsSec"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="content-title">疾病名称</span>
                    <el-input type="text" size="small" placeholder="请输入内容" v-model="searchData.diseaseName"> </el-input>
                </li>
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
                
                <li>
                    <el-button type="success" size="small" @click="addArticleHandler">添加疾病</el-button>
                </li>
            </ul>
        </div>
        <div class="diseaseList-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" type="index" label="序号" width=""></el-table-column>
                <el-table-column align="center" prop="date" label="疾病发布时间" width="200"></el-table-column>
                <el-table-column align="center" prop="diseaseValueFir" label="疾病一级分类" width="180"></el-table-column>
                <el-table-column align="center" prop="diseaseValueSec" label="疾病二级分类" width="180"></el-table-column>
                <el-table-column align="center" prop="name" label="疾病名称" width="180"></el-table-column>
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
        <el-dialog title="添加疾病" :visible.sync="dialogAddArticle" :before-close="handleClose">
            <div class="disease-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="disease.diseaseValueFir" placeholder="请选择" size="small">
                            <el-option v-for="item in diseaseOptionsFir" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-select v-model="disease.diseaseValueSec" placeholder="请选择" size="small">
                            <el-option v-for="item in diseaseOptionsSec" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">疾病名称</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="disease.name"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">简介</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.introduction"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">病因和发病机制</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.cause"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">病理</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.pathology"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">临床表现</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.clinical"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">实验室和辅助检查</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.auxiliary"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">诊断和鉴别诊断</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.diagnosis"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">治疗</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.treatment"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">预后和预防</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.prevention"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">备注</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="disease.remark"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改疾病" :visible.sync="dialogUpdateArticle" :before-close="handleClose">
            <div class="disease-content-dialog">
                <ul>
                     <li>
                        <span class="content-title">一级分类</span>
                        <el-select v-model="modifyDisease.diseaseValueFir" placeholder="请选择" size="small">
                            <el-option v-for="item in diseaseOptionsFir" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">二级分类</span>
                        <el-select v-model="modifyDisease.diseaseValueSec" placeholder="请选择" size="small">
                            <el-option v-for="item in diseaseOptionsSec" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="content-title">疾病名称</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifyDisease.name"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">简介</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.introduction"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">病因和发病机制</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.cause"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">病理</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.pathology"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">临床表现</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.clinical"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">实验室和辅助检查</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.auxiliary"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">诊断和鉴别诊断</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.diagnosis"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">治疗</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.treatment"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">预后和预防</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.prevention"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">备注</span>
                        <el-input type="textarea" size="small" placeholder="请输入内容" v-model="modifyDisease.remark"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendUpdateData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="疾病详情" :visible.sync="dialogDetaileVisible">
            <div class="diseaseDetaile">
                <ul>
                    <li>
                        <span class="detaile-title">一级分类</span>
                        <span class="detaile-con">{{diseaseDetaile.diseaseValueFir}}</span>
                    </li>
                    <li>
                        <span class="detaile-title">二级分类</span>
                        <span class="detaile-con">{{diseaseDetaile.diseaseValueSec}}</span>
                    </li>
                    <li>
                        <span class="detaile-title">疾病名称</span>
                        <span class="detaile-con">{{diseaseDetaile.name}}</span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.introduction">简介</div>
                        <span class="detaile-con" v-html="diseaseDetaile.introduction"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.cause">病因和发病机制</div>
                        <span class="detaile-con" v-html="diseaseDetaile.cause"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.pathology">病理</div>
                        <span class="detaile-con" v-html="diseaseDetaile.pathology"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.clinical">临床表现</div>
                        <span class="detaile-con" v-html="diseaseDetaile.clinical"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.auxiliary">实验室和辅助检查</div>
                        <span class="detaile-con" v-html="diseaseDetaile.auxiliary"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.diagnosis">诊断和鉴别诊断</div>
                        <span class="detaile-con" v-html="diseaseDetaile.diagnosis"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.treatment">治疗</div>
                        <span class="detaile-con" v-html="diseaseDetaile.treatment"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.prevention">预后和预防</div>
                        <span class="detaile-con" v-html="diseaseDetaile.prevention"></span>
                    </li>
                    <li>
                        <div class="detaile-title" v-if="diseaseDetaile.remark">备注</div>
                        <span class="detaile-con" v-html="diseaseDetaile.remark"></span>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/content/diseaseList.js"
import {formatDate} from '../../util/base'

export default {
    name: 'diseaseList',
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
            dialogAddArticle:false,//是否显示添加疾病弹窗
            dialogUpdateArticle:false,//是否显示修改疾病弹窗
            disease:{
            diseaseValueFir:'',
            diseaseValueSec:'',
            name:'',introduction:'',
            cause:'',pathology:'',clinical:'',auxiliary:'',diagnosis:'',treatment:'',prevention:'',remark:''},//添加的疾病内容
            modifyDisease:{},//修改的疾病内容
            dialogDetaileVisible:false,//是否显示详情弹窗
            diseaseDetaile:{},//疾病详情
            diseaseOptionsFir:[{value:1,label:'diseaseOptions'}],//一级疾病分类
            diseaseValueFir:'',//当前被选中的value属性值
            diseaseOptionsSec:[{value:1,label:'diseaseOptions'}],//二级疾病分类
            diseaseValueSec:'',//当前被选中的value属性值

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
            let searchDiv = document.querySelector('.diseaseList-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.diseaseList-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
        },
        //添加疾病
        addArticleHandler() {
            this.dialogAddArticle = true;
        },
        //关闭添加、修改弹窗
        handleClose() {
            this.dialogAddArticle = false;
            this.dialogUpdateArticle = false;
            this.disease = {
                diseaseValueFir:'',
            diseaseValueSec:'',
            name:'',introduction:'',
            cause:'',pathology:'',clinical:'',auxiliary:'',diagnosis:'',treatment:'',prevention:'',remark:''
            };
            this.modifyDisease = {};
        },
        //保存新增疾病
        sendData(){
            console.log(this.disease.con)
        },
        //取消新增或修改
        cancelData() {
            this.dialogAddArticle = false;
            this.dialogUpdateArticle = false;
            this.disease = {
                diseaseValueFir:'',
            diseaseValueSec:'',
            name:'',introduction:'',
            cause:'',pathology:'',clinical:'',auxiliary:'',diagnosis:'',treatment:'',prevention:'',remark:''
            };
            this.modifyDisease = {};
        },
        //获取表格数据
        getTableData(){
            var _this = this;
            var data = {
                userId: userId,
                pageNo: this.pager.currentPage,
                pageSize: this.pager.pageSize
            };
            PageData.listInfo(data).then(function(d) {
                if (d.resultCode == 200) {
                    _this.loading = false;
                    _this.tableData = d.resultJson.pageContent;
                    _this.pager.pageNo = d.resultJson.pageNum;
                    _this.pager.totalPage = d.resultJson.totalPage;
                    _this.pager.total = d.resultJson.count;
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
            this.diseaseDetaile = val
        },
        //修改推荐
        updateItemHandler(row,idx) {
            this.modifyDisease = row;
            this.dialogUpdateArticle = true;
        },
        //删除推荐
        deleteItemHandler(){
            this.$confirm('此操作将永久删除该推荐疾病, 是否继续?', '提示', {
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
.diseaseList-header ul {
    list-style: none;
    overflow: auto;
}
.diseaseList-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.diseaseList-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.diseaseList-con{
    margin-top:10px;
}
.diseaseList-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.diseaseList-con .text-danger{
  color: #F56C6C;
}
.diseaseList-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.disease-content-dialog ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.disease-content-dialog .content-title {
    width: 70px;
}
.diseaseDetaile{
    line-height: 25px;
    height: 400px;
    overflow-y: auto;
}
.diseaseDetaile .detaile-title{
    font-weight: bold;
}
.diseaseDetaile .detaile-con{
    margin-left: 20px;
}
</style>
