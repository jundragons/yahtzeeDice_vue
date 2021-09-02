<template>
    <div>
    <table>
        <tr>
            <td>Categories</td>
            <td>{{userName[0]}}</td>
            <td>{{userName[1]}}</td>
        </tr>
        <tr v-for="(rowData, rowIndex) in scoreBoard1" :key="rowIndex">
            <td>{{rankOfHand[rowIndex]}}</td>
            <td v-if="scoreSeleceted[rowIndex][0]==false && turn=='A' &&scoreLock ==false" 
                @mouseover="columnHovered(rowIndex)" @mouseout="columnHoveredOut()" :class="{ columnHoverEffect: columnHoverCheck(rowIndex)}"
                :style="cellDataStyle(rowIndex,0)" @click="onClickScore(rowIndex,0)"
                >
                    {{tempScore[rowIndex]}}
            </td>
            <td v-else>{{rowData[0]}}</td>

            <td v-if="scoreSeleceted[rowIndex][1]==false && turn=='B' &&scoreLock ==false"   
                @mouseover="columnHovered(rowIndex)" @mouseout="columnHoveredOut()" :class="{ columnHoverEffect: columnHoverCheck(rowIndex)}"
                :style="cellDataStyle(rowIndex,1)" @click="onClickScore(rowIndex,1)"
                >
                    {{tempScore[rowIndex]}}
            </td>
            <td v-else>{{rowData[1]}}</td>
        </tr>
        <tr>
            <td>Sub total</td>
            <td v-for="sub,idx in subTotal" :key="idx">{{sub}}/63</td>
        </tr>
        <tr>
            <td>Bonus</td>
            <td v-for="bo,idx in bonus" :key="idx">{{bo}}</td>
        </tr>
    </table>
    <table>
        <tr v-for="(rowData, rowIndex,idx) in scoreBoard2" :key="idx">
            <td>{{rankOfHand[idx+7]}}</td>
            <td v-if="scoreSeleceted[rowIndex][0]==false && turn=='A' &&scoreLock ==false" 
                @mouseover="columnHovered(rowIndex)" @mouseout="columnHoveredOut()" :class="{ columnHoverEffect: columnHoverCheck(rowIndex)}"
                :style="cellDataStyle(rowIndex,0)"  @click="onClickScore(rowIndex,0)"
                >
                    {{tempScore[rowIndex]}}
            </td>
            <td v-else>{{rowData[0]}}</td>
            
            <td v-if="scoreSeleceted[rowIndex][1]==false && turn=='B' &&scoreLock ==false"  
                @mouseover="columnHovered(rowIndex)" @mouseout="columnHoveredOut()" :class="{ columnHoverEffect: columnHoverCheck(rowIndex)}" 
                :style="cellDataStyle(rowIndex,1)" @click="onClickScore(rowIndex,1)"
                >
                    {{tempScore[rowIndex]}}
            </td>
            <td v-else>{{rowData[1]}}</td>
        </tr>
        <tr>
            <td>TOTAL</td>
            <td v-for="to,idx in total" :key="idx">{{to}}</td>
        </tr>
    </table>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {CHOICE_SCORE,CHANGE_TURN,CALC_BONUS,END_GAME} from './store';

export default {
    data(){
        return{
            hoveredColumn:null,
            bgColor: "white",
            rankOfHand : [,'ONE','TWO','THREE','FOUR','FIVE','SIX','Chance','4 Of a Kind','Full House','Small Straight','Large Straight','YACHOO','TOTAL'],
            board1Cnt: [0,0],
            scoreCnt:0,
        }
    },
    computed: {
        ...mapState(['scoreBoard1','scoreBoard2','subTotal','bonus','total',
        'userName','gameStatus','scoreSeleceted','tempScore','turn','scoreLock']),
        cellDataStyle(state){
            return(rowIndex,num) =>{
                switch(this.$store.state.scoreSeleceted[rowIndex][num]){
                    case true:
                        return{
                            color: 'black',
                        };
                    case false:
                        return{
                            color: 'grey',
                        };
                }
            }
        },
    },
    methods: {
        columnHovered(rowIndex) {
            this.hoveredColumn = rowIndex;
        },
        columnHoveredOut(){
            this.hoveredColumn = null;
        },
        columnHoverCheck(rowIndex) {
            if (rowIndex === this.hoveredColumn) {
                return true;
            } else {
                return false;
            }
        },
        onClickScore(rowIndex,user){
            this.scoreCnt++;
            if(rowIndex<7)
                this.board1Cnt[user]++;
            this.$store.commit(CHOICE_SCORE,{rowIndex,user});
            this.$store.commit(CHANGE_TURN);
            if(this.board1Cnt[user]===6){
                this.$store.commit(CALC_BONUS,{user});
            }
            if(this.scoreCnt===24){
                this.$store.commit(END_GAME);
            }
        },
    },
}
</script>
<style>
.columnHoverEffect{
    background-color: yellow;
}
</style>