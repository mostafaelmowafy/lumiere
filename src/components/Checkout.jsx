import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const [showInstaModal, setShowInstaModal] = useState(false);

  // const instapayNumber = "010XXXXXXXX";

  // استقبال المنتجات سواء من السلة أو من "شراء الآن"
  const orderItems = location.state?.orderItems || [];

  // حساب الإجمالي (الشحن مجاني 0)
  const total = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return toast.error("No items selected!");

    setLoading(true);

    const formData = new FormData(e.target);
    const paymentMethod = formData.get("payment");

    const orderData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      payment: paymentMethod,
      products: orderItems
        .map(
          (item) => `${item.name} (${item.offerLabel}) x${item.packQuantity}`,
        )
        .join(", "),
      total: `${total} جنية`,
      shipping: "Free Shipping",
    };

    try {
      // رابط الـ Script الخاص بجوجل شيت
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbzGfC1kmGwVb0t5ZP5BDkexBMiyKbSQDV58sgFDjC67AkUZCVm2c5IpukLerQfoh2Opdg/exec";

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(orderData),
      });

      toast.success("Order Placed! سنقوم بالتواصل معك قريباً", {
        duration: 5000,
      });
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto p-4 lg:p-10 text-right min-h-screen"
      dir="rtl"
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-3">تفاصيل الشحن</h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right"
            dir="rtl"
          >
            <input
              name="name"
              type="text"
              placeholder="الاسم بالكامل"
              className="md:col-span-2 p-4 border rounded-xl outline-brandPink"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="رقم الموبايل"
              className="p-4 border rounded-xl outline-brandPink text-right"
              required
            />
            <input
              name="city"
              type="text"
              placeholder="المحافظة"
              className="p-4 border rounded-xl outline-brandPink"
              required
            />
            <input
              name="address"
              type="text"
              placeholder="العنوان بالتفصيل"
              className="md:col-span-2 p-4 border rounded-xl outline-brandPink"
              required
            />
          </div>

          <h2 className="text-2xl font-bold border-b pb-3 pt-6">طريقة الدفع</h2>
          <div className="space-y-3">
            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={true}
                className="accent-brandPink w-5 h-5"
              />
              <span className="ml-3 font-bold">الدفع عند الاستلام</span>
            </label>
            {/* <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="InstaPay"
                className="accent-brandPink w-5 h-5"
              />
              <span className="ml-3 font-bold">InstaPay (تحويل بنكي)</span>
            </label> */}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brandPink text-white rounded-2xl font-black text-xl shadow-xl hover:bg-black transition-all"
          >
            {loading ? "جاري الإرسال..." : "تأكيد الطلب الآن"}
          </button>
        </div>

        <div className="bg-gray-50 p-8 rounded-3xl h-fit border border-gray-100">
          <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
          <div className="space-y-4">
            {orderItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start border-b pb-4"
              >
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-brandPink font-medium">
                    x {item.packQuantity} {item.offerLabel}
                  </p>
                  <p className="text-[10px] text-gray-400 italic">
                    مجموع القطع: {item.totalPieces} قطعة
                  </p>
                </div>
                <p className="font-bold">{item.totalPrice} جنية</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-gray-500 font-medium">
              <span>الشحن</span>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs">
                شحن مجاني ✨
              </span>
            </div>
            <div className="flex justify-between text-2xl font-black pt-4 border-t border-dashed">
              <span>المجموع</span>
              <span>{total} جنية</span>
            </div>
          </div>
        </div>
      </form>

      {/* المودال الخاص بانستا باي يوضع هنا كما هو في كودك السابق */}
      {/* {showInstaModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-brandPink">
              InstaPay Payment
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              برجاء تحويل مبلغ <strong>{total} جنية</strong> إلى الرقم التالي:
            </p>
            <div className="bg-gray-100 p-4 rounded-xl font-mono font-bold text-xl mb-6 tracking-widest">
              {instapayNumber}
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-brandPink text-white py-3 rounded-xl font-bold"
            >
              تم التحويل، العودة للرئيسية
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default CheckoutPage;
