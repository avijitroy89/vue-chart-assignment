<template>
  <input type="file" @change="upload"/>
</template>
<script>
import Papa from 'papaparse';
import defaults from 'lodash.defaults';
export default {
  name: 'papa-parse',
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    upload(e) {
      const $this = this;
      Papa.parse(e.target.files[0], defaults(this.config, {
        complete(results) {
            console.log(results)
          $this.$emit('complete', results);
        },
        error(errors) {
          $this.$emit('error', errors);
        },
        beforeFirstChunk() {
          $this.$emit('before-parse');
        },
      }));
    },
  },
};
</script>
