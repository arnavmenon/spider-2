const lb=document.getElementById('left-btn');
const rb=document.getElementById('right-btn');
const qtext=document.querySelector('.qtext');
const qopts=document.querySelector('.options');

var options = document.querySelectorAll(".option");

var qnum,quizStatus=0;


function resetColors(){
    options.forEach(option => {
       option.style.backgroundColor="white";
    });
}

function indicateAnswer(){

    if(data[qnum-1].answered==1&&data[qnum-1].correct==1){
        resetColors();
        document.getElementById(`${data[qnum-1].clickedOpt}`).style.backgroundColor="green";
    }
    
    else if(data[qnum-1].answered==1&&data[qnum-1].correct==-1){
        resetColors();
        document.getElementById(`${data[qnum-1].clickedOpt}`).style.backgroundColor="red";
    }

    else if(data[qnum-1].answered==0){
        resetColors();
    }
}

//start quiz 
document.getElementById("start-btn").addEventListener('click',()=>{
    document.getElementById("start-window").style.display="none";
    quizStatus=1;
    qnum=1;
    qtext.innerHTML=data[qnum-1].question;
    for(let j=1;j<=4;j++)
        document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];

});

//nav bw questions
rb.addEventListener('click',()=>{
    if(qnum<3&&qnum>=1){

        qnum++;
        indicateAnswer();
        qtext.innerHTML=data[qnum-1].question;
        for(let j=1;j<=4;j++)
            document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];

    }
})

lb.addEventListener('click',()=>{
    if(qnum<=3&&qnum>1){
        qnum--;
        indicateAnswer();
        qtext.innerHTML=data[qnum-1].question;
        for(let j=1;j<=4;j++)
            document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];

    }
})

//answering question

options.forEach(option => {

    
    option.addEventListener('click',()=>{

        if(data[qnum-1].answered==0){

            data[qnum-1].answered=1;
            let choice=option.id;
            data[qnum-1].clickedOpt=choice;
            if(choice==data[qnum-1].answer){         
                data[qnum-1].correct=1;
            }

            else{
                data[qnum-1].correct=-1;
            }

            indicateAnswer();
        }
    })


});


//calc score
function findScore(){

    if(quizStatus==1){    
        quizStatus=0;
        var score=0;
        data.forEach(item=>{
            if(item.correct==1) score++;
        })
        document.getElementById("score").innerHTML+=score;
    }
}
  





