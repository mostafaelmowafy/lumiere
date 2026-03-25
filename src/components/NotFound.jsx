import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
      dir="rtl"
    >
      {/* أيقونة أو رقم كبير تعبيري */}
      <h1 className="text-9xl font-black text-gray-200 tracking-widest">404</h1>

      <div className="bg-brandPink/10 px-4 py-1 rounded-full text-brandPink font-bold text-sm mb-4">
        خطأ في العنوان
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        عذراً، هذه الصفحة غير موجودة!
      </h2>

      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        يبدو أنك سلكت طريقاً خاطئاً، لا تقلق.. جميع منتجاتنا بانتظارك في الصفحة
        الرئيسية لتتألقي من جديد.
      </p>

      <Link
        to="/"
        className="bg-brandPink hover:bg-black text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
      >
        <span>العودة للرئيسية</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}

export default NotFound;
