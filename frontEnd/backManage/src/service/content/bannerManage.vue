<template>
    <div class="bannerManage">
        <div class="bannerManage-header">
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
                    <span>标题</span>
                    <el-input size="small" v-model="searchData.userName" placeholder="请输入标题进行查询"></el-input>
                </li>
                <li>
                    <el-button type="primary" size="small" @click="userSearchHandler">搜索</el-button>
                </li>
                <li>
                    <el-button type="success" size="small" @click="addBannerHandler">添加图片</el-button>
                </li>
            </ul>
        </div>
        <div class="bannerManage-con">
            <div class="allDelete">
                <el-button type="danger" plain size="small" @click="allDelete" v-if="this.multipleSelection.length!=0">全部删除</el-button>
            </div>
            <el-table v-model="loading" :data="tableData" style="width: 100%" border stripe size="small" @selection-change="handleSelectionChange" :height="tableListHeight">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="date" label="发布时间" width="200"></el-table-column>
                <el-table-column align="center" prop="userName" label="标题" width="180"></el-table-column>
                <el-table-column align="center" prop="userImg" label="图片" width="180"></el-table-column>
                <el-table-column align="center" prop="phoneNum" label="链接" width="180"></el-table-column>
                <el-table-column align="center" label="基本操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateItemHandler(scope.row,scope.$index)">修改</el-button>
                        <el-button type="text" size="small" @click="isShowBanner(scope.row,1)" v-if="scope.row.status == 1">隐藏</el-button>
                        <el-button type="text" size="small" @click="isShowBanner(scope.row,2)" v-else-if="scope.row.status == 2">显示</el-button>
                        <el-button type="text " size="small" @click="deleteItemHandler(scope.row)" class="text-danger">删除</el-button>
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
        <el-dialog title="添加图片" :visible.sync="dialogAddBanner" width="500px" :before-close="handleClose">
            <div class="banner-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">标题</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="banner.name"></el-input>
                    </li>
                    <li>
                        <span class="content-title">图片</span>
                        <div>
                          <el-upload  ref="upload" class="upload-wrapper"
                                action="http://118.144.88.221:8040/uploadImageServlet/"
                                :file-list="banner.fileList" :limit='1' accept=".jpg,.jpeg,.png,.JPG,.JPEG" list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </div>
                    </li>
                    <li>
                        <span class="content-title">链接</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="banner.link"> </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改轮播图"
            :visible.sync="dialogUpdateBanner"
            width="500px"
            :before-close="handleClose">
            <div class="banner-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">标题</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifyBanner.name"> </el-input>
                    </li>
                    <li>
                        <span class="content-title">图片</span>
                        <div>
                          <el-upload ref="upload" class="upload-wrapper"
                            action="http://118.144.88.221:8040/uploadImageServlet/"
                            :file-list="modifyBanner.fileList" :limit='1' accept=".jpg,.jpeg,.png,.JPG,.JPEG" list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </div>
                    </li>
                    <li>
                        <span class="content-title">链接</span>
                        <el-input type="text" size="small" placeholder="请输入内容" v-model="modifyBanner.link">
                        </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendUpdateData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/content/bannerManage.js"
import {formatDate} from '../../util/base'

export default {
    name: 'bannerManage',
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
            dialogAddBanner:false,//添加图片弹窗
            dialogUpdateBanner:false,//修改图片弹窗
            banner: {//图片信息
                name: '',
                img: '',
                link: '',
                fileList: []
            },
            modifyBanner: {},
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
            let searchDiv = document.querySelector('.bannerManage-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-150 + 'px';
            this.tableListHeight = mainH;
        },
        resizeTableHeight2() {
            let searchDiv = document.querySelector('.bannerManage-header');
            let searchDivHeight = searchDiv ? searchDiv.offsetHeight : 0
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight-searchDivHeight-187 + 'px';
            this.tableListHeight = mainH;
        },
        //点击搜索
        userSearchHandler(){
        },
        //添加图片
        addBannerHandler() {
            this.dialogAddBanner = true;
        },
        //关闭添加、修改弹窗
        handleClose() {
            this.dialogAddBanner = false;
            this.dialogUpdateBanner = false;
            this.banner = {
                name: '',
                img: '',
                type: 1,
                link: '/newsDetials?id=',
                fileList: []
            };
            this.modifyBanner = {};
        },
        //图片添加提交操作
        sendData() {
            var data = {};
            data.name = this.banner.name;
            data.imageUrl = this.banner.imageUrl;
            data.link = this.banner.link;
            data.status = 2;
            data.userId = userId;
            PageData.insertItem(data).then(d => {
                if (d.resultCode == 200) {
                    this.$message({
                        message: "banner创建成功",
                        type: "success"
                    });
                    setTimeout(()=>{
                        this.dialogAddBanner = false;
                        this.getTableData();
                    },1500)
                    
                } else {
                    this.$message({
                        type: "warning",
                        message: "banner创建失败，请稍后重试。"
                    });
                }
            }).catch(()=>{
                this.$message({
                    type: "warning",
                    message: "banner创建失败，请稍后重试。"
                });
            });
        },
        //图片修改提交操作
        sendUpdateData() {
            var data = {};
            data.id = this.modifyBanner.id;
            data.name = this.modifyBanner.name;
            data.imageUrl = this.modifyBanner.imageUrl;
            data.link = this.modifyBanner.link;
            data.status = 2;
            data.userId = userId;
            PageData.updateItem(data).then(d => {
                if (d.resultCode == 200) {
                    this.$message({
                        message: "banner修改成功",
                        type: "success"
                    });
                    setTimeout(()=> {
                        this.dialogUpdateBanner = false;
                        this.getTableData();
                    },1500)
                } else {
                    this.$message({
                        type: "warning",
                        message: "banner修改失败，请稍后重试。"
                        // message: d.resultMessage
                    });
                }
            }).catch(()=>{
                this.$message({
                    type: "warning",
                    message: "banner修改失败，请稍后重试。"
                });
            });
        },
        cancelData() {
            this.dialogAddBanner = false;
            this.dialogUpdateBanner = false;
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
        //修改banner
        updateItemHandler(row,idx) {
            this.modifyBanner = row;
            this.dialogUpdateBanner = true;
            if(row.imageUrl) {
                this.modifyBanner.fileList = [];
                var img = {};
                img.url = row.imageUrl;
                this.modifyBanner.fileList.push(img);
            }
        },
        //删除banner
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
.bannerManage-header ul {
    list-style: none;
    overflow: auto;
}
.bannerManage-header ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}
.bannerManage-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.bannerManage-con{
    margin-top:10px;
}
.bannerManage-con .allDelete{
    float: right;
    margin-bottom: 5px;
}
.bannerManage-con .text-danger{
  color: #F56C6C;
}
.bannerManage-con .text-danger.is-disabled{
  color: #c0c4cc;
}
.el-pagination{
    position: absolute;
    bottom: 20px;
    right:20px;
}
.banner-content-dialog ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.banner-content-dialog .content-title {
    width: 60px;
}
</style>
