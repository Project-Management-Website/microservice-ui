<template>
    <pr-dropDown v-model="value"
                 :options="options"
                 type="text"
                 :class="{ 'p-invalid': errorMessage }"
                 :optionLabel="optionLabel"
                 :optionValue="optionValue"/>
    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps(['name', 'options', "optionLabel", "optionValue"])

const { value, errorMessage } = useField(() => props.name)

</script>