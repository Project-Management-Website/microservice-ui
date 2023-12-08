<template>
    <pr-inputText v-model="value" :type="type" :class="{ 'p-invalid': errorMessage }" :placeholder="placeholder"/>
    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps(['name', 'type', 'placeholder'])

const { value, errorMessage } = useField(() => props.name)

</script>