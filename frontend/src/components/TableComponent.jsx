import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Table, Button, Pagination, PaginationItem, PaginationLink, Form, Label, Input } from "reactstrap";

const TableComponent = (props) => {
   // SEARCH
   const [search, setSearch] = useState("");

   const [products, setProducts] = useState([]);

   // FORM CONTROL
   const [showForm, setShowForm] = useState(false);

   // PAGINATION
   const [currentPage, setCurrentPage] = useState(1);
   const recordsPerPage = 5;
   const lastIndex = currentPage * recordsPerPage;
   const firstIndex = lastIndex - recordsPerPage;
   const records = products.slice(firstIndex, lastIndex);
   const npage = Math.ceil(products.length / recordsPerPage);
   const numbers = [...Array(npage + 1).keys()].slice(1);

   // CREATE & UPDATE
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [formValue, setFormValue] = useState({
      name: "",
      picture: "",
      buy: "",
      sell: "",
      stock: "",
   });
   const inputForm = (e) => {
      if (selectedProduct) {
         setSelectedProduct({
            ...selectedProduct,
            [e.target.name]: e.target.value,
         });
      } else {
         setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
         });
      }
   };

   function handleFormSubmit(e) {
      e.preventDefault();
      if (selectedProduct) {
         axios
            .put(`http://localhost:3000/products/${selectedProduct.id}`, selectedProduct)
            .then((res) => {
               Swal.fire({
                  width: 200,
                  icon: "success",
                  text: `${selectedProduct.name} updated successfully`,
                  showConfirmButton: true,
               });
            })
            .catch((err) => {
               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong",
               });
            });
      } else {
         axios
            .post("http://localhost:3000/products", formValue)
            .then((res) => {
               Swal.fire({
                  width: 200,
                  icon: "success",
                  text: `New product added successfully! You have to refresh this page to see the product you just added`,
                  showConfirmButton: true,
               });
            })
            .catch((err) => {
               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong",
               });
            });
      }
      setShowForm(false);
      getProducts();
   }

   function handleCreateNew(product) {
      setShowForm(true);
      setSelectedProduct(null);
   }
   function handleEdit(product) {
      setShowForm(true);
      setSelectedProduct(product);
   }
   function handleCancel() {
      setShowForm(false);
   }

   // DELETE
   function handleDelete(entity) {
      Swal.fire({
         title: `Do you want to delete ${entity.name}?`,
         showDenyButton: true,
         showCancelButton: false,
         confirmButtonText: "Delete",
         denyButtonText: `Nope`,
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               const { data } = await axios.delete(`http://localhost:3000/products/${entity.id}`, {});
               Swal.fire({
                  width: 200,
                  icon: "success",
                  text: `${entity.name} has been deleted.`,
                  showConfirmButton: true,
               });
               setProducts(products.filter((product) => product.id !== entity.id));
            } catch (err) {
               console.log(err);

               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong",
               });
            }
         } else if (result.isDenied) {
            Swal.fire("Nothings deleted", "", "info");
         }
      });
   }

   // READ
   useEffect(() => {
      getProducts();
   }, [showForm]);

   const getProducts = async () => {
      const response = await axios.get("http://localhost:3000/products");
      // console.log(response.data.data);
      setProducts(response.data.data);
   };

   return (
      <Container>
         {showForm ? (
            <Form onSubmit={handleFormSubmit}>
               <Label>Product Name</Label>
               <Input
                  id="productPicture"
                  name="name"
                  placeholder="Product Name"
                  onChange={inputForm}
                  defaultValue={selectedProduct ? selectedProduct.name : ""}
                  type="text"
               />
               <Label className="mt-2">Picture</Label>
               <Input
                  id="productName"
                  name="picture"
                  placeholder="https://example.com/jpg"
                  onChange={inputForm}
                  defaultValue={selectedProduct ? selectedProduct.picture : ""}
                  type="text"
               />
               <Label className="mt-2">Buy Cost</Label>
               <Input
                  id="buyCost"
                  name="buy"
                  placeholder="Example: 400000"
                  onChange={inputForm}
                  defaultValue={selectedProduct ? selectedProduct.buy : ""}
                  type="number"
               />
               <Label className="mt-2">Sell Cost</Label>
               <Input
                  id="sellCost"
                  name="sell"
                  placeholder="Example: 200000"
                  onChange={inputForm}
                  defaultValue={selectedProduct ? selectedProduct.sell : ""}
                  type="number"
               />
               <Label className="mt-2">Stock</Label>
               <Input
                  id="stock"
                  name="stock"
                  placeholder="Example: 5"
                  onChange={inputForm}
                  defaultValue={selectedProduct ? selectedProduct.stock : ""}
                  type="number"
               />
               <Button
                  className="mt-3"
                  style={{ width: "75px" }}
                  color="success">
                  {selectedProduct ? "Update" : "Create"}
               </Button>
               <Button
                  className="mt-3"
                  onClick={handleCancel}
                  style={{ width: "75px", marginLeft: "5px" }}
                  color="danger">
                  Cancel
               </Button>
            </Form>
         ) : (
            <div>
               {!showForm ? (
                  <div>
                     <div className="flex">
                        <Button
                           className="mt-2 mb-2 float-start"
                           style={{ width: "90px" }}
                           color="success"
                           onClick={handleCreateNew}>
                           Create
                        </Button>
                        <Input
                           className="mt-2 mb-2 w-25 float-end"
                           id="searchInput"
                           type="text"
                           placeholder="Search product here..."
                           onChange={(e) => {
                              setSearch(e.target.value);
                           }}
                        />
                     </div>
                  </div>
               ) : null}
               <Table striped>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Picture</th>
                        <th>Buy Cost</th>
                        <th>Sell Cost</th>
                        <th>Stock</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {records
                        .filter((product) => product.name.toLocaleLowerCase().includes(search))
                        .map((product, index) => (
                           <tr key={index}>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>
                                 <img
                                    src={product.picture}
                                    alt=""
                                    height="100"
                                    width="100"
                                 />
                              </td>
                              <td>{product.buy}</td>
                              <td>{product.sell}</td>
                              <td>{product.stock}</td>
                              <td>
                                 <Button
                                    color="warning"
                                    onClick={() => handleEdit(product)}
                                    style={{ width: "90px", marginLeft: "5px" }}>
                                    Edit
                                 </Button>
                                 <Button
                                    color="danger"
                                    onClick={() => handleDelete(product)}
                                    style={{ width: "90px", marginLeft: "5px" }}>
                                    Delete
                                 </Button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </Table>
               <Pagination>
                  {numbers.map((number, index) => (
                     <PaginationItem
                        className={`${currentPage === number ? "active" : ""}`}
                        key={index}>
                        <PaginationLink onClick={() => changeCurrentPage(number)}>{number}</PaginationLink>
                     </PaginationItem>
                  ))}
               </Pagination>
            </div>
         )}
      </Container>
   );

   function changeCurrentPage(id) {
      setCurrentPage(id);
   }
};

export default TableComponent;
