<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const config = useRuntimeConfig();
const tokenCookie = useCookie('access_token');

onMounted( async() => {
  // Check if access_token cookie exists
  // if not, ask for token and save as cookie.
  if (!tokenCookie.value) {
    const token = await getToken();
    tokenCookie.value = token;
  }
});

async function getToken (){
  const request = await fetch(
    `${config.KEEP_SECRETS_API_BASE_URL}/auth`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aud: 'web'
      }),
    }
  );

  const { accessToken } = await request.json();
  return accessToken;
}
</script>
