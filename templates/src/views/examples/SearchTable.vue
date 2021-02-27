<!--
 * 带检索的列表
 * @module examples
 * @author zhanghuan
 * @date 2021/02/26
-->
<template>
    <a-card :bordered="false">
        <a-divider class="page-top-divider" orientation="left">教师列表</a-divider>

        <!-- 查询区域 -->
        <div class="page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="24">

                    <a-col v-bind="span">
                        <a-form-item label="名字">
                            <a-input v-model="params.name" placeholder="请输入名字" />
                        </a-form-item>
                    </a-col>

                    <a-col v-bind="span">
                        <a-form-item label="角色">
                            <a-select v-model="params.type" placeholder="请选择角色">
                                <a-select-option value="1">校长</a-select-option>
                                <a-select-option value="2">教务</a-select-option>
                                <a-select-option value="3">教师</a-select-option>
                                <a-select-option value="4">保密</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col v-bind="span">
                        <span style="float: left;overflow: hidden;" class="page-search-buttons">
                            <a-button type="primary" @click="search" icon="search">查询</a-button>
                            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                        </span>
                    </a-col>

                </a-row>
            </a-form>
        </div>

        <!-- 操作按钮区域-begin -->
        <div class="page-operator">
            <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
        </div>
        <!-- 操作按钮区域-end -->

        <!-- table区域-begin -->
        <a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource" :pagination="pagination" :loading="loading" @change="handleTableChange">
            <span slot="img" slot-scope="text, record">
                <img :src="record.img" v-if="record.img" style="height: 120px;">
            </span>

            <template slot="about" slot-scope="text">
                <a-tooltip placement="topLeft">
                    <template slot="title">
                        <span>{{text}}</span>
                    </template>
                    <div class="etc3">{{text}}</div>
                </a-tooltip>
            </template>

            <span slot="action" slot-scope="text, record">
                <a-button size="small" @click="handleEdit(record)">编辑</a-button>

                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                    <a-button size="small" type="danger" ghost>删除</a-button>
                </a-popconfirm>
            </span>
        </a-table>
        <!-- table区域-end -->
        <teacher-modal ref="modalForm" @ok="modalFormOk"></teacher-modal>
    </a-card>
</template>

<script>
    import apis from '@/apis/examples'
    import { ListMixin } from '@/mixins/ListMixin'
    import moment from 'moment'
    import TeacherModal from './modules/TeacherModal'

    export default {
        name: "SearchIndex",
        mixins: [ListMixin],
        components: {
            TeacherModal,
        },
        data() {
            return {
                span: {
                    md: 6,
                    sm: 8,
                },
                columns: [{
                        title: '#',
                        dataIndex: '',
                        key: 'rowIndex',
                        width: 60,
                        align: "center",
                        customRender: function(text, record, index) {
                            return parseInt(index) + 1;
                        }
                    },
                    {
                        title: '照片',
                        align: "left",
                        dataIndex: 'img',
                        width: 200,
                        scopedSlots: { customRender: 'img' },
                    },
                    {
                        title: '名字',
                        align: "left",
                        dataIndex: 'name',
                        width: 180,
                    },
                    {
                        title: '手机号',
                        align: "left",
                        dataIndex: 'mobile',
                        width: 120,
                    },
                    {
                        title: '简介',
                        align: "left",
                        dataIndex: 'about',
                        scopedSlots: { customRender: 'about' },
                    },
                    {
                        title: '角色',
                        align: "left",
                        dataIndex: 'role',
                        width: 80,
                        customRender: function(text, record, index) {
                            let type = '';
                            switch (text) {
                                case "1":
                                    type = "校长";
                                    break;

                                case "2":
                                    type = "教务";
                                    break;

                                case "3":
                                    type = "教师";
                                    break;

                                default:
                                    type = "保密";
                            }
                            return type;
                        }
                    },
                    {
                        title: '创建时间',
                        align: "left",
                        width: 170,
                        dataIndex: 'createTime',
                        customRender: function(text, record, index) {
                            return moment(text).format('YYYY-MM-DD HH:mm:ss');
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: '',
                        scopedSlots: { customRender: 'action' },
                        align: "left",
                        width: 160
                    }
                ],
                urls: {
                    list: apis.listTeacher,
                    delete: apis.deleteTeacher,
                },
                lessonList: []
            }
        },
    }
</script>

<style scoped lang="less">

</style>