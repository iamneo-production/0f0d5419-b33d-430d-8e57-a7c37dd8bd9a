import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/errors/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ViewAllDocuments from "./pages/ViewAllDocuments";
import ProtectedUser from "./routes/protectedRoutes/ProtectedUser";
import PublicUser from "./routes/protectedRoutes/PublicUser";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicUser />}>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/" element={<ProtectedUser />}>
        <Route errorElement={<ErrorPage />}>
          <Route path="home" element={<HomePage />} />
          {/* <Route path="view-all-documents" element={<ViewAllDocuments />} /> */}
        </Route>
      </Route>
    </>
  )
);

function App() {
  const theme = createTheme(themeSettings());
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
