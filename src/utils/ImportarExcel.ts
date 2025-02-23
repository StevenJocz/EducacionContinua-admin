import { ConvenioRegistrosModel } from '@/components/admin/convenios/addConvenio/AddConvenio.model';
import * as XLSX from 'xlsx';

export const importarExcel = <T,>(
    event: React.ChangeEvent<HTMLInputElement>,
    mapData: (row: any, index: number) => T,
    setData: React.Dispatch<React.SetStateAction<T[]>>
) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0]; // Tomar la primera hoja
        const sheet = workbook.Sheets[sheetName];

        const parsedData: T[] = XLSX.utils.sheet_to_json(sheet).map(mapData);

        setData(parsedData);
    };

    reader.readAsArrayBuffer(file);
};


export const mapConvenioRegistros = (row: any, index: number): ConvenioRegistrosModel => ({
    id: index + 1,
    nombres: row["Nombres"] || "",
    tipoDocumento: row["Tipo Documento"] || "",
    documento: row["Documento"] || ""
  });
