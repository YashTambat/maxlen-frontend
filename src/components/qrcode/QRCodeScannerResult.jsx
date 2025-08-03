// src/components/ProductDetailsFromQRCode.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config"

const ProductDetailsFromQRCode = () => {
  const [decryptedData, setDecryptedData] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract the `id` parameter from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchDecryptedData = async () => {
      try {
        // Step 1: Hit the first API to decrypt the QR code data
        const response = await axios.post(` ${BASE_URL}/public/p`, null, {
          params: { id },
        });

        const decrypted = response.data.decryptedData;
        setDecryptedData(decrypted);

        // Extract product ID (e.g., `173`) from the decrypted data
        const productId = decrypted.split(",")[0].split("-")[1];

        // Step 2: Fetch product details using the extracted ID
        const productResponse = await axios.get(
          `${BASE_URL}/public/modelgenerations/view/${productId}`
        );
        setProductDetails(productResponse.data.view);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDecryptedData();
    } else {
      setError("Invalid QR code. No ID found.");
      setLoading(false);
    }
  }, [id]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>Product Details</h1>

      {loading ? (
        <p style={{ textAlign: "center", color: "#555" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : (
        productDetails && (
          <div
            style={{
              maxWidth: "600px",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ color: "#333" }}>{productDetails.productName}</h2>
            {/*             <p> */}
            {/*               <strong>ID:</strong> {productDetails.id} */}
            {/*             </p> */}
            <p>
              <strong>Packing Type:</strong> {productDetails.productPackingType}
            </p>
            <p>
              <strong>Packing Material:</strong>{" "}
              {productDetails.productPackingMaterial}
            </p>
            <p>
              <strong>Weight:</strong> {productDetails.productWeight}g
            </p>
            <p>
              <strong>Package Weight:</strong>{" "}
              {productDetails.productPackageWeight}g
            </p>
            <p>
              <strong>Volume:</strong> {productDetails.productVolume}ml
            </p>
            <p>
              <strong>Description:</strong> {productDetails.productDescription}
            </p>

            {/*             {productDetails.fileModels && */}
            {/*               productDetails.fileModels.length > 0 && ( */}
            {/*                 <div style={{ marginTop: "20px" }}> */}
            {/*                   <h3>Images:</h3> */}
            {/*                   {productDetails.fileModels.map((file) => ( */}
            {/*                     <div key={file.id} style={{ marginBottom: "10px" }}> */}
            {/*                       <img */}
            {/*                         src={`http://localhost:8080/files/${file.compressName}`} */}
            {/*                         alt={file.name} */}
            {/*                         style={{ */}
            {/*                           maxWidth: "100%", */}
            {/*                           height: "auto", */}
            {/*                           borderRadius: "4px", */}
            {/*                         }} */}
            {/*                       /> */}
            {/*                       <p style={{ fontSize: "14px", color: "#555" }}> */}
            {/*                         {file.originalName} */}
            {/*                       </p> */}
            {/*                     </div> */}
            {/*                   ))} */}
            {/*                 </div> */}
            {/*               )} */}
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetailsFromQRCode;
