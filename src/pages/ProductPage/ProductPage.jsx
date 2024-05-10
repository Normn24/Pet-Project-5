import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductId } from "../../redux/productItem.slice/productItem.slice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";
import { addToCart } from "../../redux/carts.slice/carts.slice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { MyButton } from "../Cart/CartItem/styles.js";

const ProductPage = ({modalClose}) => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.product);
  const [toggleModal, setToggleModal] = useState(false);

  const [favorite, setFavorite] = useState(false);
  const handleFavorite = () => setFavorite(!favorite);
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(product);
  console.log(status == "loading");

  useEffect(() => {
    dispatch(fetchProductId(id));
  }, [dispatch, id]);

  if (status == "loading") {
    return <div className={styles.productContainer}>Loading...</div>;
  }

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: "20px 0",
        gap: "20px",
        fontFamily: '"Gill Sans", sans-serif',
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "50px",
        }}
      >
        <Box
          component="div"
          sx={{
            marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "center",
            position: "relative",
            width: "60%",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{ position: "absolute", width: "30%", borderRadius: "0" }}
          >
            Sale
          </Button>

          <img
            src={product.imageUrls ? product.imageUrls[0] : ""}
            alt={product.name}
            className={styles.productImg}
          />

          <h2>{product.currentPrice} ₴</h2>
        </Box>
        <Box component="div" sx={{ textAlign: "left" }}>
          <h3>{product.name}</h3>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            {!favorite && (
              <AiOutlineHeart
                onClick={handleFavorite}
                style={{
                  height: "25px",
                  width: "auto",
                  color: "#828386",
                }}
              />
            )}
            {favorite && (
              <AiFillHeart
                onClick={handleFavorite}
                style={{
                  height: "25px",
                  width: "auto",
                  color: "#828386",
                }}
              />
            )}
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <Rating
                name="half-rating"
                defaultValue={(product.rating / 100) * 5}
                precision={0.1}
              />
              <span>{product.rating} / 100</span>
            </Box>
          </Box>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ minWidth: "150px" }}>Дата виходу</TableCell>
                <TableCell>{product.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Розробник</TableCell>
                <TableCell>{product.developer}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Видавець</TableCell>
                <TableCell>{product.publisher}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Жанр</TableCell>
                <TableCell>
                  {product?.genres?.map((value) => value.name)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button
            onClick={() => {
              setToggleModal(true);
            }}
            variant="contained"
            sx={{ marginTop: "20px", fontSize: "18px", width: "30%" }}
          >
            Купити
          </Button>
        </Box>
      </Box>
      <Box component="div">
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#fff",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant="fullWidth"
              TabIndicatorProps={{
                sx: { backgroundColor: "blue", color: "black" },
              }}
              aria-label="secondary tabs example"
              sx={{
                border: "none",
                "& button": {},
                "& button:hover": {
                  backgroundColor: "#c4c4c4",
                  fontWeight: 500,
                },
                "& button:active": { borderColor: "transparent" },
                "& button:Mui-selected": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Tab value="1" label="Опис" />
              <Tab value="2" label="Системні вимоги" />
            </Tabs>
          </Box>
          <TabPanel
            value="1"
            index={0}
            sx={{ textAlign: "left", fontSize: "18px" }}
          >
            {product.description}
          </TabPanel>
          <TabPanel value="2" index={1}>
            Tab Two
          </TabPanel>
        </TabContext>
      </Box>
      <div className="products-carousel"></div>
      {/* {toggleModal && (
        <Modal modalClose={() => setToggleModal(false)} isModal={toggleModal}>
          <HighlightOffIcon sx={{
           position: 'absolute',
           top: '10px',
           right: '10px',
           cursor: 'pointer',
          }}
           onClick={() => setToggleModal(false)}/>
          <header className="modal__header">
            <h2>Зам</h2>
          </header>
          <div className="modal__content">
            <p>Ваш товар буде доданий до кошику</p>
          </div>
            <MyButton
              onClick={() => {
                dispatch(addToCart(product));
                setToggleModal(false);
              }}
            >
              Додати
            </MyButton>
            <MyButton
              onClick={() => setToggleModal(false)}
            >
              Відмінити
            </MyButton>
        </Modal>
      )} */}
    </Container>
  );
};

export default ProductPage;
