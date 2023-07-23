<template>
  <div v-if="headline">
    <base-layout :loading="loading" :title="headline.title || 'News Details'">
      <template #back>
       <v-btn
        class="me-4"
        color="orange darken-2"
        dark
		:to="{name: 'home'}"
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>
		Back to headlines
      </v-btn>
      </template>
      <template #loader>
        <v-col cols="12">
          <skeleton type="articles" :loading="loading"></skeleton>
        </v-col>
      </template>
      <v-col cols="12">
        <v-sheet elevation="2" class="pa-4">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-img :src="headline.urlToImage" class="rounded"></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-row dense>
                <v-col cols="12" class="text-h6 grey--text text--darken-3">
                  {{ headline.title }}
                </v-col>
                <v-col cols="12" class="body-2 grey--text text--darken-3">
                  {{ headline.author }}
                  &mdash;
                  {{ headline.publishedAt }}
                </v-col>
                <v-col cols="12" class="body-2 grey--text text--darken-1">
                  <span v-html="wrapAnchorTags(headline.content, headline.url)"></span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </base-layout>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BaseLayout from '@modules/home/BaseLayout';
// eslint-disable-next-line import/no-unresolved
import Skeleton from '@skeletons';
import { mapGetters } from 'vuex';

export default {
  components: {
    Skeleton,
    BaseLayout,
  },

  computed: {
    ...mapGetters('headlines', ['loading', 'getHeadlineById']),

    headline() {
      return this.getHeadlineById(this.newsId);
    },
  },

  methods: {
    wrapAnchorTags(text, link) {
      const regex = /\[\+(.*?)\]/g;
      return text.replace(regex, `<a href="${link}" target="_blank">$1</a>`);
    },
  },

  watch: {
    // Watch for route changes and perform actions if needed
    $route: {
      // eslint-disable-next-line func-names
      handler(to) {
        this.newsId = parseInt(to.params?.newsId, 10);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
