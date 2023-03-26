<template>
  <div class="h-screen-90">
    <div
      v-if="secretExists"
      class="h-full w-full container mx-auto flex flex-wrap p-5 items-center"
    >
      <SharedTextArea :initial-text="decryptedPayload" />
    </div>
    <div
      v-else
      class="p-5 h-full w-full flex justify-center items-center flex-col"
    >
      <h1 class="text-white font-bold text-5xl">Secret Error</h1>
      <h2 class="text-gray-500 font-medium text-lg">
        We cannot process the secret, your secret may have already been consumed
        or expired.
      </h2>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import SharedTextArea from "./SharedTextArea.vue";
export default {
  name: "IndexPage",
  props: ["id", "secretKey"],
  components: {
    SharedTextArea,
  },
  data() {
    return {
      decryptedPayload: "",
      secretExists: true,
    };
  },
  async mounted() {
    try {
      const accessToken = Cookies.get('access_token');
      const request = await fetch(
        `${import.meta.env.PUBLIC_KEEP_SECRETS_API_BASE_URL}/secrets/${
          this.id
        }/${this.secretKey}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const response = await request.json();

      if (request.status === 404) {
        this.secretExists = false;
      }

      this.decryptedPayload = response.payload;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
.h-screen-90 {
  height: 79vh;
}
</style>
