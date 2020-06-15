<template>
  <div>
    <el-card class="box-card">
    <component-text></component-text>
      <div><h2>我是父组件</h2></div>
    </el-card>
  </div>


</template>

<script>
    import ComponentText from "./componentText";

    export default {
      components: {ComponentText},
      name: "card-test"
    }
</script>

<style scoped>

</style>
