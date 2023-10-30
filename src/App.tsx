import { useEffect, useState } from "react";
import "./App.css";
import useStorageDB from "./hooks/useStorageDB";
import { IUser } from "./interfaces/IUser";

function App() {
  const [data, setData] = useState();
  const { create, clone, insert, select, update, del } =
    useStorageDB(localStorage);

  const user1: IUser = { id: "1", name: "Ygor", email: "ygor@email.com" };
  const user2: IUser = { id: "2", name: "Pedro", email: "pedro@email.com" };
  const user3: IUser = { id: "3", name: "Felipe", email: "felipe@email.com" };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((json) => setData(json.products));
  }, []);

  /* useEffect(() => {
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
  }, []); */

  const handleClone = () => {
    if (!data) return;
    clone("produto", data);
  };

  const handleSelect = () => {
    try {
      console.log(select("produto"));
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <div>
      <h1>Empty</h1>
      <button onClick={handleClone}>Clonar</button>
      <button>Sincronizar</button>
      <button onClick={handleSelect}>Buscar dados</button>
    </div>
  );
}

export default App;
