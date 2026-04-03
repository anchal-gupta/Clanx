import { Provider } from "react-redux";
import { useMemo } from "react";
import GamificationPage from "./components/GamificationPage";
import { createAppStore } from "./store/store";

const App = () => {
  const store = useMemo(() => createAppStore(), []);

  return (
    <Provider store={store}>
      <GamificationPage />
    </Provider>
  );
};

export default App;
