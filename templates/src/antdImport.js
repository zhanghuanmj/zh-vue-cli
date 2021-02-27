/**
* @author: zhanghuan
* @create: 2020/06/15
* @describe: antd组件引入
*/
import Vue from 'vue'

import {
    ConfigProvider,
    Layout,
    Icon,
    Input,
    Menu,
    Form,
    Row,
    Col,
    Button,
    Select,
    Alert,
    Card,
    Table,
    Divider,
    Message,
    Popconfirm,
    Dropdown,
    Drawer,
    Spin,
    Upload,
    Modal,
    Tooltip,
    List,
    Checkbox,
    DatePicker,
    Radio,
    
} from 'ant-design-vue'

Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Select)
Vue.use(Alert)
Vue.use(Card)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Message)
Vue.use(Popconfirm)
Vue.use(Dropdown)
Vue.use(Drawer)
Vue.use(Spin)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(List)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Radio)



Vue.prototype.$message = Message
Vue.prototype.$modal = Modal


