import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '15px',
  backgroundColor:"white",
  color:"black"
}));

export const StyledTableRow = styled(TableRow)(({ theme, iseven }) => ({
  '&:hover': {
    backgroundColor: 'lavender', // Hover color for table cells
  },
}));
