import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Main from "../components/Main/Main";
import ListContext from "../../utils/contexts/ListsContext";

const ParentComponent = () => {
    const data = useContext(ListContext);

    const [appData, setAppData] = useState(data);

    const layout = (
        <ListContext.Provider value={{ data: appData, setAppData }}>
            <div>
                <Outlet />
            </div>
        </ListContext.Provider>
    );

    return layout;
};

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ParentComponent />,
        children: [
            {
                path: "/crud/",
                element: <Main />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);
