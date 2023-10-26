import { validateIfTheTableExists } from ".";

export function checkIdInList(id: string | number, tableName: string) {
  const tableData = validateIfTheTableExists(tableName);

  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i].id === id) {
      return true;
    }
  }

  throw new Error("ID não encontrado");
}
