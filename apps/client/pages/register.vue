<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

definePageMeta({
  auth: { unauthenticatedOnly: true },
});

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
  debugger;
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  console.log(event.data);
}
function handleSubmit() {
  debugger;
  console.log('submit');
}
</script>

<template>
  <div>
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormField label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormField>
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>
      <UFormField label="Avatar" name="avatar">
        <UInput v-model="state.avatar" />
      </UFormField>

      <UButton @click="handleSubmit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<style lang='css' scoped></style>
