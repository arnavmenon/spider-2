
var qtext,qopts,options,lb,rb,sub,qnav,name,userscore;
const timelimit=180;
var timeleft=timelimit,x;
var sidenav=document.querySelector("#sidenav");
var qnum,answered=0,quizStatus=0;


//initialize localstorage items

var scoresArray=[{name:'',score:0,datetime:''},{name:'',score:0,datetime:''},{name:'',score:0,datetime:''},{name:'',score:0,datetime:''},{name:'',score:0,datetime:''}];

if(localStorage.getItem('scores')==null) localStorage.setItem('scores',JSON.stringify(scoresArray))
else {
    scoresArray=JSON.parse(localStorage.getItem('scores'));
    console.log(scoresArray);
}



//randomize question order
var shuffle=function(){
    var temp=data;

    var currentIndex = temp.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = temp[currentIndex];
    temp[currentIndex] = temp[randomIndex];
    temp[randomIndex] = temporaryValue;
    }

    data=temp;
}

shuffle();

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
    document.querySelector(".nameentry").remove();

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
        
    navbox.innerHTML=`  
                        <div id="row1">
                        <span class="navbox">1</span><span class="navbox">2</span><span class="navbox">3</span><span class="navbox">4</span><span class="navbox">5</span>
                        </div> 
                        <div id="row2">
                        <span class="navbox">6</span><span class="navbox">7</span><span class="navbox">8</span><span class="navbox">9</span><span class="navbox">10</span>
                        </div>
                        <div id="timer"></div>`

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
    //console.log(qnav);

    activateListeners();
    startTimer();
}


document.getElementById("start-btn").addEventListener('click',()=>{

    name=document.querySelector(".name").value;
    if(name=="") alert('Please enter your name in the field');
    else {

    openQuiz();
    
    localStorage.setItem('name',name);
    quizStatus=1;
    qnum=1;

    qtext.innerHTML=data[qnum-1].question;
    for(let j=1;j<=4;j++)
        document.getElementById(`opt${j}`).innerHTML=data[qnum-1].options[j-1];
    }

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


//start the timer

function startTimer(){
     x = setInterval(function() {

        timeleft--;

        var minutes=Math.floor(timeleft/60);
        var seconds=timeleft%60;
        minutes=String("0" + minutes).slice(-2);
        seconds=String("0" + seconds).slice(-2);

        document.getElementById("timer").innerHTML=minutes + ":" + seconds;
      
        if (timeleft <= 0) {
          clearInterval(x);
          sub.click();
        }
      }, 1000);
}



//end quiz

function endQuiz(){

    document.querySelector(".left-btn-span").style.display="none";
    document.querySelector(".right-btn-span").style.display="none";
    document.querySelector("#questions").style.display="none";
    clearInterval(x);
    document.getElementById("timer").remove();
    document.getElementById("navcontainer").remove();

    let scorebox=document.createElement('div');
    scorebox.id='scorebox';
    scorebox.innerHTML=`<span><h3><u>Your Score</u></h3>
                        <span id="score"></span>
                        </span>
                        <div id="highscores"><h3><u>Highscores</u></h3></div>
                        <button id="restart">Try Again!</button>`
    document.querySelector(".main-container").appendChild(scorebox);
    document.getElementById('restart').addEventListener('click',()=>{
        window.location.reload();
    })

}

function findDateTime(){
    var today = new Date();
    var date = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}


//calculate and display score,highscores
function findScore(){

    if(quizStatus==1){ 

        quizStatus=0;
        endQuiz();
        userscore=0,x=1,highscores=document.getElementById("highscores");
        if(timeleft<=0) timeleft=0;

        var dateTime=findDateTime();
        data.forEach(item=>{
            if(item.correct==1) userscore++;
        })

        //algo to calc score based on time,corrct to wrong ratio

        userscore=(userscore)*7 + (timeleft/180)*(userscore/10)*30;
        userscore=(Math.round(userscore * 100) / 100).toFixed(2);

        for(let i=0;i<5;i++){
            if(parseFloat(userscore)>=parseFloat(scoresArray[i].score)){
                for(let j=5;j>=i+1;j--)
                    {scoresArray[j]=scoresArray[j-1];}
                scoresArray[i]={name:`${localStorage.getItem('name')}`,score:userscore,datetime:`${dateTime}`}
                scoresArray.splice(5);
                localStorage.setItem('scores',JSON.stringify(scoresArray));
                break;
            }
        }
        console.log(scoresArray);
        document.getElementById("score").innerHTML+=localStorage.getItem('name')+"&nbsp:&nbsp"+userscore;
        for(let i=0;i<5;i++){
            if(scoresArray[i].name!=''){
                highscores.innerHTML+=`<div class"hsrow">${x}. ${scoresArray[i].name} : ${scoresArray[i].score} &nbsp&nbsp <span class="datespan">(${scoresArray[i].datetime}) </span> </div>`;
                x++;    
            }
        }
    }
}
  





