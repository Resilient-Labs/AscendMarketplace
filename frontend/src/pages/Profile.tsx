import { FC } from "react";
import ProfileSetupForm from "../components/ProfileSetupForm";
// import ProfilePage from "../components/Profile";

const Profile: FC = () => {
  return (
    <main>
      <h2>Profile Page</h2>
      <h2> Create Your Profile</h2>
      <ProfileSetupForm/>
      {/* <h2>Profile Details</h2>
      <ProfilePage/> */}
    </main>
  );
};

export default Profile;
