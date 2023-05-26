import { Mutations, MutationsInterface } from "./types";

export default {
  [Mutations.SET_CURRENT_CHALLENGE_INDEX](state, index) {
    state.currentChallengesIndex = index
  },

  [Mutations.SET_IS_LEVEL_UP_MODAL_OPEN](state, flag) {
    state.isLevelUpModalOpen = flag
  },


  [Mutations.COMPLETE_CHALLENGE](state, xpAmount) {
    const { current, end } = state.xp
    const currentTotalXp = current + xpAmount
    const shouLevelUp = currentTotalXp >= end

    state.completedChallenges += 1

    if (shouLevelUp) {
      state.level += 1

      const remainingXp = currentTotalXp - end
      const experienceToNextLevel = Math.pow((state.level) * 4, 2)

      state.xp = {
        current: remainingXp,
        start: 0,
        end: experienceToNextLevel
      };

      state.isLevelUpModalOpen = true
      return;
    }


    state.xp = {
      ...state.xp,
      current: currentTotalXp
    }
  },


  [Mutations.SAVE_COOKIE_DATA](state, cookie) {
    state.level = cookie.level
    state.xp = cookie.xp
    state.completedChallenges = cookie.completedChallenges
  },
} as MutationsInterface
