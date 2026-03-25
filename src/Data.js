export const products = [
  {
    id: 1,
    name: "Hair Growth Serum",
    description:
      "يساعد على إنبات الشعر وتقوية البصيلات من الجذور. غني بمزيج من الزيوت الطبيعية التي تعيد الحيوية والانتعاش لفروة رأسك.",
    image: "/hair-serum.webp",
    // هنا يمكنك إضافة أي عدد من العروض وسوف تظهر تلقائياً في الكارد
    offers: [
      { id: "1pc", label: "واحد قطعة", quantity: 1, price: 390 },
      {
        id: "3pc",
        label: "3 قطع (الأكثر أختياراً) 🔥",
        quantity: 3,
        price: 780,
      },
    ],
  },
];
