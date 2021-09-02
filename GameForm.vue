<template>
    <div>
        <input type="text" placeholder="1번 참가자" :value="user1" @change="onChangeUser1" />
        <input type="text" placeholder="2번 참가자" :value="user2" @change="onChangeUser2" />
        <button @click="onclickBtn">시작</button>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import {START_GAME} from './store';

export default {
    data(){
        return{
            user1: '',
            user2: '',
        };
    },
    methods: {
        onChangeUser1(e){
            this.user1 = e.target.value;
        },
        onChangeUser2(e){
            this.user2 = e.target.value;
        },
        onclickBtn(){
            this.$store.commit(START_GAME,{
                user1: this.user1,
                user2: this.user2
                });
        }
    },
}
</script>