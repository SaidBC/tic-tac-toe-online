import { Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Game from "../components/Game";
import OnlineGame from "../pages/OnlineGame";
import Loading from "../pages/OnlineGame/Loading";
import OnlineGameBoard from "../pages/OnlineGame/OnlineGameBoard";
import OfflineGame from "../pages/OfflineGame";

const routes = [
  {
    path: "*",
    element: <Navigate to="/play" />,
  },
  {
    path: "/play",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "offline",
        element: <OfflineGame />,
      },
      {
        path: "computer",
        element: <Game mode="computer" />,
      },
      {
        path: "online",
        element: <OnlineGame />,
        children: [
          {
            index: true,
            element: <Loading />,
          },
          {
            path: "*",
            element: <OnlineGameBoard />,
          },
        ],
      },
    ],
  },
];

export default routes;
