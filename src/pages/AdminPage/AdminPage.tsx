import { useContext, useState } from "react";
import classes from "./admin-page.module.scss";

import UsersTable from "../../components/UsersComponent/UsersComponent";
import Header from "../../components/Header/Header";
import { UserContext } from "../../UserContext";
import Footer from "../../components/Footer/Footer";

const AdminPage = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  setLoggedInUser(loggedInUser);

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className={classes.wholePage}>
      <Header />
      <div className={classes.main}>
        <div className={classes.webpage}>
          <div className={classes.navigation}>
            <div className={classes.links}>
              <button
                className={classes.allUsers}
                onClick={() => handleTabChange(0)}
              >
                All Users
              </button>
              <button
                className={classes.admins}
                onClick={() => handleTabChange(1)}
              >
                Admins
              </button>
              <button
                className={classes.moderators}
                onClick={() => handleTabChange(2)}
              >
                Moderators
              </button>
              <button
                className={classes.editors}
                onClick={() => handleTabChange(3)}
              >
                Editors
              </button>
              <button
                className={classes.viewers}
                onClick={() => handleTabChange(4)}
              >
                Viewers
              </button>
            </div>
          </div>

          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <UsersTable index={currentTab} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
