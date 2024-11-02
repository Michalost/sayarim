<template>
    <div id="exposition" :style="backgroundImage" :class="{fade:fade}">
        <text-box class="textbox" @enable-click="enableClick" :speaker-name="currentSpeaker" :text-recieved="currentText"></text-box>
    </div>
</template>

<script>
import textBox from '../textBox.vue'
export default {
  components: { textBox },
    name:'exposition-scene',
    data(){
        return{
            dialogStage : 0,
            dialog:[{speaker:'???' , text:'היי!! זוכרים אותי?'},{speaker:'ענבל מפ"ל',text:'נו באמת! זו אני! ענבל מפל! מעוד יום בבסמח!'},
            {text:'הרבה זמן עבר מאז...'},{text:'אחרי שסיימתי את הקורס, יצאתי לרמ2 כדי לטפל בקלפטומניה החמורה שלי.'},{text:'אתם בטח זוכרים איך גנבתי ראיות מזירת הפשע כל הזמן...'},
            {text:'בכל מקרה... כשסיימתי, נותר לי רק שיבוץ אחד.'},{text:'השיבוץ שאף אחת לא רצתה.'},{text:'בהל"ג, ביסלמ"ש, לשעבר בית הספר לשיריון...'},
            {text:'בקיצור... סיירים. '},{text:'אז נכון, האוכל לא ממש אכיל,'},{text:'ונכון, לא עובר יום בלי הפסקת חשמל או מים...'},{text:'ואתם יכולים להיות בטוחים שמטונף,'},
            {text:'אבל...'},{text:'אה. האמת שאין אבל. בואו נלך לחד"א...'}
            ],
            currentSpeaker:'???',currentText:'',
            groupphoto: require('../../assets/backgrounds/groupphoto.png'),
            sayarimgate: require('../../assets/backgrounds/sayarimgate.jpeg'),
            food:require('../../assets/backgrounds/food.jpg'),
            dirty:require('../../assets/backgrounds/dirty.jpg'),
            fade:false
        }
    },
    methods:{
        moveOn(event){
            if(this.dialogStage === this.dialog.length-1){
                document.removeEventListener('keydown', this.moveOn); 
                console.log('תמה הסצנה');
                this.fade = true;
                setTimeout(() => { this.$emit('to-sceneone'); } , 1000);
            }
            else{
                if(event.keyCode === 32){
                    this.dialogStage++;
                    if(this.dialog[this.dialogStage].speaker !== undefined){
                        this.currentSpeaker = this.dialog[this.dialogStage].speaker;
                    }
                    this.currentText = this.dialog[this.dialogStage].text;
                    document.removeEventListener('keydown', this.moveOn);
                }
            }
            
        },
        enableClick(){
            document.addEventListener('keydown' , this.moveOn);
        }
    },
    mounted(){
        document.addEventListener('keydown' , this.moveOn);
        this.currentText = this.dialog[0].text;
    },
    computed : {
        backgroundImage(){
            if(this.dialogStage > 0 && this.dialogStage < 7){
                return{
                    backgroundImage: `url(${this.groupphoto})`
                }
            }
            else if(this.dialogStage >6 && this.dialogStage <9){
                return{backgroundImage:`url(${this.sayarimgate})`}
            }
            else if(this.dialogStage === 9){
                return{backgroundImage:`url(${this.food})`}
            }
            else if(this.dialogStage >9){
                return{backgroundImage:`url(${this.dirty})`}
            }
            else{
                return '';
            }
        }
    }

}
</script>

<style>
#exposition{
animation: fadeIn 1s linear forwards;
height:100vh;
width:100vw;
position:absolute;
top:0%;
right:0%;
background-size: 100% 100%;
}


@keyframes fadeIn {
    0%{opacity:0;}
    100%{opacity: 1;}
}

.textBox{
    width:80%;
    position: absolute;
}

.fade{
    animation: fadeOut 1s linear forwards;
}

@keyframes fadeOut {
    0%{opacity: 1;}
    100%{opacity:0}
}
</style>