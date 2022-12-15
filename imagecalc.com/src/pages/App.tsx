import Container from "react-bootstrap/Container";
import Instructions from "../components/App/Instructions";
import UploadImage from "../components/App/UploadImage";
import ProcessedImage from "../components/App/ProcessedImage";
import TransformationInput from "../components/App/TransformationInput";
import SubmitButton from "../components/App/SubmitButton";
import ImageMagickCommandResult from "../components/App/ImageMagickCommandResult";
import ExamplesText from "../components/App/ExamplesText";
import GetImageMagickCommandQueryError, {
  atoms as getImageMagickCommandQueryError,
} from "../components/App/GetImageMagickCommandQueryError";
import ProcessImageError, { atoms as processImageError } from "../components/App/ProcessImageError";

import { useAtom } from "jotai";

const App = () => {
  const [getImageMagickCommandQueryErrorHidden] = useAtom(getImageMagickCommandQueryError.hidden);
  const [processImageErrorHidden] = useAtom(processImageError.hidden);
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="logo.svg" alt="" height="32" className="d-inline-block align-text-top" />
          </a>
        </div>
      </nav>
      <div className="container py-2">
        <div className="row g-2 justify-content-left">
          <div className="col-sm-12 lead py-2 text-center">
            <Instructions />
          </div>
        </div>

        <div className="row g-2 justify-content-left mt-2">
          <div className="col-sm-6">
            <UploadImage />
          </div>
          <div className="col-sm-6">
            <ProcessedImage />
          </div>
        </div>

        <div className="row g-2 justify-content-left mt-2">
          <div className="col-sm-11">
            <TransformationInput />
          </div>
          <div className="col-sm-1 align-self-end">
            <SubmitButton />
          </div>
        </div>

        <div className="row g-2 justify-content-left mt-2">
          <div className="col-sm-12 font-monospace text-muted">
            <ImageMagickCommandResult />
          </div>
        </div>

        <div className="row g-2 justify-content-left mt-2">
          <div className="col-sm-12 small">
            <ExamplesText />
          </div>
        </div>

        <div className="row g-2 justify-content-left mt-2">
          {!getImageMagickCommandQueryErrorHidden && (
            <div className="col-sm-12">
              <GetImageMagickCommandQueryError />
            </div>
          )}
          {!processImageErrorHidden && (
            <div className="col-sm-12">
              <ProcessImageError />
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-end align-items-center py-2 my-4 border-top">
          <p className="mb-0 text-muted small">
            Built with{" "}
            <a href="https://tryimplement.com" target="_blank" rel="noopener noreferrer">
              Implement
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
