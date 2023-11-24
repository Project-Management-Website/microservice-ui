<template>
    <TopAppBar/>
<div class="hello">
    <h1>{{ msg }}</h1>
    <h1>
        Entrance Page
    </h1>
</div>
<div class="card flex justify-content-center">
    <pr-button @click="checkInfo" label="Check" icon="pi pi-check" />
    <pr-inputText v-model="userId" placeholder="adasd"/>
</div>
<div>
    <a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
</div>

</template>

<script>
import { findUser } from "@/api/auth"
import TopAppBar from "@/components/TopBar.vue"

export default {
name: 'Dashboard-Form',
components: {
    TopAppBar,
},
props: {
    msg: String
},
data() {
    return {
        userId: ''
    }
},
methods: {
    checkInfo () {
        findUser(this.userId)
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
margin: 40px 0 0;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
</style>
