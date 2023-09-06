import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("This field is required*"),
  lastName: yup.string().required("This field is required*"),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("This field is required*"),
  password: yup.string().required("This field is required*"),
  location: yup.string().required("This field is required*"),
  occupation: yup.string().required("This field is required*"),
  picture: yup.string().required("This field is required*"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("This field is required*"),
  password: yup
    .string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Your password must contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Case Character"
    ),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

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

  // const register = async (values, onSubmitProps) => {
  //   // this allows us to send form info with image
  //   const formData = new FormData();
  //   for (let value in values) {
  //     formData.append(value, values[value]);
  //   }
  //   formData.append("picturePath", values.picture.name);

  //   const savedUserResponse = await fetch(
  //     "http://localhost:3001/auth/register",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );
  //   const savedUser = await savedUserResponse.json();
  //   onSubmitProps.resetForm();

  //   if (savedUser) {
  //     setPageType("login");
  //   }
  // };

  // const login = async (values, onSubmitProps) => {
  //   const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(values),
  //   });
  //   const loggedIn = await loggedInResponse.json();
  //   onSubmitProps.resetForm();
  //   if (loggedIn) {
  //     dispatch(
  //       setLogin({
  //         user: loggedIn.user,
  //         token: loggedIn.token,
  //       })
  //     );
  //     navigate("/home");
  //   }
  // };

  // const handleFormSubmit = async (values, onSubmitProps) => {
  //   if (isLogin) await login(values, onSubmitProps);
  //   if (isRegister) await register(values, onSubmitProps);
  // };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      // handleLogin();
      navigate("/home");
    }
    if (isRegister) {
      handleRegister();
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {showAlert && (
              <Alert severity={severity} sx={{ mb: "1rem" }}>
                {alertMsg}
              </Alert>
            )}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
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
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  // color: palette.primary.main,
                  backgroundColor: "#66E6FC",
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: "#66E6FC",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
