function getInfoFromForm(){
    var phoneName = document.getElementById("name").value;
    var price = document.getElementById("price").value*1;
    var screen = document.getElementById("screen").value;
    var back = document.getElementById("bCam").value;
    var front = document.getElementById("fCam").value;
    var img = document.getElementById("img").value;
    var desc = document.getElementById("decr").value;
    var type = document.getElementById("brand").value;

    var product= {
        name:phoneName,
        price: price,
        screen: screen,
        backCamera: back,
        frontCamera: front,
        img: img,
        desc: desc,
        type: type,
    }

    return product;
}

// function display list of product
function renderListProduct(arr){
    var contentHtml ="";
    
    if(arr.length == 0){
        alert("No item in the list");
    }

    arr.forEach(item => {
        var trString = `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img src="${item.img}" class="resize"></td>
        <td>${item.desc}</td>
        <td>
        <button class='btn btn-danger' onclick='deleteProduct(${item.id})'>X</button>
        <button class='btn btn-warning' onclick='editProduct(${item.id})'>edit</button>
        </td>
        </tr>
        `
        contentHtml += trString;
    });
    document.getElementById("tablePhone").innerHTML = contentHtml;

}