import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Chip,
  TextField,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import TextBox from "components/TextBox";
import PrimaryButton from "components/PrimaryButton";

const validationSchema = yup.object().shape({
  interest: yup.string().required("This field is required*"),
});

const UserWidget = ({ userId, picturePath, cats }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  // const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleSubmit = (e) => {

  };

  const formik = useFormik({
    initialValues: {
      interest: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      // console.log("on submit", values);
    },
  });

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage
            image={
              // "../../assets/p2.jpeg"
              picturePath
            }
          />
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            Haily Banks
            {/* {firstName} {lastName} */}
          </Typography>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Interests
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FlexBetween gap="0.5rem" mb="0.5rem">
            <TextField
              fullWidth
              id="interest"
              name="interest"
              size="small"
              value={formik.values.interest}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.interest && Boolean(formik.errors.interest)}
              helperText={formik.touched.interest && formik.errors.interest}
            />
            <PrimaryButton type="submit" variant="contained">
              Add
            </PrimaryButton>
          </FlexBetween>
        </form>

        <Box mt="1rem">
          {cats.map(item => <Chip
            key={item.id}
            sx={{ mr: "0.5rem", mb: "0.5rem" }}
            label={item.category}
            onDelete={handleDelete}
          />)}
          
         
          
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
