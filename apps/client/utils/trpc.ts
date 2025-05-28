import { useRouter } from '#imports';

export async function safeCall<T>(fn: () => Promise<T>): Promise<T | null> {
  const router = useRouter();

  return await fn().catch((err): any => {
    const code = err?.data?.code;

    if (code === 'UNAUTHORIZED') {
      console.warn('[tRPC] 未认证，跳转登录');
      router.push('/auth/signin');
    }
    else {
      console.error('[tRPC] 请求错误：', err);
    }

    return null;
  });
}
