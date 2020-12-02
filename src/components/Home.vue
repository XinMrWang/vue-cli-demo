<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img alt="#" src="@/assets/logo.png">
        <span>嘿嘿嘿</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <template>
          <div v-if="isCollapse" class="toggle-button" @click="toggle">&gt;</div>
          <div v-else class="toggle-button" @click="toggle">&lt;</div>
        </template>
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="menuActive"
          active-text-color="#409eff"
          background-color="#333744"
          router
          text-color="#fff"
          unique-opened>
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path"
                          @click="changeActive(subItem.path)">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      isCollapse: true,
      menuActive: ''
    }
  },
  created () {
    this.getMenuList()
    this.menuActive = window.sessionStorage.getItem('menuActive')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单列表
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    changeActive (event) {
      window.sessionStorage.setItem('menuActive', event)
      this.menuActive = event
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    img {
      padding-left: 10px;
      width: 50px;
    }

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }

  .toggle-button {
    background-color: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>
