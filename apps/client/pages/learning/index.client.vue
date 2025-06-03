<script lang='ts' setup>
const { $trpc } = useNuxtApp();
const { currentDictionary } = userDictionaryStore();

const words = computed(() => currentDictionary?.dictionary.words || []);
const currentLearningWordGroup = computed(() => words.value.slice(0, 10));
const currentLearningWordIndex = ref(0);
const currentLearningWord = computed(() => currentLearningWordGroup.value[currentLearningWordIndex.value]);

watchEffect(() => {
  speak(currentLearningWord.value.word);
});

function nextWord(remembered: boolean) {
  $trpc.learning_records.review.mutate({
    wordId: currentLearningWord.value.id,
    remembered,
  });
  currentLearningWordIndex.value++;
  if (currentLearningWordGroup.value.length === currentLearningWordIndex.value) {
    currentLearningWordIndex.value = 0;
  }
}

const cleanup = useEventListener(document, 'keydown', (e) => {
  if (e.key === ' ') {
    nextWord(true);
  }
  else if (e.key === 'q') {
    nextWord(true);
  }
  else if (e.key === 'e') {
    nextWord(false);
  }
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<template>
  <div class="h-[calc(100vh-100px)] flex flex-col items-center justify-center">
    <div class="font-bold text-center">
      <div class="text-6xl text-primary">
        {{ currentLearningWord.word }}
      </div>
      <div class="text-xl text-gray-500 ml-2">
        /{{ currentLearningWord.pronunciation }}/
      </div>
    </div>

    <div class="flex w-[180px] h-[30px] space-x-4 mt-[20px]">
      <UButton variant="soft" icon="i-lucide-speech" color="neutral" block class="text-sm" :ui="{ leadingIcon: 'size-4' }" @click="speak(currentLearningWord.word)">
        US
      </UButton>
      <UButton variant="soft" icon="i-lucide-speech" color="neutral" block class="text-sm" :ui="{ leadingIcon: 'size-4' }" @click="speak(currentLearningWord.word, 'en-GB')">
        GB
      </UButton>
    </div>

    <div v-for="item in currentLearningWord.definitions" :key="item.id" class="my-[10px] flex text-[1rem] space-x-2 text-neutral-500 font-bold italic">
      <div>{{ item.partOfSpeech }}</div>
      <div>{{ item.meaning }}</div>
    </div>

    <div class="flex w-[400px] h-[60px] space-x-4 mt-[40px]">
      <UButton variant="soft" color="neutral" block class="text-xl" :ui="{ leadingIcon: 'size-8' }" @click="nextWord(true)">
        Mastered
        <UKbd size="sm">
          Q
        </UKbd>
      </UButton>
      <UButton variant="soft" color="neutral" block class="text-xl" :ui="{ leadingIcon: 'size-8' }" @click="nextWord(false)">
        Forget
        <UKbd size="sm">
          E
        </UKbd>
      </UButton>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
