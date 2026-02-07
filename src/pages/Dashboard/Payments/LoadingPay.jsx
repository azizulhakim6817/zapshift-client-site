const LoadingPay = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-6"></div>

      {/* Text */}
      <h2 className="text-xl font-semibold text-gray-700">
        Processing your payment...
      </h2>
      <p className="text-gray-500 mt-2 text-sm">
        Please wait, do not refresh the page
      </p>
    </div>
  );
};

export default LoadingPay;
