import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="bg-bannerColor w-full" dir="rtl">
      {" "}
      {/* أضفنا dir="rtl" لضبط الاتجاه */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden xl:px-14">
        {/* قسم النصوص */}
        <div className="p-8 flex flex-col items-start gap-4 md:gap-6 w-full md:w-2/3 text-right">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black leading-tight">
            شعر أقوى يبدأ <br className="hidden md:block" /> من الجذور
          </h1>

          <p className="text-base md:text-lg mb-6 text-gray-600 w-fit py-2">
            سيروم إنبات الشعر ومكافحة التساقط
          </p>

          <Link
            to={"/product/Hair Growth Serum"}
            className="bg-white text-pink-500 font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition w-auto"
          >
            عرض التفاصيل
          </Link>
        </div>

        {/* قسم الصورة */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <img
            src="/hair-serum.png"
            alt="Lumiere Hair Serum"
            className="h-64 md:h-96 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
