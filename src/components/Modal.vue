<template>
  <Teleport to="body" v-if="isActive">
    <div
      @click.self.prevent="closeModal"
      class="tw-bg-black/50 tw-fixed tw-w-full tw-top-0 tw-h-screen tw-grid tw-place-content-center tw-cursor-pointer tw-gap-10"
    >
      <div
        class="tw-bg-white tw-rounded-xl tw-m-auto tw-cursor-default tw-max-h-[70vh] lg:tw-max-h-[80vh] lg:tw-w-full md:tw-max-w-[95%] lg:tw-max-w-full tw-w-[90%] tw-m-auto"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Teleport, ref, watch } from "vue";

const props = defineProps(["isActive"]);
const isActive = ref<boolean>(false);
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

watch(
  () => props.isActive,
  (newValue) => {
    isActive.value = newValue;
  }
);
</script>

<style scoped></style>
