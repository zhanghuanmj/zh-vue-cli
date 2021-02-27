/**
 * 带检索的列表
 * @module mixins
 * @author zhanghuan
 * @date 2021/02/12
 */
import qs from 'qs'

export const ListMixin = {
    data() {
        return {
            /* 是否自动加载列表 */
            autoLoad: true,
            /* 检索条件的栅格 */
            span: {
                md: 6,
                sm: 8,
            },
            /* 查询条件 */
            params: {},
            /* 接口地址 */
            urls: {},
            /* 数据源 */
            dataSource: [],
            /* 分页参数 */
            pagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ["10", "20", "30", "50", "100"],
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                showSizeChanger: true,
                total: 0
            },
            /* 排序参数 */
            sorter: {
                column: 'createTime',
                order: 'desc',
            },
            /* table加载状态 */
            loading: false,
            /* table选中keys*/
            selectedRowKeys: [],
            /* table选中records*/
            selectionRows: [],
            /* 查询折叠 */
            toggleSearchStatus: false,
            /* 弹出框状态 1.新增 2.编辑 3.查看 */
            modalStatus: 1,
        }
    },
    created() {
        this.autoLoad && this.loadData();
    },
    methods: {
        /**
         * 获取列表数据
         * @method loadData
         * @for ListMixin
         * @param {number}  page 页码
         * @return {void} 
         */
        loadData(page) {
            if (!this.urls.list) {
                this.$message.error("请设置urls.list属性!")
                return
            }
            //加载数据 若传入参数1则加载第一页的内容
            if (page === 1) {
                this.pagination.current = 1;
            }
            let params = this.getQueryParams(); //查询条件

            this.loading = true;
            this.$axios.get(this.urls.list, { params: params }).then((res) => {
                if (res.code === 200) {
                    this.dataSource = res.data;
                    this.pagination.total = res.total || res.list.length;
                }
                this.loading = false;
            })
        },
        /**
         * 获取检索条件
         * @method getQueryParams
         * @for ListMixin
         * @param {void}  
         * @return {void} 
         */
        getQueryParams() {
            //获取查询条件
            let param = Object.assign({}, this.params, this.sorter);
            param.field = this.getQueryField();
            param.page = this.pagination.current;
            param.pageSize = param.pageSize || this.pagination.pageSize;
            return param;
        },
        /**
         * 获取列表要展示的字段
         * @method getQueryField
         * @for ListMixin
         * @param {void}  
         * @return {void} 
         */
        getQueryField() {
            let fieldArr = this.columns.map((value) => {
                return value.dataIndex;
            });
            fieldArr = fieldArr.filter(value => !!value);
            fieldArr.unshift('id');
            return fieldArr.join(',');
        },
        /**
         * 选择列表数据
         * @method onSelectChange
         * @for ListMixin
         * @param {Array}  selectedRowKeys 选择的key
         * @param {Array}  selectionRows 选择的行
         * @return {void} 
         */
        onSelectChange(selectedRowKeys, selectionRows) {
            this.selectedRowKeys = selectedRowKeys;
            this.selectionRows = selectionRows;
        },
        /**
         * 清除选择
         * @method onClearSelected
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        onClearSelected() {
            this.selectedRowKeys = [];
            this.selectionRows = [];
        },
        /**
         * 检索方法
         * @method search
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        search() {
            this.loadData(1);
        },
        /**
         * 重置方法
         * @method searchReset
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        searchReset() {
            this.params = {}
            this.loadData(1);
        },
        /**
         * 批量删除
         * @method batchDel
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        batchDel() {
            if (!this.urls.deleteBatch) {
                this.$message.error("请设置url.deleteBatch属性!")
                return
            }
            if (this.selectedRowKeys.length <= 0) {
                this.$message.warning('请选择一条记录！');
                return;
            } else {
                let that = this;
                let ids = "";
                for (let a = 0; a < this.selectedRowKeys.length; a++) {
                    ids += this.selectedRowKeys[a] + ",";
                }

                this.$confirm({
                    title: "确认删除",
                    content: "是否删除选中数据?",
                    onOk: function() {
                        that.$axios.delete(that.urls.deleteBatch, { ids: ids }).then((res) => {
                            if (res.code === 1) {
                                that.$message.success(res.msg);
                                that.loadData(1);
                                that.onClearSelected();
                            } else {
                                that.$message.warning(res.msg);
                            }
                        });
                    }
                });
            }
        },
        /**
         * 单条删除
         * @method handleDelete
         * @for ListMixin
         * @param {string} id 唯一标识 
         * @return {void} 
         */
        handleDelete(id) {
            if (!this.urls.delete) {
                this.$message.error("请设置urls.delete属性!")
                return
            }
            this.$axios.post(this.urls.delete, { id: id }).then((res) => {
                if (res.code === 1) {
                    this.$message.success(res.msg);
                    this.loadData(1);
                } else {
                    this.$message.warning(res.msg);
                }
            });
        },
        /**
         * 新增
         * @method handleAdd
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        handleAdd() {
            this.modalStatus = 1;
            this.$refs.modalForm.add();
            this.$refs.modalForm.title = "新增";
            this.$refs.modalForm.disableSubmit = false;
        },
        /**
         * 编辑
         * @method handleEdit
         * @for ListMixin
         * @param {object} record 当前这条数据
         * @return {void} 
         */
        handleEdit(record) {
            this.modalStatus = 2;
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
        },
        /**
         * 详情
         * @method handleDetail
         * @for ListMixin
         * @param {object} record 当前这条数据
         * @return {void} 
         */
        handleDetail(record) {
            this.modalStatus = 3;
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "详情";
            this.$refs.modalForm.disableSubmit = true;
        },
        /**
         * 分页、排序、筛选变化时触发
         * @method handleTableChange
         * @for ListMixin
         * @param {object} pagination 分页信息
         * @param {object} filters 筛选信息
         * @param {object} sorter 排序信息
         * @return {void} 
         */
        handleTableChange(pagination, filters, sorter) {
            if (Object.keys(sorter).length > 0) {
                this.sorter.column = sorter.field;
                this.sorter.order = "ascend" == sorter.order ? "asc" : "desc"
            }
            this.pagination = pagination;
            this.loadData();
        },
        /**
         * 展开或收起检索条件
         * @method handleToggleSearch
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        handleToggleSearch() {
            this.toggleSearchStatus = !this.toggleSearchStatus;
        },
        /**
         * 新增/修改 成功时
         * @method modalFormOk
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        modalFormOk() {
            // 重载列表
            if (this.modalStatus === 1) {
                this.loadData(1);
                return;
            }
            if (this.modalStatus !== 1) {
                this.loadData();
            }
        },
        /**
         * 直接导出
         * @method handleExport
         * @for ListMixin
         * @param {void} 
         * @return {void} 
         */
        handleExport() {
            let paramsStr = qs.stringify(this.getQueryParams());
            let url = `${this.urls.export}?${paramsStr}`;
            window.location.href = url;
        },
        /**
         * 通过文件名导出
         * @method handleExportByFileName
         * @for ListMixin
         * @param {string}  fileName 文件名
         * @return {void} 
         */
        handleExportByFileName(fileName) {
            if (!fileName || typeof fileName != "string") {
                fileName = "导出文件"
            }
            let param = { ...this.params };
            if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
                param['keys'] = this.selectedRowKeys.join(",")
            }

            this.$axios.get(this.urls.export, { data: param, responseType: 'blob' }).then((data) => {
                if (!data) {
                    this.$message.warning("文件下载失败")
                    return
                }
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    window.navigator.msSaveBlob(new Blob([data]), fileName + '.xls')
                } else {
                    let urls = window.URL.createObjectURL(new Blob([data]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = urls
                    link.setAttribute('download', fileName + '.xls')
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link); //下载完成移除元素
                    window.URL.revokeObjectURL(urls); //释放掉blob对象
                }
            })
        },
    }

}