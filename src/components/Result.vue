<template>
    <div class="screen"> 
        <article class="result"> 
            <h1 class="result-city">
                {{city}} <span class="result-city__country">{{country}} </span>
            </h1>
            <h2 class="result-date">
                {{ today }}
            </h2>
            <div>
                <div class="result-icon">
                     <img v-bind:src="icon" alt="">
                </div>
            </div>
            <div class="result-temperature">
                <div class="result-temperature__item">
                   
                    <h3 class="result-temperature__item__display">
                        <div class="result-temperature__item__label">
                            Mínima
                        </div>
                        {{ minTemperature }}&#8451;
                    </h3>
                </div>
                <div class="result-temperature__item--current">
                     <h3 class="result-temperature__item__display">
                        {{ currentTemperature }}&#8451;
                        <div class="result-temperature__item__label">
                            {{ description }}
                        </div>
                    </h3>
                    
                </div>
                <div class="result-temperature__item">
                    <h3 class="result-temperature__item__display">
                         <div class="result-temperature__item__label">
                            Mínima
                        </div>
                        {{ maxTemperature }}&#8451;
                    </h3>
                </div> 
            </div>

            <div class="result-extra">
                <h4 class="result-extra__item">
                    <span>Umidade</span>  <span>{{ humidity }}%</span>
                </h4>
                <h4 class="result-extra__item">
                    <span>Nascer do Sol</span>  <span> {{ sunrise }} </span>
                </h4>
                <h4 class="result-extra__item">
                    <span>Pôr do Sol</span>  <span> {{ sunset }} </span>
                </h4>
            </div>
            
            <button  
                v-on:click="backHome"
                class="button-backHome">
               <svg class='home-icon' viewBox='0 0 16 16'><use xlink:href='#home-icon' /></svg> 
            </button>
            
        </article> 
    </div>
</template>

<script>
export default {
    name:"Result",
    props: ['city', 
            'country',
            'today',
            'icon',
            'minTemperature', 
            'currentTemperature', 
            'maxTemperature', 
            'description',
            'humidity',
            'sunrise', 
            'sunset' 
    ],
    methods: {
        updateShowResult(query) {
            this.$emit('oninput', query)
        },
        backHome() {
             this.$emit('onbackhome') 
        },
    }
}
</script>