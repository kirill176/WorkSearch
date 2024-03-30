import { FC, useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import LoginForm from "../../components/LoginForm/LoginForm";
import { FormValues } from "../../types/types";

const Profile: FC = () => {
  const [user, setUser] = useState<FormValues | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    console.log(data);
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const deleteProfile = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <MainContainer>
      {user ? (
        <div className="max-w-3xl m-auto">
          <h2 className="text-2xl">
            Профіль користувача {user.lastName} {user.firstName}
          </h2>
          <p className="py-3 text-lg">Email {user.email}</p>
          <p className="py-3 text-lg">Посада: {user.desiredPosition}</p>
          <p className="py-3 text-lg">
            Досвід на посаді (років): {user.experience}
          </p>
          <p className="py-3 text-lg">Інформація про мене:</p>
          <p className="p-3 rounded-lg border border-solid border-black min-h-20">
            {user.about}
          </p>
          <button
            onClick={deleteProfile}
            className="float-right border border-black border-solid w-48 py-1 rounded-lg hover:bg-fuchsia-200 transition-all mt-3"
          >
            Видалити профіль
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center py-5 font-medium text-2xl">Реєстрація</h1>
          <LoginForm />
        </div>
      )}
    </MainContainer>
  );
};

export default Profile;
