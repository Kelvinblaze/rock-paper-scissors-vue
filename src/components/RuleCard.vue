<template>
  <div>
    <div
      v-if="rule === null"
      class="lg:tw-w-[150px] lg:tw-h-[150px] tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-gray-500"
    ></div>

    <div v-else class="tw-relative">
      <div
        class="tw-cursor-pointer lg:tw-w-[10em] lg:tw-h-[10em] tw-w-[8em] tw-h-[8em] tw-rounded-full tw-grid tw-place-content-center"
        :class="[
          rule === 'rock'
            ? 'tw-bg-red-500 tw-shadow-[1px_6px_theme(colors.red.600)]'
            : rule === 'paper'
            ? 'tw-bg-blue-500 tw-shadow-[1px_6px_theme(colors.blue.600)]'
            : rule === 'scissors'
            ? 'tw-bg-yellow-500 tw-shadow-[1px_6px_theme(colors.yellow.600)]'
            : 'tw-bg-orange-500',
        ]"
      >
        <div
          class="tw-shadow-[inset_4px_4px_theme(colors.gray.300)] tw-bg-white lg:tw-w-[8em] lg:tw-h-[8em] tw-w-[6em] tw-h-[6em] tw-rounded-full tw-grid tw-place-content-center"
        >
          <div>
            <img :src="RockImage" alt="rock" v-if="rule === 'rock'" />
            <img :src="PaperImage" alt="paper" v-if="rule === 'paper'" />
            <img
              :src="ScissorsImage"
              alt="scissors"
              v-if="rule === 'scissors'"
            />
          </div>
        </div>

        <!-- Ripple Effects -->
        <div :class="[winnerStatus ? 'rule-card-ripple--one' : '']"></div>
        <div :class="[winnerStatus ? 'rule-card-ripple--two' : '']"></div>
        <div :class="[winnerStatus ? 'rule-card-ripple--three' : '']"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RockImage from "../assets/images/icon-rock.svg";
import PaperImage from "../assets/images/icon-paper.svg";
import ScissorsImage from "../assets/images/icon-scissors.svg";

defineProps<{
  rule: null | "rock" | "paper" | "scissors";
  winnerStatus?: boolean;
}>();
</script>

<style scoped>
.rule-card-ripple--one::before,
.rule-card-ripple--two::before,
.rule-card-ripple--three::before {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 2s 1s ease-in-out infinite;
}

@keyframes ripple {
  to {
    transform: translate(-50%, -50%), scale(2);
    opacity: 0;
  }
}

.rule-card-ripple--one::before {
  width: 14em;
  height: 14em;
  background: theme("colors.header-outline");
  opacity: 0.3;
}
.rule-card-ripple--two::before {
  width: 18em;
  height: 18em;
  background: theme("colors.header-outline");
  opacity: 0.2;
}
.rule-card-ripple--three::before {
  width: 20em;
  height: 20em;
  background: theme("colors.header-outline");
  opacity: 0.1;
}
</style>
