import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function ViewProduct() {
  const products = useSelector((state) => [state.products.selectedProduct]);
  useEffect(()=>{
    console.log("Selected_products",products);
  },[])
  return (
    <div>
        <TableContainer
        component={Paper}
        sx={{
            width: "85vw",
            margin: "20px auto",
            padding: "20px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "10px",
            overflowX: "auto"
        }}
       > 
        <Table stickyHeader>
        <TableHead>
  <TableRow sx={{ backgroundColor: "#e0e0e0" }}> 
    <TableCell sx={{ 
      fontWeight: "bold", 
      fontSize: "1.1rem", 
      fontFamily: "Arial, sans-serif", 
      textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)", 
      width: "30%" 
    }}>
      Name
    </TableCell>
    <TableCell sx={{ 
      fontWeight: "bold", 
      fontSize: "1.1rem", 
      fontFamily: "Arial, sans-serif", 
      textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)", 
      width: "20%" 
    }}>
      Price
    </TableCell>
    <TableCell sx={{ 
      fontWeight: "bold", 
      fontSize: "1.1rem", 
      fontFamily: "Arial, sans-serif", 
      textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)", 
      width: "25%", 
      textAlign: "center" 
    }}>
      Image
    </TableCell>
    {/* <TableCell sx={{ 
      fontWeight: "bold", 
      fontSize: "1.1rem", 
      fontFamily: "Arial, sans-serif", 
      textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)", 
      width: "25%", 
      textAlign: "center" 
    }}>
      Actions
    </TableCell> */}
  </TableRow>
</TableHead>

            <TableBody>
                {products && products.length > 0 ? (
                    products.map((product) => (
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
                            {/* <TableCell align="center">
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
                            </TableCell> */}
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

        </TableContainer>
    </div>
  )
}

export default ViewProduct