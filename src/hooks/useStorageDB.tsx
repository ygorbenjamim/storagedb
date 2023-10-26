import {
  checkDuplicatesIDs,
  isValidTableName,
  parseCaptalize,
  validateIfTheTableExists,
} from "../utils";
import { checkIdInList } from "../utils/checkIdInList";

const useStorageDB = (storage: any) => {
  /**
   * Criar tabela
   * @param tableName Nome da tabela
   * @example
   *  create('user');
   */
  const create = (tableName: string) => {
    if (!isValidTableName(tableName))
      throw new Error("Nome inválido para a tabela");

    storage.setItem(`@table${parseCaptalize(tableName)}`, "[]");
  };

  /**
   * Inserir dados na tabela informada
   * @param tableName Nome da tabela
   * @param values Valor do objeto a ser inserido
   * @returns values {id: '1', name: 'Alan'}
   * @example
   *  insert<IUser>('user', {id: '1', name: 'Alan'});
   */
  const insert = <T extends {}>(tableName: string, values: T) => {
    const tableData = validateIfTheTableExists(tableName);

    tableData.push(values);

    if (checkDuplicatesIDs(tableData)) throw new Error("Id duplicado");

    storage.setItem(
      `@table${parseCaptalize(tableName)}`,
      JSON.stringify(tableData)
    );

    return values;
  };

  /**
   * Buscar dados na tabela informada
   * @param tableName Nome da tabela
   * @param params Filtro para listagem
   * @returns T[] Lista de linhas da tabela
   * @example
   *  select('user');
   * @example
   *  select('user', {name: 'Alan'});
   */
  const select = <T extends {}>(tableName: string, params?: Partial<T>) => {
    const tableData: T[] = validateIfTheTableExists(tableName);

    if (params) {
      return tableData.filter((item: T) => {
        for (let key in params) {
          if (params[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });
    }

    return tableData;
  };

  /**
   * Atualizar dados na tabela informada
   * @param tableName Nome da tabela
   * @param id Id do registro
   * @param values Objeto atualizado
   * @returns T {id: '1', name: 'João'}
   * @example
   *  update('user', '1', {id: '1', name: 'João'});
   */
  const update = <T extends {}>(
    tableName: string,
    id: string | number,
    values: T
  ) => {
    const tableData = validateIfTheTableExists(tableName);
    checkIdInList(id, tableName);

    const tableUpdated: T[] = tableData.map((item: any) => {
      if (item.id == id) {
        return values;
      }
      return item;
    });

    if (checkDuplicatesIDs(tableUpdated)) throw new Error("Id duplicado");

    storage.setItem(
      `@table${parseCaptalize(tableName)}`,
      JSON.stringify(tableUpdated)
    );

    return values;
  };

  /**
   * Deletar registro da tabela
   * @param tableName Nome da tabela
   * @param id Id do registro
   * @example
   *  del('user', '1');
   */
  const del = (tableName: string, id: string | number) => {
    const tableData = validateIfTheTableExists(tableName);

    checkIdInList(id, tableName);

    const tableDataUpdated = tableData.filter((item: any) => item.id !== id);

    storage.setItem(
      `@table${parseCaptalize(tableName)}`,
      JSON.stringify(tableDataUpdated)
    );
  };

  return { create, insert, select, update, del };
};

export default useStorageDB;
