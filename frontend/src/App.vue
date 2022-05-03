<template>
  <div>
    <div style="text-align: center;">
<img alt="Vue logo" src="./assets/list.png" height="70" />
    <HelloWorld msg="Welcome to Task Management App" />
    </div>
    
    <TaskItems/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TaskItems from './components/TaskItems.vue';


export default {
  name: "App",
  components: {
    HelloWorld,TaskItems
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 60px;
}
</style>
