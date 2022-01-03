import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { User, Roles } from "../../types/user.interface";
import classes from "./user-component.module.scss";
import NativeSelect from "@mui/material/NativeSelect";
import { UsersContext } from "../../UsersContext";
const rolesRecord: Record<number, string> = {
  0: "",
  1: "Admin",
  2: "Moderator",
  3: "Editor",
  4: "Viewer",
};

interface UsersTableProps {
  index: number;
}

const UsersTable: React.VFC<UsersTableProps> = ({ index }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { stateUsers, setStateUsers } = useContext(UsersContext);

  useEffect(() => {
    const getRole = async (role: string) => {
      const res = await axios.get(
        `http://localhost:5000/api/users/roles/${role}`
      );
      setUsers(res.data.users);
    };
    getRole(rolesRecord[index]);
  }, [index]);

  interface ShowRolesOptionsProps {
    currentUser: User;
  }

  const ShowRolesOptions: React.VFC<ShowRolesOptionsProps> = ({
    currentUser,
  }) =>
    useMemo(() => {
      const wantedRole = rolesRecord[index];

      const rolesArray = [];
      for (let i in rolesRecord) {
        if (rolesRecord[i] !== "") {
          rolesArray.push(
            <option
              key={i}
              value={i}
              selected={rolesRecord[i] === currentUser.role}
            >
              {rolesRecord[i]}
            </option>
          );
        }
      }

      return <>{rolesArray}</>;
    }, []);

  const _roles: string[] = [];
  for (const i in rolesRecord) {
    _roles.push(rolesRecord[i]);
  }

  useEffect(() => {}, [users]);

  function handleOnChange(event: any, _id: string): void {
    const u = users.find((user) => user._id === _id);
    if (u) {
      u.role = rolesRecord[+event.target.value] as Roles;
      setUsers([...users.filter((user) => user._id !== _id), u]);
      setStateUsers([...users]);
    }
  }

  return (
    <div className={classes.allUsers}>
      {users.map((user, key) => {
        return (
          <div className={classes.showUser} key={key}>
            <h1>{user.fullName}</h1>
            <h1>{user.email}</h1>

            <NativeSelect
              style={{
                color: "#787878",
                backgroundColor: "#FFFFFF",
                paddingLeft: 5,
                width: 130,
              }}
              onChange={(event) => handleOnChange(event, user._id)}
            >
              <ShowRolesOptions currentUser={user} />
            </NativeSelect>
          </div>
        );
      })}
    </div>
  );
};

export default UsersTable;
