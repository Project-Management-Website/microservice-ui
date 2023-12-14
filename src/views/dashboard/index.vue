<template>
    <div class="p-4">
        <label class="flex align-content-start text-3xl font-bold">Your Work</label>
        <pr-divider class=""/>
    </div>
    <div class="mx-4">
        <div class="flex justify-content-between flex-wrap">
            <label class="align-content-start ">Recent Projects</label>
            <a href="" class="align-content-end ">View All Projects</a>
        </div>
        <ProjectInfo class="align-content-start mt-5"/>
    </div>

</template>
    
<script>
import ProjectInfo from "./components/project_info.vue"

export default {
    name: 'DashboardView',
    components: {
        ProjectInfo,
    },
    methods: {
        
    }
}
</script>