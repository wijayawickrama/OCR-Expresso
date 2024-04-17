import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Home } from "./pages/homePage.tsx";
import { ImageUpload } from "./pages/imageUploadPage.tsx";
import { TextCorrection } from "./pages/grammarCorrectionPage.tsx";
import "./App.css";
import { Footer } from "./components/footer.tsx";

function App() {
  return (
    <ChakraProvider>
      <React.StrictMode>
        <Router>
          <Box h="100vh">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/page1" element={<ImageUpload />} />
              <Route path="/page2" element={<TextCorrection />} />
            </Routes>
            <Footer />
          </Box>
        </Router>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;
