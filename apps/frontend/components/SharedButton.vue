<template>
  <button
    @click="click"
    class="w-full px-4 py-2 font-semibold text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 opacity-100"
  >
    {{ innerText }}
  </button>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SharedButton',
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'innerText'
  ],
  methods: {
    click () {
      this.$emit('onClick')
    }
  }
}
</script>