<template>
    <div>
        <div v-if="winner">
            승자는 {{winner}}입니다.
            <button @click="onClickNewGame">새 게임</button>
        </div>
        <div v-else>
            <div v-if="turn=='A'">{{userName[0]}}님의 차례입니다.</div>
            <div v-else> {{userName[1]}}님의 차례입니다.</div>
            <div>남은 주사위 횟수 {{remainDice}}</div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import {RESET_SCORE} from './store';

export default {
    data(){
        return{

        }
    },
    computed: {
        ...mapState(['remainDice','userName','turn','winner']),
    },
    methods: {
        onClickNewGame(){
            this.$store.commit(RESET_SCORE);
        }
    }
}
</script>

<style>
    
</style>