import { Box, CircularProgress, styled } from "@mui/material";

interface ILoader {
  isLoading: boolean;
}

const Loader: React.FC<ILoader> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      )}
    </>
  );
};

export default Loader;

const LoaderContainer = styled(Box)({
  width: "100%",
});
