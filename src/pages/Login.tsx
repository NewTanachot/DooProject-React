import React, { useState, FC } from "react";

interface Props {
  onLogin: (username: string, password: string) => void;
}

const Login: FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(username, password);
  };

  return (
    <div className="flex w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center w-96 md:w-1/3 bg-white p-4 mt-8 rounded-lg shadow-md"
      >
        <div className="w-full mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
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
        <button
          type="submit"
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
