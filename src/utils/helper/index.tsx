import Loader from "../../component/loader";
import { NavigateFunction } from "react-router-dom";

export const hideLoader = () => {
  return <Loader isLoading={false} />;
};

export const commonNavigate = (navigate: NavigateFunction, path: string) => {
  navigate(path);
};

export const checkCondition = (
  condition: boolean,
  truePart: unknown,
  falsePart: unknown
) => {
  return condition ? truePart : falsePart;
};
