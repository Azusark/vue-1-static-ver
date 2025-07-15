<template>
    <div>
        <h1>
            welcome,{{userStore.username}}
        </h1>
    </div>
</template>

<script setup lang="ts">    
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

 onMounted(()=> {
    
        userStore.userInfo();
        
}); 
</script>

<style scoped>  
h1 {
    width: 84vw;
    height: 88vh;
    background-image: url("/src/assets/images/background11.png");
    background-size: 100% 100%; /* 拉伸铺满 */
    background-repeat: no-repeat;
    background-position: center;
    margin: 0;
    padding: 0;
}
</style>