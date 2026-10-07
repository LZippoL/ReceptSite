import { Language } from '../types';
import { LocalizedRecipeData } from '../recipeTranslations';

export const RECIPES_1_TO_10: Record<string, Partial<Record<Language, LocalizedRecipeData>>> = {
  'ukrainian-red-borscht': {
    en: {
      title: 'Traditional Ukrainian Red Borscht with Beef & Pampushky',
      description: 'The legendary traditional Ukrainian beet soup of rich ruby color on hearty beef broth with tender beef, root vegetables, fresh herbs, and sour cream.',
      tags: ['borscht', 'ukrainian cuisine', 'soup', 'traditional', 'dinner', 'beef'],
      ingredients: [
        { name: 'Beef with bone', unit: 'g' },
        { name: 'Beets', unit: 'pcs', notes: 'medium size' },
        { name: 'Potatoes', unit: 'pcs' },
        { name: 'White cabbage', unit: 'g', notes: 'thinly shredded' },
        { name: 'Carrot', unit: 'pc' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Tomato paste', unit: 'tbsp' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Lemon juice', unit: 'tbsp', notes: 'to preserve ruby hue' },
        { name: 'Fresh dill and parsley', unit: 'bunch' },
        { name: 'Water', unit: 'L' },
        { name: 'Salt', unit: 'tbsp' },
        { name: 'Black pepper', unit: 'tsp' },
        { name: 'Sunflower oil', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Simmering the Broth', instruction: 'Rinse beef, place in a large soup pot with cold water. Bring to a boil, skim off foam, and simmer gently on low heat for 90 minutes until meat is tender.', tip: 'Simmer gently without heavy rolling boil for clear broth.' },
        { title: 'Preparing the Beet Sauté', instruction: 'Grate beets coarsely. Heat pan with vegetable oil, add beets, splash lemon juice, add tomato paste and a ladle of broth. Braise on medium-low for 15 minutes.', tip: 'Lemon acid locks in the vibrant ruby color.' },
        { title: 'Sautéing Onions and Carrots', instruction: 'Finely dice onion, grate carrot. Sauté in a separate pan until golden and fragrant for 8-10 minutes.' },
        { title: 'Assembling the Vegetables', instruction: 'Remove beef from broth, chop into portions, return to pot. Add diced potatoes, simmer 10 minutes, then add shredded cabbage for another 5 minutes.' },
        { title: 'Finishing and Resting', instruction: 'Add braised beets and onion-carrot mixture. Season with salt and pepper. Simmer 5 minutes. Stir in crushed garlic and chopped fresh herbs, turn off heat, and let rest covered for 20 minutes.', tip: 'Borscht tastes even richer the next day as flavors marry.' }
      ]
    },
    de: {
      title: 'Traditioneller Ukrainischer Borschtsch mit Rindfleisch',
      description: 'Der legendäre rubinrote Rote-Bete-Eintopf auf kräftiger Rinderbrühe mit zartem Fleisch, frischem Dill und Schmand.',
      tags: ['Borschtsch', 'Ukrainische Küche', 'Suppe', 'Traditionell', 'Mittagessen'],
      ingredients: [
        { name: 'Rindfleisch mit Knochen', unit: 'g' },
        { name: 'Rote Bete', unit: 'Stk', notes: 'mittelgroß' },
        { name: 'Kartoffeln', unit: 'Stk' },
        { name: 'Weißkohl', unit: 'g', notes: 'fein gehobelt' },
        { name: 'Karotte', unit: 'Stk' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Tomatenmark', unit: 'EL' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Zitronensaft', unit: 'EL', notes: 'für leuchtende Farbe' },
        { name: 'Frischer Dill & Petersilie', unit: 'Bund' },
        { name: 'Wasser', unit: 'L' },
        { name: 'Salz', unit: 'EL' },
        { name: 'Schwarzer Pfeffer', unit: 'TL' },
        { name: 'Pflanzenöl', unit: 'EL' }
      ],
      instructions: [
        { title: 'Brühe kochen', instruction: 'Fleisch abspülen, mit kaltem Wasser aufkochen, Schaum abschöpfen und bei niedriger Hitze 90 Minuten sanft köcheln.', tip: 'Sanft simmern lassen, damit die Brühe kristallklar bleibt.' },
        { title: 'Rote Bete dünsten', instruction: 'Rote Bete raspeln, mit Öl anbraten, Zitronensaft, Tomatenmark und etwas Brühe hinzugeben. 15 Minuten sanft schmoren.' },
        { title: 'Zwiebeln & Karotten anschwitzen', instruction: 'Zwiebel würfeln, Karotte raspeln, goldgelb anbraten.' },
        { title: 'Gemüse hinzufügen', instruction: 'Fleisch herausnehmen, würfeln, zurück in den Topf geben. Kartoffeln und Kohl zugeben und weich kochen.' },
        { title: 'Vollenden und Ziehen lassen', instruction: 'Rote Bete und Zwiebel-Karotten-Mischung einrühren, würzen. Knoblauch und Kräuter unterrühren und 20 Min. ruhen lassen.', tip: 'Schmeckt am zweiten Tag noch aromatischer!' }
      ]
    },
    zh: {
      title: '经典乌克兰红菜汤配牛肉（罗宋汤原味）',
      description: '乌克兰国宝级传统红菜汤，天然红甜菜赋予浓郁宝石红汤色，慢炖牛肉高汤浓醇鲜美，搭配新鲜莳萝与酸奶油。',
      tags: ['罗宋汤', '红菜汤', '乌克兰美食', '牛肉汤', '家常经典'],
      ingredients: [
        { name: '带骨牛肉', unit: '克' },
        { name: '红甜菜根', unit: '个', notes: '中等大小' },
        { name: '土豆', unit: '个' },
        { name: '卷心菜（圆白菜）', unit: '克', notes: '切细丝' },
        { name: '胡萝卜', unit: '根' },
        { name: '洋葱', unit: '个' },
        { name: '番茄膏', unit: '汤匙' },
        { name: '大蒜', unit: '瓣' },
        { name: '柠檬汁', unit: '汤匙', notes: '保持红艳色泽' },
        { name: '新鲜莳萝与欧芹', unit: '把' },
        { name: '清水', unit: '升' },
        { name: '食盐', unit: '汤匙' },
        { name: '黑胡椒粉', unit: '茶匙' },
        { name: '食用植物油', unit: '汤匙' }
      ],
      instructions: [
        { title: '慢炖牛肉高汤', instruction: '牛肉洗净冷水下锅，大火烧开撇去浮沫，转小火慢炖90分钟至肉质软烂。', tip: '保持微沸慢炖，汤底清亮无杂质。' },
        { title: '炒制红甜菜底料', instruction: '红甜菜擦丝，热锅少油翻炒，淋少许柠檬汁并加入番茄膏和一勺牛肉清汤，小火焖15分钟。', tip: '柠檬的微酸能牢牢锁住甜菜的艳红色素。' },
        { title: '煸炒洋葱与胡萝卜', instruction: '洋葱切碎，胡萝卜擦丝，另起一锅炒至金黄飘香。' },
        { title: '下蔬菜入汤', instruction: '将炖好的牛肉切块放回汤中，加入切块土豆煮10分钟，随后加入卷心菜丝再煮5分钟。' },
        { title: '混合调味与焖透', instruction: '倒入红甜菜料与炒洋葱胡萝卜，加盐和胡椒调味。出锅前撒入蒜蓉与香草碎，关火盖盖焖20分钟。', tip: '隔夜静置后再热风味更加醇厚！' }
      ]
    }
  },

  'fluffy-syrnyky': {
    en: {
      title: 'Fluffy Golden Syrnyky (Ukrainian Cottage Cheese Pancakes)',
      description: 'Classic tender Ukrainian cottage cheese pancakes with a crisp golden crust and creamy melt-in-your-mouth center.',
      tags: ['syrnyky', 'breakfast', 'cottage cheese', 'quick', 'sweet'],
      ingredients: [
        { name: 'Farmer cheese or dry cottage cheese (9%)', unit: 'g', notes: 'well-drained' },
        { name: 'Egg', unit: 'pc', notes: 'or 2 yolks' },
        { name: 'All-purpose flour', unit: 'tbsp', notes: '+ extra for dusting' },
        { name: 'Sugar', unit: 'tbsp' },
        { name: 'Vanilla sugar', unit: 'tsp' },
        { name: 'Raisins', unit: 'g', notes: 'soaked and patted dry' },
        { name: 'Pinch of salt', unit: 'pinch' },
        { name: 'Butter', unit: 'g' },
        { name: 'Vegetable oil', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Preparing the Curd Base', instruction: 'Mash the cottage cheese with a fork or pass through a sieve. Add the egg, sugar, vanilla sugar, and a pinch of salt. Mix gently with a spatula.' },
        { title: 'Adding Flour and Raisins', instruction: 'Stir in the flour and soaked raisins. Do not overmix to keep the texture delicate.' },
        { title: 'Shaping the Pancakes', instruction: 'Dust a cutting board with flour. Form the dough into thick round pucks using a glass or knife edge.' },
        { title: 'Pan-Frying', instruction: 'Heat butter and oil in a skillet over low-medium heat. Fry the syrnyky for 3-4 minutes per side until golden brown.', tip: 'Cover with a lid for the last 2 minutes so they puff up nicely.' }
      ]
    },
    de: {
      title: 'Fluffige Syrniki (Quarkküchlein mit Vanille & Rosinen)',
      description: 'Zarte osteuropäische Quarkküchlein mit goldbrauner Kruste und cremigem Kern. Perfekt zum Frühstück mit Beeren und Sauerrahm.',
      tags: ['Syrniki', 'Frühstück', 'Quark', 'Pfannkuchen', 'Schnell'],
      ingredients: [
        { name: 'Trockener Speisequark / Schichtkäse (9%)', unit: 'g', notes: 'gut abgetropft' },
        { name: 'Ei', unit: 'Stk', notes: 'oder 2 Eigelb' },
        { name: 'Weizenmehl', unit: 'EL', notes: '+ etwas zum Wenden' },
        { name: 'Zucker', unit: 'EL' },
        { name: 'Vanillezucker', unit: 'TL' },
        { name: 'Rosinen', unit: 'g', notes: 'eingeweicht' },
        { name: 'Prise Salz', unit: 'Prise' },
        { name: 'Butter', unit: 'g' },
        { name: 'Pflanzenöl', unit: 'EL' }
      ],
      instructions: [
        { title: 'Quarkmasse vorbereiten', instruction: 'Den Quark mit einer Gabel zerdrücken. Ei, Zucker, Vanillezucker und Salz unterrühren.' },
        { title: 'Mehl & Rosinen zugeben', instruction: 'Mehl und Rosinen unterheben, nur kurz vermengen, damit der Teig locker bleibt.' },
        { title: 'Syrniki formen', instruction: 'Die Arbeitsfläche bemehlen und aus der Masse dicke runde Küchlein formen.' },
        { title: 'Goldbraun anbraten', instruction: 'Butter und Öl in einer Pfanne erhitzen. Syrniki bei mittlerer Hitze ca. 3-4 Minuten pro Seite braten.', tip: 'Die letzten 2 Minuten mit Deckel garen, damit sie herrlich aufgehen.' }
      ]
    },
    zh: {
      title: '松软乌克兰香草葡萄干奶酪松饼 (Syrnyky)',
      description: '外酥里嫩的金黄奶酪小饼，选用农家干酪制作，奶香浓郁，口感顺滑细腻，佐酸奶油或果酱极为美味。',
      tags: ['奶酪松饼', '营养早餐', '甜点', '快手菜'],
      ingredients: [
        { name: '农家白干酪 (9%脂)', unit: '克', notes: '沥干水分' },
        { name: '鸡蛋', unit: '个', notes: '或2个蛋黄' },
        { name: '中筋面粉', unit: '汤匙', notes: '裹粉备用' },
        { name: '细砂糖', unit: '汤匙' },
        { name: '香草糖', unit: '茶匙' },
        { name: '葡萄干', unit: '克', notes: '温水泡软吸干' },
        { name: '食盐', unit: '少许' },
        { name: '黄油', unit: '克' },
        { name: '植物油', unit: '汤匙' }
      ],
      instructions: [
        { title: '调制奶酪基底', instruction: '用叉子将干酪压碎压细腻，加入鸡蛋、细砂糖、香草糖和少许食盐搅拌均匀。' },
        { title: '加入面粉与葡萄干', instruction: '轻柔拌入面粉与泡软的葡萄干，切勿过度搅拌以免起筋影响松软度。' },
        { title: '整形小饼', instruction: '案板撒少许面粉，取面团揉成厚实圆饼，用杯底或刀刃微整光滑。' },
        { title: '平底锅香煎', instruction: '平底锅热油加黄油，中小火慢煎3-4分钟翻面至两面金黄。', tip: '最后2分钟盖上锅盖焖煎，奶酪饼会蓬松起发如蛋糕般绵软。' }
      ]
    }
  },

  'crispy-potato-deruny': {
    en: {
      title: 'Crispy Potato Deruny with Garlic & Sour Cream',
      description: 'Traditional Ukrainian potato pancakes, crisped to golden perfection on the outside and tender inside, served hot with sour cream.',
      tags: ['deruny', 'potato pancakes', 'ukrainian', 'crispy', 'dinner'],
      ingredients: [
        { name: 'Potatoes', unit: 'pcs' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Egg', unit: 'pc' },
        { name: 'All-purpose flour', unit: 'tbsp' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Sour cream (20%)', unit: 'tbsp' },
        { name: 'Salt', unit: 'tsp' },
        { name: 'Black pepper', unit: 'tsp' },
        { name: 'Vegetable oil for frying', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Grating Potatoes & Onion', instruction: 'Grate potatoes and onion on a fine box grater, alternating them so the onion juice prevents the potatoes from darkening.' },
        { title: 'Draining Excess Liquid', instruction: 'Transfer grated mixture to a mesh strainer and gently squeeze out excess starch water.' },
        { title: 'Mixing the Batter', instruction: 'Add egg, flour, crushed garlic, a spoonful of sour cream, salt, and black pepper. Stir into a thick batter.' },
        { title: 'Frying until Crisp', instruction: 'Heat oil in a skillet. Spoon portions of batter and flatten slightly. Fry 3-4 minutes per side until crispy golden brown.', tip: 'Serve immediately straight from the pan with chilled sour cream.' }
      ]
    },
    de: {
      title: 'Knusprige Kartoffelpuffer (Deruny) mit Knoblauch',
      description: 'Goldgelb gebratene Kartoffelpuffer nach ukrainischer Art, außen wunderbar knusprig und innen saftig.',
      tags: ['Kartoffelpuffer', 'Ukrainisch', 'Knusprig', 'Herzhaft'],
      ingredients: [
        { name: 'Kartoffeln', unit: 'Stk' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Ei', unit: 'Stk' },
        { name: 'Weizenmehl', unit: 'EL' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Schmand / Saure Sahne (20%)', unit: 'EL' },
        { name: 'Salz', unit: 'TL' },
        { name: 'Schwarzer Pfeffer', unit: 'TL' },
        { name: 'Pflanzenöl zum Braten', unit: 'EL' }
      ],
      instructions: [
        { title: 'Kartoffeln & Zwiebel reiben', instruction: 'Kartoffeln und Zwiebel abwechselnd auf einer feinen Reibe reiben. Der Zwiebelsaft verhindert das Nachdunkeln.' },
        { title: 'Flüssigkeit abgießen', instruction: 'Die Masse in ein Sieb geben und überschüssige Flüssigkeit sanft ausdrücken.' },
        { title: 'Teig anrühren', instruction: 'Ei, Mehl, gepressten Knoblauch, saure Sahne, Salz und Pfeffer unterrühren.' },
        { title: 'Knusprig ausbacken', instruction: 'Öl in einer Pfanne erhitzen. Esslöffelweise Teig hineingeben und 3-4 Minuten pro Seite goldgelb braten.', tip: 'Heiß direkt aus der Pfanne mit kühlem Schmand servieren.' }
      ]
    },
    zh: {
      title: '香脆蒜香土豆煎饼 (Deruny)',
      description: '传统乌克兰经典土豆煎饼，外层焦黄酥脆，内里绵软多汁，配蒜香酸奶油简直绝配。',
      tags: ['土豆饼', '快手小吃', '素食', '家常'],
      ingredients: [
        { name: '土豆', unit: '个' },
        { name: '洋葱', unit: '个' },
        { name: '鸡蛋', unit: '个' },
        { name: '中筋面粉', unit: '汤匙' },
        { name: '大蒜', unit: '瓣' },
        { name: '酸奶油 (20%)', unit: '汤匙' },
        { name: '食盐', unit: '茶匙' },
        { name: '黑胡椒粉', unit: '茶匙' },
        { name: '植物油', unit: '汤匙' }
      ],
      instructions: [
        { title: '细擦土豆与洋葱', instruction: '土豆与洋葱用细擦板擦成细腻泥状，交替擦入可利用洋葱汁防止土豆氧化变黑。' },
        { title: '过滤多余水分', instruction: '将土豆泥倒入滤网轻轻挤出多余水分，沉淀淀粉保留。' },
        { title: '调制面糊', instruction: '加入鸡蛋、面粉、蒜蓉、一勺酸奶油、盐和胡椒粉搅拌均匀。' },
        { title: '热锅煎脆', instruction: '锅中烧热油，舀入面糊压平，中小火两面各煎3-4分钟至边缘金黄香脆。', tip: '出锅趁热配冰凉酸奶油食用风味最佳。' }
      ]
    }
  },

  'varenyky-potato-onion': {
    en: {
      title: 'Homemade Potato & Caramelized Onion Varenyky',
      description: 'Tender Ukrainian stuffed dumplings with creamy mashed potatoes and sweet golden fried onions, served with butter.',
      tags: ['varenyky', 'dumplings', 'potatoes', 'traditional', 'dinner'],
      ingredients: [
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Warm water', unit: 'ml' },
        { name: 'Potatoes', unit: 'g' },
        { name: 'Yellow onions', unit: 'pcs' },
        { name: 'Butter', unit: 'g' },
        { name: 'Vegetable oil', unit: 'tbsp' },
        { name: 'Salt', unit: 'tsp' },
        { name: 'Black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Making the Filling', instruction: 'Boil potatoes in salted water until soft and mash with butter. Sauté finely diced onions in vegetable oil until sweet and caramelized, then fold into potatoes with black pepper.' },
        { title: 'Kneading Hot-Water Dough', instruction: 'Pour hot water and salt into flour, knead into a soft, elastic dough. Cover and rest for 20 minutes.' },
        { title: 'Shaping Varenyky', instruction: 'Roll out dough thinly (2mm), cut circles with a glass, place filling in center, and pinch edges firmly together in a half-moon.' },
        { title: 'Boiling and Serving', instruction: 'Boil in salted water for 2-3 minutes after they float to the surface. Toss immediately with melted butter and fried onions.', tip: 'Pinch edges tightly with dry fingertips to keep filling sealed during boiling.' }
      ]
    },
    de: {
      title: 'Hausgemachte Wareniki mit Kartoffeln & Schmorzwiebeln',
      description: 'Weiche Teigtaschen gefüllt mit lockerem Kartoffelpüree und süßlich geschmorten Zwiebeln.',
      tags: ['Wareniki', 'Teigtaschen', 'Kartoffeln', 'Traditionell'],
      ingredients: [
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Warmes Wasser', unit: 'ml' },
        { name: 'Kartoffeln', unit: 'g' },
        { name: 'Zwiebeln', unit: 'Stk' },
        { name: 'Butter', unit: 'g' },
        { name: 'Pflanzenöl', unit: 'EL' },
        { name: 'Salz', unit: 'TL' },
        { name: 'Schwarzer Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Füllung zubereiten', instruction: 'Kartoffeln weich kochen und mit Butter stampfen. Zwiebeln würfeln, goldbraun anschwitzen und unter das Püree rühren.' },
        { title: 'Brandteig kneten', instruction: 'Mehl mit heißem Wasser und Salz verkneten, bis ein geschmeidiger Teig entsteht. 20 Min. ruhen lassen.' },
        { title: 'Wareniki formen', instruction: 'Teig dünn ausrollen, Kreise ausstechen, Füllung mittig platzieren und Ränder halbmondförmig fest zusammendrücken.' },
        { title: 'Kochen und servieren', instruction: 'In kochendem Salzwasser 2-3 Minuten ziehen lassen, nachdem sie aufsteigen. Mit geschmolzener Butter servieren.', tip: 'Ränder gut andrücken, damit kein Wasser eindringt.' }
      ]
    },
    zh: {
      title: '手工土豆洋葱水饺 (Varenyky)',
      description: '乌克兰风味手工半月形饺子，包裹绵密土豆泥与焦糖化甜洋葱，淋上脆培根油香气四溢。',
      tags: ['饺子', '主食', '土豆', '面食'],
      ingredients: [
        { name: '中筋面粉', unit: '克' },
        { name: '温水', unit: '毫升' },
        { name: '土豆', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '黄油', unit: '克' },
        { name: '植物油', unit: '汤匙' },
        { name: '食盐', unit: '茶匙' },
        { name: '黑胡椒粉', unit: '茶匙' }
      ],
      instructions: [
        { title: '制作土豆洋葱馅料', instruction: '土豆煮熟压成细腻土豆泥加黄油拌匀。洋葱切小丁用植物油煸炒至焦黄甜香，与土豆泥、黑胡椒拌合调味。' },
        { title: '和烫水饺皮面团', instruction: '面粉加温水与盐揉成光滑柔软的面团，盖盖饧发20分钟。' },
        { title: '包制半月饺', instruction: '面团擀薄至2毫米，用圆形模具压出饺皮，包入馅料并紧紧捏合成波浪花边。' },
        { title: '煮熟装盘', instruction: '下滚水锅沸煮，饺子浮起后再煮2-3分钟捞出，趁热拌入融化黄油与炒洋葱碎。', tip: '捏合边缘务必紧实，避免沸水中破口散馅。' }
      ]
    }
  },

  'varenyky-with-cherries': {
    en: {
      title: 'Sweet Cherry Varenyky with Kefir Dough',
      description: 'Pillowy steamed dumplings bursting with juicy sour cherries, dusted with sugar and drizzled with melted butter or sweet cream.',
      tags: ['varenyky', 'cherries', 'dessert', 'sweet dumplings'],
      ingredients: [
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Kefir (2.5%)', unit: 'ml' },
        { name: 'Baking soda', unit: 'tsp' },
        { name: 'Pitted sour cherries', unit: 'g' },
        { name: 'Sugar', unit: 'tbsp' },
        { name: 'Cornstarch', unit: 'tbsp' },
        { name: 'Salt', unit: 'pinch' }
      ],
      instructions: [
        { title: 'Kneading Kefir Dough', instruction: 'Whisk kefir with soda and salt. Add flour gradually and knead into a soft, pillowy dough. Let rest 15 minutes.' },
        { title: 'Preparing Cherries', instruction: 'Drain cherries well and toss with cornstarch to lock in sweet juices during cooking.' },
        { title: 'Assembling Dumplings', instruction: 'Roll dough thick (3-4mm), cut circles, place 3 cherries and 1/2 tsp sugar inside each, and seal edges tightly.' },
        { title: 'Steaming', instruction: 'Steam over boiling water covered for 5-6 minutes until puffed and cloud-soft.', tip: 'Steaming on cheesecloth keeps kefir varenyky incomparably fluffy!' }
      ]
    },
    de: {
      title: 'Süße Kirsch-Wareniki auf Kefirteig',
      description: 'Locker gedämpfte Teigtaschen mit saftigen Sauerkirschen gefüllt, serviert mit feiner Sahne.',
      tags: ['Wareniki', 'Kirschen', 'Dessert', 'Süßspeise'],
      ingredients: [
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Kefir (2.5%)', unit: 'ml' },
        { name: 'Natron', unit: 'TL' },
        { name: 'Entsteinte Sauerkirschen', unit: 'g' },
        { name: 'Zucker', unit: 'EL' },
        { name: 'Maisstärke', unit: 'EL' },
        { name: 'Salz', unit: 'Prise' }
      ],
      instructions: [
        { title: 'Kefirteig kneten', instruction: 'Kefir mit Natron und Salz mischen, Mehl einarbeiten und zu einem luftigen Teig kneten. 15 Min. ruhen lassen.' },
        { title: 'Kirschen vorbereiten', instruction: 'Kirschen abtropfen lassen und mit Speisestärke vermengen.' },
        { title: 'Wareniki füllen', instruction: 'Teig dick ausrollen, Kirschen und etwas Zucker darauflegen und Ränder fest zusammendrücken.' },
        { title: 'Dämpfen', instruction: 'Im Dampfgarer oder über kochendem Wasser ca. 5-6 Minuten dämpfen.', tip: 'Durch das Dämpfen werden sie herrlich flaumig!' }
      ]
    },
    zh: {
      title: '开胃爆浆酸樱桃甜水饺 (Varenyky)',
      description: '松软多汁的酸樱桃甜点饺，发酵开皮锁住饱满果汁，咬一口爆浆甜润。',
      tags: ['樱桃', '甜点', '特色美食', '面点'],
      ingredients: [
        { name: '中筋面粉', unit: '克' },
        { name: '开菲尔酸奶 (2.5%)', unit: '毫升' },
        { name: '食用小苏打', unit: '茶匙' },
        { name: '去核酸樱桃', unit: '克' },
        { name: '白砂糖', unit: '汤匙' },
        { name: '玉米淀粉', unit: '汤匙' },
        { name: '食盐', unit: '少许' }
      ],
      instructions: [
        { title: '揉制酸奶发酵面团', instruction: '酸奶加入小苏打与盐静置起泡，分次倒入面粉揉成松软面团，饧面15分钟。' },
        { title: '处理樱桃馅', instruction: '沥干樱桃汁水，拌入玉米淀粉以锁住蒸煮时的浓汁。' },
        { title: '包馅捏褶', instruction: '面皮擀至3-4毫米厚，包入3颗樱桃与半茶匙白糖，将边缘双重捏实。' },
        { title: '上锅隔水蒸制', instruction: '蒸锅大火上汽，将饺子隔水盖盖蒸5-6分钟至胀大如云朵般松软。', tip: '隔水蒸比水煮更加完整多汁，面皮松软不破皮。' }
      ]
    }
  },

  'authentic-pasta-carbonara': {
    en: {
      title: 'Authentic Roman Pasta Carbonara (No Cream)',
      description: 'The genuine Roman recipe: al dente spaghetti, crispy guanciale, creamy emulsion of egg yolks and Pecorino Romano with fresh black pepper.',
      tags: ['carbonara', 'pasta', 'italian', 'quick dinner', 'roman'],
      ingredients: [
        { name: 'Spaghetti', unit: 'g' },
        { name: 'Guanciale or thick-cut bacon', unit: 'g', notes: 'cut into strips' },
        { name: 'Egg yolks', unit: 'pcs' },
        { name: 'Whole egg', unit: 'pc' },
        { name: 'Pecorino Romano or Parmesan', unit: 'g', notes: 'finely grated' },
        { name: 'Black pepper', unit: 'tsp', notes: 'freshly cracked' },
        { name: 'Salt', unit: 'tbsp', notes: 'for pasta water' }
      ],
      instructions: [
        { title: 'Crisping the Guanciale', instruction: 'Place sliced guanciale in a cold, dry skillet. Turn heat to medium and render the fat slowly until crisp and golden brown, about 7-8 minutes. Remove skillet from heat.' },
        { title: 'Preparing the Egg-Cheese Mixture', instruction: 'In a bowl, whisk together 3 egg yolks, 1 whole egg, most of the grated Pecorino/Parmesan, and a generous amount of freshly cracked black pepper until a thick paste forms.' },
        { title: 'Cooking the Pasta', instruction: 'Cook spaghetti in a large pot of boiling salted water until al dente (1-2 minutes less than package directions). Reserve half a cup of starchy pasta water!' },
        { title: 'Creating the Silky Emulsion', instruction: 'Transfer hot spaghetti directly into the pan with crisp guanciale. Off the heat, pour in the egg-cheese mixture along with 3-4 tablespoons of hot pasta water. Toss vigorously with tongs. The residual heat creates a glossy, creamy sauce without scrambling the eggs!', tip: 'Never add the egg mixture over direct heat, or it will scramble into an omelet instead of creating a silky emulsion.' }
      ]
    },
    de: {
      title: 'Echte Römische Pasta Carbonara (Ohne Sahne)',
      description: 'Das italienische Original: Al dente Spaghetti, knuspriger Guanciale, samtige Eigelb-Pecorino-Emulsion und frisch gemahlener Pfeffer.',
      tags: ['Carbonara', 'Pasta', 'Italienisch', 'Schnell'],
      ingredients: [
        { name: 'Spaghetti', unit: 'g' },
        { name: 'Guanciale oder durchwachsener Speck', unit: 'g', notes: 'in Streifen geschnitten' },
        { name: 'Eigelb', unit: 'Stk' },
        { name: 'Ganzes Ei', unit: 'Stk' },
        { name: 'Pecorino Romano oder Parmesan', unit: 'g', notes: 'fein gerieben' },
        { name: 'Schwarzer Pfeffer', unit: 'TL', notes: 'frisch gemahlen' },
        { name: 'Salz', unit: 'EL', notes: 'für das Nudelwasser' }
      ],
      instructions: [
        { title: 'Speck anbraten', instruction: 'Den geschnittenen Guanciale oder Speck in eine kalte Pfanne geben. Bei mittlerer Hitze ca. 7-8 Minuten auslassen, bis er knusprig und goldbraun ist. Pfanne von der Hitze nehmen.' },
        { title: 'Ei-Käse-Mischung anrühren', instruction: 'In einer Schüssel 3 Eigelb, 1 ganzes Ei, den Großteil des geriebenen Pecorino/Parmesans und reichlich frisch gemahlenen Pfeffer zu einer dickflüssigen Creme verrühren.' },
        { title: 'Spaghetti kochen', instruction: 'Spaghetti in reichlich Salzwasser al dente kochen (1-2 Minuten kürzer als auf der Packung angegeben). Eine halbe Tasse stärkehaltiges Nudelwasser auffangen!' },
        { title: 'Die sämige Emulsion vollenden', instruction: 'Die heiße Pasta direkt in die Pfanne zum Speck geben. Die Pfanne von der Kochstelle nehmen, die Ei-Käse-Mischung und 3-4 EL Nudelwasser einrühren. Mit der Küchenzange zügig durchschwenken, bis eine samtige Sauce entsteht!', tip: 'Die Eiermischung niemals auf der heißen Herdplatte zugeben, da das Ei sonst stockt.' }
      ]
    },
    zh: {
      title: '正宗罗马卡博纳拉意面（无奶油版）',
      description: '正宗意大利罗马配方：弹牙意面裹满丝滑蛋黄与佩科里诺羊奶酪乳化酱汁，配香脆意式风干猪脸肉与现磨黑胡椒。',
      tags: ['意面', '意式料理', '无奶油', '经典'],
      ingredients: [
        { name: '意大利面', unit: '克' },
        { name: '意式风干猪脸肉或培根', unit: '克', notes: '切细条' },
        { name: '蛋黄', unit: '个' },
        { name: '全蛋', unit: '个' },
        { name: '佩科里诺羊奶酪或帕玛森', unit: '克', notes: '擦细末' },
        { name: '现磨黑胡椒', unit: '茶匙' },
        { name: '食盐', unit: '汤匙', notes: '用于煮面水' }
      ],
      instructions: [
        { title: '煸炒猪脸肉', instruction: '将切好的猪脸肉或培根放入冷锅，开中小火慢慢析出油脂，煎至表面金黄香脆（约7-8分钟），关火离灶。' },
        { title: '调制蛋黄奶酪酱', instruction: '在深碗中打入3个蛋黄和1个全蛋，加入大部分擦好的奶酪碎和大量现磨黑胡椒碎，搅拌均匀成浓稠奶酪糊备用。' },
        { title: '煮制弹牙意面', instruction: '在大锅滚烫的淡盐水中煮意大利面至al dente弹牙状态（比包装时间少煮1-2分钟）。务必盛出半碗富含淀粉的煮面水备用！' },
        { title: '离火乳化成丝滑酱汁', instruction: '捞出滚烫意面直接放入盛有煎肉和油脂的锅中。锅移出火源，倒入蛋黄奶酪糊和3-4汤匙滚烫煮面水。用料理夹快速剧烈翻拌，利用面条余热将蛋黄与油脂乳化为光亮丝滑的意式浓酱！', tip: '严禁在开火状态下倒入蛋液，否则蛋液会瞬间凝固变成炒鸡蛋而非丝滑酱汁。' }
      ]
    }
  },

  'classic-pasta-bolognese': {
    en: {
      title: 'Classic Bolognese Ragu with Tagliatelle',
      description: 'Slow-simmered rich meat ragù with minced beef, sofrito, red wine, tomatoes, and a touch of milk for velvety depth.',
      tags: ['bolognese', 'ragu', 'pasta', 'italian', 'dinner'],
      ingredients: [
        { name: 'Ground beef or pork-beef mix', unit: 'g' },
        { name: 'Pasta (Tagliatelle or Spaghetti)', unit: 'g' },
        { name: 'Canned crushed tomatoes', unit: 'g' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Carrot', unit: 'pc' },
        { name: 'Celery stalk', unit: 'pc' },
        { name: 'Dry red or white wine', unit: 'ml' },
        { name: 'Milk', unit: 'ml' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Olive oil', unit: 'tbsp' },
        { name: 'Salt, black pepper, and oregano', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Sautéing the Soffritto', instruction: 'Finely dice onion, carrot, and celery. Heat olive oil in a heavy Dutch oven and gently sweat the vegetables for 10 minutes until softened and translucent.' },
        { title: 'Browning the Meat', instruction: 'Add minced beef, break it up with a spoon, and brown over medium-high heat until no longer pink. Pour in wine and simmer until alcohol evaporates.' },
        { title: 'Slow Simmering', instruction: 'Stir in crushed tomatoes, garlic, milk, and herbs. Reduce heat to the lowest setting, cover partially, and simmer gently for 60-90 minutes, stirring occasionally.' },
        { title: 'Tossing with Pasta', instruction: 'Cook tagliatelle until al dente, drain, and toss directly into the simmering ragù with a splash of pasta water. Serve with grated Parmesan.', tip: 'Adding milk tenderizes the meat fibers and mellows tomato acidity.' }
      ]
    },
    de: {
      title: 'Klassisches Ragù alla Bolognese mit Tagliatelle',
      description: 'Stundenlang sanft geköcheltes Fleischragout mit Hackfleisch, Soffritto, Rotwein und aromatischen Tomaten.',
      tags: ['Bolognese', 'Pasta', 'Italienisch', 'Rindfleisch'],
      ingredients: [
        { name: 'Rinderhackfleisch', unit: 'g' },
        { name: 'Pasta (Tagliatelle oder Spaghetti)', unit: 'g' },
        { name: 'Gehackte Tomaten aus der Dose', unit: 'g' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Karotte', unit: 'Stk' },
        { name: 'Staudensellerie', unit: 'Stk' },
        { name: 'Trockener Rotwein', unit: 'ml' },
        { name: 'Milch', unit: 'ml' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Olivenöl', unit: 'EL' },
        { name: 'Salz, Pfeffer und Oregano', unit: 'TL' }
      ],
      instructions: [
        { title: 'Soffritto anbraten', instruction: 'Zwiebel, Karotte und Sellerie fein würfeln. In Olivenöl ca. 10 Minuten sanft anschwitzen.' },
        { title: 'Fleisch anbraten & ablöschen', instruction: 'Hackfleisch hinzugeben und krümelig anbraten. Mit Rotwein ablöschen und einkochen lassen.' },
        { title: 'Sanft schmoren', instruction: 'Tomaten, Milch, Knoblauch und Gewürze unterrühren. Bei minimaler Hitze 60-90 Minuten zugedeckt köcheln lassen.' },
        { title: 'Pasta untermischen', instruction: 'Tagliatelle al dente kochen und direkt im Ragù schwenken. Mit frisch geriebenem Parmesan servieren.', tip: 'Die Milch macht das Fleisch unvergleichlich zart.' }
      ]
    },
    zh: {
      title: '经典波隆那肉酱阔面 (Bolognese)',
      description: '慢炖数小时的浓香肉酱，精选牛肉碎、蔬菜碎底与红酒番茄，搭配宽面吸汁入味。',
      tags: ['意面', '肉酱面', '家庭料理', '慢炖'],
      ingredients: [
        { name: '牛肉馅或牛猪混合肉馅', unit: '克' },
        { name: '阔面或意面', unit: '克' },
        { name: '去皮番茄碎罐头', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '胡萝卜', unit: '根' },
        { name: '西芹段', unit: '根' },
        { name: '干红葡萄酒', unit: '毫升' },
        { name: '牛奶', unit: '毫升' },
        { name: '大蒜', unit: '瓣' },
        { name: '橄榄油', unit: '汤匙' },
        { name: '盐、黑胡椒与牛至草', unit: '茶匙' }
      ],
      instructions: [
        { title: '煸炒蔬菜底料 (Soffritto)', instruction: '洋葱、胡萝卜与西芹切成极细碎末，锅中倒入橄榄油小火慢炒10分钟至蔬菜软化出甜香。' },
        { title: '炒散牛肉馅并炝红酒', instruction: '加入牛肉馅大火炒散至变色断生，倒入红酒慢煮至酒精完全蒸发。' },
        { title: '慢火焖炖浓酱', instruction: '加入番茄碎罐头、蒜末、少许牛奶与香草。转微火盖盖慢炖60-90分钟，期间适时搅拌。' },
        { title: '裹汁装盘', instruction: '宽面煮至弹牙沥干，倒入浓郁肉酱锅中快速翻拌吸汁，撒帕玛森干酪末开吃。', tip: '加入少量牛奶能软化牛肉纤维，中和番茄酸涩感。' }
      ]
    }
  },

  'margherita-pizza': {
    en: {
      title: 'Homemade Neapolitan Pizza Margherita',
      description: 'Thin airy crust topped with San Marzano tomato sauce, fresh creamy mozzarella, aromatic basil leaves, and extra virgin olive oil.',
      tags: ['pizza', 'margherita', 'italian', 'baking', 'vegetarian'],
      ingredients: [
        { name: 'All-purpose or bread flour', unit: 'g' },
        { name: 'Lukewarm water', unit: 'ml' },
        { name: 'Instant dry yeast', unit: 'g' },
        { name: 'Fresh mozzarella cheese', unit: 'g' },
        { name: 'Crushed tomatoes (passata)', unit: 'ml' },
        { name: 'Fresh basil leaves', unit: 'leaves' },
        { name: 'Extra virgin olive oil', unit: 'tbsp' },
        { name: 'Fine salt', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Kneading the Dough', instruction: 'Dissolve yeast and olive oil in warm water. Add flour and salt, knead for 8-10 minutes until smooth and elastic. Let proof in a warm spot for 60 minutes.' },
        { title: 'Stretching the Crust', instruction: 'Gently stretch the dough by hand from center outward into a thin circle with a puffy rim. Avoid a rolling pin to keep airy bubbles intact!' },
        { title: 'Topping', instruction: 'Spread tomato passata lightly over the center, sprinkle a pinch of salt, and arrange torn chunks of fresh mozzarella.' },
        { title: 'Baking at Max Heat', instruction: 'Preheat oven to maximum temperature (250°C/480°F+). Bake on a preheated baking sheet or pizza stone for 8-10 minutes until charred and blistered. Garnish with fresh basil leaves.', tip: 'High heat is key to replicating wood-fired oven texture at home.' }
      ]
    },
    de: {
      title: 'Hausgemachte Neapolitanische Pizza Margherita',
      description: 'Dünner, luftiger Teig belegt mit fruchtiger Tomatensauce, frischem Fior di Latte Mozzarella und duftendem Basilikum.',
      tags: ['Pizza', 'Margherita', 'Italienisch', 'Vegetarisch'],
      ingredients: [
        { name: 'Weizenmehl (Type 00 oder 405)', unit: 'g' },
        { name: 'Lauwarmes Wasser', unit: 'ml' },
        { name: 'Trockenhefe', unit: 'g' },
        { name: 'Mozzarella', unit: 'g' },
        { name: 'Passierte Tomaten (Passata)', unit: 'ml' },
        { name: 'Frisches Basilikum', unit: 'Blätter' },
        { name: 'Natives Olivenöl extra', unit: 'EL' },
        { name: 'Feines Salz', unit: 'TL' }
      ],
      instructions: [
        { title: 'Teig zubereiten', instruction: 'Hefe und Öl in warmem Wasser auflösen. Mit Mehl und Salz zu einem geschmeidigen Teig kneten. 60 Min. gehen lassen.' },
        { title: 'Pizzaboden dehnen', instruction: 'Teig mit den Händen von der Mitte nach außen dehnen, um einen fluffigen Rand zu erhalten.' },
        { title: 'Belegen', instruction: 'Mit Tomatensauce bestreichen und mit gezupftem Mozzarella belegen.' },
        { title: 'Heiß backen', instruction: 'Bei maximaler Ofenhitze (250°C+) 8-10 Minuten knusprig backen. Vor dem Servieren mit frischem Basilikum garnieren.', tip: 'Backblech vorheizen für einen krossen Boden.' }
      ]
    },
    zh: {
      title: '手工那不勒斯玛格丽特披萨',
      description: '外脆内软的薄底手工饼皮，铺上圣马扎诺番茄酱、融化马苏里拉奶酪与新鲜罗勒叶。',
      tags: ['披萨', '意式料理', '面点', '素食'],
      ingredients: [
        { name: '高筋面粉或披萨粉', unit: '克' },
        { name: '温水', unit: '毫升' },
        { name: '干酵母', unit: '克' },
        { name: '新鲜马苏里拉奶酪', unit: '克' },
        { name: '番茄泥 (Passata)', unit: '毫升' },
        { name: '新鲜罗勒叶', unit: '片' },
        { name: '特级初榨橄榄油', unit: '汤匙' },
        { name: '细盐', unit: '茶匙' }
      ],
      instructions: [
        { title: '揉面与发酵', instruction: '温水中化开发酵粉与橄榄油，加入面粉与盐揉成光滑弹性面团，温润处密封发酵60分钟至两倍大。' },
        { title: '手工推开饼底', instruction: '用手掌和指腹从中心向四周推开成薄饼，保留外圈稍厚的充气饼边，切勿用擀面杖压死气泡！' },
        { title: '涂酱与铺料', instruction: '饼底均匀抹上一层番茄果泥，撕碎摆上新鲜马苏里拉奶酪块，撒少许盐。' },
        { title: '极限高温烘烤', instruction: '烤箱预热至最高温（250°C以上），放入预热烤盘烘烤8-10分钟至饼边鼓起焦香斑点，出炉撒新鲜罗勒叶。', tip: '高温快烤是薄底披萨外酥里软的绝对秘诀。' }
      ]
    }
  },

  'traditional-lasagna': {
    en: {
      title: 'Traditional Italian Lasagna Bolognese with Béchamel',
      description: 'Layers of tender pasta sheets, hearty slow-cooked beef ragù, velvety silky béchamel sauce, and bubbly golden mozzarella cheese.',
      tags: ['lasagna', 'casserole', 'italian', 'dinner', 'comfort food'],
      ingredients: [
        { name: 'Lasagna sheets', unit: 'sheets' },
        { name: 'Minced beef and pork', unit: 'g' },
        { name: 'Canned peeled tomatoes', unit: 'g' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Whole milk', unit: 'ml' },
        { name: 'Butter', unit: 'g' },
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Ground nutmeg', unit: 'tsp' },
        { name: 'Mozzarella & Parmesan cheese', unit: 'g' },
        { name: 'Salt & black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Simmering the Meat Ragù', instruction: 'Sauté onion with minced meat until browned. Add canned tomatoes, season with salt and pepper, and simmer 30 minutes until rich and thick.' },
        { title: 'Making Silky Béchamel', instruction: 'Melt butter in a saucepan, stir in flour and cook 1 minute. Gradually whisk in warm milk to prevent lumps. Simmer until thickened, season with ground nutmeg.' },
        { title: 'Assembling Layers', instruction: 'Spread a thin layer of béchamel in a baking dish. Layer pasta sheets, meat ragù, béchamel, and cheeses. Repeat for 3-4 layers, finishing generously with béchamel and cheese.' },
        { title: 'Baking', instruction: 'Bake at 180°C (350°F) for 35-40 minutes until bubbly and golden brown on top. Rest for 10 minutes before slicing into squares.', tip: 'Resting before cutting allows the layers to settle cleanly.' }
      ]
    },
    de: {
      title: 'Traditionelle Italienische Lasagne Bolognese',
      description: 'Schichten aus zarten Nudelblättern, würzigem Hackfleischragout, cremiger Béchamelsauce und goldbraun überbackenem Käse.',
      tags: ['Lasagne', 'Auflauf', 'Italienisch', 'Herzhaft'],
      ingredients: [
        { name: 'Lasagneplatten', unit: 'Stk' },
        { name: 'Gemischtes Hackfleisch', unit: 'g' },
        { name: 'Dosentomaten', unit: 'g' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Milch', unit: 'ml' },
        { name: 'Butter', unit: 'g' },
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Muskatnuss', unit: 'TL' },
        { name: 'Mozzarella & Parmesan', unit: 'g' },
        { name: 'Salz & Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Ragù zubereiten', instruction: 'Zwiebel und Hackfleisch anbraten, Tomaten zugeben, würzen und 30 Minuten einkochen.' },
        { title: 'Béchamelsauce kochen', instruction: 'Butter schmelzen, Mehl anschwitzen, Milch unter ständigem Rühren eingießen und andicken lassen. Mit Muskat abschmecken.' },
        { title: 'Lasagne schichten', instruction: 'Béchamel in die Form geben, abwechselnd Lasagneplatten, Fleischsauce, Béchamel und Käse schichten. Mit viel Käse abschließen.' },
        { title: 'Goldgelb backen', instruction: 'Bei 180°C ca. 35-40 Minuten backen. Vor dem Servieren 10 Minuten ruhen lassen.', tip: 'Kurz ruhen lassen, damit die Stücke stabil bleiben.' }
      ]
    },
    zh: {
      title: '意式经典千层面 (Lasagna Bolognese)',
      description: '多层爽滑面皮夹裹慢熬牛肉酱、丝滑白酱与拉丝马苏里拉奶酪，烤至金黄焦脆浓郁拉丝。',
      tags: ['千层面', '烤箱料理', '意式美食', '芝士拉丝'],
      ingredients: [
        { name: '千层面皮', unit: '片' },
        { name: '猪牛混合肉馅', unit: '克' },
        { name: '番茄碎罐头', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '鲜牛奶', unit: '毫升' },
        { name: '黄油', unit: '克' },
        { name: '中筋面粉', unit: '克' },
        { name: '肉豆蔻粉', unit: '茶匙' },
        { name: '马苏里拉与帕玛森奶酪', unit: '克' },
        { name: '盐与黑胡椒', unit: '茶匙' }
      ],
      instructions: [
        { title: '慢炖肉酱', instruction: '洋葱碎与肉馅炒香炒散，倒入番茄碎罐头加盐和黑胡椒，焖煮30分钟至浓稠。' },
        { title: '熬煮丝滑白酱 (Béchamel)', instruction: '小锅融化黄油加面粉炒香1分钟，缓缓倒入温牛奶不断用打蛋器抽打至浓稠丝滑，加入肉豆蔻粉调味。' },
        { title: '分层组装', instruction: '烤盘底铺一层白酱，依次铺面皮、肉酱、白酱和奶酪碎，重复3-4层，最顶层铺满厚厚白酱和奶酪。' },
        { title: '烤箱烘烤', instruction: '烤箱180°C烘烤35-40分钟至表面起金黄微焦芝士泡，出炉静置10分钟后切块装盘。', tip: '出炉静置10分钟能使层级定型不易切散。' }
      ]
    }
  },

  'aromatic-shakshuka': {
    en: {
      title: 'Aromatic Shakshuka with Feta & Peppers',
      description: 'Gently poached eggs nestled in a spicy, fragrant simmering tomato and sweet pepper sauce with cumin, paprika, and crumbly feta.',
      tags: ['shakshuka', 'breakfast', 'eggs', 'middle eastern', 'vegetarian'],
      ingredients: [
        { name: 'Fresh eggs', unit: 'pcs' },
        { name: 'Ripe tomatoes', unit: 'pcs', notes: 'or 300g chopped canned tomatoes' },
        { name: 'Sweet bell pepper', unit: 'pc' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Feta cheese', unit: 'g' },
        { name: 'Ground cumin & smoked paprika', unit: 'tsp' },
        { name: 'Olive oil', unit: 'tbsp' },
        { name: 'Salt & black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Sautéing Vegetables', instruction: 'Sauté diced onion and sweet bell pepper in olive oil until tender (6-8 minutes). Stir in minced garlic, cumin, and paprika for 1 minute until fragrant.' },
        { title: 'Simmering Tomato Base', instruction: 'Add chopped tomatoes, season with salt. Simmer over medium heat for 8 minutes until sauce is thick and saucy.' },
        { title: 'Creating Wells & Adding Eggs', instruction: 'Use a spoon to create 4 shallow wells in the sauce. Gently crack an egg into each well, keeping yolks intact.' },
        { title: 'Cooking until Set', instruction: 'Reduce heat, cover, and cook for 5-6 minutes until egg whites are set but yolks remain soft and runny. Scatter crumbled feta and fresh herbs on top.', tip: 'Serve hot directly in the skillet with warm crusty bread for dipping!' }
      ]
    },
    de: {
      title: 'Aromatische Schakschuka mit Paprika & Feta',
      description: 'Pochierte Eier in einer würzig-aromatischen Tomaten-Paprika-Sauce mit Kreuzkümmel, Paprikapulver und cremigem Feta.',
      tags: ['Schakschuka', 'Frühstück', 'Eier', 'Vegetarisch'],
      ingredients: [
        { name: 'Eier', unit: 'Stk' },
        { name: 'Reife Tomaten', unit: 'Stk', notes: 'oder 300g stückige Tomaten' },
        { name: 'Paprikaschote', unit: 'Stk' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Feta', unit: 'g' },
        { name: 'Kreuzkümmel & Paprikapulver', unit: 'TL' },
        { name: 'Olivenöl', unit: 'EL' },
        { name: 'Salz & Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Gemüse anbraten', instruction: 'Zwiebel und Paprika in Olivenöl ca. 6-8 Minuten weich dünsten. Knoblauch und Gewürze 1 Minute mitrösten.' },
        { title: 'Tomatensauce einkochen', instruction: 'Tomaten zugeben, salzen und ca. 8 Minuten sanft einköcheln lassen.' },
        { title: 'Eier hineingeben', instruction: 'Mit einem Löffel 4 Mulden formen und die Eier vorsichtig hineinschlagen.' },
        { title: 'Stocken lassen', instruction: 'Zugedeckt bei schwacher Hitze ca. 5-6 Minuten garen, bis das Eiweiß fest und das Eigelb noch flüssig ist. Mit Feta bestreuen.', tip: 'Mit warmem Fladenbrot direkt aus der Pfanne genießen!' }
      ]
    },
    zh: {
      title: '浓香北非蛋 (Shakshuka) 配菲达羊酪',
      description: '流心太阳蛋卧于香浓番茄彩椒炖汁中，孜然与甜椒粉香气扑鼻，撒上微咸菲达羊奶酪与欧芹碎。',
      tags: ['北非蛋', '营养早餐', '鸡蛋料理', '素食'],
      ingredients: [
        { name: '鲜鸡蛋', unit: '个' },
        { name: '熟透番茄', unit: '个', notes: '或300克番茄碎' },
        { name: '甜彩椒', unit: '个' },
        { name: '洋葱', unit: '个' },
        { name: '大蒜', unit: '瓣' },
        { name: '菲达羊奶酪', unit: '克' },
        { name: '孜然粉与甜椒粉', unit: '茶匙' },
        { name: '橄榄油', unit: '汤匙' },
        { name: '盐与黑胡椒', unit: '茶匙' }
      ],
      instructions: [
        { title: '煸炒彩椒洋葱', instruction: '平底锅热橄榄油，炒软洋葱丁与彩椒丁（6-8分钟）。加入蒜末、孜然粉与甜椒粉煸炒1分钟激发香气。' },
        { title: '熬煮浓郁番茄酱底', instruction: '加入切碎番茄加盐调味，中小火炖煮8分钟至酱汁浓郁粘稠。' },
        { title: '做窝窝打入鸡蛋', instruction: '用勺子在酱汁中压出4个小窝，将整颗鸡蛋轻打入凹陷处，保持蛋黄完整。' },
        { title: '微火焖至蛋清凝固', instruction: '转小火盖上锅盖焖煮5-6分钟，直至蛋白凝固而蛋黄保持半熟溏心状态。出锅撒捏碎的菲达奶酪与香草。', tip: '配热法棍或皮塔饼蘸取流心蛋黄和浓番茄酱，一口封神！' }
      ]
    }
  }
};
