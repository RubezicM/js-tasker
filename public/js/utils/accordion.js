setTimeout(()=>{
    accButtons = document.querySelectorAll('.accordion__button');
    for(let i = 0; i < accButtons.length;i++){
        accButtons[i].addEventListener('click',()=>{
            accButtons[i].classList.toggle('active');
                let panel = accButtons[i].nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                  } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                  } 
        });
    }
},1);
