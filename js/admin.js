
var editId= null;
var productList=[];


// function show list of product
function fetchListProduct(){
    axios({
        url:"https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts",
        method:"GET",
    })
        .then(function(res){
        // console.log("🚀 ~ .then ~ res:", res);
        productList =res.data;
        renderListProduct(productList);
        })
        .catch(function(err){
        });
}
fetchListProduct();


// function add product
function AddProduct(){
    // show the "Add Phone" button
    document.getElementById("btnAddPhone").style.display = "inline-block";
    document.getElementById("btnUpdate").style.display = "none";
}
function AddPhone(){
    
    var product = getInfoFromForm();
    var isValid =true;

    // kiem tra ten
    isValid = kiemTraRong(product.name,"tbName") && kiemTraTen(product.name);
    // kiem tra price
    isValid = isValid &(kiemTraRong(product.price, "tbPrice") && kiemTraPrice(product.price));

    // kiem tra screen
    isValid = isValid & (kiemTraRong(product.screen,"tbScreen"));

    // kiem tra front Camera
    isValid = isValid & (kiemTraRong(product.frontCamera,"tbFront"));

    // kiem tra back camera
    isValid = isValid & (kiemTraRong(product.backCamera,"tbBack"));

    // kiem tra img link
    isValid = isValid & (kiemTraRong(product.img,"tbImg") && kiemTraImg(product.img));

    // kiem tra Description
    isValid = isValid & (kiemTraRong(product.desc,"tbDescr"));

    // kiem tra branch
    isValid = isValid & (kiemTraRong(product.type,"tbType")&& kiemTraBranch(product.type));
    

    if(isValid){
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
}


// Remove/delete product
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


// Get value and show on the form
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

       document.getElementById("btnUpdate").style.display = "inline-block";

        $('#MyModal').modal('show'); 
        })
        .catch(function(err){

        });
}

// Update new value from edit button
function updatePhone(){
    
    var product = getInfoFromForm();
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


function filterByBrand() {
    var selectedBrand = document.getElementById("brandFiltered").value;
    // console.log("🚀 ~ filterByBrand ~ selectedBrand:", selectedBrand)
    
    // Fetch products based on the selected brand
    // use filter function to sort out and return a new array that is match with selected brand or a new array include all products
    var filteredProducts = productList.filter(function(product) {
       return selectedBrand === 'all' || product.type === selectedBrand;
    });
 
    // Render the filtered products
    renderListProduct(filteredProducts);
 }


 function sortByPrice(order){
    axios({
        url:`https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts`,
        method:"GET",
    })
        .then(function(res){
        var products =res.data;

        /**use sort function to sort out an array 
         * as an ascending or descending
         */
        products.sort(function(a,b){
            // sort function will compare the difference between prices of elements to create new array and return it 
            return order === 'asc' ? a.price-b.price : b.price-a.price;

        })

        renderListProduct(products);
        })
        .catch(function(err){
            console.error("Error fetching products: ", err);
        });
 }

 function searchProduct(){
    var searchInput = document.getElementById("searchPhone").value;
    // console.log("🚀 ~ searchProduct ~ searchInput:", searchInput)

    var filterSearch = productList.filter(function(product){
        return product.name.includes(searchInput);
    })
    // console.log("🚀 ~ filterSearch ~ filterSearch:", filterSearch);

    renderListProduct(filterSearch);
 }