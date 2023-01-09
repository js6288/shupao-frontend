import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from '../states/user'

export const getCurrentUser = async ()=>{
    let currentUser = getCurrentUserState();
    if (currentUser){
        return currentUser;
    }

    //从远程处获取用户信息
    const res = await myAxios.get("/user/current");
    if (res.code == 0 ) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;

}
