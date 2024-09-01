<template>
  <div class="tw-min-h-screen tw-h-auto">
    <div class="tw-space-y-10 tw-w-[95%] tw-m-auto tw-py-5">
      <!-- Score Counter -->
      <section class="lg:tw-w-[60%] tw-w-full tw-m-auto">
        <ScoreCounter :score="scoreStore.score" />
      </section>

      <!-- Main Game Play -->
      <section class="tw-min-h-[350px] tw-space-y-5">
        <!-- Stage One (Player Choose Option) -->
        <div
          v-if="step === 1"
          class="tw-w-auto tw-w-[400px] tw-h-[400px] tw-relative tw-m-auto"
          :style="{
            backgroundImage: `url(${TriangleBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }"
        >
          <RuleCard
            class="tw-absolute tw-top-0 tw-left-0"
            rule="paper"
            @click.prevent="selectUserChoice('paper')"
          />
          <RuleCard
            class="tw-absolute tw-top-0 tw-right-0"
            rule="scissors"
            @click.prevent="selectUserChoice('scissors')"
          />
          <RuleCard
            class="tw-absolute tw-bottom-0 tw-left-1/2 tw-transform tw--translate-x-1/2"
            rule="rock"
            @click.prevent="selectUserChoice('rock')"
          />
        </div>

        <!-- Stage Two (Computer Choice & Result) -->
        <div v-if="step === 2" class="tw-m-auto lg:tw-w-[60%]">
          <div
            class="tw-grid tw-gap-5 md:tw-grid-flow-col-dense md:tw-auto-cols-fr tw-items-center tw-grid-cols-2"
          >
            <div class="tw-space-y-5">
              <h5
                class="tw-uppercase tw-text-center tw-text-white tw-font-semibold tw-text-xl"
              >
                You Picked
              </h5>
              <RuleCard
                :rule="userChoice"
                class="tw-w-max tw-m-auto"
                :winner-status="determineWinner === 'user' ? true : false"
              />
            </div>

            <div
              class="tw-w-max tw-m-auto tw-space-y-5 tw-order-last md:tw-order-none tw-col-span-2 tw-pt-10 md:tw-pt-0"
              v-show="showResult"
            >
              <p
                class="tw-uppercase tw-text-center tw-text-white tw-font-bold tw-text-5xl"
              >
                {{
                  determineWinner === "computer"
                    ? "you loose"
                    : determineWinner === "user"
                    ? "you win"
                    : "It's a tie"
                }}
              </p>
              <button
                @click.prevent="playAgain"
                class="hover:tw-text-red-500 tw-border tw-w-full tw-py-2 tw-px-6 tw-px-5 tw-bg-white tw-rounded-lg tw-uppercase"
              >
                Play Again
              </button>
            </div>

            <div class="tw-space-y-5">
              <h5
                class="tw-uppercase tw-text-center tw-text-white tw-font-semibold tw-text-xl"
              >
                The House Picked
              </h5>
              <RuleCard
                :rule="computerChoice"
                class="tw-w-max tw-m-auto"
                :winner-status="determineWinner === 'computer' ? true : false"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Rules Button -->
      <section class="tw-flex lg:tw-justify-end tw-justify-center">
        <button
          @click.prevent="showRules"
          class="tw-border tw-py-2 tw-px-6 tw-px-5 tw-text-white tw-rounded-lg tw-uppercase"
        >
          RULES
        </button>
      </section>

      <!-- Modal For Rules -->
      <Modal :is-active="isRulesModalActive" @close="hideRules">
        <div class="tw-p-5 tw-space-y-5">
          <div class="tw-flex tw-items-center tw-justify-between tw-text-2xl">
            <span class="tw-font-bold">RULES</span>

            <button @click.prevent="hideRules" class="tw-flex-none">
              <img :src="CloseIcon" alt="close" />
            </button>
          </div>

          <div class="tw-p-5 tw-px-10">
            <img :src="RulesImage" alt="rules" />
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useScoreStore } from "./stores/score";

// Images
import CloseIcon from "./assets/images/icon-close.svg";
import RulesImage from "./assets/images/image-rules.svg";
import TriangleBackground from "/images/bg-triangle.svg";

// Components
import ScoreCounter from "./components/ScoreCounter.vue";
import Modal from "./components/Modal.vue";
import RuleCard from "./components/RuleCard.vue";

// types
type Choices = null | "rock" | "paper" | "scissors";
type ResultType = "user" | "computer" | "tie";

// Variables & Functions
const scoreStore = useScoreStore();

const addToScore = () => {
  scoreStore.addScore();
};

const subtractFromScore = () => {
  scoreStore.subtractScore();
};

const isRulesModalActive = ref<boolean>(false);

const showRules = () => {
  isRulesModalActive.value = true;
};
const hideRules = () => {
  isRulesModalActive.value = false;
};

const step = ref<number>(1);

const showResult = ref<boolean>(false);

const choices = ref<Choices[]>(["paper", "rock", "scissors"]);

const userChoice = ref<Choices>(null);

const computerChoice = ref<Choices>(null);

const generateComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * choices.value.length);
  return choices.value[randomIndex];
};

const selectUserChoice = (choice: Choices) => {
  if (step.value === 1) {
    userChoice.value = choice;
    step.value++;

    setTimeout(() => {
      computerChoice.value = generateComputerChoice();
      showResult.value = true;
    }, 1000);
  }
};

const determineWinner = computed(() => {
  if (computerChoice.value !== null && userChoice.value !== null) {
    if (userChoice.value === computerChoice.value) {
      return "tie";
    }

    if (
      (userChoice.value === "rock" && computerChoice.value === "scissors") ||
      (userChoice.value === "paper" && computerChoice.value === "rock") ||
      (userChoice.value === "scissors" && computerChoice.value === "paper")
    ) {
      return "user";
    }

    return "computer";
  }
  return null;
});

watch(
  () => determineWinner.value,
  (result: ResultType | null) => {
    if (result === "user") {
      addToScore();
    } else if (result === "computer" && scoreStore.score > 0) {
      subtractFromScore();
    }
  }
);

const playAgain = () => {
  showResult.value = false;
  step.value = 1;
  userChoice.value = null;
  computerChoice.value = null;
};
</script>

<style scoped></style>
