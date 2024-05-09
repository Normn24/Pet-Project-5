import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  // return localStorage.getItem("accessToken");
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTU3OWE3ZDc2OTcwMmRmMGYwMzJkZiIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTUyNDgyNTMsImV4cCI6MTcxNTI4NDI1M30.oDu0GV1LozJeF0IlFnBzBnv2Wyfgepmcm6CK1CXf-PU"
}

export const addToWishList = createAsyncThunk(
  "wishList/addToWishList",
  async (payload) => {
    const response = await fetch(`http://localhost:4000/api/wishlist/${payload}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const removeFromWishList = createAsyncThunk(
  "wishList/removeFromWishList",
  async (payload) => {
    const response = await fetch(
      `http://localhost:4000/api/wishlist/${payload}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchWishList = createAsyncThunk(
  "wishList/fetchWishList",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/wishlist/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get favorites");
    }
    const data = await response.json();
    return data;
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList?.products.push(action.payload);
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList.products.filter((item) => {
          item._id !== action.payload._id;
        });
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList = action.payload;
      });
  },
});

export default wishListSlice.reducer;