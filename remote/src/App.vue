<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div class="redd">Name: Rspack - Remote</div>
    <div>Framework: vue3</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>

    <br />
    <br />
    <Content :test="'remote'" />
  </div>
</template>

<script lang="ts" setup>
import Content from "./components/Content.vue";
</script>

<style>
.redd {
  color: red;
}
</style>
