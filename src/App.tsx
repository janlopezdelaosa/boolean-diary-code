import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DataViewer from "./DataViewer";

import { config, Page } from "./defs";
import Header from "./Header";
import Settings from "./Settings";

const App = () => {
  const [page, setPage] = useState<Page>("settings");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
  console.log(JSON.stringify(config));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header page={page} setPage={setPage} />
          <Suspense fallback={<p>loading data</p>}>
            <Routes>
              <Route path="/" element={<DataViewer />} />
              <Route path="/days" element={<Settings />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
