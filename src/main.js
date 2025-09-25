document.addEventListener('DOMContentLoaded', () => {

    const state = {
        lang: 'ar', 
        currency: 'syp',
        theme: localStorage.getItem('theme') || 'light',
        currentPage: 'perfumes', 
        activeFilters: [], 
        sortBy: 'bestselling',
        cart: JSON.parse(localStorage.getItem('cart')) || [], 
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        reviews: JSON.parse(localStorage.getItem('reviews')) || {},
        // ===================================================================================
        // --- قسم تعديل سعر الصرف ---
        // ===================================================================================
        exchangeRate: 12000,
        productDetailId: null, 
        maxPriceFilter: null,
    };
    let slideInterval;

    function defineProducts() {
        // ===================================================================================
        // --- قسم تعديل المنتجات ---
        // أضف حقلاً جديداً 'designer_ar' و 'designer_en' لإظهار اسم المصمم
        // ===================================================================================
        const allProducts = [
            // --- عطور رجالية ---
            { id: 1, category: 'perfumes', name_ar: ' سوفاج', designer_ar: 'ديور', name_en: 'Sauvage', designer_en: 'Dior', price_usd: 150, image: 'https://i.pinimg.com/736x/8b/df/b2/8bdfb223a2b71aeb773d449b85f6346d.jpg', tags: ['men', 'summer', 'winter'], rating: 5, reviews: 255, desc_ar: 'عطر منعش وقوي مستوحى من المساحات المفتوحة الشاسعة. يجمع بين انتعاش برغموت كالابريا ودفء الفلفل والعنبر الخشبي.', desc_en: 'A fresh and powerful fragrance inspired by wide-open spaces. It combines the freshness of Calabrian bergamot with the warmth of pepper and woody amber.', badge: 'bestselling' },
            { id: 4, category: 'perfumes', name_ar: 'أفينتوس', designer_ar: 'كريد', name_en: 'Aventus', designer_en: 'Creed', price_usd: 350, image: 'https://i.pinimg.com/736x/6f/c6/dc/6fc6dc740f004ab8448fc3ed41e9f143.jpg', tags: ['men', 'summer', 'pheromone'], rating: 5, reviews: 420, desc_ar: 'عطر القوة والنجاح، مستوحى من حياة الإمبراطور نابليون. يبدأ بنفحات من الأناناس والبرغموت وينتهي بقاعدة من المسك والعنبر.', desc_en: 'The scent of power and success, inspired by the life of Emperor Napoleon. It opens with notes of pineapple and bergamot and finishes with a base of musk and amber.', badge: 'exclusive' },
            { id: 8, category: 'perfumes', name_ar: 'بلو دي شانيل', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/736x/52/91/56/52915651850f1a235147b3dd1180eb79.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 9, category: 'perfumes', name_ar: 'أكوادجيو بروفوندو', designer_ar: 'جورجيو أرماني ', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/736x/eb/c5/cd/ebc5cd7d00e47bf5d654ba1845e03155.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 10, category: 'perfumes', name_ar: 'أزارو كروم', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://res.cloudinary.com/azzaro-parfums/image/upload/c_fill,w_1050,h_590/Still-Life-Bottle.png', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 12, category: 'perfumes', name_ar: 'بلاك أفغانو', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://d1ocxcobqi1rrp.cloudfront.net/medium-4b34e4c8eb754acc9b89118489a8236115440978511afg1asd-5a70be70-0de9-493a-b6c2-7f4a5c4d0fdf.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 14, category: 'perfumes', name_ar: ' فهرنهايت', designer_ar: 'ديور', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://static3.sabinacdn.com/63320-thickbox_default/fahrenheit.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 15, category: 'perfumes', name_ar: ' ألور سبورت هوم', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/736x/06/39/78/063978e2914a8743b477a06255b16195.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 16, category: 'perfumes', name_ar: ' بلاك اكس اس لكزس', designer_ar: ' باكو رابان', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://fimgs.net/mdimg/perfume/o.13805.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 17, category: 'perfumes', name_ar: ' سترونغر وذ يو', designer_ar: 'أمبيريو أرماني', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/736x/f3/83/4d/f3834d2d7c1583719539cda7b114fd2b.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 18, category: 'perfumes', name_ar: ' سكوربيون', designer_ar: 'شاننويور ابسولويل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.45527.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 19, category: 'perfumes', name_ar: 'بوس هوغو بوس', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://images.pexels.com/photos/20753035/pexels-photo-20753035.jpeg?_gl=1*16607ep*_ga*OTE4MDMxMjUyLjE3NTg0MTE0NTI.*_ga_8JE65Q40S6*czE3NTg0MTQwNzUkbzIkZzAkdDE3NTg0MTQwNzUkajYwJGwwJGgw', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 20, category: 'perfumes', name_ar: ' بلاك كود', designer_ar: 'جورجيو أرماني', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/1200x/d6/f2/37/d6f237f9a94878de9639cc6a06331473.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 21, category: 'perfumes', name_ar: 'هوم جوب', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://m.media-amazon.com/images/I/81hCMT6EabL._UF894,1000_QL80_.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 22, category: 'perfumes', name_ar: 'مونت بلانك ليجند', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/736x/25/1b/b3/251bb3b6ccc9b46ea30e972bc46d4088.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 23, category: 'perfumes', name_ar: ' أيروس', designer_ar: 'فيرزاتشي', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.pinimg.com/736x/e0/fc/ba/e0fcba3c7d0523ff5e3649243d21896f.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 24, category: 'perfumes', name_ar: 'بلو دي شانيل', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.imgur.com/3nQ6m2W.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },
            { id: 25, category: 'perfumes', name_ar: 'بلو دي شانيل', designer_ar: 'شانيل', name_en: 'Bleu de Chanel', designer_en: 'Chanel', price_usd: 160, image: 'https://i.imgur.com/3nQ6m2W.jpg', tags: ['men', 'winter'], rating: 5, reviews: 350, desc_ar: 'عطر خشبي - أروماتك للرجال. رائحة منعشة، نظيفة، وحسية للغاية. المكونات العليا هي الحمضيات والنعناع والفلفل الوردي.', desc_en: 'A woody-aromatic fragrance for men. A fresh, clean, and deeply sensual scent. Top notes are citrus, mint, and pink pepper.', badge: null },

            
            
            // --- عطور نسائية ---
            { id: 2, category: 'perfumes', name_ar: 'كوكو مادموزيل', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Coco_mademoiselle.jpg/960px-Coco_mademoiselle.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 5, category: 'perfumes', name_ar: 'لا في إي بيل', designer_ar: 'لانكوم', name_en: 'La Vie Est Belle', designer_en: 'Lancôme', price_usd: 165, image: 'https://i.pinimg.com/1200x/49/25/15/492515fd6fa47b0845e8c998e2291a6c.jpg', tags: ['women', 'winter'], rating: 5, reviews: 380, desc_ar: 'إعلان عالمي للسعادة، يجمع بين أناقة السوسن وقوة الباتشولي وحلاوة حلوى البرالين.', desc_en: 'A universal declaration of happiness, combining the elegance of iris, the strength of patchouli, and the sweetness of praline candy.', badge: 'bestselling' },
            { id: 26, category: 'perfumes', name_ar: ' جادور ', designer_ar: 'ديور', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/736x/ab/54/96/ab549647c81c492d47bfaf127a6de180.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 27, category: 'perfumes', name_ar: ' شانيل N*5 ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/736x/78/cd/f3/78cdf3e55298579a515df03025891772.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 28, category: 'perfumes', name_ar: ' ليبر انتنس  ', designer_ar: 'إيف سان لوران', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/1200x/dd/f6/a7/ddf6a7d1a4360676099ed24d4ccc1eac.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 29, category: 'perfumes', name_ar: ' بربري هير  ', designer_ar: 'بلوسوم', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/736x/01/be/39/01be391719dae81e412b9aea882355e5.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 30, category: 'perfumes', name_ar: ' سي ', designer_ar: 'جورجيو أرماني', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/736x/6d/f0/82/6df0825a42fce5f38e40224b4be67064.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 31, category: 'perfumes', name_ar: ' فالنتينو دونا بورن ان روما إنتنس ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/736x/3c/30/b5/3c30b541dea1d7634808a23381fc45ed.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 32, category: 'perfumes', name_ar: ' اسكادا سكسي غرافتي ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://cdn.salla.sa/AyzDQ/7eH7NkrBWzFncsYDrbcaSdCvmbrxYRlVqyVtdXBe.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 33, category: 'perfumes', name_ar: ' إيموشن  ', designer_ar: 'الرصاصي', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://f.nooncdn.com/p/pnsku/N29748839A/45/_/1708423322/ef65b487-e252-4319-9c9e-8869485f682a.jpg?width=480', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 34, category: 'perfumes', name_ar: ' قصة ون أند أونلي ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/736x/35/23/b1/3523b14cf848a476874dc2b4d3a60a14.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 35, category: 'perfumes', name_ar: '  بومب شيل ', designer_ar: 'فيكتوريا سيكريت', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.pinimg.com/1200x/41/b1/d1/41b1d14c9fc513a5ea26bf3c6853998b.jpg', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 36, category: 'perfumes', name_ar: ' ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.imgur.com/O6SgD2c.png', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 37, category: 'perfumes', name_ar: ' ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.imgur.com/O6SgD2c.png', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },
            { id: 38, category: 'perfumes', name_ar: ' ', designer_ar: 'شانيل', name_en: 'Coco Mademoiselle', designer_en: 'Chanel', price_usd: 180, image: 'https://i.imgur.com/O6SgD2c.png', tags: ['women', 'summer'], rating: 5, reviews: 310, desc_ar: 'عطر شرقي منعش للمرأة الحرة والجريئة. يتميز بنفحات البرتقال والياسمين والورد مع لمسة من الباتشولي ونجيل الهند.', desc_en: 'A fresh oriental fragrance for the free and daring woman. It features notes of orange, jasmine, and rose with a touch of patchouli and vetiver.', badge: 'trending' },

            

        
            
            // --- عطور للجنسين ---
            { id: 39, category: 'perfumes', name_ar: 'عود وود', designer_ar: 'توم فورد', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://i.pinimg.com/736x/25/d6/98/25d698b4a212a980f4f687c5c1a91e1e.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 40, category: 'perfumes', name_ar: 'توباكو فانيلا ', designer_ar: 'توم فورد', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://i.pinimg.com/1200x/a7/bc/d4/a7bcd454256d4ece0e7bca7329efb0cf.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 41, category: 'perfumes', name_ar: ' بكرات روج ', designer_ar: 'توم فورد', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://i.pinimg.com/736x/ae/c8/1e/aec81e8e4b30ab99ae4df96e2ba0923a.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 42, category: 'perfumes', name_ar: '  ستيلار تايمز  ', designer_ar: ' لويس فيتون ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://cdn.salla.sa/DwvRb/QiXjdj9CyM6mfVvbkEu4UpY405nQvvsCvvkYWEZJ.png', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 43, category: 'perfumes', name_ar: '  روز وود ', designer_ar: ' العربية للعود ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://media.al-jasser.com/api/public/content/wf6uartfmeqrplg-vivvzg-web?v=050cf464&t=w800', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 44, category: 'perfumes', name_ar: '  عود روز وود ', designer_ar: ' ديور ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://media.zid.store/bfaa3454-0e90-4f91-91c7-be4cb1752ac8/a58c4aaa-daa0-4aef-80a1-b9c5f630377c.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 45, category: 'perfumes', name_ar: '  اندليس ايفوريا ', designer_ar: ' كالفين كلاين ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://slimages.macysassets.com/is/image/MCY/products/1/optimized/1950871_fpx.tif', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 46, category: 'perfumes', name_ar: '  ميدنايت فانتاسي ', designer_ar: ' بريتني سبيرز ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://cdn.sheeel.com/catalog/product/cache/074f467fdf747a38ab5e8f88243fd86f/b/r/britney_spears_midnight_fantasy_100ml_edp_for_women_-_tester2.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 47, category: 'perfumes', name_ar: '  سيجنتشر سويت فيروسيوس ', designer_ar: ' روبرتو كافالي ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://waheteter.com/wp-content/uploads/2024/12/FB_IMG_1734377184671.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 48, category: 'perfumes', name_ar: '  مون باريس انتنسمنت ', designer_ar: ' ايف سان لوران ', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_auto/https://waheteter.com/wp-content/uploads/2021/10/Yves-Saint-Laurent-Mon-Paris-Floral.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },
            { id: 49, category: 'perfumes', name_ar: ' هيرمس كاليش ', designer_ar: 'توم فورد', name_en: 'Oud Wood', designer_en: 'Tom Ford', price_usd: 250, image: 'https://is3.makeup.pl/600x600/ro97v1hcpkev.jpg', tags: ['unisex', 'winter'], rating: 5, reviews: 190, desc_ar: 'أحد أكثر المكونات النادرة والثمينة في عالم العطور، خشب العود. يمتزج العود الغريب مع خشب الورد والهيل، ليخلق تركيبة غنية ومميزة.', desc_en: 'One of the most rare and precious ingredients in perfumery, oud wood. Exotic oud blends with rosewood and cardamom, creating a rich and distinctive composition.', badge: 'new' },

            
            
            // --- زيوت عطرية ---
            { id: 6, category: 'oils', name_ar: 'زيت المسك الأبيض', designer_ar: 'زيوت أورا', name_en: 'White Musk Oil', designer_en: 'Aura Oils', price_usd: 75, image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.68477.jpg', tags: ['unisex', 'summer'], rating: 4, reviews: 120, desc_ar: 'زيت عطري نقي برائحة المسك الأبيض النظيفة والناعمة. مثالي للاستخدام المباشر على الجلد لثبات يدوم طويلاً.', desc_en: 'A pure aromatic oil with the clean and soft scent of white musk. Perfect for direct application on the skin for long-lasting fragrance.', badge: 'trending' },
            // --- إكسسوارات ومنتجات أخرى ---
            { id: 11, category: 'accessories', name_ar: 'مبخرة إلكترونية', designer_ar: 'أورا هوم', name_en: 'Electronic Incense Burner', designer_en: 'Aura Home', price_usd: 45, image: 'https://i.imgur.com/mzaT43D.png', tags: [], rating: 4, reviews: 80, desc_ar: 'مبخرة عصرية وآمنة للاستخدام في المنزل أو السيارة، تعمل بالشحن وتوفر رائحة بخور نقية.', desc_en: 'A modern and safe incense burner for home or car use, rechargeable and provides a pure incense aroma.', badge: null },
            { id: 13, category: 'other', name_ar: 'شمعة برائحة اللافندر', designer_ar: 'أورا هوم', name_en: 'Lavender Scented Candle', designer_en: 'Aura Home', price_usd: 35, image: 'https://i.imgur.com/sDAB2a7.png', tags: [], rating: 4, reviews: 115, desc_ar: 'شمعة عطرية تساعد على الاسترخاء والهدوء، مصنوعة من شمع الصويا الطبيعي ورائحة اللافندر المهدئة.', desc_en: 'A scented candle that promotes relaxation and calm, made from natural soy wax and soothing lavender scent.', badge: null }
        ];
        return allProducts;
    }

    const products = defineProducts();
    const maxProductPrice = Math.ceil(Math.max(...products.map(p => p.price_usd)));
    state.maxPriceFilter = maxProductPrice;
    
    const translations = {
        ar: {
            siteTitle: "القاسم للعطور", viewProduct: "عرض المنتج", description: "الوصف",
            navPerfumes: "العطور", navOils: "زيوت عطرية", navAccessories: "إكسسوارات", navOther: "منتجات أخرى", navAbout: "معلومات عن العطور", navStats: "إحصائيات",
            men: 'رجالي', women: 'نسائي', unisex: 'للجنسين', summer: 'صيفي', winter: 'شتوي', pheromone: 'فرموني', all: 'الكل',
            addToCart: 'أضف للسلة', cartTitle: 'سلة المشتريات', emptyCart: 'سلتك فارغة حاليًا.',
            product: 'المنتج', quantity: 'الكمية', price: 'السعر', total: 'الإجمالي',
            customerInfo: 'بيانات العميل', fullName: 'الاسم الكامل', phone: 'رقم الهاتف', address: 'العنوان',
            checkoutWhatsApp: 'إتمام الطلب عبر واتساب', continueShopping: 'متابعة التسوق',
            footerAbout: 'عن القاسم', footerDesc: 'متجر متخصص في تقديم أرقى العطور والزيوت العطرية.',
            quickLinks: 'روابط سريعة', contactUs: 'تواصل معنا', copyright: 'جميع الحقوق محفوظة ©',
            currency: 'العملة', language: 'اللغة', theme: 'المظهر', reviews: 'مراجعة',
            paymentMethod: 'طريقة الدفع', cashOnDelivery: 'الدفع عند الاستلام', creditCard: 'بطاقة ائتمانية (قريباً)',
            heroTitle: "اكتشف عطرك المميز", heroSubtitle: "مجموعة حصرية من العطور التي تروي قصتك", heroButton: "تسوق الآن",
            sortBy: 'ترتيب حسب:', bestselling: 'الأكثر رواجاً', priceAsc: 'السعر: من الأقل للأعلى', priceDesc: 'السعر: من الأعلى للأقل', ratingDesc: 'الأعلى تقييماً',
            badgeNew: 'جديد', badgeExclusive: 'حصري', badgeBestselling: 'الأكثر مبيعاً', badgeTrending: 'الأكثر رواجاً',
            priceRange: "السعر حتى:", designer: 'المصمم',
            aboutTitle: "عالم العطور: فن وإبداع", aboutArticle1Title: "كيف تختار عطرك المثالي؟", aboutArticle1Content: "اختيار العطر المناسب هو رحلة شخصية تعكس ذوقك وشخصيتك...", aboutArticle2Title: "الفرق بين ماء العطر وماء التواليت", aboutArticle2Content: "يكمن الاختلاف الرئيسي في تركيز الزيت العطري...",
            favoritesTitle: 'قائمة المفضلة', emptyFavorites: 'قائمة المفضلة فارغة.',
            statsTitle: 'إحصائيات المتجر', avgRating: 'متوسط التقييم', noReviews: 'لا توجد تقييمات بعد', customerReviews: 'تعليقات العملاء',
            addReview: 'أضف تقييمك', yourName: 'اسمك', yourRating: 'تقييمك', yourComment: 'تعليقك', submitReview: 'إرسال التقييم',
        },
        en: {
            siteTitle: "ALKASEM Fragrances", viewProduct: "View Product", description: "Description",
            navPerfumes: "Perfumes", navOils: "Aromatic Oils", navAccessories: "Accessories", navOther: "Other Products", navAbout: "About Perfumes", navStats: "Statistics",
            men: 'Men', women: 'Women', unisex: 'Unisex', summer: 'Summer', winter: 'Winter', pheromone: 'Pheromone', all: 'All',
            addToCart: 'Add to Cart', cartTitle: 'Shopping Cart', emptyCart: 'Your cart is currently empty.',
            product: 'Product', quantity: 'Quantity', price: 'Price', total: 'Total',
            customerInfo: 'Customer Information', fullName: 'Full Name', phone: 'Phone Number', address: 'Address',
            checkoutWhatsApp: 'Checkout via WhatsApp', continueShopping: 'Continue Shopping',
            footerAbout: 'About ALKASEM', footerDesc: 'A specialized store providing the finest perfumes and aromatic oils.',
            quickLinks: 'Quick Links', contactUs: 'Contact Us', copyright: 'All rights reserved ©',
            currency: 'Currency', language: 'Language', theme: 'Theme', reviews: 'reviews',
            paymentMethod: 'Payment Method', cashOnDelivery: 'Cash on Delivery', creditCard: 'Credit Card (Soon)',
            heroTitle: "Discover Your Signature Scent", heroSubtitle: "An exclusive collection of fragrances that tell your story", heroButton: "Shop Now",
            sortBy: 'Sort by:', bestselling: 'Most Popular', priceAsc: 'Price: Low to High', priceDesc: 'Price: High to Low', ratingDesc: 'Highest Rated',
            badgeNew: 'New', badgeExclusive: 'Exclusive', badgeBestselling: 'Best Seller', badgeTrending: 'Trending',
            priceRange: "Price up to:", designer: 'Designer',
            aboutTitle: "The World of Perfumes: Art & Creativity", aboutArticle1Title: "How to Choose Your Perfect Perfume?", aboutArticle1Content: "Choosing the right perfume is a personal journey...", aboutArticle2Title: "The Difference Between Eau de Parfum and Eau de Toilette", aboutArticle2Content: "The main difference lies in the concentration of aromatic oil...",
            favoritesTitle: 'Favorites List', emptyFavorites: 'Your favorites list is empty.',
            statsTitle: 'Store Statistics', avgRating: 'Average Rating', noReviews: 'No reviews yet', customerReviews: 'Customer Reviews',
            addReview: 'Add Your Review', yourName: 'Your Name', yourRating: 'Your Rating', yourComment: 'Your Comment', submitReview: 'Submit Review',
        }
    };

    // ===================================================================================
    // --- قسم الدوال البرمجية (لا تقم بالتعديل هنا إلا إذا كنت تعرف ما تفعل) ---
    // ===================================================================================

    const T = (key) => translations[state.lang][key] || key;
    const formatCurrency = (price) => state.currency === 'syp' 
        ? `${Math.round(price * state.exchangeRate).toLocaleString('ar-SY')} ل.س` 
        : `$${price.toFixed(2)}`;

    function renderHeader() {
        const header = document.getElementById('header-container');
        const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        const favoritesCount = state.favorites.length;
        header.innerHTML = `<nav class="container mx-auto px-4 py-3 flex justify-between items-center gap-4"><h1 class="text-2xl md:text-3xl font-bold gold-gradient-text cursor-pointer" data-page="perfumes">${T('siteTitle')}</h1><div class="hidden lg:flex items-center gap-6 text-lg">${['perfumes', 'oils', 'accessories', 'other', 'about', 'stats'].map(page => `<a href="#" data-page="${page}" class="nav-link pb-1 ${state.currentPage === page ? 'font-bold border-b-2 border-yellow-500' : 'text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400'}">${T('nav' + page.charAt(0).toUpperCase() + page.slice(1))}</a>`).join('')}</div><div class="flex items-center gap-3 md:gap-4"><div class="hidden md:flex items-center gap-3"><button data-action="toggle-theme" class="text-xl text-gray-600 dark:text-gray-300 hover:text-yellow-500" title="${T('theme')}"><i class="fas ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i></button><button data-lang="${state.lang === 'ar' ? 'en' : 'ar'}" class="text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" title="${T('language')}"><i class="fas fa-globe mr-1"></i> ${state.lang.toUpperCase()}</button><button data-currency="${state.currency === 'usd' ? 'syp' : 'usd'}" class="text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" title="${T('currency')}"><i class="fas fa-dollar-sign mr-1"></i> ${state.currency.toUpperCase()}</button></div><button data-action="toggle-favorites" class="relative text-xl text-gray-600 dark:text-gray-300 hover:text-red-500"><i class="fas fa-heart"></i>${favoritesCount > 0 ? `<span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${favoritesCount}</span>` : ''}</button><button data-action="toggle-cart" class="relative text-xl text-gray-600 dark:text-gray-300 hover:text-yellow-500"><i class="fas fa-shopping-bag"></i>${cartItemCount > 0 ? `<span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${cartItemCount}</span>` : ''}</button><button data-action="toggle-mobile-menu" class="lg:hidden text-xl"><i class="fas fa-bars"></i></button></div></nav><div id="mobile-menu" class="hidden lg:hidden bg-white dark:bg-gray-800 absolute w-full shadow-lg"></div>`;
        renderMobileMenu();
    }

    function renderMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.innerHTML = `<div class="p-4 flex flex-col items-center gap-4">${['perfumes', 'oils', 'accessories', 'other', 'about', 'stats'].map(page => `<a href="#" data-page="${page}" class="nav-link text-lg w-full text-center py-2 rounded-md ${state.currentPage === page ? 'font-bold bg-yellow-500/10 text-yellow-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}">${T('nav' + page.charAt(0).toUpperCase() + page.slice(1))}</a>`).join('')}<div class="border-t border-gray-200 dark:border-gray-700 w-full my-2"></div><div class="flex justify-center gap-6 w-full"><button data-action="toggle-theme" class="text-xl"><i class="fas ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i> ${T('theme')}</button><button data-lang="${state.lang === 'ar' ? 'en' : 'ar'}" class="text-xl"><i class="fas fa-globe"></i> ${state.lang === 'ar' ? 'EN' : 'AR'}</button><button data-currency="${state.currency === 'usd' ? 'syp' : 'usd'}" class="text-xl"><i class="fas fa-dollar-sign"></i> ${state.currency === 'usd' ? 'SYP' : 'USD'}</button></div></div>`;
    }
    
    function renderMainContent() {
        const content = document.getElementById('main-content');
        let pageHtml = '';
        const productPages = ['perfumes', 'oils', 'accessories', 'other'];

        if (productPages.includes(state.currentPage)) {
            const pageProducts = products.filter(p => p.category === state.currentPage);
            pageHtml += renderSlider(pageProducts);
            
            if (state.currentPage === 'perfumes') {
                pageHtml += `<section class="hero-section text-center py-20 md:py-32 rounded-lg bg-gray-900 text-white my-12" style="background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://i.imgur.com/3nQ6m2W.jpg'); background-size: cover; background-position: center;"><h2 class="text-4xl md:text-6xl font-bold gold-gradient-text animate-slide-up">${T('heroTitle')}</h2><p class="mt-4 text-lg md:text-xl text-gray-300 animate-slide-up" style="animation-delay: 0.2s;">${T('heroSubtitle')}</p><button data-action="scroll-to-products" class="mt-8 btn-gold text-lg font-bold py-3 px-8 rounded-full animate-slide-up" style="animation-delay: 0.4s;">${T('heroButton')}</button></section>`;
            }
            
            const filteredProducts = pageProducts
                .filter(p => state.activeFilters.length === 0 || state.activeFilters.every(filter => p.tags.includes(filter)))
                .filter(p => p.price_usd <= state.maxPriceFilter);

            switch(state.sortBy) {
                case 'bestselling': filteredProducts.sort((a, b) => b.reviews - a.reviews); break;
                case 'priceAsc': filteredProducts.sort((a, b) => a.price_usd - b.price_usd); break;
                case 'priceDesc': filteredProducts.sort((a, b) => b.price_usd - a.price_usd); break;
                case 'ratingDesc': 
                    filteredProducts.sort((a, b) => {
                        const ratingA = (state.reviews[a.id] || []).reduce((sum, r) => sum + r.rating, 0) / (state.reviews[a.id]?.length || 1);
                        const ratingB = (state.reviews[b.id] || []).reduce((sum, r) => sum + r.rating, 0) / (state.reviews[b.id]?.length || 1);
                        return ratingB - ratingA;
                    }); 
                    break;
            }
            
            let controlsHtml = `<div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-10 flex flex-col gap-6">`;
            
            if (state.currentPage === 'perfumes' || state.currentPage === 'oils') {
                const tags = ['men', 'women', 'unisex', 'summer', 'winter', 'pheromone'];
                controlsHtml += `<div class="classification-bar-container"><div class="classification-bar flex items-center gap-2 overflow-x-auto pb-2"><button data-filter="all" class="filter-btn flex-shrink-0 btn-outline-gold px-4 py-1 rounded-full ${state.activeFilters.length === 0 ? 'bg-yellow-500 text-black' : ''}">${T('all')}</button>${tags.map(tag => `<button data-filter="${tag}" class="filter-btn flex-shrink-0 btn-outline-gold px-4 py-1 rounded-full ${state.activeFilters.includes(tag) ? 'bg-yellow-500 text-black' : ''}">${T(tag)}</button>`).join('')}</div></div><hr class="dark:border-gray-700"/>`;
            }
            
            controlsHtml += `<div class="flex flex-col md:flex-row justify-between items-center gap-6"><div class="w-full md:w-1/2"><label for="price-filter" class="block mb-2 font-semibold">${T('priceRange')} <span id="price-value" class="font-bold gold-gradient-text">${formatCurrency(state.maxPriceFilter)}</span></label><input type="range" id="price-filter" min="0" max="${maxProductPrice}" value="${state.maxPriceFilter}" class="w-full"></div><div class="relative min-w-[220px]"><select id="sort-by-select" class="w-full appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-yellow-500 cursor-pointer"><option value="bestselling" ${state.sortBy === 'bestselling' ? 'selected' : ''}>${T('bestselling')}</option><option value="priceAsc" ${state.sortBy === 'priceAsc' ? 'selected' : ''}>${T('priceAsc')}</option><option value="priceDesc" ${state.sortBy === 'priceDesc' ? 'selected' : ''}>${T('priceDesc')}</option><option value="ratingDesc" ${state.sortBy === 'ratingDesc' ? 'selected' : ''}>${T('ratingDesc')}</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300"><i class="fas fa-chevron-down text-xs"></i></div></div></div></div>`;
            pageHtml += `<div id="products-section">${controlsHtml}<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 fade-in">${filteredProducts.map(product => `<div class="product-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group"><div class="overflow-hidden relative"><img src="${product.image}" alt="${product['name_' + state.lang]}" class="w-full h-48 md:h-64 object-cover product-image cursor-pointer" data-action="show-product-detail" data-product-id="${product.id}" onerror="this.onerror=null;this.src='https://placehold.co/600x600/111827/D4AF37?text=Image+Error';"><button data-action="toggle-favorite" data-product-id="${product.id}" class="absolute top-3 right-3 text-2xl ${state.favorites.includes(product.id) ? 'text-red-500' : 'text-white/70'} hover:text-red-500 transition-colors"><i class="fas fa-heart"></i></button>${product.badge ? `<span class="product-badge badge-${product.badge}">${T('badge' + product.badge.charAt(0).toUpperCase() + product.badge.slice(1))}</span>` : ''}</div><div class="p-4 flex flex-col"><h3 class="text-md md:text-lg font-bold truncate text-gray-800 dark:text-white">${product['name_' + state.lang]}</h3><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${product['designer_' + state.lang]}</p>${product.tags && product.tags.length > 0 ? `<div class="flex flex-wrap gap-1 my-2">${product.tags.map(tag => `<span class="text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">${T(tag)}</span>`).join('')}</div>` : ''}<div class="flex items-center text-yellow-400">${[...Array(5)].map((_, i) => `<i class="fa-solid fa-star text-sm ${i < product.rating ? '' : 'text-gray-300 dark:text-gray-600'}"></i>`).join('')}<span class="text-xs text-gray-500 dark:text-gray-400 mx-2">(${product.reviews})</span></div><p class="text-lg font-semibold gold-gradient-text mt-1 mb-3">${formatCurrency(product.price_usd)}</p><button data-action="show-product-detail" data-product-id="${product.id}" class="w-full mt-auto btn-outline-gold font-bold py-2 px-4 rounded-lg text-sm"><i class="fas fa-eye mr-2"></i> ${T('viewProduct')}</button></div></div>`).join('')}</div></div>`;
        } else if (state.currentPage === 'about') {
            pageHtml = renderAboutPage();
        } else if (state.currentPage === 'stats') {
            pageHtml = renderStatsPage();
        }
        content.innerHTML = pageHtml;
        if (productPages.includes(state.currentPage)) initSlider();
    }
    
    function renderSlider(productsForSlider) {
        if (!productsForSlider || productsForSlider.length < 2) return '';
        const bestSellers = [...productsForSlider].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
        if (bestSellers.length < 2) return '';
        return `<section class="slider-container relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-2xl mb-12"><div class="slider-wrapper flex transition-transform duration-700 ease-in-out">${bestSellers.map(p => `<div class="slide flex-shrink-0 w-full relative"><img src="${p.image}" alt="${p['name_' + state.lang]}" class="w-full h-64 md:h-96 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/1200x500/111827/D4AF37?text=Image+Error';" /><div class="absolute inset-0 bg-black/60 flex items-center justify-center text-white p-8"><div class="text-center animate-slide-up">${p.badge ? `<span class="py-1 px-3 rounded-full text-sm font-bold bg-${p.badge === 'bestselling' || p.badge === 'trending' ? 'red' : 'blue'}-500 mb-4 inline-block">${T('badge' + p.badge.charAt(0).toUpperCase() + p.badge.slice(1))}</span>` : ''}<h2 class="text-3xl md:text-5xl font-bold">${p['name_' + state.lang]}</h2><p class="text-xl mt-2">${p['designer_' + state.lang]}</p><button data-action="show-product-detail" data-product-id="${p.id}" class="mt-6 btn-gold text-base py-2 px-6 rounded-full">${T('viewProduct')}</button></div></div></div>`).join('')}</div><button class="slider-nav prev absolute top-1/2 ${state.lang === 'ar' ? 'right-4' : 'left-4'} transform -translate-y-1/2 z-10"><i class="fas fa-chevron-${state.lang === 'ar' ? 'right' : 'left'}"></i></button><button class="slider-nav next absolute top-1/2 ${state.lang === 'ar' ? 'left-4' : 'right-4'} transform -translate-y-1/2 z-10"><i class="fas fa-chevron-${state.lang === 'ar' ? 'left' : 'right'}"></i></button><div class="slider-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">${bestSellers.map((_, i) => `<span class="slider-dot w-3 h-3 bg-white/50 rounded-full cursor-pointer ${i === 0 ? 'bg-white' : ''}" data-slide-to="${i}"></span>`).join('')}</div></section>`;
    }
    
    function renderAboutPage() {
        return `<section class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg animate-slide-up max-w-4xl mx-auto"><h2 class="text-4xl font-bold mb-8 text-center gold-gradient-text">${T('aboutTitle')}</h2><article class="mb-10 pb-6 border-b border-gray-200 dark:border-gray-700"><h3 class="text-2xl font-semibold mb-3">${T('aboutArticle1Title')}</h3><p class="text-gray-600 dark:text-gray-300 leading-relaxed">${T('aboutArticle1Content')}</p></article><article><h3 class="text-2xl font-semibold mb-3">${T('aboutArticle2Title')}</h3><p class="text-gray-600 dark:text-gray-300 leading-relaxed">${T('aboutArticle2Content')}</p></article></section>`;
    }
    
    function renderStatsPage() {
        let statsHtml = `<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg animate-slide-up"><h2 class="text-4xl font-bold mb-8 text-center gold-gradient-text">${T('statsTitle')}</h2><div class="space-y-12">`;
        
        products.forEach(product => {
            const productReviews = state.reviews[product.id] || [];
            const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = productReviews.length > 0 ? (totalRating / productReviews.length).toFixed(1) : 0;

            statsHtml += `<div class="product-stat-card border-b dark:border-gray-700 pb-8"><div class="flex flex-col sm:flex-row gap-6 items-center"><img src="${product.image}" class="w-32 h-32 object-cover rounded-lg shadow-md"><div class="flex-1 text-center sm:text-right rtl:sm:text-left"><h3 class="text-2xl font-bold">${product['name_' + state.lang]}</h3><p class="text-lg text-gray-500">${product['designer_' + state.lang]}</p><div class="flex items-center justify-center sm:justify-start my-2 text-yellow-400 text-xl">${[...Array(5)].map((_, i) => `<i class="fa-solid fa-star ${i < Math.round(avgRating) ? '' : 'text-gray-300 dark:text-gray-600'}"></i>`).join('')}<span class="text-lg text-gray-500 dark:text-gray-400 mx-2">${avgRating} (${productReviews.length} ${T('reviews')})</span></div></div></div><div class="mt-6"><h4 class="text-xl font-semibold mb-4">${T('customerReviews')}:</h4><div class="space-y-4 max-h-60 overflow-y-auto pr-2">`;
            
            if (productReviews.length > 0) {
                productReviews.forEach(review => {
                    statsHtml += `<div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"><div class="flex items-center mb-1"><span class="font-bold mr-4">${review.author}</span><div class="text-yellow-400">${[...Array(5)].map((_, i) => `<i class="fa-solid fa-star text-sm ${i < review.rating ? '' : 'text-gray-300 dark:text-gray-600'}"></i>`).join('')}</div></div><p class="text-gray-600 dark:text-gray-300">${review.comment}</p></div>`;
                });
            } else {
                statsHtml += `<p class="text-gray-500">${T('noReviews')}</p>`;
            }

            statsHtml += `</div></div></div>`;
        });

        statsHtml += `</div></div>`;
        return statsHtml;
    }
    
    function renderProductModal() {
        const modal = document.getElementById('product-modal');
        const product = products.find(p => p.id === state.productDetailId);
        if (!product) { modal.innerHTML = ''; return; }
        
        const productReviews = state.reviews[product.id] || [];

        modal.innerHTML = `<div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up"><button data-action="close-modal" class="absolute top-4 ${state.lang === 'ar' ? 'left-4' : 'right-4'} text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 z-10"><i class="fas fa-times"></i></button><div class="flex flex-col md:flex-row flex-grow overflow-hidden"><div class="w-full md:w-1/2 p-4 flex-shrink-0"><img src="${product.image}" alt="${product['name_' + state.lang]}" class="w-full h-full object-contain rounded-lg" onerror="this.onerror=null;this.src='https://placehold.co/600x600/111827/D4AF37?text=Image+Error';"></div><div class="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto"><h2 class="text-3xl font-bold mb-1">${product['name_' + state.lang]}</h2><h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">${product['designer_' + state.lang]}</h3><div class="flex items-center my-2 text-yellow-400">${[...Array(5)].map((_, i) => `<i class="fa-solid fa-star ${i < product.rating ? '' : 'text-gray-300'}"></i>`).join('')}<span class="text-sm text-gray-500 dark:text-gray-400 mx-2">${product.rating}.0 (${product.reviews} ${T('reviews')})</span></div><p class="text-3xl font-semibold gold-gradient-text my-4">${formatCurrency(product.price_usd)}</p><h4 class="font-bold text-lg mb-2">${T('description')}</h4><p class="text-gray-600 dark:text-gray-300 mb-6">${product['desc_' + state.lang]}</p><button data-action="add-to-cart-from-modal" data-product-id="${product.id}" class="w-full btn-gold font-bold py-3 px-4 rounded-lg text-lg mb-6"><i class="fas fa-cart-plus mr-2"></i> ${T('addToCart')}</button><div class="border-t dark:border-gray-700 pt-4"><h4 class="text-xl font-semibold mb-4">${T('addReview')}</h4><div class="space-y-3"><input type="text" id="review-author" placeholder="${T('yourName')}" class="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><div class="rating-stars"><input type="radio" id="star5" name="rating" value="5"><label for="star5" title="5 stars">★</label><input type="radio" id="star4" name="rating" value="4"><label for="star4" title="4 stars">★</label><input type="radio" id="star3" name="rating" value="3"><label for="star3" title="3 stars">★</label><input type="radio" id="star2" name="rating" value="2"><label for="star2" title="2 stars">★</label><input type="radio" id="star1" name="rating" value="1"><label for="star1" title="1 star">★</label></div><textarea id="review-comment" placeholder="${T('yourComment')}" rows="3" class="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"></textarea><button data-action="submit-review" data-product-id="${product.id}" class="w-full btn-outline-gold font-bold py-2 rounded-lg">${T('submitReview')}</button></div></div><div class="border-t dark:border-gray-700 pt-4 mt-6"><h4 class="text-xl font-semibold mb-4">${T('customerReviews')}</h4><div id="modal-reviews-list" class="space-y-4">${productReviews.length > 0 ? productReviews.map(review => `<div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><div class="flex items-center mb-1"><span class="font-bold mr-4">${review.author}</span><div class="text-yellow-400">${[...Array(5)].map((_, i) => `<i class="fa-solid fa-star text-sm ${i < review.rating ? '' : 'text-gray-300'}"></i>`).join('')}</div></div><p class="text-gray-600 dark:text-gray-300 text-sm">${review.comment}</p></div>`).join('') : `<p class="text-gray-500">${T('noReviews')}</p>`}</div></div></div></div></div>`;
    }

    function renderCart() {
        const cartModal = document.getElementById('cart-modal');
        const validCartItems = state.cart.map(item => { const product = products.find(p => p.id === item.id); return product ? { ...product, quantity: item.quantity } : null; }).filter(Boolean);

        if (validCartItems.length === 0) {
             cartModal.innerHTML = `<div class="flex flex-col h-full p-6"><div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold">${T('cartTitle')}</h2><button data-action="toggle-cart" class="text-2xl"><i class="fas fa-times"></i></button></div><div class="flex-grow flex flex-col items-center justify-center text-center"><i class="fas fa-shopping-bag text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-lg text-gray-500">${T('emptyCart')}</p><button data-action="toggle-cart" class="mt-6 btn-gold font-bold py-2 px-6 rounded-lg">${T('continueShopping')}</button></div></div>`;
             return;
        }
        const total = validCartItems.reduce((sum, item) => sum + (item.price_usd * item.quantity), 0);
        cartModal.innerHTML = `<div class="flex flex-col h-full"><div class="flex justify-between items-center p-4 border-b dark:border-gray-700"><h2 class="text-2xl font-bold">${T('cartTitle')}</h2><button data-action="toggle-cart" class="text-2xl"><i class="fas fa-times"></i></button></div><div class="flex-grow overflow-y-auto p-4 space-y-4">${validCartItems.map(item => `<div class="flex items-center gap-4"><img src="${item.image}" alt="${item['name_' + state.lang]}" class="w-20 h-20 rounded-md object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x600/111827/D4AF37?text=Image+Error';"><div class="flex-grow"><h4 class="font-semibold">${item['name_' + state.lang]}</h4><p class="text-sm text-gray-500">${formatCurrency(item.price_usd)}</p><div class="flex items-center mt-2"><button data-action="decrease-quantity" data-product-id="${item.id}" class="w-7 h-7 border rounded-full dark:border-gray-600">-</button><span class="w-10 text-center">${item.quantity}</span><button data-action="increase-quantity" data-product-id="${item.id}" class="w-7 h-7 border rounded-full dark:border-gray-600">+</button></div></div><button data-action="remove-from-cart" data-product-id="${item.id}" class="text-gray-400 hover:text-red-500"><i class="fas fa-trash-alt"></i></button></div>`).join('')}</div><div class="p-4 border-t dark:border-gray-700 space-y-4"><div id="customer-info-form" class="space-y-2"><h3 class="text-lg font-semibold">${T('customerInfo')}</h3><input type="text" id="customer-name" placeholder="${T('fullName')}" class="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><input type="tel" id="customer-phone" placeholder="${T('phone')}" class="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><input type="text" id="customer-address" placeholder="${T('address')}" class="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><div id="form-error" class="text-red-500 text-sm hidden mt-1"></div></div><div id="payment-method" class="space-y-2"><h3 class="text-lg font-semibold">${T('paymentMethod')}</h3><div class="flex gap-2"><button class="flex-1 p-2 border rounded-lg bg-gray-200 dark:bg-gray-600 border-yellow-500 dark:border-yellow-400 flex items-center justify-center gap-2"><i class="fas fa-money-bill-wave"></i>${T('cashOnDelivery')}</button><button class="flex-1 p-2 border rounded-lg text-gray-400 dark:text-gray-500 cursor-not-allowed flex items-center justify-center gap-2" disabled><i class="fas fa-credit-card"></i>${T('creditCard')}</button></div></div><div class="flex justify-between items-center font-bold text-xl"><span>${T('total')}:</span><span>${formatCurrency(total)}</span></div><button data-action="checkout-whatsapp" class="w-full btn-gold font-bold py-3 rounded-lg flex items-center justify-center text-lg gap-3"><i class="fab fa-whatsapp"></i>${T('checkoutWhatsApp')}</button></div></div>`;
    }
    
    function renderFavoritesModal() {
        const favoritesModal = document.getElementById('favorites-modal');
        const favoriteItems = state.favorites.map(id => products.find(p => p.id === id)).filter(Boolean);

        if (favoriteItems.length === 0) {
            favoritesModal.innerHTML = `<div class="flex flex-col h-full p-6"><div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold">${T('favoritesTitle')}</h2><button data-action="toggle-favorites" class="text-2xl"><i class="fas fa-times"></i></button></div><div class="flex-grow flex flex-col items-center justify-center text-center"><i class="fas fa-heart-broken text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-lg text-gray-500">${T('emptyFavorites')}</p><button data-action="toggle-favorites" class="mt-6 btn-gold font-bold py-2 px-6 rounded-lg">${T('continueShopping')}</button></div></div>`;
            return;
        }

        favoritesModal.innerHTML = `<div class="flex flex-col h-full"><div class="flex justify-between items-center p-4 border-b dark:border-gray-700"><h2 class="text-2xl font-bold">${T('favoritesTitle')}</h2><button data-action="toggle-favorites" class="text-2xl"><i class="fas fa-times"></i></button></div><div class="flex-grow overflow-y-auto p-4 space-y-4">${favoriteItems.map(item => `<div class="flex items-center gap-4"><img src="${item.image}" alt="${item['name_' + state.lang]}" class="w-20 h-20 rounded-md object-cover"><div class="flex-grow"><h4 class="font-semibold">${item['name_' + state.lang]}</h4><p class="text-sm text-gray-500">${formatCurrency(item.price_usd)}</p></div><button data-action="show-product-detail" data-product-id="${item.id}" class="btn-outline-gold px-3 py-1 rounded-lg text-sm">${T('viewProduct')}</button><button data-action="toggle-favorite" data-product-id="${item.id}" class="text-red-500 text-lg"><i class="fas fa-trash-alt"></i></button></div>`).join('')}</div></div>`;
    }

    function renderFooter() {
        const footer = document.getElementById('footer-container');
        footer.innerHTML = `<div class="container mx-auto px-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8"><div class="md:col-span-2"><h3 class="text-2xl font-bold mb-4 gold-gradient-text">${T('footerAbout')}</h3><p class="text-gray-300 max-w-md">${T('footerDesc')}</p></div><div><h3 class="text-xl font-semibold mb-4">${T('quickLinks')}</h3><ul class="space-y-2">${['perfumes', 'oils', 'accessories', 'about', 'stats'].map(p=>`<li><a href="#" data-page="${p}" class="text-gray-300 hover:text-yellow-400 nav-link">${T('nav'+p[0].toUpperCase()+p.slice(1))}</a></li>`).join('')}</ul></div><div><h3 class="text-xl font-semibold mb-4">${T('contactUs')}</h3><ul class="space-y-3 text-gray-300"><li class="flex items-center gap-3"><i class="fas fa-map-marker-alt w-5 text-center text-yellow-400"></i>Damascus, Syria</li><li class="flex items-center gap-3"><i class="fas fa-phone w-5 text-center text-yellow-400"></i>+963 912 345 678</li><li class="flex items-center gap-3"><i class="fas fa-envelope w-5 text-center text-yellow-400"></i>contact@aura.com</li></ul></div></div><div class="flex flex-col md:flex-row justify-between items-center text-center"><p class="text-gray-400">${T('copyright')} ${new Date().getFullYear()} | ${T('siteTitle')}</p><div class="mt-4 md:mt-0 flex gap-4"><a href="#" class="text-gray-400 hover:text-yellow-400 text-xl"><i class="fab fa-facebook-f"></i></a><a href="#" class="text-gray-400 hover:text-yellow-400 text-xl"><i class="fab fa-instagram"></i></a><a href="#" class="text-gray-400 hover:text-yellow-400 text-xl"><i class="fab fa-tiktok"></i></a></div></div></div>`;
    }
    
    function initSlider() {
        let currentSlide = 0;
        const sliderWrapper = document.querySelector('.slider-wrapper');
        if (!sliderWrapper) return;

        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const nextBtn = document.querySelector('.slider-nav.next');
        const prevBtn = document.querySelector('.slider-nav.prev');
        if (!nextBtn || !prevBtn || slides.length < 2) return;
        const totalSlides = slides.length;

        const showSlide = (index) => {
            if (!sliderWrapper) return;
            const offset = index * 100;
            sliderWrapper.style.transform = document.documentElement.dir === 'rtl' ? `translateX(${offset}%)` : `translateX(-${offset}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('bg-white', i === index));
            currentSlide = index;
        };

        const nextSlide = () => showSlide((currentSlide + 1) % totalSlides);
        const prevSlide = () => showSlide((currentSlide - 1 + totalSlides) % totalSlides);
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
        
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function toggleModal(modalId, show) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modal-overlay');
        if (!modal || !overlay) return;

        const visibleClass = modalId === 'product-modal' ? 'modal-visible' : `${modalId.replace('-modal', '')}-visible`;

        if (show) {
            if (modalId === 'product-modal') renderProductModal();
            else if (modalId === 'cart-modal') renderCart();
            else if (modalId === 'favorites-modal') renderFavoritesModal();
            overlay.classList.remove('hidden');
            modal.classList.add(visibleClass);
        } else {
            overlay.classList.add('hidden');
            modal.classList.remove(visibleClass);
        }
    }

    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    }

    function handleAddToCart(productId) {
        const existingItem = state.cart.find(item => item.id === productId);
        if (existingItem) existingItem.quantity++;
        else state.cart.push({ id: productId, quantity: 1 });
        saveCart();
        renderHeader();
        toggleModal('cart-modal', true);
    }

    function handleQuantityChange(productId, change) {
        const item = state.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) state.cart = state.cart.filter(i => i.id !== productId);
            saveCart();
            renderCart();
            renderHeader();
        }
    }
    
    function handleToggleFavorite(productId) {
        const index = state.favorites.indexOf(productId);
        if (index > -1) {
            state.favorites.splice(index, 1);
        } else {
            state.favorites.push(productId);
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        renderAll();
        if(document.getElementById('favorites-modal').classList.contains('favorites-visible')) {
            renderFavoritesModal();
        }
    }

    function handleAddReview(productId) {
        const author = document.getElementById('review-author').value.trim();
        const comment = document.getElementById('review-comment').value.trim();
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        
        if (!author || !comment || !ratingInput) {
            alert(state.lang === 'ar' ? 'يرجى ملء جميع حقول التقييم.' : 'Please fill all review fields.');
            return;
        }
        const rating = parseInt(ratingInput.value, 10);

        if (!state.reviews[productId]) {
            state.reviews[productId] = [];
        }
        state.reviews[productId].unshift({ author, rating, comment });
        localStorage.setItem('reviews', JSON.stringify(state.reviews));
        renderProductModal();
        if (state.currentPage === 'stats') {
            renderAll();
        }
    }
    
    function handleCheckout() {
        const name = document.getElementById('customer-name').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();
        const address = document.getElementById('customer-address').value.trim();
        const errorDiv = document.getElementById('form-error');
        const errors = [];
        if (!name) errors.push(T('fullName'));
        if (!phone) errors.push(T('phone'));
        if (!address) errors.push(T('address'));
        if (errors.length > 0) {
            errorDiv.textContent = (state.lang === 'ar' ? 'يرجى ملء الحقول: ' : 'Please fill in: ') + errors.join(', ');
            errorDiv.classList.remove('hidden'); return;
        }
        errorDiv.classList.add('hidden');
        let message = `*${T('siteTitle')} - طلب جديد*%0A---%0A*${T('customerInfo')}:*%0A*${T('fullName')}:* ${name}%0A*${T('phone')}:* ${phone}%0A*${T('address')}:* ${address}%0A---%0A*الطلبات:*%0A`;
        let total = 0;
        state.cart.forEach(item => { const product = products.find(p => p.id === item.id); if(product) { total += product.price_usd * item.quantity; message += `- ${product['name_' + state.lang]} (x${item.quantity})%0A`; } });
        message += `---%0A*${T('total')}:* ${formatCurrency(total)}%0A*${T('paymentMethod')}:* ${T('cashOnDelivery')}`;
        const whatsappNumber = "963912345678";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
    
    function applyTheme() { if (localStorage.getItem('theme') === 'dark') { document.documentElement.classList.add('dark'); state.theme = 'dark'; } else { document.documentElement.classList.remove('dark'); state.theme = 'light'; } }
    
    function changeLanguage(lang) { state.lang = lang; document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; renderAll(); }

    function changePage(page) {
        clearInterval(slideInterval);
        state.currentPage = page; 
        state.activeFilters = []; 
        state.maxPriceFilter = maxProductPrice;
        window.scrollTo(0,0); 
        renderAll();
        const mobileMenu = document.getElementById('mobile-menu');
        if(mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    }
    
    function saveCart() { localStorage.setItem('cart', JSON.stringify(state.cart)); }
    
    function renderAll() {
        renderHeader();
        renderMainContent();
        renderFooter();
    }
    
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action], [data-product-id], [data-lang], [data-currency], [data-page], [data-filter]');
        if (!target) return;

        const { action, productId, lang, currency, page, filter } = target.dataset;
        if (action) {
            e.preventDefault();
            const id = parseInt(productId, 10);
            switch(action) {
                case 'toggle-cart': toggleModal('cart-modal', !document.getElementById('cart-modal').classList.contains('cart-visible')); break;
                case 'toggle-favorites': toggleModal('favorites-modal', !document.getElementById('favorites-modal').classList.contains('favorites-visible')); break;
                case 'close-modal': state.productDetailId = null; toggleModal('product-modal', false); break;
                case 'show-product-detail': 
                    if (document.getElementById('favorites-modal').classList.contains('favorites-visible')) {
                       toggleModal('favorites-modal', false); 
                    }
                    state.productDetailId = id; 
                    toggleModal('product-modal', true); 
                    break;
                case 'add-to-cart-from-modal': handleAddToCart(id); break;
                case 'increase-quantity': handleQuantityChange(id, 1); break;
                case 'decrease-quantity': handleQuantityChange(id, -1); break;
                case 'remove-from-cart': state.cart = state.cart.filter(item => item.id !== id); saveCart(); renderCart(); renderHeader(); break;
                case 'checkout-whatsapp': handleCheckout(); break;
                case 'toggle-theme': localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light'); applyTheme(); renderAll(); break;
                case 'toggle-mobile-menu': toggleMobileMenu(); break;
                case 'scroll-to-products': document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' }); break;
                case 'toggle-favorite': handleToggleFavorite(id); break;
                case 'submit-review': handleAddReview(id); break;
            }
        } else {
            e.preventDefault();
            if (lang) changeLanguage(lang);
            if (currency) { state.currency = currency; renderAll(); }
            if (page) changePage(page);
            if (filter) { if (filter === 'all') state.activeFilters = []; else { const index = state.activeFilters.indexOf(filter); if (index > -1) state.activeFilters.splice(index, 1); else state.activeFilters.push(filter); } renderMainContent(); }
        }
    });
    
    document.getElementById('main-content').addEventListener('input', e => {
        if (e.target.id === 'price-filter') {
            state.maxPriceFilter = parseInt(e.target.value, 10);
            document.getElementById('price-value').textContent = formatCurrency(state.maxPriceFilter);
        }
    });
    document.getElementById('main-content').addEventListener('change', e => {
         if (e.target.id === 'price-filter' || e.target.id === 'sort-by-select') {
            if(e.target.id === 'sort-by-select') state.sortBy = e.target.value;
            renderMainContent();
        }
    });
    
    document.getElementById('modal-overlay').addEventListener('click', () => { 
        toggleModal('cart-modal', false);
        toggleModal('favorites-modal', false);
        toggleModal('product-modal', false);
        state.productDetailId = null;
    });

    function initializeApp() {
        applyTheme();
        renderAll();
    }

    initializeApp();

});
