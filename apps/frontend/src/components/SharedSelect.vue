<template>
  <div>
    <label class="text-sm font-medium text-gray-200 ">
      {{ labelText }}
    </label>
    <select
      v-model="selectedOption"
      @change="input"
      class="bg-gray-800 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 w-full p-2.5 "
    >
      <option :value="firstOption.value" selected>
        {{firstOption.label}}
      </option>
      <option v-for="option in restOptions" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SharedSelect',
  props: [
    'labelText', 'options'
  ],
  data () {
    return {
      firstOption: null,
      selectedOption: null,
      restOptions: []
    }
  },
  created () {
    this.firstOption = this.options[0]
    this.restOptions = this.options.filter((_, i) => i !== 0)
    this.selectedOption = this.firstOption.value
    this.$emit('onSelect', this.firstOption.value)
  },
  methods: {
    input () {
      this.$emit('onSelect', this.selectedOption)
    }
  }
}
</script>