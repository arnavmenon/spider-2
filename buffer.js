function toggleDisplay(element){
    if(element.style.display="inline-block") element.style.display="none";
    else element.style.display="inline-block";
}

rb.addEventListener('click',()=>{
    qnum++;

    if(qnum>=3) {rb.disabled='true'; console.log('a');}
    else {rb.disabled='false';console.log('b');}
    if(qnum<=1) {lb.disabled='true';console.log('c');}
    else {lb.disabled='false';console.log('d');}


    if(qnum>=1&&qnum<=3){    
        qtext.innerHTML=questions[qnum-1];
        for(let j=1;j<=4;j++){
            document.getElementById(`opt${j}`).innerHTML=options[qnum-1][j-1];
        }

    }
})

lb.addEventListener('click',()=>{
    qnum--;

    if(qnum>=3) rb.disabled='true';
    else rb.disabled='false';
    if(qnum<=1) lb.disabled='true';
    else lb.disabled='false';
  
    if(qnum>=1&&qnum<=3){    
        qtext.innerHTML=questions[qnum-1];
        for(let j=1;j<=4;j++){
            document.getElementById(`opt${j}`).innerHTML=options[qnum-1][j-1];
        }

    }
})