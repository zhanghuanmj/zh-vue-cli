<!--
 * 单视屏上传
 * @module SingleVideoUpload
 * @author zhanghuan
 * @date 2021/02/16
-->
<template>
    <a-upload :name="name" :list-type="listType" :action="action" :headers="headers" :data="data" :fileList="fileList" :beforeUpload="beforeUpload" @change="handleChange" @preview="handlePreview" :accept="accept">
        <slot v-if="!loading" />
    </a-upload>
</template>

<script>
    import apis from '@/apis/common'
    // 生成uid
    const uidGenerator = () => {
        return '-' + parseInt(Math.random() * 10000 + 1, 10);
    }
    // 获取文件名
    const getFileName = (path) => {
        if (path.lastIndexOf("\\") >= 0) {
            let reg = new RegExp("\\\\", "g");
            path = path.replace(reg, "/");
        }
        return path.substring(path.lastIndexOf("/") + 1);
    }

    export default {
        name: 'SingleVideoUpload',
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            name: {
                type: String,
                required: false,
                default: 'file'
            },
            action: {
                type: String,
                required: true,
                default: ''
            },
            headers: {
                type: Object,
                required: false,
                default: null
            },
            data: {
                type: Object,
                required: false,
                default: null
            },
            value: {
                type: String,
                required: false
            },
            sizeLimit: {
                type: Object,
                required: false,
                default: null
            },
            accept: {
                type: String,
                required: false,
                default: 'video/*'
            },
            listType: {
                type: String,
                required: false,
                default: 'picture-card'
            }
        },
        data() {
            return {
                urlDownload: window._CONFIG.downloadPrefix,
                fileList: [],
                loading: false,
            }
        },
        watch: {
            value(val) {
                this.initFileList(val)
            }
        },
        methods: {
            /**
             * 初始化文件列表
             * @method initFileList
             * @for SingleVideoUpload
             * @param {string} paths 文件地址，多个地址用,隔开
             * @return {void} 
             */
            initFileList(paths) {
                if (!paths) {
                    this.fileList = [];
                    this.$emit('fileListChange', this.fileList)
                    return;
                }
                let fileList = [];
                let arr = paths.split(",")
                for (var a = 0; a < arr.length; a++) {
                    fileList.push({
                        uid: uidGenerator(),
                        name: getFileName(arr[a]),
                        status: 'done',
                        url: arr[a],
                        response: {
                            status: "history",
                            key: arr[a]
                        }
                    })
                }
                this.fileList = fileList
                this.$emit('fileListChange', this.fileList)
            },
            /**
             * 文件上传前的回调
             * @method beforeUpload
             * @for SingleVideoUpload
             * @param {object} file 文件信息
             * @return {boolean} 返回false阻止上传 
             */
            beforeUpload(file) {
                this.loading = true
                if (this.sizeLimit) {
                    let { size } = file
                    if (size > this.sizeLimit.size) {
                        this.$message.error(this.sizeLimit.msg)
                        return false
                    }
                }

                return true
            },
            /**
             * 上传文件改变时的状态，上传中、完成、失败都会调用这个函数
             * @method handleChange
             * @for SingleVideoUpload
             * @param {object} info { file: { 当前操作的文件对象 }, fileList: [ 当前的文件列表 ], event: { 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。 }}
             * @return {boolean} 返回false阻止上传 
             */
            handleChange(info) {
                let fileList = info.fileList
                if (info.file.status === 'done') {
                    fileList = fileList.map((file) => {
                        if (file.response && (!file.response.status || file.response.status !== "history")) {
                            file.url = this.urlDownload + file.response.key;
                        }
                        return file;
                    });
                    this.$message.success(`${info.file.name} 上传成功!`);
                    this.loading = false
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} 上传失败，${info.file.response && info.file.response.error}`);
                    this.loading = false
                } else if (info.file.status === 'removed') {
                    //如有需要新增 删除逻辑
                    this.$emit('deleted', info.file)
                }
                this.fileList = fileList
                this.$emit('fileListChange', this.fileList)
                if (info.file.status === 'done' || info.file.status === 'removed') {
                    this.handleValueChange()
                }
            },
            /**
             * 文件列表发生变化时的回调
             * @method handleValueChange
             * @for SingleVideoUpload
             * @param {void}
             * @return {void} 
             */
            handleValueChange() {
                let uploadedFiles = this.fileList.filter(file => file.status === 'done')
                let fileUrls = uploadedFiles.map(file => file.url)
                this.$emit('change', fileUrls.join(','))
            },
            /**
             * 图片预览的回调
             * @method handlePreview
             * @for SingleVideoUpload
             * @param {object} file 文件信息
             * @return {void} 
             */
            handlePreview(file) {
                this.$emit('preview', file)
            },
            /**
             * 重置方法
             * @method reset
             * @for SingleVideoUpload
             * @param {void} 
             * @return {void} 
             */
            reset(file) {
                this.fileList = []
            },
        },
    }
</script>

<style scoped>

</style>