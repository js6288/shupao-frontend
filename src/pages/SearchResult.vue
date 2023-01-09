<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"></van-empty>
</template>

<script setup >

import {onMounted, ref} from 'vue';
import { Toast } from 'vant';
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import qs from "qs";

const route = useRoute();
const userList = ref([]);
onMounted(async () => {
  // Make a request for a user with a given ID
  const userListData = await myAxios.get('/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer:{
      serialize:params => {
        return qs.stringify(params,{arrayFormat:'repeat'})
      }
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed',response);
    return response?.data; //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
  })
  .catch(function (error) {
    console.error('/user/search/tags error',error);
    Toast.fail('请求失败');
  })
  // console.log(userListData);
  if (userListData){
    userListData.forEach(user => {
      if(user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }


})
const {tags} = route.query;

const mockUser = {
  id: 1,
  username: 'shushu',
  userAccount: 'ajsdac',
  avatarUrl : 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
  gender:0,
  phone: '123245415',
  email: 'qweas@asd.com',
  userRole: 0,
  planetCode: '1234',
  createTime: new Date(),
  tags:['java','emo','C++'],
  profile:'一名老刘，八八八八八，巴拉巴拉巴拉八零八零八巴拉巴拉巴拉巴拉啊实打实的个人简介'
}
</script>

<style scoped>

</style>
