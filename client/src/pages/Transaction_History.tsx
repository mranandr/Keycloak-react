import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

interface Charge {
  id: string;
  amount: number;
  status: string;
  billing_details: {
    email: string;
    name?: string;
  };
  payment_method_details: {
    card: {
      last4: string;
      brand: string;
    };
  };
  created: number;
  receipt_url: string;
}

const ChargesTable: React.FC = () => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    axios
      .get("http://localhost:3000/payment-history") // adjust if needed
      .then((res) => {
        const data = res.data.data;
   
        setCharges(data);
      })
      .catch((err) => {
        console.error("Error fetching charges", err);
      });
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Stripe Charges
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell><b>Charge ID</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Card (Last 4)</b></TableCell>
            <TableCell><b>Card Brand</b></TableCell>
            <TableCell><b>Amount</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Receipt</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charges
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((charge) => (
              <TableRow key={charge.id}>
                <TableCell>{charge.id}</TableCell>
                <TableCell>{charge.billing_details?.email}</TableCell>
                <TableCell>
                  **** **** **** {charge.payment_method_details?.card?.last4}
                </TableCell>
                <TableCell>
                  {charge.payment_method_details?.card?.brand}
                </TableCell>
                <TableCell>${(charge.amount / 100).toFixed(2)}</TableCell>
                <TableCell>{charge.status}</TableCell>
                <TableCell>
                  {new Date(charge.created * 1000).toLocaleString()}
                </TableCell>
                <TableCell>
                  <a
                    href={charge.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={charges.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5,10, 25]}
      />
    </TableContainer>
  );
};

export default ChargesTable;
