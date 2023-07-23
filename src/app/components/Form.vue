<template>
  <v-dialog v-model="model" max-width="500">
    <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
      <v-card class="px-4 pt-2 pb-6">
        <v-card-title class="text-h6"> Edit Headline </v-card-title>

        <v-card-text>
          <v-text-field
            ref="title"
            v-model="name"
            :rules="[
              () => !!name || 'This field is required',
              () => (!!name && name.length <= 255) || 'name must be less than 255 characters',
            ]"
            label="Please enter new headline name"
            placeholder="Please enter new headline name"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey darken-3" small text @click="closeDialog"> Close </v-btn>

          <v-btn color="primary" :disabled="!valid" small type="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
// eslint-disable-next-line object-curly-newline
import { ref, defineEmits, defineProps, computed, watchEffect } from 'vue';

const form = ref('');
const valid = ref(false);

const name = ref('');

const emits = defineEmits(['input', 'update-title']);
const props = defineProps({
  value: {
    type: Boolean,
    required: true,
    default: false,
  },
  headline: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const model = computed({
  get() {
    return props.value;
  },
  set(value) {
    emits('input', value);
  },
});

const closeDialog = () => {
  form.value?.resetValidation();
  model.value = false;
};

const submitForm = () => {
  emits('update-title', { title: name.value, id: props.headline.id });
  closeDialog();
};

watchEffect(() => {
  name.value = props.headline.title || '';
});
</script>
