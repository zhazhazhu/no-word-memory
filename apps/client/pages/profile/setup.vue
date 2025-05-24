<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { useAuth } from '#imports';
import { z } from 'zod';

definePageMeta({
  layout: 'auth',
});

const { data: session, refresh } = useAuth();

const { $trpc } = useNuxtApp();
const toast = useToast();

const schema = z.object({
  name: z.string().min(2, 'Please enter at least 2 characters'),
  image: z.string().url('Please enter a valid URL for your avatar'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: '',
  image: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!session.value?.id)
    return;

  const user = await $trpc.user.updateProfile.mutate({
    id: session.value.id,
    name: event.data.name,
    image: event.data.image,
  });
  if (user[0].id) {
    toast.add({ title: '成功', description: '资料已更新', color: 'success' });
    await refresh();
    navigateTo('/');
  }
}
</script>

<template>
  <div class="p-18 h-full flex flex-col items-center justify-center">
    <UIcon name="i-material-symbols-person-edit" class="text-6xl text-yellow-500" />
    <div class="text-2xl my-6">
      Supplement your profile
    </div>

    <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
      <UFormField name="name">
        <UInput v-model="state.name" placeholder="Please enter your name" size="xl" icon="i-material-symbols-drive-file-rename-outline" class="w-full" />
      </UFormField>
      <UFormField name="image">
        <UInput v-model="state.image" placeholder="Please enter your avatar url" size="xl" icon="i-material-symbols-motion-photos-on" class="w-full" />
      </UFormField>

      <UButton type="submit" size="xl" class="w-full justify-center">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<style lang='css' scoped></style>
