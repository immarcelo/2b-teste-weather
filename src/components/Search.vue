<template>
    <div class="screen"> 
        <div class="wrapper">
            <h1 class="app-header"> 
                <svg title="Climapp" alt="Climapp" class='cloud-icon' viewBox='0 0 48 48'><use xlink:href='#umbrella-icon' /></svg> 
            </h1>
            <form v-on:submit.prevent="getInfo" class="search">
               
                <div class="input-wrapper">
                    <input type="text" 
                        v-bind:value="query" 
                        v-on:input="updateQuery($event.target.value)"
                        ref="searchInput"
                        placeholder="Informe a cidade"
                        class="search-input"
                    > 
                     
                    <button type="submit" :disabled="query.length == 0"  class="search-button">
                        <svg title="Buscar" alt="Buscar" class='search-icon' viewBox='0 0 24 24'><use xlink:href='#search-icon' /></svg> 
                    </button>
                </div>

            </form>

        </div>

    </div>
</template>

<script>
export default {
    name:"Search",
    props: ['query'], 
    methods: {
            updateQuery(query) {
                this.$emit('oninput', query)
            },
            getInfo() {
                this.$emit('onsubmit')
            },
            focus() {
                this.$refs.searchInput.focus()
            },
            blur() {
                this.$refs.searchInput.blur()
            }
        }
    }
</script>