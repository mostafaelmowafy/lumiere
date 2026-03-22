import { FaOpencart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // تأكد من استيراد Link إذا كنت ستنتقل لصفحة العربة

function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-gray-800 border-b border-gray-100">
      {/* اللوجو */}
      <Link
        to="/"
        className="font-bold text-2xl tracking-widest hover:text-brandPink transition-colors"
      >
        LUMIÈRE
      </Link>

      {/* زر العربة مع العداد الرقمي */}
      <Link to="/cart" className="relative">
        <div className="relative">
          <button className="flex items-center bg-brandPink text-white py-2 px-5 rounded-xl hover:bg-hoverBrandPink transition-all duration-300 shadow-sm active:scale-95 group">
            <span className="mr-2 text-xl group-hover:animate-bounce">
              <FaOpencart />
            </span>
            <span className="font-semibold">Cart</span>

            {/* العداد الرقمي: يظهر فقط إذا كان هناك منتجات */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Header;
