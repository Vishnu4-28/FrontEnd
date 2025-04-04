import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProduct, selectedProduct } from '../../Redux/ProductSlice';
import {  useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import QueueIcon from '@mui/icons-material/Queue';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
function ProductView() {
    const [open, setOpen] = useState(false);
    const products = useSelector((state) => state.products.products);
    const [productDetail,setProductDetail] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log("AllProduct", selectedProduct);
    // }, [selectedProduct]);
    const handleClose = () => setOpen(false);
    const handleViewDetail = (product) =>{
        console.log("viewDetail-->",product)
        setProductDetail(product)
        // dispatch(isModal)
        setOpen(true) 
        
    }

    useEffect(()=>{
      dispatch(getProduct())
    },[])
    const handleEditProduct = (product) => {
    dispatch(selectedProduct(product))
    navigate(`/Product/${product?.id}`)

    }
    const [rows, setRows] = useState(products);
    const [data,setData] = useState([]);
    const [searched, setSearched] = useState("");
    
    const requestSearch = (searchedVal) => {
        setSearched(searchedVal)
      const filteredRows = products.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };

    useEffect(() => {
        setRows(products); 
      }, [products]);
      
      useEffect(() => {   
        setData(rows); 
      }, [rows]);
      useEffect(() =>{
        console.log("data-product",data);
        
      },[data])
    return (
<div>

  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding:'10px', gap:'1' }}>
  <ManageSearchIcon/>
        <TextField
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          placeholder='Search product name'
          sx={{ '& .MuiInputBase-input': { padding: '5px' } }}
        />
    <Button onClick={() => navigate('/Product')}><QueueIcon/> Add Product</Button>
    </Box>

  <TableContainer
    component={Paper}
    sx={{
      width: "85vw",
      margin: "10px auto",
    //   padding: "20px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      borderRadius: "10px",
      maxHeight: "70vh", 
      overflow: "auto"
    }}
  >
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {["Name", "Price", "Image", "Actions"].map((heading, index) => (
            <TableCell
              key={index}
              sx={{
                position: "sticky",
                top: 0,
                // backgroundColor: "#e0e0e0",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "Arial, sans-serif",
                textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)",
                zIndex: 1,
                textAlign: heading === "Image" || heading === "Actions" ? "center" : "left"
              }}
            >
              {heading}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody data-testid="Product-Data">
        {data && data.length > 0 ? (
          data.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell align="center">
                <img
                  src={product?.img}
                  alt={product.name}
                  width="80"
                  height="50"
                  style={{ borderRadius: "5px", objectFit: "cover" }}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(deleteProduct(product.id))}
                  sx={{ minWidth: "40px" }}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditProduct(product)}
                  sx={{ ml: 1, minWidth: "40px" }}
                >
                  <EditNoteIcon />
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleViewDetail(product)}
                  sx={{ ml: 1, minWidth: "40px" }}
                >
                  <RemoveRedEyeIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <strong>No Data Found</strong>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "350px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "8px"
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <img
            src={productDetail?.img}
            alt={productDetail?.name}
            width="60"
            height="60"
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {productDetail?.name}
            </Typography>
            <Typography variant="body1" color="primary">
              {productDetail?.price}
            </Typography>
          </Box>
        </Box>

        <Typography id="modal-description" variant="body2" color="textSecondary">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  </TableContainer>

</div>

    );
 
}

export default ProductView;
