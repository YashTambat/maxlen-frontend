import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import QrCode2Icon from '@mui/icons-material/QrCode2'
import "./Dashboard.css"

const GenerateQRCodeCard = ({totalQRCode}) => {
    return(
        <Card
        className="hover-card"
         sx={{
           flex: 1,
           height: 200,
           background:
             "linear-gradient(158deg, rgba(53, 138, 148, 1) 0%, rgba(91, 180, 96, 1) 100%)",
         }}
       >
         <CardContent>
           <QrCode2Icon sx={{ color: "white" }} />
           <Typography
             gutterBottom
             variant="h5"
             sx={{ color: "white", mt: 1 ,textAlign: "center" }}
           >
            QR Code Generated 
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
             {totalQRCode}
           </Typography>
         </CardContent>
       </Card>
    )
}


export default GenerateQRCodeCard;