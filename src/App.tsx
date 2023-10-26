import { useEffect, useState } from "react";
import "./App.css";
import useStorageDB from "./hooks/useStorageDB";
import { IUser } from "./interfaces/IUser";

function App() {
  const { create, insert, select, update, del } = useStorageDB(localStorage);

  const user1: IUser = { id: "1", name: "Ygor", email: "ygor@email.com" };
  const user2: IUser = { id: "2", name: "Pedro", email: "pedro@email.com" };
  const user3: IUser = { id: "3", name: "Felipe", email: "felipe@email.com" };

  useEffect(() => {
    try {
      create("user");
      insert("user", user1);
      insert("user", user2);
      insert("user", user3);
      del("user", "2");
      update<IUser>("user", "1", {
        ...user1,
        email: "ygorbenjamim@email.com",
      });
      console.log("Select: ", select("user"));
    } catch (e) {
      console.log((e as Error).message);
    }
  }, []);

  return (
    <div>
      <h1>Criando tabela</h1>
    </div>
  );
}

export default App;
