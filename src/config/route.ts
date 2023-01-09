import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import UserUpdate from "../pages/UserUpdate.vue"
import User from "../pages/User.vue"
import Search from "../pages/Search.vue"
import UserEdit from "../pages/UserEdit.vue"
import SearchResult from "../pages/SearchResult.vue"
import UserLogin from "../pages/UserLogin.vue"
import TeamAdd from "../pages/TeamAdd.vue"
import TeamUpdate from "../pages/TeamUpdate.vue"
import UserTeamJoin from "../pages/UserTeamJoin.vue"
import UserTeamCreate from "../pages/UserTeamCreate.vue"

const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team,title:'找队伍' },
    { path: '/team/add',component: TeamAdd,title: '创建队伍'},
    { path: '/team/update',component: TeamUpdate,title: '更新队伍'},
    { path: '/user', component: User,title: '个人信息' },
    { path: '/user/update', component: UserUpdate ,title: '更新信息'},
    { path: '/search',component: Search ,title:'找伙伴'},
    { path: '/user/edit',component: UserEdit,title: '编辑信息'},
    { path: '/user/list',component: SearchResult,title: '用户列表'},
    { path: '/user/login',component: UserLogin,title: '登录'},
    { path: '/user/team/join',component: UserTeamJoin,title: '加入队伍'},
    { path: '/user/team/create',component: UserTeamCreate,title: '创建队伍'}
]

export default routes;
