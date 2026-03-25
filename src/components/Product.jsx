import { Link, useNavigate, useLocation, useParams } from "react-router-dom"; // تغيير Navigate لـ useNavigate
import { products } from "../Data";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

function Product() {
  const navigate = useNavigate(); // تعريف الـ navigate هنا
  const { name } = useParams();
  const location = useLocation();

  // 1. البحث عن المنتج أولاً
  const product =
    location.state?.product || products.find((p) => p.name === name);

  // 2. تعريف الـ States بقيم افتراضية لتجنب الانهيار
  const [selectedOffer, setSelectedOffer] = useState(
    product?.offers ? product.offers[0] : null,
  );
  const [packQuantity, setPackQuantity] = useState(1);

  // إذا لم يتم العثور على المنتج
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">لا يوجد تفاصيل لهذا المنتج</p>
      </div>
    );
  }

  const handleBuyNow = () => {
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

    // استخدام navigate (حروف صغيرة) كدالة
    navigate("/checkout", { state: { orderItems: [orderItem] } });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8 sm:py-12 sm:px-8">
        {/* صورة المنتج */}
        <div className="w-full md:w-1/2 bg-white rounded-3xl overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="p-2 flex flex-col gap-4 md:gap-6 w-full md:w-1/2 text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
            {product.name}
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* السعر والشحن */}
          <div className="flex items-center gap-3 my-2">
            <span className="text-3xl font-black text-brandPink">
              {selectedOffer.price * packQuantity} جنية
            </span>
            <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 animate-pulse">
              شحن مجاني ✨
            </span>
          </div>

          {/* العروض */}
          <div className="space-y-3 mt-4">
            <p className="text-sm font-bold text-gray-500">
              اختر العرض المناسب لك:
            </p>
            {product.offers.map((offer) => (
              <label
                key={offer.id}
                className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                  selectedOffer.id === offer.id
                    ? "border-brandPink bg-pink-50"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="product-offer"
                    checked={selectedOffer.id === offer.id}
                    onChange={() => setSelectedOffer(offer)}
                    className="w-5 h-5 accent-brandPink"
                  />
                  <span
                    className={`font-bold ${selectedOffer.id === offer.id ? "text-brandPink" : "text-gray-700"}`}
                  >
                    {offer.label}
                  </span>
                </div>
                <span className="font-black text-gray-800">
                  {offer.price} جنية
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-right">
              الكمية (Packs)
            </p>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-xl border border-gray-100">
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

          {/* أزرار الحركة */}
          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={handleBuyNow}
              className="w-full bg-brandPink hover:bg-black text-white font-bold py-4 rounded-xl mt-6 transition-all transform active:scale-95 shadow-lg"
            >
              اشتري الآن
            </button>

            <Link
              to="/"
              className="text-center text-gray-500 font-medium py-2 hover:text-black transition-colors"
            >
              العودة للرئيسية ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
