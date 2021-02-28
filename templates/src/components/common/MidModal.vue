<!--
 * 中间的弹框
 * @module midModal
 * @author zhanghuan
 * @date 2021/02/13
-->
<template>
    <a-modal :visible="visible" :width="modalWidth" :confirm-loading="confirmLoading" v-bind="resp" @ok="handleOk" @cancel="handleCancel" class="mid-modal">
        <template slot="title">
            <div class="modal-header">
                <span>{{ title }}</span>
                <span class="modal-header-btns">
                    <a-button class="modal-header-btn" @click="toggleScreen" :icon="modaltoggleFlag ? 'fullscreen' : 'fullscreen-exit'"></a-button>
                </span>
            </div>
        </template>
        <slot />
    </a-modal>
</template>

<script>
    const WIDTH = 700

    export default {
        name: "MidModal",
        props: {
            title: {
                type: String,
                required: false,
                default: ''
            },
            visible: {
                type: Boolean,
                required: false,
                default: false
            },
            width: {
                type: String | Number,
                required: false,
                default: WIDTH
            },
            confirmLoading: {
                type: Boolean,
                required: false,
                default: false
            },
            resp: {
                type: Object,
                required: false,
                default: null
            }
        },
        data() {
            return {
                modalWidth: 0,
                modaltoggleFlag: true,
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.modalWidth = this.width
            },
            /**
             * 点击确定按钮
             * @method handleOk
             * @for CourseModal
             * @param {e} e 事件源 
             * @return {void} 
             */
            handleOk(e) {
                this.modaltoggleFlag = true;
                this.$emit('ok', e);
            },
            /**
             * 点击取消按钮
             * @method handleCancel
             * @for CourseModal
             * @param {e} e 事件源 
             * @return {void} 
             */
            handleCancel(e) {
                this.modaltoggleFlag = true;
                this.$emit('cancel', e);
            },
            /**
             * 窗口最大化切换
             * @method toggleScreen
             * @for CourseModal
             * @param {void} 
             * @return {void} 
             */
            toggleScreen() {
                // 只滚动内容区时用
                // let midModal = window.document.querySelectorAll('.mid-modal')
                if (this.modaltoggleFlag) {
                    this.modalWidth = window.innerWidth;
                    /* // 只滚动内容区时用
                    midModal.forEach(item => {
                        if (item.style.display !== 'none') {
                            item.style.top = '0'
                            item.querySelector('.ant-table-wrapper').style.maxHeight = 'calc(100vh - 140px)';
                        }
                    }) */
                } else {
                    this.modalWidth = this.width;
                    /* // 只滚动内容区时用
                    midModal.forEach(item => {
                        if (item.style.display !== 'none') {
                            item.style.top = '100px'
                            item.querySelector('.ant-table-wrapper').style.maxHeight = 'calc(100vh - 240px)';
                        }
                    }) */
                }
                this.modaltoggleFlag = !this.modaltoggleFlag;
            },
        }
    }
</script>

<style scoped lang="less">

</style>