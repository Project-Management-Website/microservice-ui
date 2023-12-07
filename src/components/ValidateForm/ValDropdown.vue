<template>
    <pr-dropDown v-model="value" :options="props.options" type="text" :class="{ 'p-invalid': errorMessage }" optionLabel="props.optLabel" optionValue="props.optValue"/>
    <small class="p-error mb-2" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps(['name', 'options', "optLabel", "optValue"])

const { value, errorMessage } = useField(() => props.name)

onMounted(() => {
    console.log(props)
})
</script>

<script>

</script>