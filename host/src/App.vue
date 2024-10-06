<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: Rspack-mf-host</div>
    <div>Framework: vue3</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>

    <button type="button" @click="count++">INCREMENT</button>

    <br />
    <br />
    <Content :test="count" />
    <br />
  </div>
</template>

<script lang="ts" setup>
import Content from "rsRemote/Content";
import { ref } from "vue";

const count = ref(1);
</script>
