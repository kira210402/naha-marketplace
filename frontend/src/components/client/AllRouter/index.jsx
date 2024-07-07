import { useRoutes } from "react-router-dom";
import { routes } from "./../../../routers/index";
const AllRouter = () => {
  const elements = useRoutes(routes);
  return <>{elements}</>;
};

export default AllRouter;
