# StorageDB

O StorageDB transforma o localstorage ou o asyncStorage em um banco de dados não relacional. Esse conjunto de funcionalidades permite o manuseio de dados de forma local para executar consultas, inserções, atualização, etc.

A ferramente foi desenvolvida para realizar operações simple. É muito importante se atentar as interfaces utilizadas para garantir que os formatos dos dados sejam sempre os mesmos para cada tabela.

## Uso

### Create e Insert

Para criar uma tabela local, basta chamar a função `create` e passar o nome da tabela em formato de `string`. Após isso, já é possível inserir novos dados.

A função `insert` recebe o nome da tabela e um objeto. Esse objeto pode ser tipado antes ou no momento do uso, por exemplo: `insert<IUser>('user', user)`. Sempre opte por utilizar as interfaces para garantir um bom funcionamento da ferramente.

```js
const { create, clone, insert, select, update, del } =
  useStorageDB(localStorage);

const user1: IUser = { id: "1", name: "Ygor", email: "ygor@email.com" };
const user2: IUser = { id: "2", name: "Pedro", email: "pedro@email.com" };
const user3: IUser = { id: "3", name: "Felipe", email: "felipe@email.com" };

try {
    create("user");
    insert("user", user1);
    insert("user", user2);
    insert("user", user3);
} catch (e) {
    console.log((e as Error).message);
}
```

### Select

A função select busca os dados de uma tebela local e retorna o objeto tipado por sua preferência, por exemplo `select<IUser>('user')`.

#### All

```js
console.log("Select: ", select("user"));
```

#### Params

Para adicionar filtros, utilize o segundo argumento da função para enviar um objeto params. Esse objeto é um `Partial<T>`, ou seja, ele reconhece todos os atribultos do seu objeto caso pessa a interface de referência, por exemplo: `select<IUser>('user', { name: 'Jhon' })`.

```js
select("user", { name: "Jhon" });
```

### Update

Para atualizar um registro, basta informar o nome da tabela em formato de `string`, o valor do ID do registro e o novo objeto. Sempre opte por utilizar a interface do objeto para garantir que os dados possuem o mesmo formato.

```js
try {
    update<IUser>("user", "1", {
        ...user1,
        email: "ygorbenjamim@email.com",
      });
} catch (e) {
    console.log((e as Error).message);
}
```

### Delete

Para deletar um registro, basta informar o nome da tabela em formato de `string` e o valor do ID do registro.

```js
try {
    del("user", "2");
} catch (e) {
    console.log((e as Error).message);
}
```

### Clone

Para clonar uma tabela, é necessário informar um nome para a tabela local e enviar a lista de dados.

```js
fetch("https://dummyjson.com/products?limit=100")
  .then((res) => res.json())
  .then((json) => clone("products", json.products));
```
