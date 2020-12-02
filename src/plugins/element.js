import Vue from 'vue'
import {
  Aside,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Container,
  Dialog,
  Footer,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Notification,
  Pagination,
  Row,
  Submenu,
  Switch,
  Table,
  TableColumn,
  Tooltip
} from 'element-ui'

Vue.use(Row)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(Card)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(MenuItem)
Vue.use(Menu)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
