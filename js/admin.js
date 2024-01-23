
var editId= null

// function display list of product
function renderListProduct(arr){
    var contentHtml ="";

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

function fetchListProduct(){
    axios({
        url:"https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts",
        method:"GET",
    })
        .then(function(res){
        // console.log("🚀 ~ .then ~ res:", res);
        renderListProduct(res.data);

        })
        .catch(function(err){

        });
}
fetchListProduct();
function AddProduct(){
    // show the "Add Phone" button
    document.getElementById("btnAddPhone").style.display = "inline-block";
}
function AddPhone(){
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
    axios({
        url:"https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts",
        method:"POST",
        data:product,
    })
        .then(function(res){
        $('#MyModal').modal('hide'); 
        fetchListProduct();
        })
        .catch(function(err){

        });
}

function deleteProduct(id){
    axios({
        url:`https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts/${id}`,
        method:"DELETE",
    })
        .then(function(res){
        
        fetchListProduct();
        })
        .catch(function(err){

        });
}


function editProduct(id){
    editId = id;
    axios({
        url:`https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts/${id}`,
        method:"GET",
    })
        .then(function(res){
        var productEdit = res.data;
        document.getElementById("name").value = productEdit.name;
        document.getElementById("price").value = productEdit.price;
        document.getElementById("screen").value = productEdit.screen;
        document.getElementById("bCam").value = productEdit.backCamera;
        document.getElementById("fCam").value = productEdit.frontCamera;
        document.getElementById("img").value = productEdit.img;
        document.getElementById("decr").value = productEdit.desc;
       document.getElementById("brand").value = productEdit.type
       
       // Hide the "Add Phone" button
       document.getElementById("btnAddPhone").style.display = "none";

        $('#MyModal').modal('show'); 
        })
        .catch(function(err){

        });
}

function updatePhone(){
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
    axios({
        url:`https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts/${editId}`,
        method:"PUT",
        data: product,
    })
        .then(function(res){
        $('#MyModal').modal('hide'); 
        fetchListProduct();
        })
        .catch(function(err){

        });
}

