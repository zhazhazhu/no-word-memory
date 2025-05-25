export default defineNuxtRouteMiddleware((to) => {
  const { status, data: session } = useAuth();
  // Return immediately if user is already authenticated
  if (to.meta.auth?.unauthenticatedOnly === true) {
    return;
  }
  if (status.value === 'authenticated') {
    if (!session.value?.user?.name && to.path !== '/profile/setup') {
      return navigateTo('/profile/setup');
    }
    return;
  }

  /**
   * We cannot directly call and/or return `signIn` here as `signIn` uses async composables under the hood, leading to "nuxt instance undefined errors", see https://github.com/nuxt/framework/issues/5740#issuecomment-1229197529
   *
   * So to avoid calling it, we return it immediately.
   */
  return navigateTo('/auth/signin');
});
