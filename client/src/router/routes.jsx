import { Navigate } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Game from "../components/Game";
import OnlineGame from "../components/OnlineGame";
import Loading from "../components/OnlineGame/Loading";
import OnlineGameBoard from "../components/OnlineGame/OnlineGameBoard";

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
        element: <Game mode="offline" />,
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
