// ProductCardSkeleton.jsx

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-[234.006px] border bg-gray-300 rounded-xl shadow-lg animate-pulse">
      <div className="aspect-w-3 aspect-h-4">
        {/* Placeholder for image */}
        <div className="w-full h-full bg-gray-400 rounded-t-lg"></div>
      </div>
      <div className="p-2">
        <div className="h-4 bg-gray-400 mb-2 rounded"></div>
        <div className="h-6 bg-gray-400 font-bold mb-2 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
