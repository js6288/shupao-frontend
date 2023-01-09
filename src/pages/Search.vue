<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    >
<!--      <template #action>-->
<!--        <div @click="onClickButton">搜索</div>-->
<!--      </template>-->
    </van-search>
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="tagLists.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding:0 16px">
    <van-col v-for="tag in activeIds" >
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>


  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagLists"
  />

  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>


</template>

<script setup>

import { ref } from 'vue';
import { Toast } from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();

const searchText = ref('');
const onSearch = (val) => {
  tagLists.value = originTagLists.map(parentTag=>{
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
};
const onCancel = () => {
  searchText.value = '';
  tagLists.value = originTagLists;
}


const activeIds = ref([]);
const activeIndex = ref(0);

const originTagLists = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
]

//标签列表
let tagLists = ref(
    originTagLists
)

const doClose = (tag) =>{
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })
}

const doSearchResult = ()=>{
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>
