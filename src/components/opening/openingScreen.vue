<template>
    <div id="opening-screen" :class="{'fade' :fade}">
        <audio autoplay :src="musicToPlay" controls ref="music" loop></audio>
        <img src="../../assets/logo.svg" class="logo" :class="{'move' : btnClicked ,'center' : !btnClicked}">
        <div class="start-btn" @click="start" v-if="!btnClicked">התחל</div>
        <div class="music-request" v-if="!btnClicked">הפעילו את המוזיקה (זה ממש ממש חשוב!)</div>
        <div class="instructions" v-if="showText">{{ text[textStage] }}</div>
        <div class="start-btn" @click="nextScene" v-if="showLastBtn">קדימה!!</div>
    </div>
</template>

<script>
export default {
    name:'opening-scene',
    data(){
        return{
            audio:null,
            btnClicked : false,
            text: ["להתקדמות בדיאלוג וקטעי טקסט, לחצו על מקש הרווח.",
                "המשחק והדמויות בו אינם מבוססים על מקרים ואנשים אמיתיים, כל קשר בין המשחק למציאות מקרי בהחלט.",
                "במשחק ישנו סרגל עליון, דרכו ניתן לשמור, לפתוח את תפריט הראיות ולתשאל עדים במשפט.",
                "בזמנים המתאימים לכך, לחצו על פריטים במסך כדי לחקור אותם.",
                "במהלך המשחק תוכלו להיזכר בכל ההוראות, אין מה לדאוג!",
                "מוכנים?"
            ],
            textStage:0,
            showText: false,
            showLastBtn:false,
            fade:false
        }
    },
    computed:{
        musicToPlay(){
            return require('../../assets/music/titleTheme.mp3');
        }
    },
    methods : {
       start(){
            this.btnClicked = true;
            document.addEventListener('keydown' , this.progress);
            setTimeout(()=>{this.showText = true;} , 2500);
        },
        progress(event){
            if(event.keyCode === 32){
                this.textStage++;
                if(this.textStage === 5){
                    this.showLastBtn = true;
                }
            }
        },
        nextScene(){
            document.removeEventListener('keydown' , this.progress);
            this.fade = true;
            setTimeout(()=>{this.$emit('to-exposition'); console.log('moving to next scene')} , 1000);
            
        }
    }

}
</script>

<style>
@font-face {
    font-family: 'secular-one';
    src: url('../../assets/fonts/SecularOne-Regular.ttf');
}

#opening-screen{
    height: 100vh;
    width: 100vw;
    background-image: url("../../assets/disclaimerreka.jpeg");
    background-size: 100% 100%;
    position: absolute;
    top:0%;
    right:0%;
    font-family: 'secular-one';
    color:white;
    direction: rtl;
}

.logo{
    width: 70vw;
    height:60vh;
    position: absolute;
    top:10%;
    right:48%;
    
}

.center{
    transform: translateX(50%);
}

.start-btn{
    font-family: 'secular-one';
    color:white;
    background: rgba(0,0,0,0.7);
    border-style: solid;
    border-width: 1%;
    border-radius: 25px;
    border-color: white;
    cursor: pointer;
    text-align: center;
    padding: 0.5% 2%;
    position: absolute;
    top:60%;
    right:50%;
    transform: translateX(50%);
    font-size: 4vmin;
}

.music-request{
    font-size: 4vmin;
    position: absolute;
    top:7%;
    right:0%;
    width:20vw;
    text-align: center;
    color:black;
    animation: blink 2s linear infinite;
}

@keyframes blink{
    0%{
        opacity:100%
    }
    50%{
        opacity:0.5;
    }
}

.move{
    animation: moveToCorner 2s linear forwards;
    
}
@keyframes moveToCorner{
    0%{
        transform:scale(1);
        right:48%;
        top:10%;
    }
    100%{
        transform:scale(.3);
        right:-23.5%;
        top:-14.5%;
    }
}

.instructions{
    width: 50vw;
    position: absolute;
    top:50%;
    right:50%;
    transform: translate(50%, -50%);
    font-size: 7vmin;
    text-align: center;
    animation: fadeIn 1s linear forwards;
}

@keyframes fadeIn {
    0%{
        opacity: 0;
    }
    100%{
        opacity:1;
    }
}

.fade{
    animation: fadeOut 1s linear forwards;
}

@keyframes fadeOut {
    0%{opacity: 1;}
    100%{opacity:0}
}
</style>