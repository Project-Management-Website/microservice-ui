<template>
    <pr-editor v-model="value"
                 :class="{ 'p-invalid': errorMessage }"
                 :editorStyle="editorStyle"
                 />
    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps(['name', 'editorStyle'])

const { value, errorMessage } = useField(() => props.name)

</script>