import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormHelperText,
  Paper,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addProductData,
  getProduct,
  getProductStatus,
  selectedProduct,
  updateProduct,
} from "../Redux/ProductSlice";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';
function Product() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [errors, setErrors] = useState({ name: "", price: "", img: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  const [productById, setProductById] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.selectedProduct);
  const id = useParams();
  const ProductStatus = useSelector(getProductStatus);
  const location = useLocation();
  const isProduct = location.pathname === "/Product";

  useEffect(() => {
    if (productById) {
      setName(productById?.name || "");
      setPrice(productById?.price || "");
      setImg(productById?.img || null);
    }
  }, [productById]);

  useEffect(() => {
    if (isProduct && products) {
      resetForm();
    }
  }, [isProduct, products]);

  useEffect(() => {
    if (!isProduct) {
      const product = JSON.parse(localStorage.getItem("products"));
      const getProductById = product?.find(
        (item) => item.id === Number(id?.id)
      );
      setProductById(getProductById);
    }
  }, [id,isProduct]);


  useEffect(() => {
    if (ProductStatus === "idle") {
      dispatch(getProduct());
    }
  }, [ProductStatus, dispatch]);

  const validateInputs = () => {
    let valid = true;
    const newErrors = { name: "", price: "", img: "" };

    if (!name.trim()) {
      newErrors.name = "Product name is required.";
      valid = false;
    }

    if (!price || isNaN(price) || Number(price) <= 0 || !isFinite(price)) {
      newErrors.price = "Enter a valid positive price.";
      valid = false;
    } else if (price.toString().length > 7) {
      newErrors.price = "Invalid price.";
      valid = false;
    }

    if (!img && !imgFile) {
      newErrors.img = "Product image is required.";
      valid = false;
    } else if (img) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = img.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.img = "Only JPG and PNG formats are allowed.";
        valid = false;
      }
    }
      
    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    if (isSubmit=== true) {
      validateInputs();
    }
  }, [name, price, img , imgFile]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!validateInputs()) return;

    if (productById) {
      const payload = { id: productById?.id, name, price, img };
      dispatch(updateProduct(payload));
      dispatch(selectedProduct(null));
      resetForm();
      setProductById({});
      setIsSubmit(false);
      navigate("/Product");
    }
  };

  const handleSubmit = (e) => {
    setIsSubmit(true);
    e.preventDefault();
    if (!validateInputs()) return;
    console.log("-->");
    const formData = new FormData();
    formData.append("ProductPic", img);
    formData.append("product_name", String(name));
    formData.append("price", String(price));
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
  }

    dispatch(addProductData(formData));
    // dispatch(addProduct({ id: Date.now(), name, price, img }));
    setIsSubmit(false);
    resetForm();

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      // setImgFile(file);
      setImg(file)
      const reader = new FileReader();
      reader.onload = () => {
        setImgFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImg(null);
    setImgFile(null);
    setErrors({ name: "", price: "", img: "" });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });


  return (
    <>
    <Button
    variant="text"
    onClick={() => navigate("/")}
    sx={{ position: "absolute", right: 20, top: 85 }}
  >
    <ViewListIcon/> View Products
  </Button>
    <Box
      component={Paper}
      // onSubmit={productById?.id ? handleUpdate : handleSubmit}
      sx={{
        width: "85vw",
        margin: "110px auto",
        padding: "20px 30px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "none", 
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        {productById?.id ?  "Update Product" : "Add Product" }
      </Typography>
      
   

      <Divider sx={{ mb: 2 }} />

      <Box
        component="form"
        onSubmit={productById?.id ?  handleUpdate : handleSubmit }
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={550}
        mx="auto"
      >
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Product Price"
          value={price < 0 ? "0" : price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          fullWidth
          error={!!errors.price}
          helperText={errors.price}
        />

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudDownloadIcon />}
          sx={{ alignSelf: "flex-start" }}
        >
          Upload Image
          <VisuallyHiddenInput type="file" onChange={handleImageChange} />
        </Button>

        {errors.img && (
          <FormHelperText error sx={{ textAlign: "left" }}>
            {errors.img}
          </FormHelperText>
        )}

        {imgFile && (
          <Box display="flex" justifyContent="flex-start">
            <img
              src={imgFile}
              alt="Preview"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" size="large">
          {isProduct ? "Add Product" : "Update Product"}
        </Button>

      </Box>
    </Box>
    </>
  );
}

export default Product;
