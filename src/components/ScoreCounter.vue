<template>
  <section
    class="tw-w-full tw-p-5 tw-border-4 tw-border-header-outline tw-rounded-xl tw-flex tw-items-center tw-justify-between"
  >
    <div>
      <Logo />
    </div>

    <div class="tw-bg-white tw-p-5 tw-px-8 tw-flex-none tw-rounded-xl">
      <div class="tw-text-center">
        <p class="tw-text-score-text tw-font-semibold">SCORE</p>
        <p class="tw-text-5xl tw-font-bold tw-text-gray-600">{{ score }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";

defineProps<{ score: number }>();
</script>

<style scoped></style>
