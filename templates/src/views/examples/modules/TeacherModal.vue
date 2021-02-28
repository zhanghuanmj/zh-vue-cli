<!--
 * 新增、编辑教师
 * @module teacher
 * @author zhanghuan
 * @date 2021/02/19
-->
<template>
    <right-drawer :visible="visible" :title="title" @ok="handleSubmit" @cancel="close">

        <a-spin :spinning="confirmLoading">
            <a-form :form="form">

                <a-form-item label="名字" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-input v-decorator="[ 'name', rules.name]" placeholder="请输入名字" />
                </a-form-item>

                <a-form-item label="手机号" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-input v-decorator="[ 'mobile', rules.mobile]" placeholder="请输入手机号" />
                </a-form-item>

                <a-form-item label="照片" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <single-img-upload v-decorator="[ 'img', rules.img]" :action="action" :size-limit="sizeLimit" @fileListChange="handleFileListChange" @preview="handlePreview">
                        <div v-if="fileList.length < 1">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">
                                点击上传
                            </div>
                        </div>
                    </single-img-upload>
                </a-form-item>

                <a-form-item label="简介" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-textarea v-decorator="[ 'about',rules.about]" :auto-size="{ minRows: 3, maxRows: 8 }" placeholder="请输入简介" />
                </a-form-item>

                <a-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-select class="form-control" v-decorator="[ 'role', rules.role]" placeholder="请选择角色">
                        <a-select-option value="1">校长</a-select-option>
                        <a-select-option value="2">教务</a-select-option>
                        <a-select-option value="3">教师</a-select-option>
                    </a-select>
                </a-form-item>

            </a-form>
        </a-spin>

        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="查看" style="width: 100%; padding: 15px" :src="previewImage" />
        </a-modal>

    </right-drawer>
</template>

<script>
    import pick from 'lodash.pick'
    import SingleImgUpload from '@/components/common/SingleImgUpload'
    import apis from '@/apis/examples'
    import RightDrawer from '@/components/common/RightDrawer'

    // 生成base64数据
    const getBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    export default {
        name: "TeacherModal",
        components: {
            RightDrawer,
            SingleImgUpload,
        },
        data() {
            // 校验输入是不是手机号
            const isMobile = (rule, value, callback) => {
                // let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/; 更准
                let reg = /^1\d{10}$/;
                if (value && !reg.test(value)) {
                    callback('请输入正确的手机号！')
                }
                // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                callback()
            }

            return {
                title: "操作",
                visible: false,
                confirmLoading: false,
                model: {},
                form: this.$form.createForm(this),
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
                action: apis.upload,
                fileList: [],
                imgFileList: [],
                sizeLimit: {
                    size: 5 * 1024 * 1024,
                    msg: '文件大小不能超过5M！'
                },
                previewVisible: false,
                previewImage: '',
                rules: {
                    name: {
                        rules: [{
                            required: true,
                            message: '请输入名字！'
                        }]
                    },
                    mobile: {
                        rules: [{
                            required: true,
                            message: '请输入手机号！'
                        }, {
                            validator: isMobile
                        }]
                    },
                    password: {
                        rules: [{
                            required: true,
                            message: '请输入密码！'
                        }]
                    },
                    img: {
                        rules: [{
                            required: true,
                            message: '请输上传照片！'
                        }]
                    },
                    about: {
                        rules: [{
                            required: true,
                            message: '请输入简介！'
                        }]
                    },
                    role: {
                        rules: [{
                            required: true,
                            message: '请选择角色！'
                        }]
                    },
                },
            }
        },
        methods: {
            /**
             * 新增
             * @method add
             * @for TeacherModal
             * @param {void}
             * @return {void} 
             */
            add() {
                this.edit({});
            },
            /**
             * 编辑
             * @method edit
             * @for TeacherModal
             * @param {object} record 当前数据
             * @return {void} 
             */
            edit(record) {
                this.visible = true;
                this.model = Object.assign({}, record);
                this.$nextTick(() => {
                    this.form.setFieldsValue(pick(this.model, 'name', 'mobile', 'password', 'img', 'about', 'role'))
                });
            },
            /**
             * 触发表单验证
             * @method handleSubmit
             * @for TeacherModal
             * @param {void} 
             * @return {void} 
             */
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let formData = Object.assign({}, this.model, values);
                        let url = apis.add;
                        this.confirmLoading = true;

                        if (this.model.id) {
                            // 编辑
                            url = apis.edit;
                        }
                        
                        this.$axios
                            .post(url, formData)
                            .then((res) => {
                                if (res.code === 200) {
                                    this.$message.success(res.msg);
                                    this.$emit("ok");
                                } else {
                                    this.$message.warning(res.msg);
                                }
                            })
                            .finally(() => {
                                this.confirmLoading = false;
                                this.close();
                            });

                    }
                })
            },
            /**
             * 关闭弹出框
             * @method close
             * @for TeacherModal
             * @param {void} 
             * @return {void} 
             */
            close() {
                this.form.resetFields();
                this.visible = false;
            },
            /**
             * 上传文件列表变化回调
             * @method handleFileListChange
             * @for TeacherModal
             * @param {array} fileList 文件列表
             * @return {void} 
             */
            handleFileListChange(fileList) {
                this.fileList = fileList;
            },
            /**
             * 上传图片列表变化回调
             * @method handleImgListChange
             * @for TeacherModal
             * @param {array} fileList 文件列表
             * @return {void} 
             */
            handleImgListChange(fileList) {
                this.imgFileList = fileList;
            },
            /**
             * 关闭图片预览
             * @method handleCancel
             * @for TeacherModal
             * @param {void} 
             * @return {void} 
             */
            handleCancel() {
                this.previewVisible = false;
            },
            /**
             * 图片预览的回调
             * @method handlePreview
             * @for TeacherModal
             * @param {object} file 文件信息
             * @return {void} 
             */
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImage = file.url || file.preview;
                this.previewVisible = true;
            },
        },
    }
</script>

<style scoped lang="less">

</style>