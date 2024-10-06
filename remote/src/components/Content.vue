<template>
  <div class="mt-10 text-3xl w-full mx-auto max-w-6xl">
    <h1>
      Remote 2
      <span>{{ test ?? "-" }}</span>
    </h1>
    <br />

    <h1>Modules</h1>
    <div :class="[$style.parent]">
      <div :class="[$style.child]">One</div>
      <div :class="[$style.child]">Two</div>
      <div :class="[$style.child]">Three</div>
      <div class="child">One</div>
      <div class="child">Two</div>
      <div class="child">Three</div>
    </div>

    <br /><br />
    <h1>SCSS</h1>
    <div class="parent">
      <div class="child">One</div>
      <div class="child">Two</div>
      <div class="child">Three</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useCssModule } from "vue";

const props = defineProps({
  test: String,
});
onMounted(() => {
  const styles = useCssModule();
  console.log("🚀 ~ onMounted ~ styles:", styles);
});
</script>

<style lang="scss" scoped>
.parent {
  margin: 0 auto;
  display: flex;
  gap: 10px;
  .child {
    height: 100px;
    width: 100px;
    border-radius: 10px;
    background-color: rebeccapurple;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<style module lang="scss">
.parent {
  margin: 0 auto;
  display: flex;
  gap: 10px;

  .child {
    height: 100px;
    width: 100px;
    border-radius: 10px;
    background-color: rebeccapurple;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
