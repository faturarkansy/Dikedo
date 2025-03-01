const ProductCard = ({ indexCard, product, visibleContent, toggleContent }) => {
  return (
    <div
      // key={index}
      className="bg-white dark:bg-gray-700 rounded-lg shadow-lg flex flex-col h-[320px] w-full relative"
    >
      <div className="p-4 space-y-2 flex flex-col">
        <div className="rounded-lg relative">
          {/* Tampilkan gambar jika visibleContent[index] false, dan deskripsi jika true */}
          {!visibleContent[indexCard] ? (
            <>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-48 object-cover"
              />
              <div className="pl-1 pb-2 font-bold text-black text-xl">
                {product.name} <br />
                <span className="font-bold text-gray-600 text-base">
                  Rp. {product.price}
                </span>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-sm dark:text-gray-400">
              <div className="font-bold text-lg mb-2">Deskripsi</div>
              {product.description}
            </div>
          )}
          <img
            src="/images/info.svg"
            alt="Info"
            className="w-4 h-4 absolute top-[-2px] right-[-2px] cursor-pointer"
            onClick={() => toggleContent(indexCard)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
