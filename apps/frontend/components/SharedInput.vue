<template>
  <input
    ref="input" v-model="text"
    type="text"
    class="block w-full px-2 py-2 border rounded-md bg-gray-600 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
    @input="input"
    @click="selectAll()"
  >
</template>

<script>
export default {
  name: 'SharedInput',
  props: {
    // eslint-disable-next-line vue/require-prop-types,vue/require-default-prop
    initialText: {
      required: false
    },
    // eslint-disable-next-line vue/require-prop-types
    disabled: {
      default: false
    }
  },
  data () {
    return {
      text: ''
    }
  },
  watch: {
    initialText (newVal) {
      this.text = newVal
    }
  },
  created () {
    this.text = this.initialText
  },
  methods: {
    input () {
      if (this.disabled) {
        this.text = this.initialText
      }
      this.$emit('onType', this.text)
    },
    selectAll () {
      this.$refs.input.select()
    }
  }
}
</script>