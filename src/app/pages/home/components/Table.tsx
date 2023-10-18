// Table.tsx
import React from "react";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  width: 800px;
  heigth: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

// Props untuk Tabel
interface TableProps {
  headers: string[];
  data: any[];
}


const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <CardContainer>
      <CardTitle>Contact List</CardTitle>
      <TableContainer>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex}>{row[header]}</TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </CardContainer>
  );
};

export default Table;
