function showMessage(idErr,message){
    var id =document.getElementById(idErr);
    if((id.style.display ==="none" || id.style.display ==="") && message != ""){
        id.style.display = "inline-block";
        id.innerText = message;
    }else{
        id.style.display = "none";
    }
}
