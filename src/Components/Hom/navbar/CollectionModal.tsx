import React from 'react'

const CollectionModal = () => {
  return (
    <div
    className="fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-gray-100 z-40"
  >
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">مجموعه کتابخانه دیجیتالی</h2>
      <p>در این بخش می‌توانید مجموعه‌های مختلف کتاب‌ها و منابع ما را مشاهده کنید.</p>
      {/* محتوای مودال */}
    </div>
  </div>
  )
}

export default CollectionModal
