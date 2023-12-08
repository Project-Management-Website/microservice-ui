<template>
    <pr-calendar v-model="value"
                type="text"
                :class="{ 'p-invalid': errorMessage }"
                :minDate="new Date()"
                showIcon
                showTime
                hourFormat="12"
                dateFormat="mm/dd/yy"
                showButtonBar
                size="small"/>
    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps(['name'])

const { value, errorMessage } = useField(() => props.name)

</script>