import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";

// Akilani
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("This field is required*"),
  password: Yup.string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Your password must contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Case Character"
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:480px)");
  const { palette } = useTheme();
  const primaryMain = palette.primary.main;
  const primaryDark = palette.primary.dark;
  const backgroundDefault = palette.background.default;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const handleLogin = (e) => {
    // e.preventDefault();
    // console.log("Email", e.email);
    fetch(`http://localhost:8080/users/${e.email}`)
      .then((res) => {
        // console.log("test", res);
        return res.json();
      })
      .then((resp) => {
        if (Object.keys(resp).length === 0) {
          setShowAlert(true);
          setAlertMsg("Invalid credentials. Please check again.");
          setSeverity("error");

          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        } else {
          // console.log(resp.password);

          if (resp.password === e.password) {
            sessionStorage.setItem("email", e.email);

            setShowAlert(true);
            setAlertMsg("Login Successfull. Redirecting...");
            setSeverity("success");

            setTimeout(() => {
              setShowAlert(false);
              navigate("/home");
            }, 3000);
          } else {
            // console.log("Invalid password.");

            setShowAlert(true);
            setAlertMsg("Invalid credentials. Please check again.");
            setSeverity("error");

            setTimeout(() => {
              setShowAlert(false);
            }, 5000);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);

        setShowAlert(true);
        setAlertMsg(err.message);
        setSeverity("error");

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
      // console.log("on submit", values);
    },
  });

  return (
    <Box height="100vh" bgcolor={isNonMobile ? backgroundDefault : "#fff"}>
      <Container
        maxWidth="xs"
        className="center-container"
        sx={{
          boxShadow: isNonMobile
            ? "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 1px rgba(0, 0, 0, 0.2);"
            : "none",
          borderRadius: isNonMobile ? "0.5rem" : "none",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: ".1rem",
              color: primaryDark,
              textDecoration: "none",
            }}
          >
            Content Geek
          </Typography>

          <Divider sx={{ mt: "1rem" }} />

          <Typography variant="h4" fontWeight="500" mb="2rem">
            Sign In
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {showAlert && (
              <Alert severity={severity} sx={{ mb: "1rem" }}>
                {alertMsg}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: "1rem" }}>
                <PrimaryButton type="submit" variant="contained" fullWidth>
                  Sign In
                </PrimaryButton>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1rem", textAlign: "center" }}>
                <Typography>
                  Don't have an account?
                  <Link
                    to="/register"
                    style={{
                      marginLeft: "0.3rem",
                      color: primaryMain,
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
