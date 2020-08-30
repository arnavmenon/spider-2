
var qtext,qopts,options,lb,rb,sub,qnav;
var sidenav=document.querySelector("#sidenav");
var qnum,answered=0,quizStatus=0;


//indicating answers
function resetColors(){
    options.forEach(option => {
       option.style.backgroundColor="cadetblue";
    });
}

function indicateAnswer(){

    resetColors();

    if(data[qnum-1].answered==1&&data[qnum-1].correct==1){
        document.getElementById(`${data[qnum-1].clickedOpt}`).style.backgroundColor="rgb(72, 230, 119)";
        qnav[qnum-1].style.backgroundColor="rgb(72, 230, 119)";
    }
    
    else if(data[qnum-1].answered==1&&data[qnum-1].correct==-1){
        document.getElementById(`${data[qnum-1].clickedOpt}`).style.backgroundColor="rgb(231, 110, 88)";
        qnav[qnum-1].style.backgroundColor="rgb(231, 110, 88)";
    }

}

//start quiz 

function openQuiz(){
    document.getElementById("start-window").style.display="none";

    let leftspan=document.createElement('span');
    let quizBox=document.createElement('span');
    let rightspan=document.createElement('span');
    let submit=document.createElement('button');
    let navbox=document.createElement('div');


    leftspan.innerHTML=`<button id="left-btn">&lAarr;</button>`;leftspan.className='left-btn-span';
    rightspan.innerHTML=`<button id="right-btn">&rAarr;</button>`;rightspan.className='right-btn-span';
    quizBox.id='questions';navbox.id='navcontainer';
    submit.id='submit';submit.innerHTML='SUBMIT';
    quizBox.innerHTML=`
                            <div class="qtext"></div>
                            <div class="options">
                                <div id="opt1" class="option"></div>
                                <div id="opt2" class="option"></div>
                                <div id="opt3" class="option"></div>
                                <div id="opt4" class="option"></div>

                            </div>`;
 /*    navbox.innerHTML=`  
                        <div id="row1">
                        <span id="nav1">1</span><span id="nav2">2</span><span id="nav3">3</span><span id="nav4">4</span><span id="nav5">5</span>
                        </div> 
                        <div id="row2">
                        <span id="nav6">6</span><span id="nav7">7</span><span id="nav8">8</span><span id="nav9">9</span><span id="nav10">10</span>
                        </div>` */
        
    navbox.innerHTML=`  
                        <div id="row1">
                        <span class="navbox">1</span><span class="navbox">2</span><span class="navbox">3</span><span class="navbox">4</span><span class="navbox">5</span>
                        </div> 
                        <div id="row2">
                        <span class="navbox">6</span><span class="navbox">7</span><span class="navbox">8</span><span class="navbox">9</span><span class="navbox">10</span>
                        </div>`

    document.querySelector(".main-container").appendChild(leftspan);
    document.querySelector(".main-container").appendChild(quizBox);
    document.querySelector(".main-container").appendChild(rightspan);
    sidenav.appendChild(navbox);
    sidenav.appendChild(submit);



    qtext=document.querySelector('.qtext');
    qopts=document.querySelector('.options');
    options=document.querySelectorAll(".option");
    lb=document.getElementById('left-btn');
    rb=document.getElementById('right-btn');
    sub=document.getElementById('submit');
    qnav=document.querySelectorAll('.navbox');
    console.log(qnav);

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
                    answered++;
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
                    if(answered==10) sub.click();
                }
            })


        });

        qnav.forEach(qbox => {
            
            qbox.addEventListener('click',()=>{

                qnum=qbox.innerHTML;
                indicateAnswer();
                qtext.innerHTML=data[qnum-1].question;
                for(let j=1;j<=4;j++)
                    document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];

            })

        }); 


        rb.addEventListener('click',()=>{
            if(qnum<10&&qnum>=1){
        
                qnum++;
                indicateAnswer();
                qtext.innerHTML=data[qnum-1].question;
                for(let j=1;j<=4;j++)
                    document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];
                /* if(data[qnum-1].image!='')
                    document.getElementById("qimg").src=data[qnum-1].image;
                else document.getElementById("qimg").src=''; */
        
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
    scorebox.id='scorebox';
    scorebox.innerHTML=`<span><u>Your Score</u>
                        <span id="score"></span>
                        </span>
                        <button id="restart">Try Again!</button>`
    document.querySelector(".main-container").appendChild(scorebox);
    document.getElementById('restart').addEventListener('click',()=>{
        window.location.reload();
    })

}
function findScore(){

    if(quizStatus==1){ 

        quizStatus=0;
        endQuiz();
        var score=0;
        data.forEach(item=>{
            if(item.correct==1) score++;
        })
        document.getElementById("score").innerHTML+=score;
    }
}
  





