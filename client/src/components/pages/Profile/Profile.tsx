import "./Profile.scss";

import { Card, Typography } from "@mui/material";

import ModalsProfile from "../../organisms/ModalsProfile/ModalsProfile";
import { UserHook } from "../../../utils/customHooks";

function Profile() {
  const { loggedUser } = UserHook();
  const { username, email } = loggedUser;

  return (
    <main className="profile_component component">
      <section className="card_container">
        <Card elevation={1} className="profile_card">
          <div className="data_ container">
            <Typography color="text.secondary">Nombre de usuario:</Typography>
            <Typography>{username}</Typography>
          </div>
          <div className="data_container">
            <Typography color="text.secondary">Email:</Typography>
            <Typography>{email}</Typography>
          </div>

          <ModalsProfile />
        </Card>
      </section>
    </main>
  );
}

export default Profile;
