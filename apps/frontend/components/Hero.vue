<template>
  <header class="h-5/6 flex flex-col justify-center">
    <div
      class="container px-6 mx-auto flex flex-col items-beetwen justify-center"
    >
      <div
        class="flex flex-col items-center justify-center py-6 lg:h-[32rem] lg:flex-row"
      >
        <div class="lg:w-1/2">
          <h2 class="text-6xl pb-4 font-semibold text-gray-100">
            Keep Your<br />Secrets
          </h2>
          <h3 class="text-2xl font-semibold text-gray-100">
            Under <span class="text-blue-400">control</span>
          </h3>
          <p v-show="false" class="mt-3 text-gray-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </p>
        </div>
        <div class="flex mt-8 lg:w-1/1 lg:justify-end lg:mt-0">
          <div class="w-80 rounded-lg bg-gray-800 bg-opacity-50 h-full">
            <div class="p-5 h-full">
              <h2 class="text-center text-2xl font-semibold text-white fo">
                Create Secret {{ secretCreated }}
              </h2>
              <transition name="fade">
                <form
                  v-show="!secretCreated"
                  class="transition-all h-full"
                  @submit.prevent
                >
                  <div class="w-full mt-4">
                    <SharedTextArea
                      :rows="5"
                      label-text="Payload"
                      @onInput="changePayload"
                    />
                  </div>
                  <div class="">
                    <SharedSelect
                      label-text="Expiration Time"
                      :options="timeOptions"
                      @onSelect="changeTime"
                    />
                  </div>
                  <div class="flex items-center justify-between mt-4">
                    <SharedButton inner-text="Create" @onClick="createSecret" />
                  </div>
                </form>
              </transition>
              <transition name="appear">
                <div v-show="secretCreated" class="mt-5">
                  <SharedInput disabled="true" :initial-text="secretUrl" />
                  <div class="flex gap-4 mt-4">
                    <SharedButton
                      @onClick="backToHome"
                      inner-text="Create Other"
                    />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const config = useRuntimeConfig();

const secretUrl = ref("");
const currentPayload = ref("");
const currentTime = ref("");
const secretCreated = ref(false);
const timeOptions = ref([
  {
    label: "5 min",
    value: 5,
  },
  {
    label: "30 min",
    value: 30,
  },
  {
    label: "1 hour",
    value: 60,
  },
  {
    label: "3 hour",
    value: 180,
  },
]);

function changeTime(value) {
  currentTime.value = value;
}

function changePayload(value) {
  currentPayload.value = value;
}

function backToHome() {
  secretCreated.value = false;
}

async function createSecret() {
  try {
    const tokenCookie = useCookie('access_token');
    const apiRequest = await fetch(
      `${config.KEEP_SECRETS_API_BASE_URL}/secrets`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenCookie.value}`,
        },
        body: JSON.stringify({
          payload: currentPayload.value,
          expireAt: currentTime.value,
        }),
      }
    );
    const response = await apiRequest.json();
    secretUrl.value = `${config.KEEP_SECRETS_FRONTEND_BASE_URL}/secret/${response.id}/${response.secretKey}`;
    secretCreated.value = true;
  } catch (err) {
    console.log(err)
    alert("Something went worng, please try again.");
  }
}
</script>

<style>
.fade-enter-active {
  transition: opacity 600ms 100ms, max-height 500ms;
  max-height: 700px;
}
.fade-leave-active {
  transition: opacity 600ms, max-height 500ms 450ms;
  max-height: 700px;
}
.fade-enter,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.appear-enter-active {
  transition: opacity 600ms 1s, max-height 500ms 450ms;
  max-height: 320px;
}
.appear-leave-active {
  transition: opacity 600ms, max-height 500ms 450ms;
  max-height: 320px;
}
.appear-enter,
.appear-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
