<template>
    <div>
        <game-form v-if="gameStatus==false"/>

        <div v-if="gameStatus==true">
            <game-info />
            <div class="dice">
                <dice-component/>
            </div>
            

            <div class="score">
                <score-table />
            </div>

        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import store, {START_GAME} from './store';
    import ScoreTable from './ScoreTable.vue';
    import DiceComponent from './DiceComponent.vue';
    import GameForm from './GameForm.vue';
    import GameInfo from './GameInfo.vue';

export default {
    store,
    components: {
        ScoreTable,
        DiceComponent,
        GameForm,
        GameInfo,
    },
    
    computed: {
        ...mapState(['turn','gameStatus','remainDice','username']),
    },
    methods: {
        onGameStart(){
            return this.$store.commit(START_GAME);
        }
    },
    
};
</script>

<style>

table {
    border-collapse: collapse;
}

td {
    border: 1px solid black;
    width: 50px;
    height: 40px;
    text-align: center;
}
</style>