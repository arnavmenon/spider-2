
var qtext,qopts,options,lb,rb,sub;

var qnum,quizStatus=0;


//indicating answers
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

function openQuiz(){
    document.getElementById("start-window").style.display="none";

    let leftspan=document.createElement('span');
    let quizBox=document.createElement('span');
    let rightspan=document.createElement('span');
    let submit=document.createElement('button');


    leftspan.innerHTML=`<button id="left-btn">&lAarr;</button>`;leftspan.className='left-btn-span';
    rightspan.innerHTML=`<button id="right-btn">&rAarr;</button>`;rightspan.className='right-btn-span';
    quizBox.id='questions';
    submit.id='submit';submit.innerHTML='SUBMIT';
    quizBox.innerHTML=`
                            <div class="qtext"></div>

                            <div class="options">
                                <div id="opt1" class="option"></div>
                                <div id="opt2" class="option"></div>
                                <div id="opt3" class="option"></div>
                                <div id="opt4" class="option"></div>

                            </div>`;

    document.querySelector(".main-container").appendChild(leftspan);
    document.querySelector(".main-container").appendChild(quizBox);
    document.querySelector(".main-container").appendChild(rightspan);
    document.querySelector("#sidenav").appendChild(submit);



    qtext=document.querySelector('.qtext');
    qopts=document.querySelector('.options');
    options=document.querySelectorAll(".option");
    lb=document.getElementById('left-btn');
    rb=document.getElementById('right-btn');
    sub=document.getElementById('submit');

    activateListeners();
}


document.getElementById("start-btn").addEventListener('click',()=>{

    openQuiz();
    quizStatus=1;
    qnum=1;

    qtext.innerHTML=data[qnum-1].question;
    for(let j=1;j<=4;j++)
        document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];

});




//listeners for lb,rb,answering option,submit

function activateListeners(){
    
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


        rb.addEventListener('click',()=>{
            if(qnum<10&&qnum>=1){
        
                qnum++;
                indicateAnswer();
                qtext.innerHTML=data[qnum-1].question;
                for(let j=1;j<=4;j++)
                    document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];
        
            }
        })
        
        lb.addEventListener('click',()=>{
            if(qnum<=10&&qnum>1){
                qnum--;
                indicateAnswer();
                qtext.innerHTML=data[qnum-1].question;
                for(let j=1;j<=4;j++)
                    document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];
        
            }
        })

        sub.addEventListener('click',()=>{
            findScore();
        })
    
}


//end quiz

function endQuiz(){

    document.querySelector(".left-btn-span").style.display="none";
    document.querySelector(".right-btn-span").style.display="none";
    document.querySelector("#questions").style.display="none";

    let scorebox=document.createElement('div');
    scorebox.id='score';
    document.querySelector(".main-container").appendChild(scorebox);

}
function findScore(){

    if(quizStatus==1){ 

        quizStatus=0;
        endQuiz();
        var score=0;
        data.forEach(item=>{
            if(item.correct==1) score++;
        })
        document.getElementById("score").textContent+=score;
    }
}
  





