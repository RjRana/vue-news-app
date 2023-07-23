<template>
  <div class="skeletons">
    <component :is="type" v-if="loading" v-bind="$attrs" />
    <slot v-else />
  </div>
</template>

<script>
import Headline from './Headline.vue';
import Articles from './Articles.vue';

export default {
  name: 'skeletons',

  components: {
    Headline,
    Articles,
  },
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      required: true,
      default: 'Headline',
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
