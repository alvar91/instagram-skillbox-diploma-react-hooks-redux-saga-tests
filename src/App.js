import React from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import FeedPage from "./pages/feed";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/not-found";
import PostModal from "./components/post/PostModal";

function App() {
  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    if (history.action !== "POP" && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route exact path="/user/:username" component={ProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/:postId" component={PostModal} />}
    </>
  );
}

export default App;
