<template>
    <div class="text-box">
        <div class="speaker-name"></div>
        <div class="text"> {{ displayedText }}</div>
        <audio ref="talkSound"></audio>
    </div>
</template>

<script>
export default {
    name:'text-box',
    props:['speakerName' , 'textRecieved'],
    data(){
        return{
            displayedText:'',
            fullText:'',
            intervalId : null
        }
    },
    watch:{
        textRecieved(newText){
            if (typeof newText === 'string' && newText.trim() !== '') {
                this.displayedText = '';
                this.fullText = newText;
                this.typeText();
            }
            else{
                this.fullText = 'אופסי יש לנו פה בעיונת!!';
                this.displayedText ='';
                this.typeText();
            }
            
        }
    },
    methods:{
        typeText() {
        let i = 0;
        this.displayedText = '';

        // Clear any existing interval before creating a new one
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // Save the interval ID to clear it later
        this.intervalId = setInterval(() => {
            if (i === this.fullText.length) {
                clearInterval(this.intervalId); // Clear the interval once done
                this.intervalId = null; // Reset the interval ID
                this.$emit('enable-click');
            } else {
                this.displayedText += this.fullText[i];
                i++;
            }
            // Optionally, play a sound here
        }, 50);
        }

    },

    mounted(){
        this.fullText = this.textRecieved;
        this.typeText();
    }
}
</script>

<style>
@font-face {
    font-family: 'secular-one';
    src: url(../assets/fonts/SecularOne-Regular.ttf);
}

.text-box{
    direction: rtl;
    height: 30vh;
    width: 100%;
    background-color: rgba(0,0,0,0.7);
    border-style: solid;
    border-color: burlywood;
    position:absolute;
    bottom:0vh;
    color:white;
    text-align: center;
    font-family: 'secular-one';
}

.speaker-name{
    position: absolute;
    top:0%;
    right:0%;
    font-size: 4vmin;

}

.text{
    width: 80%;
    position:absolute;
    height: 70%;
    top:30%;
    font-family: 'secular-one';
    font-size: 4vmin;
    right:50%;
    transform: translateX(50%);
}


</style>

