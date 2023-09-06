import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "../../components/PrimaryButton";
import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Dropzone from "react-dropzone";

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
  confirmPassword: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:480px)");
  const { palette } = useTheme();
  const primaryMain = palette.primary.main;
  const primaryDark = palette.primary.dark;
  const backgroundDefault = palette.background.default;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    console.log("test");
    // e.preventDefault();
    let userDetails = { id: e.email, password: e.password };
    console.log(userDetails);
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userDetails),
    })
      .then((res) => {
        console.log("Registered successfully");
        setShowAlert(true);
        setAlertMsg("Registration Successfull. Redirecting...");
        setSeverity("success");

        setTimeout(() => {
          setShowAlert(false);
          navigate("/home");
        }, 3000);
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // termsOfService: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegister(values);
      console.log("on submit", values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  console.log("errors", formik.errors);
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

          <Typography variant="h4" fontWeight="500" mb="1rem">
            Sign Up
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {showAlert && (
              <Alert severity={severity} sx={{ mb: "1rem" }}>
                {alertMsg}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  size="small"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  size="small"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone> */}
                </Box>
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  size="small"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: "1rem" }}>
                <PrimaryButton type="submit" variant="contained" fullWidth>
                  Sign Up
                </PrimaryButton>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1rem", textAlign: "center" }}>
                <Typography className="center-text">
                  Already a member?
                  <Link
                    to="/"
                    style={{
                      marginLeft: "0.3rem",
                      color: primaryMain,
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Sign In
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

export default Register;
