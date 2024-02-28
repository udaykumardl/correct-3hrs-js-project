function handleFormSubmit(event) {
  event.preventDefault();
  const productname = event.target.productname.value;
  const sellingprice = event.target.sellingprice.value;
  const category = event.target.category.value;

  const obj = {
    productname,
    sellingprice,
    category
  };

  axios.post("https://crudcrud.com/api/000d3ff5722d42c5a8e6814e51fbd585/products", obj)
    .then((response) => {
      showProductOnScreen(response.data);
      console.log(response);
    })
    .catch((err) => {
      const formContainer = document.querySelector('.container');
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Something went wrong while adding the product. Please try again.';
      formContainer.appendChild(errorMessage);
      console.error('Error adding product:', err);
    });
}



window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/000d3ff5722d42c5a8e6814e51fbd585/products")
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        showProductOnScreen(response.data[i]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
function showProductOnScreen(obj){
  document.getElementById('productname').value='';
  document.getElementById('sellingprice').value='';
  document.getElementById('category').value='';

  const parentNode=document.getElementById('productlist');

  const childnode=`<li id=${obj._id}> ${obj.productname}-${obj.sellingprice}-${obj.category} 
                  <button onclick=DeleteProduct('${obj._id}') >Delete</button>
                  <button onclick=editProduct('${obj._id}','${obj.productname}','${obj.sellingprice}','${obj.category}') >Edit</button>

                 

                  </li> `;
  parentNode.innerHTML=parentNode.innerHTML+childnode;
}
function editProduct(id,productname,sellingprice,category){

  document.getElementById('productname').value=productname;
  document.getElementById('sellingprice').value=sellingprice;
  document.getElementById('category').value=category;
  DeleteProduct(id)
}


function DeleteProduct(id) {
  axios.delete(`https://crudcrud.com/api/000d3ff5722d42c5a8e6814e51fbd585/products/${id}`)
    .then((res) => {
      removeProductFromScreen(id);
    })
    .catch((err) => {
      console.error(err);
    });
}

function removeProductFromScreen(id) {
  const parentNode = document.getElementById('productlist');
  const childNodeToBeRemoved = document.getElementById(id);
  if (childNodeToBeRemoved) {
    parentNode.removeChild(childNodeToBeRemoved);
  }
}

