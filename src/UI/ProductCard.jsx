import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // اختيار العرض الأول كافتراضي
  const [selectedOffer, setSelectedOffer] = useState(product.offers[0]);
  // عدد المجموعات (Packs) المطلوبة من العرض المختار
  const [packQuantity, setPackQuantity] = useState(1);

  const handleBuyNow = () => {
    // نرسل البيانات محسوبة بدقة لصفحة الشيك أوت
    const orderItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      offerLabel: selectedOffer.label,
      singlePackPrice: selectedOffer.price,
      packQuantity: packQuantity,
      totalPrice: selectedOffer.price * packQuantity,
      totalPieces: Number(selectedOffer.quantity) * Number(packQuantity),
    };

    navigate("/checkout", { state: { orderItems: [orderItem] } });
  };

  return (
    <div
      className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow text-right"
      dir="rtl"
    >
      {/* الصورة */}
      <Link
        to={`/product/${product.name}`}
        state={{ product }}
        className="block overflow-hidden group"
      >
        <img
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="font-bold text-2xl text-gray-800 mb-4 text-center">
          {product.name}
        </h3>

        {/* السعر الحالي + شحن مجاني */}
        <div className="flex items-center gap-3 my-3">
          <span className="text-2xl font-black text-brandPink">
            {selectedOffer.price * packQuantity} جنية
          </span>
          <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 animate-pulse">
            شحن مجاني ✨
          </span>
        </div>

        {/* قائمة العروض الديناميكية */}
        <div className="space-y-2 mt-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
            أختر العرض المناسب لك
          </p>
          {product.offers.map((offer) => (
            <label
              key={offer.id}
              className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-all ${
                selectedOffer.id === offer.id
                  ? "border-brandPink bg-pink-50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name={`offer-${product.id}`}
                  checked={selectedOffer.id === offer.id}
                  onChange={() => setSelectedOffer(offer)}
                  className="w-4 h-4 accent-brandPink"
                />
                <span
                  className={`ml-3 text-sm font-bold ${selectedOffer.id === offer.id ? "text-brandPink" : "text-gray-600"}`}
                >
                  {offer.label}
                </span>
              </div>
              <span className="font-bold text-gray-700">
                {offer.price} جنية
              </span>
            </label>
          ))}
        </div>

        {/* عداد عدد المجموعات (Packs) */}
        <div className="mt-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-right">
            الكمية (Packs)
          </p>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-100">
            <button
              onClick={() => setPackQuantity(packQuantity + 1)}
              className="w-10 h-10 bg-white border rounded-lg font-bold flex items-center justify-center hover:bg-gray-100 shadow-sm"
            >
              +
            </button>
            <span className="font-black text-lg text-gray-800">
              {packQuantity}
            </span>
            <button
              onClick={() => setPackQuantity(Math.max(1, packQuantity - 1))}
              className="w-10 h-10 bg-white border rounded-lg font-bold flex items-center justify-center hover:bg-gray-100 shadow-sm"
            >
              -
            </button>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="w-full bg-brandPink hover:bg-black text-white font-bold py-4 rounded-xl mt-6 transition-all transform active:scale-95 shadow-lg"
        >
          اشتري الآن
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
