import { Link, useLocation } from "react-router-dom";
import { MdCheckCircle, MdHome } from "react-icons/md";

function SuccessPage() {
  const location = useLocation();
  const { product, selectedOffer, packQuantity } = location.state || {};

  // إذا حاول شخص دخول الصفحة مباشرة بدون أوردر
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-cairo">
        <p className="mb-4 text-xl">عذراً، لا يوجد طلب لعرضه.</p>
        <Link to="/" className="bg-slate-800 text-white px-6 py-2 rounded-xl">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-cairo"
      dir="rtl"
    >
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl p-8 text-center border border-green-50">
        <div className="flex justify-center mb-6">
          <MdCheckCircle className="text-green-500 text-8xl animate-bounce" />
        </div>

        <h1 className="text-3xl font-black text-slate-800 mb-4">
          تم تسجيل طلبك بنجاح!
        </h1>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mb-6 text-right">
          <p className="text-blue-900 font-bold leading-relaxed">
            سيتم إرسال الطلب إليك خلال{" "}
            <span className="text-red-600 underline">2 إلى 5 أيام</span> عمل بحد
            أقصى.
            <br />
            ⚠️ برجاء الرد على أي أرقام غريبة، حيث سيكون مندوب الشحن بانتظار
            تواصلك لتسليم المنتج.
          </p>
        </div>

        {/* تفاصيل المنتج */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex items-center gap-4 border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-xl shadow-sm"
          />
          <div className="text-right">
            <h3 className="font-bold text-slate-700">{product.name}</h3>
            <p className="text-sm text-gray-500">{selectedOffer.label}</p>
            <p className="text-sm font-bold text-slate-800">
              الكمية: {packQuantity} مجموعات
            </p>
          </div>
        </div>

        {/* زر العودة للرئيسية */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 hover:bg-black text-white rounded-2xl font-black text-xl transition-all shadow-lg active:scale-95"
        >
          <MdHome className="text-2xl" />
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
