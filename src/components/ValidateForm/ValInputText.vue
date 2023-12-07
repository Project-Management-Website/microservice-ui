<template>
    <pr-inputText v-model="value" type="text" :class="{ 'p-invalid': errorMessage }"/>
    <small class="p-error mb-2" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps(['name'])

const { value, errorMessage } = useField(() => props.name)
</script>

<script>

</script>