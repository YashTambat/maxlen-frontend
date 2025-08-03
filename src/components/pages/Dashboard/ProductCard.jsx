import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "./Dashboard.css"

const ProductCard = ({ totalProducts }) => {
  return (
    <Card
      className="hover-card"
      sx={{
        flex: 1,
        height: 200,
        background:
          "linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)",
      }}
    >
        <CardContent>
        <CreditCardIcon sx={{ color: "white" }} />
        <Typography
          variant="h5"
          sx={{ color: "white", mt: 1, textAlign: "center" }}
        >
          Products 
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            mt: 1,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, // Responsive font sizes
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {totalProducts}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default ProductCard;
