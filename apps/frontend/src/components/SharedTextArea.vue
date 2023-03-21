<template>
  <div class="h-full w-full">
    <label class=" mb-2 text-sm font-medium text-gray-200">{{ labelText }}</label>
    <textarea
      :rows="rows"
      v-model="text" class="w-full h-full px-4 py-2 border rounded-md bg-gray-800 text-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  name: 'SaredTextArea',
  props: ['labelText', 'rows', 'initialText'],
  watch: {
    initialText (newVal) {
      this.text = newVal
    }
  },
  data () {
    return {
      text: '',
      secretCreated: false,
      timeOptions: [
        {
          label: '5 min',
          value: 5
        },
        {
          label: '30 min',
          value: 30
        },
        {
          label: '1 hour',
          value: 60
        },
        {
          label: '3 hour',
          value: 180
        }
      ]
    }
  },
  methods: {
    input () {
      this.$emit('onInput', this.text)
    }
  }
}
</script>