<template>
  <div id="app">
    <opening-screen v-if="scene === 'opening'" @to-exposition="toExposition"></opening-screen>
    <exposition-scene v-if="scene === 'exposition'" @to-sceneone="toSceneOne"></exposition-scene>
    <first-scene v-if="scene === 'first'" @to-second="toSecond"></first-scene>
  </div>
</template>

<script>
import expositionScene from './components/opening/expositionScene.vue';
import openingScreen from './components/opening/openingScreen.vue';
import firstScene from './components/firstScene.vue';
export default{
  components: { openingScreen , expositionScene , firstScene},
  data(){
    return{
      scene: 'opening', 
    }
  },
  methods:{
    toExposition(){
      this.scene = 'exposition';
    },
    toSceneOne(){
      this.scene = 'first';
    }
  }
}
</script>

<style>
#app {
  overflow: hidden;
}
</style>
