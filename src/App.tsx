import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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
        <Header page={page} setPage={setPage} />
        <Suspense fallback={<p>loading data</p>}>
          {page === "days" ? <DataViewer /> : <Settings />}
        </Suspense>
      </QueryClientProvider>
    </>
  );
};

export default App;
