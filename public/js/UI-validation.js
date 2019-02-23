let toggleUI = (msg,delay)=>{
    let responseField = document.getElementById('form-response');
    let overlay = document.querySelector('.overlay');
    let loader = document.querySelector('.loader');
    let displayMsg = document.querySelector('.form-popup__message');

    overlay.classList.remove('hidden');
    overlay.classList.add("show");
    responseField.classList.remove("hidden");
    responseField.classList.add("show");
    setTimeout(() => {
        loader.classList.add("hidden");
        displayMsg.classList.remove("hidden");
        displayMsg.classList.add("show");
        displayMsg.innerHTML = msg;
       
    }, delay);
}