<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

definePageMeta({
  auth: { unauthenticatedOnly: true },
  layout: 'auth',
});

const { signIn } = useAuth();

const schema = z.object({
  email: z.string().email('Invalid email'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  signIn('email', {
    email: event.data.email,
    callbackUrl: '/',
  });
}
</script>

<template>
  <div class="flex flex-col items-center justify-center p-18 h-full">
    <div class="text-2xl my-6">
      Sign in to your account
    </div>

    <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
      <UFormField name="email">
        <UInput v-model="state.email" placeholder="Please enter your email" size="xl" icon="i-lucide-at-sign" class="w-full" />
      </UFormField>

      <UButton type="submit" size="xl" class="w-full justify-center">
        Continue
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
</template>

<style lang='css' scoped></style>
