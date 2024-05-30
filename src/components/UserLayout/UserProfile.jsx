import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserProfile,
  updateUserPassword,
} from "../../redux/user.slice/user.slice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  login: Yup.string().required("Login is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("New password is required"),
});

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user, error, message } = useSelector((state) => state.user);

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    login: user?.login || "",
    password: "",
    newPassword: "",
  };

  const handleProfileSubmit = () => {
    const { firstName, lastName, email, login } = formik.values;
    const updateProfile = { firstName, lastName, email, login };
    dispatch(updateUserProfile(updateProfile));
  };

  const handlePasswordSubmit = () => {
    const { password, newPassword } = formik.values;
    if (password && newPassword) {
      dispatch(updateUserPassword({ password, newPassword }));
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      handlePasswordSubmit();
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "20px",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h4" sx={{ fontWeight: "700" }}>
          My profile
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            display: error || message ? "block" : "none",
            padding: "5px 15px",
            color: "#ffff",
            backgroundColor: error ? "#d21717" : "#4c6b22",
            borderRadius: "4px",
          }}
        >
          {error && (
            <>
              {error?.firstName ||
                error?.lastName ||
                error?.login ||
                error?.password ||
                error?.email ||
                error?.password ||
                "An error occurred"}
            </>
          )}
          {message}
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
          padding: "24px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProfileSubmit();
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="first-name"
                name="firstName"
                label="First name"
                placeholder={user.firstName}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="last-name"
                name="lastName"
                label="Last name"
                placeholder={user.lastName}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                placeholder={user.email}
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="login"
                name="login"
                label="Login"
                placeholder={user.login}
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: "18px" }}>
            <Button
              sx={{
                backgroundColor: "#bdbdbd",
                borderRadius: "3px",
                padding: "8px 0",
                width: "180px",
                ":hover": { backgroundColor: "#cccc" },
              }}
              type="submit"
            >
              Update Profile
            </Button>
          </Box>
        </form>

        <form onSubmit={formik.handleSubmit}>
          <Typography
            variant="h5"
            component="h5"
            sx={{ fontWeight: "700", margin: "24px 0 12px" }}
          >
            Change password
          </Typography>
          <Box sx={{ display: "flex", gap: "24px" }}>
            <TextField
              fullWidth
              autoComplete="on"
              id="old-password"
              name="password"
              label="Old Password"
              placeholder="••••••••"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              autoComplete="on"
              id="new-password"
              name="newPassword"
              label="New Password"
              placeholder="••••••••"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </Box>
          <Box sx={{ mt: "18px" }}>
            <Button
              sx={{
                backgroundColor: "#bdbdbd",
                borderRadius: "3px",
                padding: "8px 0",
                width: "180px",
                ":hover": { backgroundColor: "#cccc" },
              }}
              type="submit"
            >
              Change Password
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
