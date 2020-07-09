<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height:100vh;" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :key="`menu-item-${index}-${subIndex}`"
            :index="subItem.path"
            >{{ subItem.title }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h3>全栈之巅 - 后台管理界面</h3>
      </el-header>
      <el-main>
        <!-- router-view中如2个页面都引用一个组件时,可能会无法识别,这时可以通过:key="$route.path"来识别区分,同时可以解决同一个组件多以引用导致数据一致的问题 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: '内容管理',
        items: [
          { title: '首页', path: '/' },
          { title: '课程管理', path: '/courses/list' },
          { title: '课时管理', path: '/episodes/list' },
        ],
      },
      {
        title: '运营管理',
        items: [{ title: '用户管理', path: '/users/list' }],
      },
    ],
  }
}
</script>

<style></style>
