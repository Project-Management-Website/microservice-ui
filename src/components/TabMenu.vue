
<template>
    <div class="card">

        <pr-tabMenu v-model:activeIndex="active" :model="items" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 3,
            items: [
                {
                    label: 'Working on',
                    icon: 'pi pi-spin pi-pencil'
                },
                {
                    label: 'Done',
                    icon: 'pi pi-spin pi-check'
                },
                {
                    label: 'Assign to me',
                    icon: 'pi pi-spin pi-tag'
                },
                {
                    label: 'Starred',
                    icon: 'pi pi-spin pi-star'
                },
            ]
        };
    }
};
</script>
