<template>
  <div class="h-screen-90">
    <div v-if="secretExists" class="h-full w-full container mx-auto flex flex-wrap p-5 items-center ">
      <SharedTextArea
        :initial-text="decryptedPayload"
      />
    </div>
    <div v-else class="p-5 h-full w-full flex justify-center items-center flex-col">
      <h1 class="text-white font-bold text-5xl">
        Secret Error
      </h1>
      <h2 class="text-gray-500 font-medium text-lg">
        We cannot process the secret, your secret may have already been consumed or expired.
      </h2>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute()

const decryptedPayload = ref('')
const secretExists = ref(true)

onMounted(async() => {
    try {
      const tokenCookie = useCookie('access_token');
      const request = await fetch(
        `${config.KEEP_SECRETS_API_BASE_URL}/secrets/${route.params.id}/${route.params.secretKey}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const response = await request.json();

      if (request.status === 404) {
        secretExists.value = false;
      }

      decryptedPayload.value = response.payload;
    } catch (err) {
      console.log(err);
    }
})

</script>

<style>
.h-screen-90 {
  height: 79vh;
}
</style>
