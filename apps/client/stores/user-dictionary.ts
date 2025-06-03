import type { RouterOutput } from '~/trpc';

export type UserDictionary = RouterOutput['dictionary']['myDictionaries'][0];

export interface State {
  userDictionary: UserDictionary[] | null;
}

export const userDictionaryStore = defineStore('user-dictionary', {
  state: (): State => ({
    userDictionary: [],
  }),
  getters: {
    currentDictionary(state): UserDictionary | undefined {
      return state.userDictionary?.[0];
    },
    wordCount(): number {
      const count = this.currentDictionary?.dictionary?.words.length || 0;
      return count;
    },
  },
  actions: {
    async fetch() {
      const { $trpc } = useNuxtApp();
      const userDictionary = await safeCall(() => $trpc.dictionary.myDictionaries.query());
      this.userDictionary = userDictionary || [];
    },
  },
});
