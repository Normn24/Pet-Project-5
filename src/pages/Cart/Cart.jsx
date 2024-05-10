import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/products.slice/products.slice";
import CartItem from "./CartItem/CartItem";
import { Grid } from "@mui/material";
import { useStyles } from "./CartItem/styles.js";
import { Box, Typography } from "@mui/material";

function Cart() {
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

  const totalQuantity = carts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = carts.reduce(
    (total, product) => total + product.currentPrice * product.quantity,
    0
  );

  return (
    <Box sx={{ position: "relative", minHeight: "75.3vh", margin: "40px 0", padding: '0 20px' }}>
      <div className={classes.total}>
        <strong>
          Total: <span>{totalQuantity}</span>
        </strong> <br/>
        <strong>
          Total Price: <span>${totalPrice.toFixed(2)} </span>{" "}
        </strong>
      </div>
      {carts.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            width: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="p"
          component="p"
        >
          OOPS, THERE`S NOTHING TO SHOW HERE
          <br />
          You don't have any goods 
        </Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 4, md: 12 }}
          sx={{ paddingTop: '40px' }}
        >
          {carts.map((product, index) => (
            <Grid item xs={2} sm={2} md={4} key={product._id}>
              <CartItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Cart;
