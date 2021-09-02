import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); 

export const START_GAME = 'START_GAME';
export const ROLL_DICE = 'ROLL_DICE';
export const CALC_DICE = 'CALC_DICE';
export const CLICK_DICE = 'CLICK_DICE';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_SCORE = 'RESET_SCORE';
export const CHOICE_SCORE = 'CHOICE_SCORE';
export const CALC_BONUS = 'CALC_BONUS';
export const END_GAME = 'END_GAME';

const calcScore =(dice)=>{
    const scores={};
    let sum=0;
    let yach=false;
    let k4 = false;
    let k3 =false;
    let k2 = false;
    let tempDice = new Array(5);
    for(let i = 0;i<5;i++){
        tempDice.push(dice[i]);
    }
    tempDice = tempDice.sort();
    for(let i=1;i<=6;i++){
        if(i!=6){
            sum+=tempDice[i-1];
        }
        let result = tempDice.filter(n => n ===i).length;

        scores[`${i}`] = result*i;
        if(result === 5) yach=true;
        if(result >= 4)   k4 = true;
        else if(result === 3)    k3 = true;
        else if(result === 2)    k2 = true;
    }
    scores.yachoo = yach===true ? 50: 0;
    scores.chance = sum;
    scores.kind4 = k4 === true ? scores.chance : 0;
    scores.fH = k3==true && k2 == true ? scores.chance : 0;
    
    tempDice = Array.from(new Set(tempDice));
    let cnt=1;
    if(tempDice.length>=4){
        for(let a =1;a<tempDice.length;a++){
            if(tempDice[a]===tempDice[a-1]+1){
                cnt++;
            } else{
                if(cnt >= 4){
                    break;
                }
                else{
                    cnt=1;
                }
            }
        }
    }

    scores.sSt = cnt>=4 ? 15 : 0;
    scores.lSt = cnt===5 ? 30 : 0;
    return scores;
}

export default new Vuex.Store({ // import store from './store';
    state: {
        scoreBoard1:{1:[],2:[],3:[],4:[],5:[],6:[]},
        scoreBoard2:{chance:[],kind4:[],fH:[],sSt:[],lSt:[],yachoo:[]},
        subTotal:[0,0],
        bonus: [0,0],
        total: [0,0],
        tempScore:{},
        userName:[],
        halted: true,    //중단
        scoreSeleceted: {1:[false,false],2:[false,false],3:[false,false],4:[false,false],5:[false,false],6:[false,false],
            chance:[false,false],kind4:[false,false],fH:[false,false],sSt:[false,false],lSt:[false,false],yachoo:[false,false]},
        gameStatus:false,
        turn:'A',
        remainDice: 3,
        dice:[0,0,0,0,0],
        diceClicked:[false,false,false,false,false],
        winner:"",
        scoreLock:true,
        // diceLock:true,
        
    }, // vue의 data와 비슷
    getters: {
    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state,{user1,user2}){
            if(state.gameStatus === true) return;
            else{
                state.userName.push(user1);
                state.userName.push(user2);
                state.gameStatus=true;
                state.remainDice=3;
                state.subTotal = [0,0];
                state.bonus = [0,0];
                state.total = [0,0];
            }
        },
        [ROLL_DICE](state){
            if(state.remainDice==3){
                state.scoreLock=false;
            }
            state.remainDice--;
            let changeDice =[];
            for(let i = 0; i<5; i++){
                if(state.diceClicked[i] === false){
                    const value = Math.floor(Math.random()*6)+1;
                    changeDice.push(value);
                }
                else{
                    changeDice.push(state.dice[i]);
                }
            }
            state.dice = changeDice;
        },
        [CALC_DICE](state){
            state.tempScore=calcScore(state.dice);
        },
        [CLICK_DICE](state,{rowIndex}){
            const reverseClick = state.diceClicked[rowIndex] === true ? false : true;
            const temp =[];
            for(let i=0;i<5;i++){
                if(rowIndex ===i)
                    temp.push(reverseClick);
                else{
                    temp.push(state.diceClicked[i]);
                }
            }
            state.diceClicked = temp;
        },
        [CHANGE_TURN](state){
            const turnFlag = state.turn === 'A' ? 'B' : 'A';
            state.turn = turnFlag;
            state.remainDice =3;
            state.tempScore={};
            for(let i =0; i < 5; i++){
                Vue.set(state.diceClicked,i,false);
            }
        },
        [CHOICE_SCORE](state,{rowIndex,user}){

            if(rowIndex<7){
                state.scoreBoard1[rowIndex][user] = state.tempScore[rowIndex];
                state.scoreSeleceted[rowIndex][user] = true;
                state.subTotal[user]+=state.tempScore[rowIndex];
            }else{
                state.scoreBoard2[rowIndex][user] = state.tempScore[rowIndex];
                state.scoreSeleceted[rowIndex][user] = true;
            }
            state.total[user] +=state.tempScore[rowIndex];
            state.scoreLock=true;
        },
        [CALC_BONUS](state,{user}){
            state.bonus[user] = state.subTotal[user] >= 63 ? 35 : 0;
            state.total[user] +=state.bonus[user];
        },
        [END_GAME](state){
            let win='';
            if(state.total[0]>state.total[1]){
                win = state.userName[0];
            }else if(state.total[0]==state.total[1]){
                win = 'draw';
            }else{
                win = state.userName[1];
            }
            state.winner = win;
        },
        [RESET_SCORE](state){
            state.scoreBoard1={1:[],2:[],3:[],4:[],5:[],6:[]};
            state.scoreBoard2={chance:[],kind4:[],fH:[],sSt:[],lSt:[],yachoo:[]};
            state.subTotal=[0,0];
            state.bonus= [0,0];
            state.total= [0,0];
            state.tempScore={};
            state.userName=[],
            state.halted= true,
            state.scoreSeleceted={1:[false,false],2:[false,false],3:[false,false],4:[false,false],5:[false,false],6:[false,false],
                chance:[false,false],kind4:[false,false],fH:[false,false],sSt:[false,false],lSt:[false,false],yachoo:[false,false]};
            state.gameStatus=false;
            state.turn='A';
            state.remainDice= 3;
            state.dice=[0,0,0,0,0];
            state.diceClicked=[false,false,false,false,false];
            state.winner="";
            state.scoreLock=true;
        }
    }, // state를 수정할 때 사용해요. 동기적으로
    actions: {}, // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 때
});