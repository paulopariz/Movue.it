import { MutationTree } from 'vuex';


export interface XP {
  current: number;
  start: number;
  end: number;
}

export interface Challenge {
  type: string;
  description: string;
  amount: number;
}

export interface State {
  level: number;
  xp: XP;
  completedChallenges: number;
  currentChallengesIndex: number | null;
  isLevelUpModalOpen: boolean;
  allChallenges: Challenge[];
}


