<template>
    <div>
        <button @click="rollDice">주사위 던지기</button>
        <table>
            <tr>
                <td v-for="(rowData,rowIndex) in dice" :key="rowIndex"
                :style="cellDataStyle(rowIndex)"
                @click="onClickTd(rowIndex)"
                >
                {{rowData}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { ROLL_DICE, CLICK_DICE, CALC_DICE } from './store';
export default {
    data(){
        return{
        }
    },

    computed:{
        ...mapState(['dice','diceClicked','remainDice']),
        cellDataStyle(state){
            return(rowIndex) =>{
                switch(this.$store.state.diceClicked[rowIndex]){
                    case true:
                        return{
                            background: 'red',
                        };
                    case false:
                        return{
                            background: 'white',
                        };
                }
            }
        },
    },
    methods: {
        rollDice(){
            if(this.remainDice==0){
                alert("3번의 기회를 모두 사용하였습니다. 점수를 골라주세요");
                return;
            }
            this.$store.commit(ROLL_DICE);
            return this.$store.commit(CALC_DICE);

        },
        onClickTd(rowIndex){
            return this.$store.commit(CLICK_DICE,{rowIndex});
        }
    },
};
</script>

<style>
    #dice{
            width: 128px;
            height: 128px;
            /* background-position: 0 0; */
            background-size: 100% 100%;
        }
</style>