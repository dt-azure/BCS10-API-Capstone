function showMessage(idErr,message){
    var id =document.getElementById(idErr);
    if(message != ""){
        id.style.display = "inline-block";
        id.innerText = message;
    }else{
        id.style.display = "none";
    }
}

function kiemTraRong(value,idErr){
    if(value.trim() != ""){
        showMessage(idErr,"");
        return true;
    }
    showMessage(idErr, "Khong duoc de trong");
    return false;
}

function kiemTraTen(value){
    var regex = /^[a-zA-Z0-9\s]+$/;
    if(regex.test(value)){
        showMessage("tbName","");
        return true;
    }
    showMessage("tbName","Ten khong hop le");
    return false;
}

function kiemTraImg(url){
    var imageExtension = /\.(jpeg|jpg|gif|png)$/i;
    if(imageExtension.test(url)){
        showMessage("tbImg","")
        return true;
    }
    showMessage("tbImg","Link hinh anh khong hop le");
    return false;
}

function kiemTraPrice(gia){
    if(gia >= 1000){
        showMessage("tbPrice","");
        return true;
    }
    showMessage("tbPrice","Gia thap hon $1000 khong hop le");
    return false;
}

function kiemTraBranch(value){
    var validBrand = ["iPhone","Samsung"];
    if(validBrand.includes(value)){
        showMessage("tbType","");
        return true;
    }
    showMessage("tbType","Please select brand");
    return false;
}