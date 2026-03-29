import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // التعديل هنا: إضافة كود الدولة (2) وحذف الصفر الأول من الرقم
  const phoneNumber = "201068678345";
  const message = "أهلاً Lumière! لدي استفسار بخصوص منتجاتكم.";

  // استخدام api.whatsapp.com أحياناً بيكون "أضمن" في التعامل مع المتصفحات
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      // رفعنا الـ bottom شوية عشان ميخبطش في "شريط الشراء الثابت" اللي عملناه
      className="fixed bottom-24 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group animate-pulse hover:animate-none"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute right-16 bg-white text-gray-800 text-sm px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100 font-cairo">
        تحدث معنا الآن!
      </span>

      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
