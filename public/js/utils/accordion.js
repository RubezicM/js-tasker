let accButtons = document.querySelectorAll('.accordion__button');

for(let i = accButtons; i < accButtons.length;i++){
    accButtons[i].addEventListener('click',()=>{
        this.classList.toggle("active");
    });
}