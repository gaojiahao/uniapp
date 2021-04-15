import {
    Button,
    Option,
    Select,
    Switch,
    MessageBox,
    Message,
    Dialog,
    Input,
    Table,
} from "element-ui";
const element = {
    install: function (Vue) {
        Vue.use(Button);
        Vue.use(Switch);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(Dialog);
        Vue.use(Input);
        Vue.use(Table);

        // 往vue实例原型里添加消息提示，方便全局调用
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$message = Message;
        //使用：this.$message('这是一条消息提示');
    }
};
export default element;
