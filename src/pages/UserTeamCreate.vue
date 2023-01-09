<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索已创建队伍" @search="onSearch"/>
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="当前没有创建队伍"></van-empty>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const searchText = ref('');

const listTeam = async (val = '') => {
  const res = await myAxios.get('team/list/my/create',{
    params:{
      searchText:val
    }
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    Toast.fail("队伍加载失败请稍后重试")
  }
}
const onSearch = (val) => {
  listTeam(val)
};

const router = useRouter();
//跳转到创建队伍页面
const doJoinTeam = ()=>{
  router.push({
    path: '/team/add'
  })
}

const teamList = ref([])
onMounted( () =>{
  listTeam('');
})


</script>

<style scoped>
#teamPage{

}
</style>
