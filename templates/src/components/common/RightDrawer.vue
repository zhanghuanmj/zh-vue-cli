<!--
 * 右边抽屉弹框
 * @module rightDrawer
 * @author zhanghuan
 * @date 2021/02/13
-->
<template>
    <a-drawer :visible="visible" :width="modalWidth" @close="handleCancel" wrapClassName="form-modal">
        <template slot="title">
            <div class="modal-header">
                <span>{{ title }}</span>
                <span class="modal-header-btns">
                    <a-button class="modal-header-btn" @click="toggleScreen" :icon="modaltoggleFlag ? 'fullscreen' : 'fullscreen-exit'"></a-button>
                </span>
            </div>
        </template>

        <slot />

        <div class="drawer-bootom-footer" v-show="hasFooter">
            <slot name="footer">
                <a-button style="margin-right: .8rem" @click="handleCancel">取消</a-button>
                <a-button @click="handleOk" type="primary" :loading="confirmLoading">提交</a-button>
            </slot>
        </div>

    </a-drawer>
</template>

<script>
    const WIDTH = 700

    export default {
        name: "RightDrawer",
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
            footer: {
                type: Boolean,
                required: false,
                default: true
            },
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
        computed: {
            hasFooter() {
                return this.footer
            }
        },
        methods: {
            init() {
                this.modalWidth = this.width
                this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
            },
            handleOk(e) {
                this.modaltoggleFlag = true;
                this.$emit('ok', e);
            },
            handleCancel(e) {
                this.modaltoggleFlag = true;
                this.$emit('cancel', e);
            },
            /**
             * 根据屏幕变化,设置抽屉尺寸
             * @method resetScreenSize
             * @for CourseModal
             * @param {void} 
             * @return {void} 
             */
            resetScreenSize() {
                let screenWidth = window.document.body.clientWidth;
                if (screenWidth < 500) {
                    this.width = screenWidth;
                } else {
                    this.width = WIDTH;
                }
            },
            /**
             * 窗口最大化切换
             * @method toggleScreen
             * @for CourseModal
             * @param {void} 
             * @return {void} 
             */
            toggleScreen() {
                if (this.modaltoggleFlag) {
                    this.modalWidth = window.innerWidth;
                } else {
                    this.modalWidth = WIDTH;
                }
                this.modaltoggleFlag = !this.modaltoggleFlag;
            },
        }
    }
</script>

<style lang="less">
    .form-modal {

        .ant-drawer-body {
            height: calc(100vh - 55px);
            overflow: auto;
            padding-bottom: 53px;
        }
    }
</style>