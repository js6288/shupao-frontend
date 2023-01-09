<template>

  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
 <user-card-list :user-list="userList" :loading="loading">

 </user-card-list>

  <van-empty v-if="!userList || userList.length < 1" description="数据为空"></van-empty>
</template>

<script setup lang="ts">

import {onMounted, ref, watchEffect} from 'vue';
import { Toast } from 'vant';
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const route = useRoute();
const userList = ref([]); //用于存放用户列表
const isMatchMode = ref<boolean>(false);
const loading = ref(true)

const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          Toast.fail('请求失败');
        })
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          Toast.fail('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;

}


watchEffect(()=>{
 loadData()
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
