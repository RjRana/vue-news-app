<template functional>
  <v-card class="d-flex flex-column" style="height: 100%" @click="listeners['redirect-to-detail']">
    <v-img
      class="white--text align-end"
      height="200"
      max-height="200"
      :src="props.headline.urlToImage"
      cover
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-img
            class="white--text align-end"
            height="200px"
            src="/assets/placeholder.png"
            cover
          ></v-img>
        </v-row>
      </template>
    </v-img>

    <v-card-title class="subtitle-1 font-weight-medium" style="line-height: 1.4rem">{{
      props.headline.title
    }}</v-card-title>

    <v-card-text class="grow">
      <span
        class="body-2 grey--text text--darken-4"
        v-html="$options.methods.sanitizeHtml(props.headline.description)"
      ></span>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!props.hideEdit"
        color="deep-purple lighten-2"
        text
        @click.stop="listeners['edit']"
      >
        Edit
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click.stop="listeners['redirect-to-detail']">
        Read More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import DOMPurify from 'dompurify';

export default {
  props: {
    headline: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    hideEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    sanitizeHtml(html) {
      return DOMPurify.sanitize(html);
    },
  },
};
</script>
