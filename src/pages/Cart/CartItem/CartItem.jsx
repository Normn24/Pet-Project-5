import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ListItemText, List, ListItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  addToCart,
  removeToCart,
} from "../../../redux/carts.slice/carts.slice";
import { useDispatch } from "react-redux";
import Counter from "../../../components/Counter/Counter";
import { decrementQuantity } from "../../../redux/carts.slice/carts.slice";
import Payment from "../Paymant";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { MyButton } from "./styles.js";
import { Box, Alert } from "@mui/material";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  const { name, imageUrls, developer, publisher, _id, quantity } = product;
  const [toggleModal, setToggleModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const incrementCounter = () => {
    dispatch(addToCart(product));
  };
  const decrementCounter = () => {
    dispatch(decrementQuantity(_id));
  };

  const closePaymantModal = (isAlert) => {
    setToggleModal(false);
    if (typeof isAlert === "boolean") {
      setAlertModal(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 350,
          background: "#F0F0F4",
          height: "100%",
          boxShadow:
            " rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px",
        }}
      >
        <CardMedia sx={{ height: 140 }} image={imageUrls[0]} title={name} />
        <CardContent
          sx={{
            flex: "1 1 auto",
            color: "green",
          }}
        >
          <Typography
            variant="h5"
            align="left"
            color="grey.700"
            sx={{
              backgroundcolor: "primary",
              backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
              backgroundSize: "100%",
              backgroundRepeat: "repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                m: "0",
              }}
            >
              Options:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  sx={{
                    m: "0",
                  }}
                  secondary={developer}
                  primary={<Typography variant="h6">Developer</Typography>}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{
                    m: "0",
                  }}
                  secondary={publisher}
                  primary={<Typography variant="h6">Publisher</Typography>}
                />
              </ListItem>
            </List>
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Counter
            number={quantity}
            incrementCounter={incrementCounter}
            decrementCounter={decrementCounter}
          />
          <Box sx={{ display: "flex", gap: "20px" }}>
            <MyButton onClick={() => dispatch(removeToCart(_id))}>
              <span>Delete</span>
            </MyButton>
            <MyButton
              onClick={() => {
                setToggleModal(true);
              }}
              size="small"
            >
              <span>Buy</span>
            </MyButton>
          </Box>
        </CardActions>
      </Card>

      {toggleModal && (
        <Modal modalClose={closePaymantModal} isModal={toggleModal}>
          <Payment modalClose={closePaymantModal} />
        </Modal>
      )}
      {alertModal && (
        <Modal modalClose={() => setAlertModal(false)} isModal={alertModal}>
          <Alert
            severity="success"
            onClose={() => {
              setAlertModal(false);
            }}
          >
            Thanks for your order!
          </Alert>
        </Modal>
      )}
    </>
  );
}
