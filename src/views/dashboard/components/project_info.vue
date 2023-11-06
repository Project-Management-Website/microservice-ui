<template>
    <pr-dataView :value="projects" :layout="layout">
        <template #grid="">
            <div class="col-12 sm:col-6 lg:col-12 xl:col-2 max-w-50px p-2">
                <div class=" p-2 border-1 surface-border border-round bg-indigo-100">
                  <span class="p-2 block">asdas</span>
                  <label class="p-2 block">asdas</label>
                  <label class="p-2 block">asdas</label>
                  <label class="p-2 block">asdas</label>
                </div>
            </div>
        </template>
    </pr-dataView>
</template>

<script>
export default {
  name: 'ProjectInfo',
  data() {
    return {
      projects: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 2
        },
        {
          name: 2
        }
      ],
      layout: 'grid'
    };
  },
  methods: {

  }
};
</script>