<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username"/>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
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
