import { parseCaptalize } from ".";

export function validateIfTheTableExists(tableName: string) {
  const tableData = localStorage.getItem(`@table${parseCaptalize(tableName)}`);
  if (!tableData) throw new Error("A tabela não existe");
  return JSON.parse(tableData);
}
