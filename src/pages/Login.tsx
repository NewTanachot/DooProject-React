import React, { useState, FC } from "react";

interface Props {
  onLogin: (email: string, password: string) => void;
}

const Login: FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(email, password);
    
    const BodyData = {
      email: email,
      password: password
    }
    
    const Response = await fetch("https://localhost:7260/api/Auth/Login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(BodyData),
    });

    const Data = await Response.json();
    
    // Save UserId and another credential to Localstorage
    // console.log(Data);
    localStorage.setItem("JWT", JSON.stringify(Data));

    var a = localStorage.getItem("JWT");

    if (a != null){
      var obj = JSON.parse(a);
    }

    console.log(obj);
  };

  return (
    <div className="flex w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center w-96 md:w-1/3 bg-white p-4 mt-8 rounded-lg shadow-md"
      >
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
