import { useContext, useState } from "react";
import classes from "./admin-page.module.scss";

import UsersTable from "../../components/UsersComponent/UsersComponent";
import Header from "../../components/Header/Header";
import { UserContext } from "../../UserContext";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";

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
                className={classNames(classes.roleOptions, {
                  [classes.selected]: currentTab === 0,
                })}
                onClick={() => {
                  handleTabChange(0);
                  // changeStyle();
                }}
              >
                All Users
              </button>

              <button
                className={classNames(classes.roleOptions, {
                  [classes.selected]: currentTab === 1,
                })}
                onClick={() => {
                  handleTabChange(1);
                  // changeStyle();
                }}
              >
                Admins
              </button>
              <button
                className={classNames(classes.roleOptions, {
                  [classes.selected]: currentTab === 2,
                })}
                onClick={() => {
                  handleTabChange(2);
                  // changeStyle();
                }}
              >
                Moderators
              </button>
              <button
                className={classNames(classes.roleOptions, {
                  [classes.selected]: currentTab === 3,
                })}
                onClick={() => {
                  handleTabChange(3);
                  // changeStyle();
                }}
              >
                Editors
              </button>
              <button
                className={classNames(classes.roleOptions, {
                  [classes.selected]: currentTab === 4,
                })}
                onClick={() => {
                  handleTabChange(4);
                  // changeStyle();
                }}
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
