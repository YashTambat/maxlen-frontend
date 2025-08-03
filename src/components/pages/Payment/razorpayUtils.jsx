export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  export const openRazorpayPayment = async ({
    totalDeposit,
    onSuccess,
    onFailure,
  }) => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      console.error("Failed to load Razorpay script.");
      onFailure("Failed to load Razorpay. Please try again later.");
      return;
    }
  
    const options = {
      key: "rzp_test_N7tiLGlz3TicN0", // Replace with your Razorpay key
      amount: totalDeposit * 100, // Amount in paise
      currency: "INR",
      name: "Endlos-DDRS",
      description: "Transaction Details",
      handler: function (response) {
        console.log("Payment Success:", response);
        onSuccess(response);
      },
      prefill: {
        name: "Your User Name",
        email: "user@example.com",
        contact: "1234567890",
      },
      notes: {
        address: "User Address",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment cancelled by user.");
          onFailure("Payment cancelled by user.");
        },
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  