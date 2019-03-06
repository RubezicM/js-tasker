
function accordionInit(btn){
    for(let i = 0; i < btn.length;i++){
        btn[i].addEventListener('click',()=>{
            btn[i].classList.toggle('active');
                let panel = btn[i].nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                  } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                  } 
        });
    }
}