import { Language } from '../types';
import { LocalizedRecipeData } from '../recipeTranslations';

export const RECIPES_21_TO_30: Record<string, Partial<Record<Language, LocalizedRecipeData>>> = {
  'crispy-bbq-chicken-wings': {
    en: {
      title: 'Sticky Honey BBQ Glazed Chicken Wings',
      description: 'Crispy oven-baked chicken wings tossed in a luscious, tangy homemade honey garlic barbecue glaze with toasted sesame seeds.',
      tags: ['wings', 'bbq', 'chicken', 'appetizer', 'party'],
      ingredients: [
        { name: 'Chicken wings (split at joints)', unit: 'g' },
        { name: 'BBQ sauce', unit: 'tbsp' },
        { name: 'Honey', unit: 'tbsp' },
        { name: 'Soy sauce', unit: 'tbsp' },
        { name: 'Garlic powder or fresh garlic', unit: 'tsp' },
        { name: 'Baking powder', unit: 'tsp', notes: 'aluminum-free, for extra crispness' },
        { name: 'Salt & black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Drying and Coating Wings', instruction: 'Pat wings completely dry with paper towels. Toss in a bowl with baking powder, salt, and pepper to create an ultra-crisp skin.' },
        { title: 'Oven-Baking until Crackling', instruction: 'Arrange wings on a wire rack over a baking sheet. Bake at 210°C (410°F) for 35-40 minutes until golden and deeply crisp, flipping halfway through.' },
        { title: 'Glazing in Honey BBQ Sauce', instruction: 'Whisk BBQ sauce, honey, soy sauce, and garlic in a small saucepan and simmer 2 minutes. Toss hot wings in the sticky glaze until glistening.', tip: 'Tossing wings with a teaspoon of baking powder alters surface pH and yields fryer-like crunch in the oven.' }
      ]
    },
    de: {
      title: 'Knusprige Honig-BBQ-Hähnchenflügel (Wings)',
      description: 'Im Ofen extra knusprig gebackene Hähnchenflügel in einer klebrig-würzigen Honig-Barbecue-Glasur.',
      tags: ['Chicken Wings', 'Barbecue', 'Hähnchen', 'Fingerfood'],
      ingredients: [
        { name: 'Hähnchenflügel', unit: 'g' },
        { name: 'BBQ-Sauce', unit: 'EL' },
        { name: 'Honig', unit: 'EL' },
        { name: 'Sojasauce', unit: 'EL' },
        { name: 'Knoblauchpulver', unit: 'TL' },
        { name: 'Backpulver', unit: 'TL', notes: 'für extra Knusprigkeit' },
        { name: 'Salz & Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Flügel trocknen & würzen', instruction: 'Hähnchenflügel gründlich trocken tupfen. Mit Backpulver, Salz und Pfeffer vermengen.' },
        { title: 'Knusprig backen', instruction: 'Auf einem Gitterost bei 210°C ca. 35-40 Minuten goldbraun und kross backen.' },
        { title: 'Glasieren', instruction: 'BBQ-Sauce mit Honig, Sojasauce und Knoblauch kurz aufkochen. Die heißen Flügel darin schwenken.', tip: 'Das Backpulver sorgt für die unvergleichliche Knusprigkeit im Ofen.' }
      ]
    },
    zh: {
      title: '蜜汁蒜香焦脆BBQ烤鸡翅',
      description: '无油炸烤箱脆皮鸡翅，外皮酥脆掉渣，裹满浓郁拉丝蜜汁BBQ酱与蒜香酱汁，下酒聚会绝配。',
      tags: ['烤鸡翅', '烧烤', '快手小吃', '聚会硬菜'],
      ingredients: [
        { name: '新鲜鸡中翅或全翅', unit: '克' },
        { name: '烧烤酱 (BBQ Sauce)', unit: '汤匙' },
        { name: '纯蜂蜜', unit: '汤匙' },
        { name: '生抽酱油', unit: '汤匙' },
        { name: '大蒜粉或新鲜蒜泥', unit: '茶匙' },
        { name: '无铝泡打粉', unit: '茶匙', notes: '起脆皮关键' },
        { name: '盐与黑胡椒', unit: '茶匙' }
      ],
      instructions: [
        { title: '吸干水分裹无铝泡打粉', instruction: '鸡翅用厨房纸巾彻底吸干表面水分。放入大碗撒入无铝泡打粉、盐和黑胡椒抓匀，改变鸡皮表面酸碱度以获得油炸般酥脆感。' },
        { title: '烤箱高温烤至金黄酥脆', instruction: '鸡翅摆在烤架上放入烤箱，210°C烘烤35-40分钟，中途翻面一次，直至表皮金黄焦脆炸裂。' },
        { title: '熬煮蜜汁翻裹鸡翅', instruction: '小锅将BBQ烧烤酱、蜂蜜、生抽和蒜粉小火煮至浓稠起泡，将刚出炉滚烫的鸡翅倒入锅中快速翻滚裹匀晶莹酱汁。', tip: '表面吸干水分并加一小勺无铝泡打粉，不用一滴油也能烤出油炸级酥脆外皮。' }
      ]
    }
  },

  'perfect-ribeye-steak': {
    en: {
      title: 'Pan-Seared Ribeye Steak with Herb Garlic Butter',
      description: 'Restaurant-quality thick-cut ribeye steak seared in a cast iron skillet to medium-rare, basted with foaming butter, garlic, and fresh rosemary.',
      tags: ['steak', 'beef', 'dinner', 'meat', 'special occasion'],
      ingredients: [
        { name: 'Ribeye beef steak (marbled, 2.5cm thick)', unit: 'g' },
        { name: 'Butter', unit: 'g' },
        { name: 'Garlic cloves (crushed)', unit: 'cloves' },
        { name: 'Fresh rosemary and thyme sprigs', unit: 'sprigs' },
        { name: 'Coarse sea salt', unit: 'tsp' },
        { name: 'Freshly cracked black pepper', unit: 'tsp' },
        { name: 'High-heat cooking oil', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Tempering and Seasoning', instruction: 'Take steak out of the fridge 30-40 minutes before cooking to reach room temperature. Pat completely dry with paper towels and season aggressively with coarse salt.' },
        { title: 'High-Heat Searing', instruction: 'Heat a heavy cast-iron skillet over high heat until smoking hot. Add high-heat oil and sear steak for 2 minutes undisturbed to develop a deep mahogany crust. Flip and sear 1.5 minutes.' },
        { title: 'Basting with Foaming Butter (Arrosé)', instruction: 'Turn heat to medium, drop in butter, crushed garlic cloves, and fresh rosemary/thyme. Tilt pan and continuously spoon foaming butter over the steak for 1-2 minutes until internal temperature hits 54°C (130°F).' },
        { title: 'Resting', instruction: 'Transfer steak to a warm cutting board and rest for 7-8 minutes before slicing across the grain. Pour board juices back over meat.', tip: 'Resting allows meat fibers to relax and retain all savory juices inside.' }
      ]
    },
    de: {
      title: 'Perfektes Ribeye-Steak mit Kräuter-Knoblauch-Butter',
      description: 'Saftiges Ribeye-Steak aus der Gusseisenpfanne, medium-rare gebraten und mit schäumender Butter, Knoblauch und Rosmarin arrodiert.',
      tags: ['Steak', 'Rindfleisch', 'Festlich', 'Herzhaft'],
      ingredients: [
        { name: 'Ribeye-Steak (mind. 2,5 cm dick)', unit: 'g' },
        { name: 'Butter', unit: 'g' },
        { name: 'Knoblauchzehen (angedrückt)', unit: 'Zehen' },
        { name: 'Frischer Rosmarin & Thymian', unit: 'Zweige' },
        { name: 'Grobes Meersalz', unit: 'TL' },
        { name: 'Schwarzer Pfeffer (frisch gemahlen)', unit: 'TL' },
        { name: 'Hitzebehandeltes Pflanzenöl', unit: 'EL' }
      ],
      instructions: [
        { title: 'Zimmertemperatur & Würzen', instruction: 'Steak 30 Minuten vor der Zubereitung aus dem Kühlschrank nehmen. Gründlich abtupfen und großzügig mit grobem Meersalz würzen.' },
        { title: 'Scharf anbraten', instruction: 'Gusseisenpfanne rauchend heiß erhitzen. Steak von jeder Seite ca. 2 Minuten scharf anbraten, bis eine tiefe braune Kruste entsteht.' },
        { title: 'Arrosieren mit Butter', instruction: 'Hitze reduzieren, Butter, angedrückten Knoblauch und Kräuter zugeben. Pfanne schräg halten und Steak 1-2 Minuten mit schäumender Butter übergießen.' },
        { title: 'Ruhen lassen', instruction: 'Steak auf ein Schneidebrett legen und 7-8 Minuten ruhen lassen, bevor es quer zur Faser aufgeschnitten wird.', tip: 'Das Ruhenlassen verhindert das Auslaufen des Fleischsaftes.' }
      ]
    },
    zh: {
      title: '法式香草蒜香黄油淋煎眼肉牛排 (Ribeye Steak)',
      description: '餐厅级厚切雪花肋眼牛排，铸铁锅高温封边锁汁，出炉前淋浇浓香迷迭香蒜瓣泡沫黄油，外焦里嫩五分熟。',
      tags: ['牛排', '牛肉', '节日大餐', '西餐经典'],
      ingredients: [
        { name: '厚切雪花眼肉牛排 (2.5厘米厚)', unit: '克' },
        { name: '无盐黄油', unit: '克' },
        { name: '带皮整瓣大蒜 (拍扁)', unit: '瓣' },
        { name: '新鲜迷迭香与百里香', unit: '枝' },
        { name: '粗海盐', unit: '茶匙' },
        { name: '现磨粗黑胡椒粒', unit: '茶匙' },
        { name: '耐高温植物油或橄榄油', unit: '汤匙' }
      ],
      instructions: [
        { title: '回温与吸干调味', instruction: '牛排提前30-40分钟自冰箱取出恢复至室温。用厨房纸巾吸干表面血水，撒大量粗海盐与黑胡椒颗粒。' },
        { title: '铸铁锅大火美拉德封边', instruction: '厚底铸铁锅大火干烧至冒青烟，倒入高烟点植物油，放入牛排放手静置煎2分钟形成焦褐脆壳，翻面再煎1.5分钟。' },
        { title: '黄油迷迭香淋汁 (Arrosé)', instruction: '转中小火，投入黄油块、拍扁蒜瓣与迷迭香枝。倾斜锅身，用大勺不断舀起起泡的金黄蒜香黄油淋在牛排表面1-2分钟。' },
        { title: '出锅醒肉锁水', instruction: '移至温热熟食板静置醒肉7-8分钟，让肌纤维放松重新吸收内部肉汁，逆着肉丝纹理切片装盘。', tip: '严格静置醒肉是牛排切开不流血水、鲜嫩多汁的核心秘籍。' }
      ]
    }
  },

  'homemade-juicy-cutlets': {
    en: {
      title: 'Juicy Homemade Pan-Fried Meat Cutlets (Kotlety)',
      description: 'Plump, golden, tender pan-fried Ukrainian meat patties made from a balanced mix of pork and beef, soaked bread, and sweet grated onions.',
      tags: ['cutlets', 'meat', 'dinner', 'homemade', 'comfort food'],
      ingredients: [
        { name: 'Minced pork and beef blend (50/50)', unit: 'g' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'White bread without crusts', unit: 'slices' },
        { name: 'Milk or cold water', unit: 'ml', notes: 'to soak bread' },
        { name: 'Egg', unit: 'pc' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Breadcrumbs or flour for dredging', unit: 'tbsp' },
        { name: 'Vegetable oil for frying', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Mixing the Cutlet Base', instruction: 'Soak bread in milk and squeeze lightly. Grate onion finely so its juices keep meat moist. Combine minced meat, soaked bread, onion, egg, crushed garlic, salt, and pepper. Slap the meat mixture against the bowl for 3 minutes to bind proteins.' },
        { title: 'Shaping and Dredging', instruction: 'With damp hands, form oval patties. Dredge lightly in fine breadcrumbs or flour.' },
        { title: 'Pan-Frying to Golden Brown', instruction: 'Heat oil in a skillet. Fry cutlets over medium heat for 4-5 minutes per side until golden. Cover with a lid for the last 3 minutes on low to cook through.', tip: 'Beating the meat mixture makes cutlets extraordinarily fluffy and juicy.' }
      ]
    },
    de: {
      title: 'Saftige Hausgemachte Frikadellen (Kotlety)',
      description: 'Zarte, saftige Frikadellen aus gemischtem Hackfleisch nach traditioneller Art, in der Pfanne goldbraun gebraten.',
      tags: ['Frikadellen', 'Hackfleisch', 'Hausgemacht', 'Herzhaft'],
      ingredients: [
        { name: 'Gemischtes Hackfleisch (Rind & Schwein)', unit: 'g' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Weißbrot ohne Rinde', unit: 'Scheiben' },
        { name: 'Milch zum Einweichen', unit: 'ml' },
        { name: 'Ei', unit: 'Stk' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Semmelbrösel zum Wälzen', unit: 'EL' },
        { name: 'Pflanzenöl zum Braten', unit: 'EL' }
      ],
      instructions: [
        { title: 'Hackmasse zubereiten', instruction: 'Brot in Milch einweichen und ausdrücken. Zwiebel reiben. Hackfleisch mit Brot, Zwiebel, Ei, Knoblauch, Salz und Pfeffer gründlich verkneten und aufschlagen.' },
        { title: 'Formen und panieren', instruction: 'Mit feuchten Händen Frikadellen formen und in Semmelbröseln wenden.' },
        { title: 'Goldbraun braten', instruction: 'In heißem Öl bei mittlerer Hitze von jeder Seite 4-5 Minuten braten. Zum Schluss zugedeckt kurz durchziehen lassen.', tip: 'Kräftiges Aufschlagen der Masse macht die Frikadellen extra saftig.' }
      ]
    },
    zh: {
      title: '鲜美多汁家常煎肉饼 (Kotlety)',
      description: '传统乌克兰家庭多汁肉饼，猪牛肉按黄金比例混合，加入牛奶软面包与细腻洋葱泥，煎出金黄外壳与爆汁内馅。',
      tags: ['肉饼', '家常菜', '下饭菜', '肉馅料理'],
      ingredients: [
        { name: '猪牛混合肉馅 (各半)', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '去边白吐司面包', unit: '片' },
        { name: '鲜牛奶或冷水', unit: '毫升', notes: '浸泡面包' },
        { name: '鸡蛋', unit: '个' },
        { name: '大蒜', unit: '瓣' },
        { name: '面包糠或面粉', unit: '汤匙', notes: '裹外皮' },
        { name: '植物油', unit: '汤匙' }
      ],
      instructions: [
        { title: '调制摔打肉馅', instruction: '吐司浸泡在牛奶中挤干。洋葱擦细泥。将肉馅、泡发面包、洋葱泥、鸡蛋、蒜泥、盐和黑胡椒混合，抓匀并在碗中反复摔打3分钟起胶。' },
        { title: '团圆定型裹面包糠', instruction: '手沾清水防粘，抓取适量肉馅团成饱满椭圆肉饼，表面轻裹一层薄面包糠。' },
        { title: '中小火慢煎锁汁', instruction: '平底锅热植物油，中小火两面各煎4-5分钟至焦黄定型，最后盖上锅盖焖煎3分钟确保内里熟透。', tip: '肉馅中加入牛奶泡发的面包并用力摔打，是肉饼内部多汁松软不发柴的关键。' }
      ]
    }
  },

  'honey-mustard-pork-ribs': {
    en: {
      title: 'Sticky Honey Mustard Glazed Pork Ribs',
      description: 'Fall-off-the-bone tender oven-roasted pork ribs braised in foil, then finished under the broiler with a glossy, sweet honey Dijon glaze.',
      tags: ['ribs', 'pork', 'dinner', 'meat', 'baked'],
      ingredients: [
        { name: 'Pork ribs rack', unit: 'g' },
        { name: 'Honey', unit: 'tbsp' },
        { name: 'Dijon or French wholegrain mustard', unit: 'tbsp' },
        { name: 'Soy sauce', unit: 'tbsp' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Smoked paprika', unit: 'tsp' },
        { name: 'Salt & freshly ground black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Marinating and Braising in Foil', instruction: 'Mix honey, mustard, soy sauce, garlic, smoked paprika, salt, and pepper. Rub ribs generously with 2/3 of the marinade. Wrap tightly in a double layer of aluminum foil and roast at 160°C (320°F) for 90 minutes until fork-tender.' },
        { title: 'Broiling with Sticky Glaze', instruction: 'Unwrap foil, brush ribs generously with remaining honey mustard glaze. Return under the oven broiler at 220°C for 7-10 minutes until caramelized, sticky, and blistered.', tip: 'Slow braising in tightly sealed foil traps all steam and melts the connective collagen.' }
      ]
    },
    de: {
      title: 'Zarte Schweinerippchen in Honig-Senf-Glasur',
      description: 'Butterzarte Spare Ribs aus dem Ofen, sanft in Alufolie geschmort und unter dem Grill mit einer süß-würzigen Honig-Senf-Kruste glasiert.',
      tags: ['Rippchen', 'Schweinefleisch', 'Aus dem Ofen', 'Festlich'],
      ingredients: [
        { name: 'Schweinerippchen', unit: 'g' },
        { name: 'Honig', unit: 'EL' },
        { name: 'Dijon- oder körniger Senf', unit: 'EL' },
        { name: 'Sojasauce', unit: 'EL' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Geräuchertes Paprikapulver', unit: 'TL' },
        { name: 'Salz & schwarzer Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Marinieren & in Folie schmoren', instruction: 'Honig, Senf, Sojasauce, Knoblauch und Gewürze verrühren. Rippchen damit einreiben, fest in Alufolie wickeln und bei 160°C ca. 90 Minuten schmoren.' },
        { title: 'Knusprig glasieren', instruction: 'Folie öffnen, Rippchen mit der restlichen Glasur bestreichen und bei 220°C ca. 7-10 Minuten grillen, bis sie karamellisieren.', tip: 'Das langsame Dämpfen in Folie macht das Fleisch butterzart.' }
      ]
    },
    zh: {
      title: '蜜汁芥末焦香烤猪肋排 (Honey Mustard Ribs)',
      description: '骨肉软烂脱骨的烤箱猪排，锡纸包裹低温慢焖锁汁，再刷上浓郁第戎蜂蜜芥末酱高温焗烤至焦糖红亮。',
      tags: ['猪排', '烤箱硬菜', '蜜汁芥末', '脱骨鲜嫩'],
      ingredients: [
        { name: '新鲜猪肋排整扇', unit: '克' },
        { name: '天然纯蜂蜜', unit: '汤匙' },
        { name: '第戎芥末酱或法式芥末籽酱', unit: '汤匙' },
        { name: '生抽酱油', unit: '汤匙' },
        { name: '大蒜泥', unit: '瓣' },
        { name: '烟熏红椒粉', unit: '茶匙' },
        { name: '盐与现磨黑胡椒', unit: '茶匙' }
      ],
      instructions: [
        { title: '深度腌渍锡纸慢焖', instruction: '蜂蜜、芥末酱、生抽、蒜泥、烟熏红椒粉与盐调匀成蜜汁芥末酱。将2/3酱汁均匀涂满肋排。双层厚锡纸密封严实，烤箱160°C慢烤90分钟至肉质脱骨软嫩。' },
        { title: '开封刷酱高温上色', instruction: '拆开锡纸敞开表面，刷上剩余的蜜汁芥末浓酱。调至烤箱炙烤模式220°C烘烤7-10分钟，至表面起焦糖泡、金红油亮。', tip: '双层锡纸严密包裹能形成微压热循环，使肉筋与骨髓胶原完全软化脱骨。' }
      ]
    }
  },

  'baked-salmon-lemon-dill': {
    en: {
      title: 'Oven-Baked Salmon with Lemon, Butter & Fresh Dill',
      description: 'Flaky tender salmon fillets baked in a fragrant bath of melted garlic butter, fresh lemon slices, and sweet garden dill.',
      tags: ['salmon', 'fish', 'healthy', 'dinner', 'quick'],
      ingredients: [
        { name: 'Salmon fillets or steaks', unit: 'g' },
        { name: 'Lemon', unit: 'pc' },
        { name: 'Butter', unit: 'g' },
        { name: 'Fresh dill', unit: 'bunch' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Sea salt & white pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Prepping and Seasoning', instruction: 'Pat salmon fillets dry, arrange on a parchment-lined baking dish. Season lightly with salt and white pepper.' },
        { title: 'Topping and Baking', instruction: 'Melt butter with minced garlic. Drizzle over the fish, top with lemon slices and generous sprigs of fresh dill. Bake at 190°C (375°F) for 15-18 minutes until flesh turns opaque and flakes easily with a fork.', tip: 'Do not overcook salmon; remove as soon as center reaches medium doneness.' }
      ]
    },
    de: {
      title: 'Im Ofen gebackener Lachs mit Zitrone & Dill',
      description: 'Zartes Lachsfilet im Ofen gegart mit zerlassener Knoblauchbutter, frischen Zitronenscheiben und aromatischem Dill.',
      tags: ['Lachs', 'Fisch', 'Gesund', 'Schnell'],
      ingredients: [
        { name: 'Lachsfilet oder -steaks', unit: 'g' },
        { name: 'Zitrone', unit: 'Stk' },
        { name: 'Butter', unit: 'g' },
        { name: 'Frischer Dill', unit: 'Bund' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Meersalz & weißer Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Lachs vorbereiten', instruction: 'Lachsfilet trocken tupfen, in eine Auflaufform legen und mit Salz und weißem Pfeffer würzen.' },
        { title: 'Mit Butter & Kräutern backen', instruction: 'Butter mit Knoblauch schmelzen, über den Fisch träufeln. Zitronenscheiben und Dill darauf verteilen. Bei 190°C ca. 15-18 Minuten saftig garen.', tip: 'Nicht übergaren, damit der Fisch saftig bleibt.' }
      ]
    },
    zh: {
      title: '柠檬黄油莳萝烤三文鱼排 (Baked Salmon)',
      description: '鲜嫩多汁的烤箱三文鱼排，淋上香浓蒜香融化黄油，铺满新鲜柠檬切片与清甜莳萝香草，肉质肥美层次分明。',
      tags: ['三文鱼', '海鲜', '低脂高蛋白', '快手晚餐'],
      ingredients: [
        { name: '新鲜三文鱼排或鱼柳', unit: '克' },
        { name: '新鲜柠檬', unit: '个' },
        { name: '无盐黄油', unit: '克' },
        { name: '新鲜莳萝草', unit: '把' },
        { name: '大蒜', unit: '瓣' },
        { name: '海盐与白胡椒粉', unit: '茶匙' }
      ],
      instructions: [
        { title: '吸干水分清爽调味', instruction: '三文鱼吸干水分，置于铺有烘焙纸的烤盘上，两面轻抹海盐与白胡椒粉。' },
        { title: '淋蒜香黄油烤至鲜嫩', instruction: '黄油微波融化拌入蒜末，均匀淋在鱼排表面，铺上柠檬圆片与新鲜莳萝草。烤箱190°C烘烤15-18分钟至鱼肉变浅粉色、叉子一拨自然分层。', tip: '切勿烤过头，鱼肉中心保持微溏心嫩粉色时口感最细腻多汁。' }
      ]
    }
  },

  'mediterranean-baked-dorado': {
    en: {
      title: 'Mediterranean Baked Whole Dorado with Rosemary & Olives',
      description: 'Whole cleaned sea bream (dorado) stuffed with fresh lemon and rosemary, baked alongside blistered cherry tomatoes, olives, and extra virgin olive oil.',
      tags: ['dorado', 'fish', 'mediterranean', 'healthy', 'dinner'],
      ingredients: [
        { name: 'Whole sea bream (dorado, scaled and gutted)', unit: 'pc' },
        { name: 'Cherry tomatoes', unit: 'g' },
        { name: 'Kalamata olives', unit: 'g' },
        { name: 'Lemon', unit: 'pc' },
        { name: 'Fresh rosemary sprigs', unit: 'sprigs' },
        { name: 'Extra virgin olive oil', unit: 'tbsp' },
        { name: 'Sea salt & cracked black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Scoring and Stuffing the Fish', instruction: 'Make 3 shallow diagonal slashes on each side of the fish. Season cavity and outside with salt and pepper. Stuff the cavity with lemon slices and rosemary sprigs.' },
        { title: 'Roasting with Tomatoes & Olives', instruction: 'Place fish in a baking dish surrounded by cherry tomatoes and olives. Drizzle generously with olive oil. Bake at 200°C (400°F) for 20-25 minutes until skin is lightly crisp and flesh is tender.', tip: 'Diagonal scoring promotes even cooking through thick back fillets.' }
      ]
    },
    de: {
      title: 'Mediterrane Dorade aus dem Ofen mit Rosmarin',
      description: 'Ganze Dorade im Ofen gebacken, gefüllt mit Zitrone und Rosmarin, umgeben von geschmorten Kirschtomaten und Oliven.',
      tags: ['Dorade', 'Fisch', 'Mediterran', 'Leicht'],
      ingredients: [
        { name: 'Ganze Dorade (küchenfertig)', unit: 'Stk' },
        { name: 'Kirschtomaten', unit: 'g' },
        { name: 'Oliven', unit: 'g' },
        { name: 'Zitrone', unit: 'Stk' },
        { name: 'Rosmarinzweige', unit: 'Stk' },
        { name: 'Olivenöl', unit: 'EL' },
        { name: 'Salz & Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Dorade füllen', instruction: 'Haut der Dorade schräg einritzen. Mit Salz und Pfeffer würzen. Den Bauch mit Zitronenscheiben und Rosmarin füllen.' },
        { title: 'Mit Gemüse backen', instruction: 'Fisch mit Tomaten und Oliven in eine Form legen, mit Olivenöl beträufeln und bei 200°C ca. 20-25 Minuten garen.', tip: 'Das Einschneiden sorgt für gleichmäßiges Garen.' }
      ]
    },
    zh: {
      title: '地中海迷迭香番茄黑橄榄烤金头鲷 (Dorado)',
      description: '整条去鳞洗净金头鲷，腹中塞入柠檬与迷迭香，搭配爆汁圣女果与橄榄，烤箱200°C烘烤出地中海海滨原汁原味。',
      tags: ['金头鲷', '海鱼', '地中海风味', '健康海鲜'],
      ingredients: [
        { name: '整条金头鲷 (去鳞去内脏清洗干净)', unit: '条' },
        { name: '小番茄（圣女果）', unit: '克' },
        { name: '黑橄榄', unit: '克' },
        { name: '新鲜柠檬', unit: '个' },
        { name: '新鲜迷迭香枝', unit: '枝' },
        { name: '特级初榨橄榄油', unit: '汤匙' },
        { name: '海盐与黑胡椒粒', unit: '茶匙' }
      ],
      instructions: [
        { title: '鱼身划花刀塞香料', instruction: '鱼身双面斜划三刀，内外抹匀海盐与黑胡椒。鱼腹中塞入柠檬半月片与整枝新鲜迷迭香。' },
        { title: '番茄橄榄同烤装盘', instruction: '鱼摆入烤盘，四周铺满整颗圣女果与黑橄榄，淋上特级初榨橄榄油。烤箱200°C烘烤20-25分钟至鱼肉紧实鲜甜、小番茄起泡焦香。', tip: '鱼背肉厚处划花刀能确保鱼骨处受热均匀、熟度一致。' }
      ]
    }
  },

  'tender-fish-cutlets': {
    en: {
      title: 'Delicate Pan-Fried White Fish Cutlets',
      description: 'Tender, juicy golden patties made from ground white fish fillet (hake or cod), sweet sautéed onions, cream butter, and fresh dill.',
      tags: ['fish cutlets', 'fish', 'dinner', 'healthy', 'homemade'],
      ingredients: [
        { name: 'White fish fillet (hake, cod, or pollock)', unit: 'g' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Egg', unit: 'pc' },
        { name: 'Cold butter', unit: 'g' },
        { name: 'Semolina or soaked white bread', unit: 'tbsp' },
        { name: 'Vegetable oil for frying', unit: 'tbsp' },
        { name: 'Salt & fresh chopped dill', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Making the Fish Mince', instruction: 'Grind fish fillets together with onion and cold butter. Stir in egg, semolina, chopped dill, and salt. Rest mixture for 10 minutes so semolina absorbs moisture.' },
        { title: 'Shaping and Pan-Frying', instruction: 'Form delicate patties with wet hands. Pan-fry in hot oil for 4-5 minutes per side over medium heat until golden brown.', tip: 'Grinding cold butter with the fish mince keeps lean white fish remarkably tender and moist.' }
      ]
    },
    de: {
      title: 'Zarte Fischfrikadellen aus Weißfischfilet',
      description: 'Locker-saftige Fischküchlein aus feinem Weißfischfilet mit Zwiebeln, frischer Butter und Dill.',
      tags: ['Fischküchlein', 'Fisch', 'Hausgemacht', 'Leicht'],
      ingredients: [
        { name: 'Weißfischfilet (Seehecht/Kabeljau)', unit: 'g' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Ei', unit: 'Stk' },
        { name: 'Kalte Butter', unit: 'g' },
        { name: 'Grieß oder eingeweichtes Brot', unit: 'EL' },
        { name: 'Pflanzenöl zum Braten', unit: 'EL' },
        { name: 'Salz & gehackter Dill', unit: 'TL' }
      ],
      instructions: [
        { title: 'Fischfarce zubereiten', instruction: 'Fisch mit Zwiebel und kalter Butter wolfen. Ei, Grieß, Dill und Salz unterrühren und 10 Min. quellen lassen.' },
        { title: 'Goldbraun braten', instruction: 'Mit feuchten Händen Frikadellen formen und in Öl bei mittlerer Hitze ca. 4-5 Minuten pro Seite braten.', tip: 'Kalte Butter in der Masse sorgt für beste Saftigkeit.' }
      ]
    },
    zh: {
      title: '鲜甜嫩滑手工白鱼排肉饼 (Fish Cutlets)',
      description: '纯手工白鱼肉饼，精选无刺鳕鱼或狭鳕鱼肉泥，加入冰黄油丁、洋葱与新鲜莳萝草，两面煎出金黄薄壳。',
      tags: ['鱼饼', '海鲜家常', '低脂健康', '高蛋白'],
      ingredients: [
        { name: '无刺白鱼柳（鳕鱼/无须鳕）', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '鸡蛋', unit: '个' },
        { name: '冰镇黄油', unit: '克' },
        { name: '粗麦粉或泡牛奶白面包', unit: '汤匙' },
        { name: '植物油', unit: '汤匙' },
        { name: '盐与新鲜莳萝草', unit: '茶匙' }
      ],
      instructions: [
        { title: '搅打细腻鱼肉馅', instruction: '将鱼柳与洋葱、冷黄油一同绞打成细腻鱼泥。加入鸡蛋、粗麦粉、莳萝碎与盐搅拌均匀，静置10分钟让麦粉吸水定型。' },
        { title: '手沾水团饼煎至金黄', instruction: '双手沾冷水，取鱼泥整成圆扁小饼。锅热油，中火两面各煎4-5分钟至两面金黄飘香。', tip: '与低脂鱼肉同绞入冰黄油，能让少油脂的白鱼肉口感丰盈多汁不干柴。' }
      ]
    }
  },

  'village-garlic-potatoes': {
    en: {
      title: 'Crispy Country-Style Garlic Roasted Potatoes',
      description: 'Skin-on rustic potato wedges roasted to golden crunchy perfection with crushed garlic, sweet paprika, dried oregano, and olive oil.',
      tags: ['potatoes', 'side dish', 'vegan', 'baked', 'crispy'],
      ingredients: [
        { name: 'Potatoes (unpeeled, scrubbed)', unit: 'g' },
        { name: 'Garlic cloves (pressed)', unit: 'cloves' },
        { name: 'Sweet paprika', unit: 'tbsp' },
        { name: 'Dried oregano or thyme', unit: 'tsp' },
        { name: 'Vegetable or olive oil', unit: 'tbsp' },
        { name: 'Sea salt', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Cutting and Seasoning Wedges', instruction: 'Cut scrubbed potatoes lengthwise into chunky wedges. Toss in a large bowl with oil, pressed garlic, paprika, oregano, and salt until evenly coated.' },
        { title: 'High-Heat Roasting', instruction: 'Arrange wedges skin-side down on a baking sheet in a single layer without crowding. Bake at 210°C (410°F) for 30 minutes until blistered, crisp, and golden brown.', tip: 'Arranging skin-side down keeps potato flesh exposed to direct dry heat for the crispiest edges.' }
      ]
    },
    de: {
      title: 'Knusprige Ofenkartoffeln nach Landfrauenart (Country Wedges)',
      description: 'Würzige Kartoffelecken mit Schale im Ofen goldbraun geröstet mit viel Knoblauch, Paprika und aromatischem Oregano.',
      tags: ['Kartoffeln', 'Beilage', 'Vegan', 'Knusprig'],
      ingredients: [
        { name: 'Kartoffeln mit Schale (gewaschen)', unit: 'g' },
        { name: 'Knoblauchzehen', unit: 'Zehen' },
        { name: 'Edelsüß-Paprika', unit: 'EL' },
        { name: 'Oregano oder Thymian', unit: 'TL' },
        { name: 'Pflanzen- oder Olivenöl', unit: 'EL' },
        { name: 'Meersalz', unit: 'TL' }
      ],
      instructions: [
        { title: 'Spalten schneiden & marinieren', instruction: 'Kartoffeln der Länge nach in Spalten schneiden. Mit Öl, gepresstem Knoblauch, Paprika, Kräutern und Salz gründlich vermengen.' },
        { title: 'Knusprig backen', instruction: 'Mit der Schale nach unten auf ein Backblech legen. Bei 210°C ca. 30 Minuten backen, bis sie außen kross und innen weich sind.', tip: 'Schale nach unten sorgt für rundum knusprige Kanten.' }
      ]
    },
    zh: {
      title: '焦香蒜香香草带皮农夫烤土豆角 (Country Potatoes)',
      description: '经典美式乡村带皮薯角，裹满大蒜泥、红椒粉与牛至香草油，高温烤至外壳嘎嘣脆硬、内里如泥粉糯。',
      tags: ['土豆', '下酒菜', '纯素小吃', '烤箱料理'],
      ingredients: [
        { name: '新鲜土豆（连皮刷洗干净）', unit: '克' },
        { name: '大蒜瓣', unit: '瓣' },
        { name: '甜红椒粉', unit: '汤匙' },
        { name: '干牛至或百里香草', unit: '茶匙' },
        { name: '植物油或橄榄油', unit: '汤匙' },
        { name: '粗海盐', unit: '茶匙' }
      ],
      instructions: [
        { title: '切船形大角拌香料', instruction: '土豆连皮纵向切成饱满船形大薯角。放入盆中加入植物油、蒜泥、红椒粉、牛至香草和粗海盐充分抓匀。' },
        { title: '带皮面朝下高温烘烤', instruction: '烤盘铺烘焙纸，将薯角皮朝下整齐码放单层，切忌重叠。烤箱210°C大火烘烤30分钟至边缘微焦金黄香脆。', tip: '带皮面朝下放置能让两面切面最大面积受热吹风，烤出脆壳。' }
      ]
    }
  },

  'traditional-uzbek-plov': {
    en: {
      title: 'Traditional Uzbek Lamb/Beef Plov with Cumin & Garlic',
      description: 'Authentic Central Asian rice pilaf cooked in a heavy cast-iron cauldron with caramelized beef, sweet yellow carrots, fragrant cumin seeds, and whole steamed garlic heads.',
      tags: ['plov', 'rice', 'beef', 'traditional', 'dinner'],
      ingredients: [
        { name: 'Long grain rice (Basmati or Devzira)', unit: 'g' },
        { name: 'Beef or lamb chunks', unit: 'g' },
        { name: 'Juicy carrots (cut into batons)', unit: 'g' },
        { name: 'Yellow onions', unit: 'pcs' },
        { name: 'Whole heads of garlic', unit: 'pcs' },
        { name: 'Whole cumin seeds (Zira)', unit: 'tbsp' },
        { name: 'Vegetable oil', unit: 'ml' },
        { name: 'Salt & black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Cooking the Zirvak Base', instruction: 'Heat oil in a heavy Dutch oven until shimmering. Sear meat chunks over high heat for 10 minutes until deeply browned. Add sliced onions, then carrot batons, and fry for another 10 minutes.' },
        { title: 'Simmering with Spices and Garlic', instruction: 'Rub cumin seeds between your palms and add to the pot with salt. Pour in boiling water to cover, insert whole washed garlic heads into the center, and simmer on low for 25 minutes.' },
        { title: 'Layering Rice and Steaming', instruction: 'Rinse rice until water runs crystal clear. Layer rice evenly over meat without stirring! Pour hot water gently over a slotted spoon to 1cm above the rice. Cook until surface liquid evaporates, gather rice into a dome, cover tightly, and steam on the lowest heat for 20 minutes.', tip: 'Never stir rice with meat during cooking; plov cooks by rising steam.' }
      ]
    },
    de: {
      title: 'Traditioneller Usbekischer Plow mit Rindfleisch',
      description: 'Aromatisches Reisgericht aus dem gusseisernen Kasan mit zartem Rindfleisch, Karottenstreifen, Kreuzkümmel und ganzen Knoblauchknollen.',
      tags: ['Plow', 'Reis', 'Rindfleisch', 'Traditionell'],
      ingredients: [
        { name: 'Langkornreis (Basmati oder Dewsira)', unit: 'g' },
        { name: 'Rindfleisch in Stücken', unit: 'g' },
        { name: 'Karotten (in Stifte geschnitten)', unit: 'g' },
        { name: 'Zwiebeln', unit: 'Stk' },
        { name: 'Ganze Knoblauchknollen', unit: 'Stk' },
        { name: 'Kreuzkümmelsamen (Kumin)', unit: 'EL' },
        { name: 'Pflanzenöl', unit: 'ml' },
        { name: 'Salz & Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Sirwak anbraten', instruction: 'Öl im Bräter erhitzen. Fleisch scharf anbraten, Zwiebeln und Karottenstifte zugeben und 10 Min. mitschmoren.' },
        { title: 'Mit Kumin & Knoblauch köcheln', instruction: 'Kumin zerreiben, mit Salz und heißem Wasser zugeben. Ganze Knoblauchknollen hineindrücken und 25 Min. sanft köcheln.' },
        { title: 'Reis dämpfen', instruction: 'Gewaschenen Reis ebenmäßig auflegen (nicht umrühren!). Heißes Wasser vorsichtig zugießen. Bei schwacher Hitze zugedeckt 20 Min. ausdämpfen lassen.', tip: 'Den Reis niemals mit dem Fleisch vermischen beim Kochen.' }
      ]
    },
    zh: {
      title: '正宗中亚风味大锅牛肉抓饭 (Plov)',
      description: '传统铁锅慢焖抓饭，牛肉粒煎出焦香油脂，金黄胡萝卜丝清甜可口，整颗大蒜与孜然粒焖出粒粒分明喷香大米。',
      tags: ['抓饭', '手抓饭', '牛肉饭', '硬菜', '主食'],
      ingredients: [
        { name: '长粒大米（巴斯马蒂香米）', unit: '克' },
        { name: '鲜牛肉块（带少许油脂）', unit: '克' },
        { name: '多汁黄胡萝卜或红胡萝卜条', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '整颗整头大蒜', unit: '个' },
        { name: '天然孜然原粒（茴香粒）', unit: '汤匙' },
        { name: '植物油', unit: '毫升' },
        { name: '盐与黑胡椒粉', unit: '茶匙' }
      ],
      instructions: [
        { title: '大火煸炒浓郁抓饭底料 (Zirvak)', instruction: '厚底铸铁锅热油，大块牛肉大火煸炒10分钟至表面起焦脆壳。倒入洋葱丝炒至金黄，再倒入厚胡萝卜粗丝翻炒10分钟至胡萝卜软化出甜香。' },
        { title: '手搓孜然粒加整蒜慢炖', instruction: '双手手心用力搓碎孜然粒撒入锅中，加盐并倒入开水没过食材，将整颗洗净的带皮大蒜塞入汤中，小火慢炖25分钟。' },
        { title: '铺米平铺上汽慢焖', instruction: '淘洗至完全澄清的香米均匀铺在肉层上方（切勿搅拌翻动！）。用漏勺缓冲倒入热水高出米面1厘米。大火烧干表层水分后将米堆成小山包，用筷子戳几个气孔，盖紧锅盖微火慢焖20分钟出锅翻匀。', tip: '炖煮全程切忌搅拌米与肉层，靠水汽对流蒸熟的大米才能粒粒分明油亮弹牙。' }
      ]
    }
  },

  'egg-fried-rice-veggies': {
    en: {
      title: 'Quick Asian Egg & Veggie Fried Rice',
      description: 'Fragrant wok-fried rice with golden scrambled eggs, sweet corn, tender peas, aromatic garlic, green onions, and savory soy sauce.',
      tags: ['fried rice', 'rice', 'asian cuisine', 'quick dinner', 'vegetarian'],
      ingredients: [
        { name: 'Cooked chilled jasmine rice (day-old)', unit: 'g' },
        { name: 'Eggs', unit: 'pcs' },
        { name: 'Green peas or sweet corn', unit: 'g' },
        { name: 'Soy sauce', unit: 'tbsp' },
        { name: 'Green scallions', unit: 'bunch' },
        { name: 'Garlic clove', unit: 'clove' },
        { name: 'Cooking vegetable oil', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Scrambling the Eggs', instruction: 'Heat a tablespoon of oil in a hot skillet or wok. Pour in beaten eggs and scramble with a spatula for 60 seconds until softly set. Remove to a plate.' },
        { title: 'Wok-Tossing the Rice', instruction: 'Add another spoonful of oil, minced garlic, and cold rice. Stir-fry over high heat for 4 minutes, pressing out any clumps. Drizzle soy sauce around the rim of the pan, toss in peas/corn and eggs, and finish with fresh scallions.', tip: 'Day-old cold rice has dry surfaces that sizzle and toast without turning mushy.' }
      ]
    },
    de: {
      title: 'Schneller Asiatischer Gebratener Eierreis',
      description: 'Köstlicher Wok-Reis mit zart gestocktem Ei, Erbsen, Mais, Frühlingszwiebeln und feiner Sojasauce.',
      tags: ['Gebratener Reis', 'Reis', 'Asiatisch', 'Schnell'],
      ingredients: [
        { name: 'Gekochter, kalter Reis vom Vortag', unit: 'g' },
        { name: 'Eier', unit: 'Stk' },
        { name: 'Erbsen oder Mais', unit: 'g' },
        { name: 'Sojasauce', unit: 'EL' },
        { name: 'Frühlingszwiebeln', unit: 'Bund' },
        { name: 'Knoblauchzehe', unit: 'Zehe' },
        { name: 'Pflanzenöl zum Braten', unit: 'EL' }
      ],
      instructions: [
        { title: 'Rührei anbraten', instruction: 'Öl in einer Pfanne oder im Wok erhitzen. Eier kurz anbraten, mit dem Spatel zerteilen und herausnehmen.' },
        { title: 'Reis braten', instruction: 'Etwas Öl und Knoblauch zugeben, den kalten Reis 4 Minuten scharf anbraten. Sojasauce, Gemüse und Ei unterrühren und mit Frühlingszwiebeln bestreuen.', tip: 'Kalter Reis vom Vortag brät am besten an.' }
      ]
    },
    zh: {
      title: '粒粒分明黄金蛋炒饭配爽脆时蔬',
      description: '大火镬气十足的经典蛋炒饭，选用隔夜干爽米饭，嫩滑炒鸡蛋花、甜豌豆玉米粒与葱花生抽大火爆炒。',
      tags: ['蛋炒饭', '炒饭', '家常快手', '米饭料理'],
      ingredients: [
        { name: '隔夜冷米饭', unit: '克' },
        { name: '鸡蛋', unit: '个' },
        { name: '甜豌豆或甜玉米粒', unit: '克' },
        { name: '优质生抽酱油', unit: '汤匙' },
        { name: '鲜小葱花', unit: '把' },
        { name: '大蒜末', unit: '瓣' },
        { name: '植物油', unit: '汤匙' }
      ],
      instructions: [
        { title: '热油滑炒嫩蛋花', instruction: '热锅倒入适量油，倒入打散蛋液，快速用筷子或刮刀划散炒成嫩黄小蛋碎，盛出备用。' },
        { title: '大火热锅爆炒米饭', instruction: '锅中补一勺油下蒜末爆香，倒入压散的冷米饭大火翻炒4分钟至米粒在锅中跳跃。沿锅边淋入生抽炝出锅气，倒入蔬菜粒与鸡蛋碎翻炒均匀，出锅前撒一把葱花。', tip: '使用隔夜冷藏米饭水分较少，大火翻炒才能做到粒粒分明、干香扑鼻。' }
      ]
    }
  }
};
