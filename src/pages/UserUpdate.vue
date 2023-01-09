<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','用户名',user.username)"/>
    <van-cell title="账号" is-link :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="手机号" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" is-link to="/user/edit" :value="user.planetCode"/>
    <van-cell title="注册时间" is-link to="/user/edit" :value="user.createTime"/>
  </template>


</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

// const user = {
//   id: 1,
//   username: 'shushu',
//   userAccount: 'asdasdas',
//   avatarUrl: 'https://blog-md-js.oss-cn-guangzhou.aliyuncs.com/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220415082012.jpg',
//   gender:'男',
//   phone: '1379448965',
//   email: 'asda@e.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const router = useRouter();
const toEdit = (editKey:string,editName:string,currentValue:string)=>{
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
const user = ref()
onMounted(async ()=>{
  user.value = await getCurrentUser();
  console.log(user.value);
})

</script>

<style scoped>

</style>
