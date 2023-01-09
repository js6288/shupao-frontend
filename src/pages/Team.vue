<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="private"></van-tab>

    </van-tabs>
    <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"></van-button>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="搜索数据为空"></van-empty>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const searchText = ref('');
const router = useRouter();
const teamList = ref([])
const active = ref('public')
/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  //查公开
  if (name === 'public'){
    listTeam(searchText.value,0);
  }else {//查加密
    listTeam(searchText.value,2)
  }
}
/**
 *
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '',status = 0) => {
  const res = await myAxios.get('team/list',{
    params:{
      searchText:val,
      status
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


//跳转到创建队伍页面
const toAddTeam = ()=>{
  router.push({
    path: '/team/add'
  })
}


onMounted( () =>{
  listTeam('');
})


</script>

<style scoped>
#teamPage{

}
</style>
