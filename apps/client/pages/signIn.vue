<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

definePageMeta({
  auth: { unauthenticatedOnly: true },
});

const { signIn } = useAuth();
const { $trpc } = useNuxtApp();

const schema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  avatar: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  avatar: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  const id = await $trpc.user.register.mutate(event.data);
  console.log(id);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen relative prose">
    <div class="absolute top-0 -z-10 h-full w-full bg-white">
      <div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
    </div>

    <div class="size-[600px] bg-white rounded-3xl p-18 shadow flex items-center justify-center flex-col">
      <div class="text-2xl my-6">
        Create your account
      </div>

      <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
        <UFormField name="email">
          <UInput v-model="state.email" placeholder="Please enter your email" size="xl" icon="i-lucide-at-sign" class="w-full" />
        </UFormField>

        <UButton type="submit" size="xl" class="w-full justify-center">
          Create account
        </UButton>
      </UForm>

      <USeparator label="or" class="my-[20px]" />

      <UButton color="neutral" variant="outline" size="xl" class="w-full justify-center" plain icon="i-mdi-github" @click="signIn('github', { callbackUrl: '/' })">
        Continue with Github
      </UButton>
      <UButton color="neutral" variant="outline" size="xl" class="w-full justify-center mt-[20px]" plain icon="i-devicon-google" @click="signIn('google', { callbackUrl: '/' })">
        Continue with Google
      </UButton>
    </div>
  </div>
</template>

<style lang='css' scoped></style>
