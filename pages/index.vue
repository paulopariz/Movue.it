<template>
  <section
    class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20"
  >
    <div class="flex flex-col w-full lg:w-1/2">
      <Profile />
      <CompletedChallenges />
      <Countdown @completed="getNewChallenge" />

      <button v-if="hasCountdownCompleted" disabled class="button completed">
        Cycle completed
      </button>

      <button
        v-else-if="isCountdownActive"
        class="button abandon"
        @click="setCountdownState(false)"
      >
        Abandon cycle
      </button>

      <button v-else class="button start" @click="setCountdownState(true)">
        Start a cycle
      </button>
    </div>

    <Card class="w-full lg:w-1/2" id="challenge" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import { Mutations as ChallengesMT } from "~/store/Challenges/types";
import { Mutations as CountdownMT } from "~/store/Countdown/types";

import Countdown from "~/components/molecules/Countdown.vue";
import CompletedChallenges from "~/components/atoms/CompletedChallenges.vue";
import Profile from "~/components/molecules/Profile.vue";
import Card from "~/components/organisms/Card.vue";

import { playAudio, getRandomNumber, sendNotification, scrollToElement } from "~/utils";

interface Head {
  title: string;
}

export default Vue.extend({
  head(): Head {
    return {
      title: "Home | Movue.it",
    };
  },

  components: {
    CompletedChallenges,
    Profile,
    Countdown,
    Card,
  },

  mounted() {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  },

  computed: {
    ...mapState("Countdown", {
      hasCountdownCompleted: "hasCompleted",
      isCountdownActive: "isActive",
    }),

    ...mapGetters("Challenge", ["challengesLength"]),
  },

  methods: {
    ...mapMutations({
      setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
      setCountdownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
      setCurrentChallengeIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`,
    }),

    setCountdownState(flag: boolean) {
      this.setCountdownHasCompleted(false);
      this.setCountdownIsActive(flag);
    },

    getNewChallenge() {
      this.setCountdownHasCompleted(true);

      if (Notification?.permission === "granted") {
        playAudio("/notification.mp3");
        sendNotification("New Challenge!", {
          body: "A new challenge has started! Go complete it!",
          icon: "/favicon.png",
        });
      }

      this.$nextTick(() => {
        scrollToElement("#challenge");
      });
    },
  },
});
</script>
