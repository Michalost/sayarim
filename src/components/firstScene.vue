<template>
    <div id="first-scene" :class="{fade:fade}">
        <img class="assaf" v-if="!examine" v-show="assafArrive" :src="sprite"/>
        <text-box v-if="dialogOngoing" class="textbox" :speaker-name="currentSpeaker" :text-recieved="currentText" @enable-click="enableClick"></text-box>
        <div class="questions" v-if="!examine" v-show="!dialogOngoing">
            <div class="question" @click="firstQuestion">אסף קרביץ</div>
            <div class="question" @click="secondQuestion">טבחות</div>
            <div class="question" @click="thirdQuestion">גיוס</div>
        </div>
    </div>
</template>

<script>
import textBox from './textBox.vue';

export default {
    name:'first-scene',
    components:{textBox},
    data(){
        return{
            assafArrive : false,
            emotion:'talk',
            fade : false,
            dialogStage : 0,
            mainDialog : [{speaker:'ענבל מפ"ל',text:'הממ... מה אקח היום? את המקושקשת הכחולה או הקציצות האפורות?'},
                {speaker:'???' , text:'סליחה?' , emotion:'talk'},{speaker:'ענבל מפל' , text:'!' , effect:'surprise' , emotion:'idle'},
                {speaker:'???' , text:'מה השרוך שלך אומר? איזה תפקיד את?' , emotion:'talk'},{speaker:'ענבל מפל', text:'אני מפתחת לומדה!',emotion:'idle'},
                {text:'אבל יש אותו גם לצלמים, עורכים, גרפיקאים, צפה...'},{speaker:'???' , text:'זה... לא אומר לי הרבה...', emotion:'sad'},
                {text:'אני אסף, אסף קרביץ! ואת?', speaker:'אסף' , emotion:'talk'}
            ],
            dialogOngoing: true,
            currentText:'',
            currentSpeaker:'',
            currentDialog:null,
            questionAnswers: [false,false,false],
            firstQuestionDialog : [{speaker:'ענבל מפל' , text:'נעים להכיר אסף! אני ענבל. אתה טבח, אני מנחשת?' , emotion:'idle'},
                {speaker:'אסף' , text:'חחח... אממ...' , emotion:'talk'},{text:'כן... נפלתי מאיסוף.' , emotion:'sad'},
                {speaker:'ענבל מפל' ,text:'!'},{speaker:'אסף',text:'הייתי מיועד לגדוד 869! אפילו הייתי מצטיין המחלקה.',emotion:'talk'},
                {text:'אבל...',emotion:'sad'},{text:'במסע האחרון של האימון המתקדם, פרקתי את הכתף כשעשיתי למישה השמן סחיבת פצוע.'},
                {speaker:'ענבל מפל',text:'אוי, אסף... אני מצטערת לשמוע.'},{speaker:'אסף',text:'זה בסדר!',emotion:'talk'},{text:'נכון, הטבחים האחרים קצת מפחידים...'},
                {text:'אבל אני מסרב להיות מושחר!'},{speaker:'ענבל מפל' , text:'אם ככה, יש לי הרבה מה ללמוד ממך...',emotion:'idle'}
            ],
            secondQuestionDialog:[
                {speaker:'ענבל מפל',text:'אז... אתה אחראי למטעמים האלה?',emotion:'idle'},{speaker:'אסף',emotion:'sad',text:'אה...'},
                {text:'אני מודה שקצת הגזמתי עם השמן...'},{text:'שמתי 13 ליטר שמן במקום ה12 שהייתי אמור...'},{speaker:'ענבל מפל',text:'13 ליטר אסף?! אתה רציני?!'},
                {text:'...',speaker:'אסף'},{text:'(תזכירו לי להניח את השניצל על נייר סופג.)', speaker:'ענבל מפל'}
            ],
            thirdQuestionDialog:[
                {speaker:'ענבל מפל',text:'אתם בטח עמוסים ברמות עכשיו, עם הגיוס הגדול שהיה.' , emotion:'idle'},{speaker:'אסף',text:'אנחנו טובעים בעבודה!',emotion:'talk'},
                {speaker:'ענבל מפל',text:'(כמו שהאוכל טובע בשמן?)',emotion:'idle'},{speaker:'אסף',emotion:'sad',text:"הגיעו המון טירונים לבסיס, ואת כולם אנחנו צריכים להאכיל!"},
                {text:'ולמרות כל המאמצים שלי,התחילו תלונות על הרעלות מזון'},{speaker:'ענבל מפל',text:'וואו, אני לא מאמינה!'},{text:'שהם החזיקו כל כך הרבה זמן...'}
            ],
            endingDialog:[
                {speaker:'ענבל מפל',emotion:'idle',text:'היה ממש נחמד להכיר אותך אסף, אבל אני צריכה לזוז!'},{text:'אני אראה אותך בסביבה?'},
                {speaker:'אסף',emotion:'talk',text:'בטח! ביי ענבל!'}
            ],
            onEnd : false,
            examine:false,
            first :true
        }
    },
    methods:{
        moveOn(event){
            
            if(this.dialogStage >= this.currentDialog.length){
                this.dialogOngoing = false;
                this.dialogStage = 0;
                this.currentDialog = [];
                // if(this.allQsDone){
                //     this.end()
                // }
                // if(this.onEnd){
                //     this.finishScene();
                // }
                // document.removeEventListener('keydown', this.moveOn); 
                // this.fade = true;
                // setTimeout(() => { this.$emit('to-second'); } , 1000);
            }
            else{
                if(this.first){
                    this.dialogStage++;
                    this.first = false;
                }
                if(event.keyCode === 32){
                    
                    this.currentText = this.currentDialog[this.dialogStage].text;
                    document.removeEventListener('keydown', this.moveOn);
                    if(this.currentDialog == this.mainDialog && this.dialogStage === 1){
                        this.assafArrive = true;
                    }
                    // if(this.currentDialog[this.dialogStage].speaker !== undefined){
                    //     this.currentSpeaker = this.currentdialog[this.dialogStage].speaker || 'error';
                    // }
                    if(this.currentDialog[this.dialogStage].effect !== undefined){
                        //play an effect
                    }
                    if(this.currentDialog[this.dialogStage].emotion !== undefined){
                        this.emotion = this.currentDialog[this.dialogStage].emotion || 'error';
                    }
                }
            }
            this.dialogStage++;
            
        },
        firstQuestion(){
            this.currentDialog = this.firstQuestionDialog;
            this.dialogStage = 0;
            this.dialogOngoing = true;
            document.addEventListener('keydown' , this.moveOn);
            this.questionAnswers[0] = true;
        },
        secondQuestion(){
            this.currentDialog = this.secondQuestionDialog;
            this.dialogStage = 0;
            this.dialogOngoing = true;
            document.addEventListener('keydown' , this.moveOn);
            this.questionAnswers[1] = true;
        },
        thirdQuestion(){
            this.currentDialog = this.thirdQuestionDialog;
            this.dialogStage = 0;
            this.dialogOngoing = true;
            document.addEventListener('keydown' , this.moveOn);
            this.questionAnswers[2] = true;
        },
        enableClick(){
            document.addEventListener('keydown' , this.moveOn);
        },
        allQsDone(){
            console.log(this.questionAnswers[0] && this.questionAnswers[1] && this.questionAnswers[2])
            return (this.questionAnswers[0] && this.questionAnswers[1] && this.questionAnswers[2]);
        },
        end(){
            this.onEnd = true;
            this.currentDialog = this.endingDialog;
            this.dialogStage = 0;
            this.dialogOngoing = true;
            document.addEventListener('keydown' , this.moveOn);
        },
        finishScene(){
            console.log('dialog done');
        }
    },
    mounted(){
        this.currentDialog = this.mainDialog;
        document.addEventListener('keydown' , this.moveOn);
        this.currentText = this.currentDialog[0].text;
        
    },
    computed : {
        sprite(){
            return require(`@/assets/dmuyot/${this.emotion}.svg`);
        }
    }
}
</script>

<style>
@font-face {
    font-family: 'secular-one';
    src: url(../assets/fonts/SecularOne-Regular.ttf);
}

#first-scene{
    animation: fadeIn 1s linear forwards;
    height:100vh;
    width:100vw;
    position:absolute;
    top:0%;
    right:0%;
    background-size: 100% 100%;
    background-image: url('../assets/backgrounds/chada.webp');
}


@keyframes fadeIn {
    0%{opacity:0;}
    100%{opacity: 1;}
}

.textBox{
    width:80%;
    position: absolute;
}

.assaf{
    animation: fadeIn 1s linear forwards;
    height: 100vh;
    width: 90vw;
    position: absolute;
    right:62%;
    transform: translateX(50%);
    bottom:-8%;
    background-size: 100% 100%;
}

.questions{
    height:50vh;
    width:70vw;
    position: absolute;
    top:45%;
    right:50%;
    transform: translateX(50%);
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}

.question{
    font-family: 'secular-one';
    color:black;
    background-color: rgba(255,255,255,0.7);
    height: 30%;
    width: 90%;
    border-radius: 40px;
    cursor: pointer;
    text-align: center;
    font-size: 6vmin;
    display: flex;
    align-items: center;
    justify-content: center;
}
    
</style>