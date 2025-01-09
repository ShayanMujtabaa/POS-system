import "./App.css";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchItems } from "./components/redux/ItemsSlice";
import { fetchCategories } from "./components/redux/CategoriesSlice";
import Router from "./config/router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col bg-gradient-to-r from-green-500 via-blue-500 to-blue-900">
        <div>
          <Router />
        </div>
      </main>
    </Provider>
  );
}

export default App;
