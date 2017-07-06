<template>
  <div>
    <group>
      <cell is-link title="Tabbar" link="/component/tabbar"></cell>
    </group>
    <tabbar>
      <tabbar-item>
        <img slot="icon" src="../../assets/icon_dd1.png">
        <img slot="icon-active" src="../../assets/icon_dd1.png">
        <span slot="label">one</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../../assets/icon_dd1.png">
        <img slot="icon-active" src="../../assets/icon_dd1.png">
        <span slot="label">two</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>
