import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import Navbar from "../components/Navbar";
import AddItem from "../components/AddItem";
import AddCategory from "../components/AddCategory";
import AddExpense from "../components/AddExpense";
import DeleteItem from "../components/DeleteItem";
import UpdateItem from "../components/UpdateItem";
import AdminPage from "../Pages/AdminPage";
import ItemPage from "../Pages/ItemPage";
import CategoryPage from "../Pages/CategoryPage";
import ReportPage from "../Pages/ReportPage";
import ItemReportPage from "../Pages/ItemReportPage";
import SalesReportPage from "../Pages/SalesReportPage";
import CategoryReportPage from "../Pages/CategoryReportPage";
import HomePage from "../Pages/HomePage";
import DeleteCategory from "../components/DeleteCategory";
import UpdateStock from "../components/UpdateStock";
import LoginPage from "../Pages/LoginPage";
import StockReportPage from "../Pages/StockReportPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route
          path="/adminPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <AdminPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/addItem"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <AddItem />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/addCategory"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <AddCategory />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/deleteItem"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <DeleteItem />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/deleteCategory"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <DeleteCategory />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/addExpense"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <AddExpense />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/updateItem"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <UpdateItem />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/updateStock"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <UpdateStock />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/adminPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <AdminPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/itemPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <ItemPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/categoryPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <CategoryPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/reportPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <ReportPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/salesReportPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <SalesReportPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/itemReportPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <ItemReportPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/categoryReportPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <CategoryReportPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/stockReportPage"
          element={
            <PrivateRoute requiredRole="admin">
              <>
                <Navbar />
                <StockReportPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/LoginPage"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/MainPOS"
          element={
            <PrivateRoute requiredRole={"employee"}>
              <>
                <Navbar />
                <HomePage />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
