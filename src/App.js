import { Provider } from "react-redux";
import GamificationPage from "./components/GamificationPage";
import { createAppStore } from "./store/store";

const store = createAppStore();

const App = () => {
  return (
    <Provider store={store}>
      <GamificationPage />
    </Provider>
  );
};

export default App;
