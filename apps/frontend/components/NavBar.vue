<!-- Please remove this file from your project -->
<template>
  <header class="text-gray-400 bg-gradient-to-b from-gray-900 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">KeepSecrets</span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      featureFlagNav: true
    }
  }
}
</script>
