import { useState, useContext, useEffect } from "react";
import { ActionContext } from "../context/action";
import { newUser } from "../types/context/Action.context";
import { Link } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useContext(ActionContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [formValid, setFormValid] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const clearInput = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleSubmit = () => {
    const registered: newUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    handleRegister(registered);

    clearInput();
  };

  useEffect(() => {
    const checkData =
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0;
    setFormValid(checkData);
  }, [firstName, lastName, email, password]);
  return (
    <div className="flex flex-col w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center w-96 md:w-1/3 bg-white p-4 mt-8 rounded-lg shadow-md"
      >
        <section className="w-full lg:flex">
          <div className="w-full mb-4 lg:mr-2">
            <label htmlFor="first name" className="block font-bold mb-2">
              ชื่อ:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-full mb-4 lg:ml-2">
            <label htmlFor="last name" className="block font-bold mb-2">
              นามสกุล:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              className="input input-bordered w-full"
            />
          </div>
        </section>
        <section className="w-full">
          <div className="w-full mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full"
            />
          </div>
        </section>
        <button
          type="submit"
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
          disabled={!formValid}
        >
          Signup
        </button>
      </form>
      <section className="flex justify-center items-center">
        <p className="font-semibold">มีบัญชีอยู่แล้ว </p>
        <Link className="btn btn-link" to="/">
          Login
        </Link>
      </section>
    </div>
  );
};

export default Register;
