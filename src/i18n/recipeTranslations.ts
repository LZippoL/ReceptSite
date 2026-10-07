import { Recipe } from '../types';
import { Language } from './types';

export interface LocalizedRecipeData {
  title: string;
  description: string;
  tags?: string[];
  ingredients?: { name: string; unit?: string; notes?: string }[];
  instructions?: { title: string; instruction: string; tip?: string }[];
}

export const RECIPE_TRANSLATIONS: Record<string, Partial<Record<Language, LocalizedRecipeData>>> = {
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
        { name: 'Pinch of salt', unit: 'pinch' },
        { name: 'Butter and oil for frying', unit: 'tbsp' }
      ]
    },
    de: {
      title: 'Fluffige Syrniki (Quarkküchlein)',
      description: 'Zarte osteuropäische Quarkküchlein mit goldbrauner Kruste und cremigem Kern. Perfekt zum Frühstück mit Beeren und Sauerrahm.',
      tags: ['Syrniki', 'Frühstück', 'Quark', 'Pfannkuchen', 'Schnell']
    },
    zh: {
      title: '松软乌克兰香草奶酪松饼 (Syrnyky)',
      description: '外酥里嫩的金黄奶酪小饼，选用农家干酪制作，奶香浓郁，口感顺滑细腻，佐酸奶油或果酱极为美味。',
      tags: ['奶酪松饼', '营养早餐', '甜点', '快手菜']
    }
  },

  'crispy-potato-deruny': {
    en: {
      title: 'Crispy Potato Deruny with Garlic & Sour Cream',
      description: 'Traditional Ukrainian potato pancakes, crisped to golden perfection on the outside and tender inside, served hot with sour cream.',
      tags: ['deruny', 'potato pancakes', 'ukrainian', 'crispy', 'dinner']
    },
    de: {
      title: 'Knusprige Kartoffelpuffer (Deruny) mit Knoblauch',
      description: 'Goldgelb gebratene Kartoffelpuffer nach ukrainischer Art, außen wunderbar knusprig und innen saftig.',
      tags: ['Kartoffelpuffer', 'Ukrainisch', 'Knusprig', 'Herzhaft']
    },
    zh: {
      title: '香脆蒜香土豆饼 (Deruny)',
      description: '传统乌克兰经典土豆煎饼，外层焦黄酥脆，内里绵软多汁，配蒜香酸奶油简直绝配。',
      tags: ['土豆饼', '快手小吃', '素食', '家常']
    }
  },

  'varenyky-potato-onion': {
    en: {
      title: 'Handmade Varenyky with Potatoes & Caramelized Onions',
      description: 'Soft homemade Ukrainian dumplings stuffed with fluffy mashed potatoes and sweet caramelized onions, topped with crispy bacon bits.',
      tags: ['varenyky', 'dumplings', 'potatoes', 'comfort food']
    },
    de: {
      title: 'Hausgemachte Wareniki mit Kartoffeln & Schmorzwiebeln',
      description: 'Weiche Teigtaschen gefüllt mit lockerem Kartoffelpüree und süßlich geschmorten Zwiebeln.',
      tags: ['Wareniki', 'Teigtaschen', 'Kartoffeln', 'Traditionell']
    },
    zh: {
      title: '手工土豆洋葱水饺 (Varenyky)',
      description: '乌克兰风味手工半月形饺子，包裹绵密土豆泥与焦糖化甜洋葱，淋上脆培根油香气四溢。',
      tags: ['饺子', '主食', '土豆', '面食']
    }
  },

  'varenyky-with-cherries': {
    en: {
      title: 'Sweet Cherry Varenyky with Kefir Dough',
      description: 'Pillowy steamed dumplings bursting with juicy sour cherries, dusted with sugar and drizzled with melted butter or sweet cream.',
      tags: ['varenyky', 'cherries', 'dessert', 'sweet dumplings']
    },
    de: {
      title: 'Süße Kirsch-Wareniki auf Kefirteig',
      description: 'Locker gedämpfte Teigtaschen mit saftigen Sauerkirschen gefüllt, serviert mit feiner Sahne.',
      tags: ['Wareniki', 'Kirschen', 'Dessert', 'Süßspeise']
    },
    zh: {
      title: '酸樱桃多汁甜饺子',
      description: '松软开胃的酸樱桃甜点饺，发酵开皮锁住饱满果汁，咬一口爆浆甜润。',
      tags: ['樱桃', '甜点', '特色美食', '面点']
    }
  },

  'authentic-pasta-carbonara': {
    en: {
      title: 'Authentic Roman Pasta Carbonara (No Cream)',
      description: 'The genuine Roman recipe: al dente spaghetti, crispy guanciale, creamy emulsion of egg yolks and Pecorino Romano with fresh black pepper.',
      tags: ['carbonara', 'pasta', 'italian', 'quick dinner', 'roman']
    },
    de: {
      title: 'Echte Römische Pasta Carbonara (Ohne Sahne)',
      description: 'Das italienische Original: Al dente Spaghetti, knuspriger Guanciale, samtige Eigelb-Pecorino-Emulsion und frisch gemahlener Pfeffer.',
      tags: ['Carbonara', 'Pasta', 'Italienisch', 'Schnell']
    },
    zh: {
      title: '正宗罗马卡博纳拉意面（无奶油版）',
      description: '正宗意大利罗马配方：弹牙意面裹满丝滑蛋黄与佩科里诺羊奶酪乳化酱汁，配香脆意式风干猪脸肉与现磨黑胡椒。',
      tags: ['意面', '意式料理', '无奶油', '经典']
    }
  },

  'classic-pasta-bolognese': {
    en: {
      title: 'Classic Bolognese Ragu with Tagliatelle',
      description: 'Slow-simmered rich meat ragù with minced beef, sofrito, red wine, tomatoes, and a touch of milk for velvety depth.',
      tags: ['bolognese', 'ragu', 'pasta', 'italian', 'dinner']
    },
    de: {
      title: 'Klassisches Ragù alla Bolognese mit Tagliatelle',
      description: 'Stundenlang sanft geköcheltes Fleischragout mit Hackfleisch, Soffritto, Rotwein und aromatischen Tomaten.',
      tags: ['Bolognese', 'Pasta', 'Italienisch', 'Rindfleisch']
    },
    zh: {
      title: '经典波隆那肉酱阔面 (Bolognese)',
      description: '慢炖数小时的浓香肉酱，精选牛肉碎、蔬菜碎底与红酒番茄，搭配宽面吸汁入味。',
      tags: ['意面', '肉酱面', '家庭料理', '慢炖']
    }
  },

  'margherita-pizza': {
    en: {
      title: 'Homemade Neapolitan Pizza Margherita',
      description: 'Thin airy crust topped with San Marzano tomato sauce, fresh creamy mozzarella, aromatic basil leaves, and extra virgin olive oil.',
      tags: ['pizza', 'margherita', 'italian', 'baking', 'vegetarian']
    },
    de: {
      title: 'Hausgemachte Neapolitanische Pizza Margherita',
      description: 'Dünner, luftiger Teig belegt mit fruchtiger Tomatensauce, frischem Fior di Latte Mozzarella und duftendem Basilikum.',
      tags: ['Pizza', 'Margherita', 'Italienisch', 'Vegetarisch']
    },
    zh: {
      title: '手工那不勒斯玛格丽特披萨',
      description: '外脆内软的薄底手工饼皮，铺上圣马扎诺番茄酱、融化马苏里拉奶酪与新鲜罗勒叶。',
      tags: ['披萨', '意式烘焙', '奶酪', '素食']
    }
  },

  'traditional-lasagna': {
    en: {
      title: 'Traditional Italian Lasagna al Forno with Béchamel',
      description: 'Layers of silky pasta sheets, rich slow-cooked Bolognese meat ragu, creamy silky béchamel sauce, and melted Parmigiano Reggiano.',
      tags: ['lasagna', 'italian', 'baked', 'comfort food', 'cheese']
    },
    de: {
      title: 'Traditionelle Lasagne al Forno mit Béchamel',
      description: 'Schichten aus zarten Nudelblättern, kräftigem Fleischragout, samtiger Béchamelsauce und überbackenem Parmesan.',
      tags: ['Lasagne', 'Auflauf', 'Italienisch', 'Käse']
    },
    zh: {
      title: '意式经典千层面配白酱 (Lasagna)',
      description: '层层叠叠的手工面皮，夹入慢炖牛肉酱与丝滑白酱，烤至金黄焦脆，奶香四溢。',
      tags: ['千层面', '烤箱料理', '芝士焗', '大餐']
    }
  },

  'aromatic-shakshuka': {
    en: {
      title: 'Aromatic Shakshuka with Feta & Fresh Cilantro',
      description: 'Eggs poached in a simmering, spiced sauce of crushed tomatoes, sweet bell peppers, onions, garlic, and cumin, topped with crumbled feta cheese.',
      tags: ['shakshuka', 'breakfast', 'eggs', 'middle eastern', 'vegetarian']
    },
    de: {
      title: 'Aromatische Shakshuka mit Feta und Koriander',
      description: 'In würziger Tomaten-Paprika-Sauce pochierte Eier mit Kreuzkümmel und cremigem Fetakäse.',
      tags: ['Shakshuka', 'Frühstück', 'Eier', 'Vegetarisch']
    },
    zh: {
      title: '中东番茄北非蛋 (Shakshuka)',
      description: '在浓稠热腾的番茄彩椒香料酱汁中慢煨出半熟流心蛋，撒上菲达奶酪与新鲜香菜，蘸面包绝佳。',
      tags: ['北非蛋', '西式早餐', '番茄鸡蛋', '素食']
    }
  },

  'french-herb-omelette': {
    en: {
      title: 'Delicate French Herb Omelette with Cheese',
      description: 'Classic velvety soft French rolled omelette with fresh fines herbes, melted cheese, and a glossy buttery exterior.',
      tags: ['omelette', 'french', 'breakfast', 'eggs', 'quick']
    },
    de: {
      title: 'Zartes Französisches Kräuteromelett',
      description: 'Cremig gerolltes Omelett mit frischen Kräutern, geschmolzenem Käse und buttrigem Glanz.',
      tags: ['Omelett', 'Frühstück', 'Eier', 'Französisch']
    },
    zh: {
      title: '法式滑嫩香草奶酪欧姆蛋',
      description: '经典法式卷煎蛋，质地轻盈幼滑，内层半凝流心，融化奶酪伴随细香葱欧芹香气。',
      tags: ['煎蛋', '法式早餐', '快手菜', '高蛋白']
    }
  },

  'french-toast-cinnamon': {
    en: {
      title: 'Golden Cinnamon French Toast with Fresh Berries',
      description: 'Thick brioche slices soaked in vanilla egg custard, pan-fried in butter until crisp and golden, dusted with cinnamon sugar.',
      tags: ['french toast', 'breakfast', 'sweet', 'brioche', 'quick']
    },
    de: {
      title: 'Goldene Arme Ritter (French Toast) mit Zimt',
      description: 'In Vanillemilch und Ei getränkte Briochescheiben, in Butter ausgebacken und mit Beeren serviert.',
      tags: ['French Toast', 'Frühstück', 'Süß', 'Zimt']
    },
    zh: {
      title: '香浓肉桂法式吐司配鲜莓果',
      description: '浸润香草蛋奶液的厚切布里欧面包，黄油煎至金黄焦脆，撒上肉桂糖霜与枫糖浆。',
      tags: ['吐司', '下午茶', '甜品', '早餐']
    }
  },

  'creamy-apple-oatmeal': {
    en: {
      title: 'Creamy Oatmeal with Caramelized Apples & Walnuts',
      description: 'Warm wholesome rolled oats simmered in milk and cinnamon, topped with buttery caramelized apples and crunchy roasted walnuts.',
      tags: ['oatmeal', 'breakfast', 'healthy', 'apples', 'vegan']
    },
    de: {
      title: 'Cremiger Haferbrei mit karamellisierten Äpfeln',
      description: 'Warmer Porridge mit Zimt, karamellisierten Apfelspalten und gerösteten Walnüssen.',
      tags: ['Porridge', 'Haferflocken', 'Frühstück', 'Gesund']
    },
    zh: {
      title: '焦糖苹果肉桂暖胃燕麦粥',
      description: '奶香顺滑的天然燕麦，佐以黄油肉桂焦糖苹果块与酥脆烤核桃，能量满格。',
      tags: ['燕麦粥', '健康轻食', '低卡早餐', '素食']
    }
  },

  'caesar-salad-chicken': {
    en: {
      title: 'Classic Chicken Caesar Salad with Garlic Croutons',
      description: 'Crisp Romaine lettuce, tender grilled chicken breast, shaved Parmesan, crunchy garlic herb croutons, and authentic Caesar dressing.',
      tags: ['caesar', 'salad', 'chicken', 'lunch', 'healthy']
    },
    de: {
      title: 'Klassischer Caesar Salad mit Hähnchen',
      description: 'Knackiger Römersalat, gegrillte Hähnchenbrust, gehobelter Parmesan, Knoblauchcroutons und feines Caesar-Dressing.',
      tags: ['Caesar Salad', 'Salat', 'Hähnchen', 'Gesund']
    },
    zh: {
      title: '经典香煎鸡胸凯撒沙拉',
      description: '清脆罗马生菜搭配鲜嫩多汁鸡胸肉、蒜香烤面包粒、帕玛森奶酪薄片与秘制凯撒酱。',
      tags: ['沙拉', '轻食减脂', '鸡胸肉', '午餐']
    }
  },

  'authentic-greek-salad': {
    en: {
      title: 'Authentic Greek Salad (Horiatiki) with Kalamata Olives',
      description: 'Juicy vine-ripened tomatoes, crisp cucumbers, sweet red onions, Kalamata olives, and a thick block of Greek feta drizzled with EVOO and oregano.',
      tags: ['greek salad', 'salad', 'mediterranean', 'healthy', 'vegetarian']
    },
    de: {
      title: 'Griechischer Bauernsalat mit Feta und Oliven',
      description: 'Sonnengereifte Tomaten, Gurken, rote Zwiebeln, Kalamata-Oliven und echter griechischer Schafskäse mit Olivenöl und Oregano.',
      tags: ['Griechischer Salat', 'Salat', 'Mediterran', 'Vegetarisch']
    },
    zh: {
      title: '经典希腊田园沙拉配卡拉马塔橄榄',
      description: '多汁红番茄、清爽黄瓜、甜紫洋葱与整块希腊优质菲达奶酪，淋特级初榨橄榄油与牛至草。',
      tags: ['希腊沙拉', '地中海饮食', '生酮低碳', '素食']
    }
  },

  'tuna-egg-cucumber-salad': {
    en: {
      title: 'High-Protein Tuna, Boiled Egg & Cucumber Salad',
      description: 'A light yet filling protein-rich salad with canned tuna chunks, hard-boiled eggs, sweet corn, fresh cucumbers, and lemon Greek yogurt dressing.',
      tags: ['tuna', 'salad', 'high protein', 'fitness', 'quick']
    },
    de: {
      title: 'Proteinreicher Thunfisch-Ei-Salat mit Gurke',
      description: 'Leichter, sättigender Salat mit Thunfischstücken, gekochten Eiern, Mais, Gurken und frischem Kräuterdressing.',
      tags: ['Thunfisch', 'Salat', 'Protein', 'Fitness']
    },
    zh: {
      title: '高蛋白金枪鱼鸡蛋青瓜沙拉',
      description: '水浸金枪鱼块搭配水煮溏心蛋、甜玉米粒与爽口黄瓜，搭配柠檬希腊酸奶酱，减脂增肌必备。',
      tags: ['金枪鱼', '减脂餐', '高蛋白', '快手沙拉']
    }
  },

  'homemade-chicken-noodle-soup': {
    en: {
      title: 'Homemade Chicken Noodle Soup with Egg Noodles',
      description: 'Comforting golden chicken soup simmered with root vegetables, tender pulled chicken meat, fresh egg noodles, and dill.',
      tags: ['chicken soup', 'noodles', 'soup', 'comfort food', 'lunch']
    },
    de: {
      title: 'Hausgemachte Hühnernudelsuppe',
      description: 'Wärmende goldene Hühnersuppe mit zartem Fleisch, Gemüsestreifen, Eiernudeln und frischem Dill.',
      tags: ['Hühnersuppe', 'Suppe', 'Nudeln', 'Klassisch']
    },
    zh: {
      title: '暖心农家手擀蛋面鸡汤',
      description: '金黄澄亮的慢炖老母鸡清汤，配嫩滑鸡肉丝、胡萝卜丝与手工蛋面，驱寒暖胃首选。',
      tags: ['鸡汤', '面条', '暖胃汤品', '家常']
    }
  },

  'creamy-mushroom-soup': {
    en: {
      title: 'Velvety Cream of Wild & Button Mushroom Soup',
      description: 'Earthy sautéed button and porcini mushrooms simmered in vegetable broth and heavy cream, blended until silky and served with thyme.',
      tags: ['mushroom soup', 'creamy soup', 'soup', 'dinner', 'comfort']
    },
    de: {
      title: 'Samtige Champignon-Cremesuppe mit Sahne',
      description: 'Cremig pürierte Pilzsuppe aus frischen Champignons und Kräutern, verfeinert mit Sahne und Thymian.',
      tags: ['Pilzsuppe', 'Cremesuppe', 'Suppe', 'Herbst']
    },
    zh: {
      title: '法式丝滑奶油蘑菇浓汤',
      description: '炒至微焦上色的新鲜口蘑与牛肝菌，融入香浓高汤与稀奶油打成幼滑浓汤，配法棍香脆极了。',
      tags: ['蘑菇浓汤', '西餐浓汤', '奶油汤', '冬日暖饮']
    }
  },

  'pumpkin-soup-seeds': {
    en: {
      title: 'Warming Ginger Pumpkin Soup with Roasted Seeds',
      description: 'Vibrant sweet roasted butternut squash soup with aromatic ginger and coconut cream, topped with crunchy toasted pumpkin seeds.',
      tags: ['pumpkin soup', 'autumn', 'vegan', 'ginger', 'soup']
    },
    de: {
      title: 'Wärmende Kürbis-Ingwer-Cremesuppe mit Kernen',
      description: 'Fein-cremige Suppe aus Hokkaido-Kürbis mit frischem Ingwer, Kokosmilch und gerösteten Kürbiskernen.',
      tags: ['Kürbissuppe', 'Vegan', 'Suppe', 'Herbst']
    },
    zh: {
      title: '暖胃生姜南瓜浓汤配脆烤南瓜籽',
      description: '金黄细腻的烤贝贝南瓜泥，融合微辛生姜与椰浆提香，撒上酥脆烤南瓜籽，口感层次丰富。',
      tags: ['南瓜浓汤', '纯素', '抗氧化', '秋季限定']
    }
  },

  'crispy-baked-chicken-garlic': {
    en: {
      title: 'Crispy Garlic Herb Roast Chicken with Lemon',
      description: 'Golden oven-baked chicken legs with crispy crackling skin, infused with garlic butter, fresh rosemary, and bright lemon slices.',
      tags: ['roast chicken', 'garlic chicken', 'dinner', 'crispy', 'meat']
    },
    de: {
      title: 'Knuspriges Knoblauch-Kräuter-Hähnchen aus dem Ofen',
      description: 'Im Ofen goldbraun gebratene Hähnchenschenkel mit knuspriger Haut, Knoblauchbutter, Rosmarin und Zitrone.',
      tags: ['Hähnchen', 'Geflügel', 'Ofengericht', 'Knusprig']
    },
    zh: {
      title: '迷迭香蒜香柠檬烤鸡',
      description: '表皮烤至金黄酥脆的烤鸡，内里鲜嫩爆汁，黄油蒜香与迷迭香、柠檬香气完美交融。',
      tags: ['烤鸡', '大餐主菜', '西餐肉类', '宴客菜']
    }
  },

  'crispy-bbq-chicken-wings': {
    en: {
      title: 'Sticky Glazed BBQ Chicken Wings',
      description: 'Oven-crisped chicken wings tossed in a sweet, smoky homemade barbecue sauce with honey, garlic, and smoked paprika.',
      tags: ['chicken wings', 'bbq', 'appetizer', 'snack', 'game day']
    },
    de: {
      title: 'Knusprige BBQ Chicken Wings mit Honigglasur',
      description: 'Im Ofen kross gebackene Hähnchenflügel in würzig-süßer rauchiger Barbecue-Sauce.',
      tags: ['Chicken Wings', 'BBQ', 'Fingerfood', 'Snack']
    },
    zh: {
      title: '蜜汁烟熏BBQ脆皮烤鸡翅',
      description: '烤至微焦香脆的鸡中翅，裹满秘制浓稠甜咸烟熏烧烤酱，吮指回味无穷。',
      tags: ['烤鸡翅', '聚会小食', '下酒菜', '快手菜']
    }
  },

  'perfect-ribeye-steak': {
    en: {
      title: 'Perfect Cast-Iron Ribeye Steak with Herb Butter',
      description: 'Restaurant-quality medium-rare ribeye steak seared with a caramelized crust and basted with melted butter, crushed garlic, and fresh rosemary.',
      tags: ['steak', 'ribeye', 'beef', 'dinner', 'chef technique']
    },
    de: {
      title: 'Perfektes Ribeye-Steak mit Rosmarin-Knoblauch-Butter',
      description: 'Auf den Punkt gebratenes Ribeye-Steak aus der Gusseisenpfanne mit aromatischer Kräuterbutter kräftig arrosiert.',
      tags: ['Steak', 'Rindfleisch', 'Fleisch', 'Gourmet']
    },
    zh: {
      title: '铸铁锅厚切肉眼牛排配香草蒜香黄油',
      description: '大火热锅锁住肉汁，焦香诱人的美拉德反应外壳，五分熟粉嫩多汁，淋浇迷迭香黄油芳香四溢。',
      tags: ['牛排', '大厨手法', '精品牛肉', '浪漫晚餐']
    }
  },

  'homemade-juicy-cutlets': {
    en: {
      title: 'Juicy Homemade Meat Cutlets (Kotlety)',
      description: 'Tender Eastern European pan-fried patties made with a blend of ground pork and beef, soaked bread, and onions, crisp outside and juicy inside.',
      tags: ['cutlets', 'meatballs', 'home cooking', 'comfort food', 'pork beef']
    },
    de: {
      title: 'Saftige Hausgemachte Frikadellen (Kotlety)',
      description: 'Traditionelle Fleischküchle aus gemischtem Hackfleisch, außen goldbraun gebraten und innen herrlich saftig.',
      tags: ['Frikadellen', 'Hackfleisch', 'Hausmannskost']
    },
    zh: {
      title: '鲜美爆汁私房家常肉饼 (Kotlety)',
      description: '猪牛混合肉馅拌入吸饱牛奶的面包碎与洋葱末，煎至外皮焦黄紧实，内馅弹嫩多汁。',
      tags: ['肉饼', '家常便饭', '快手下饭菜', '便当菜']
    }
  },

  'honey-mustard-pork-ribs': {
    en: {
      title: 'Sticky Honey-Mustard Glazed Pork Ribs',
      description: 'Fall-off-the-bone tender oven-baked pork ribs brushed with a sweet Dijon mustard and honey glaze.',
      tags: ['pork ribs', 'honey mustard', 'dinner', 'bbq', 'meat']
    },
    de: {
      title: 'Zarte Schweinerippchen mit Honig-Senf-Glasur',
      description: 'Butterzart geschmorte Spareribs aus dem Ofen mit würzig-süßer Honig-Dijon-Glasur.',
      tags: ['Rippchen', 'Schweinefleisch', 'Ofengericht']
    },
    zh: {
      title: '蜜汁第戎芥末慢烤猪小排',
      description: '低温慢烤至脱骨酥烂的猪肋排，刷上金黄透亮的蜂蜜芥末酱汁，甜辣开胃。',
      tags: ['烤排骨', '大菜主餐', '宴席菜', '硬菜']
    }
  },

  'baked-salmon-lemon-dill': {
    en: {
      title: 'Tender Baked Salmon Fillet with Lemon & Dill Butter',
      description: 'Succulent Atlantic salmon fillets baked in parchment with clarified butter, fresh dill, garlic, and bright lemon rounds.',
      tags: ['salmon', 'fish', 'healthy', 'quick dinner', 'omega3']
    },
    de: {
      title: 'Zart Gebrannter Lachs mit Zitrone und Dill',
      description: 'Saftiges Lachsfilet im Ofen gegart mit feiner Dillbutter und frischen Zitronenscheiben.',
      tags: ['Lachs', 'Fisch', 'Gesund', 'Omega3']
    },
    zh: {
      title: '柠檬莳萝黄油香烤三文鱼柳',
      description: '肉质鲜嫩多汁的大西洋三文鱼，烤箱慢烤锁住Omega-3油脂，配柠檬清香与新鲜莳萝。',
      tags: ['三文鱼', '海鲜水产', '健康轻食', '低碳水']
    }
  },

  'mediterranean-baked-dorado': {
    en: {
      title: 'Mediterranean Whole Baked Dorado with Herbs & Olives',
      description: 'Fresh sea bream stuffed with rosemary, garlic, and lemons, roasted on a bed of sweet cherry tomatoes and olives.',
      tags: ['dorado', 'sea bream', 'mediterranean', 'fish', 'healthy']
    },
    de: {
      title: 'Mediterrane Dorade aus dem Ofen mit Kräutern',
      description: 'Ganze Goldbrasse gefüllt mit Rosmarin und Zitrone, auf Kirschtomaten und Oliven gebacken.',
      tags: ['Dorade', 'Fisch', 'Mediterran', 'Leicht']
    },
    zh: {
      title: '地中海迷迭香烤整条金头鲷 (Dorado)',
      description: '整尾新鲜海鱼腹中填入香草蒜片与柠檬，配小番茄与黑橄榄烘烤，鱼皮焦脆鱼肉细嫩。',
      tags: ['海鲈鱼', '烤鱼', '地中海风味', '海鲜']
    }
  },

  'tender-fish-cutlets': {
    en: {
      title: 'Tender White Fish Cakes with Tartar Sauce',
      description: 'Delicate pan-seared patties of minced cod or hake with herbs, fried in butter until golden and crisp.',
      tags: ['fish cakes', 'fish', 'seafood', 'dinner', 'kids friendly']
    },
    de: {
      title: 'Zarte Fischfrikadellen aus Weißfisch',
      description: 'Leichte, saftige Frikadellen aus frischem Kabeljau mit Kräutern, in der Pfanne goldbraun gebraten.',
      tags: ['Fischfrikadellen', 'Fisch', 'Leicht']
    },
    zh: {
      title: '鲜香幼滑白身鱼肉饼配塔塔酱',
      description: '选用新鲜鳕鱼肉或无须鳕打碎手作，少刺清甜，老少皆宜的高蛋白海味家常料理。',
      tags: ['鱼饼', '海鲜', '高蛋白', '儿童辅食']
    }
  },

  'village-garlic-potatoes': {
    en: {
      title: 'Crispy Country-Style Roasted Garlic Potatoes',
      description: 'Rustic potato wedges roasted with smoked paprika, garlic, and thyme until blistered and crispy.',
      tags: ['potatoes', 'roasted potatoes', 'side dish', 'vegan', 'crispy']
    },
    de: {
      title: 'Knusprige Landkartoffeln mit Knoblauch & Paprika',
      description: 'Würzige Kartoffelspalten aus dem Ofen mit geräucherter Paprika, Meersalz und Knoblauch.',
      tags: ['Kartoffeln', 'Beilage', 'Ofengericht', 'Vegan']
    },
    zh: {
      title: '农家蒜香烟熏甜椒烤土豆角',
      description: '连皮带肉的大块新土豆，裹上西班牙烟熏红椒粉与橄榄油，烤至外表起泡香脆内里软糯。',
      tags: ['烤土豆', '经典配菜', '纯素', '家常']
    }
  },

  'traditional-uzbek-plov': {
    en: {
      title: 'Traditional Uzbek Plov with Beef & Carrots',
      description: 'Rich spiced rice pilaf cooked in a heavy cast-iron cauldron with succulent beef, yellow carrots, cumin, and whole roasted garlic heads.',
      tags: ['plov', 'pilaf', 'rice', 'beef', 'traditional']
    },
    de: {
      title: 'Traditioneller Usbekischer Plov mit Rindfleisch',
      description: 'Würziger Reis-Pilaw aus dem Gusseisentopf mit zartem Rindfleisch, Karotten, Kreuzkümmel und Knoblauch.',
      tags: ['Plow', 'Pilaw', 'Reis', 'Rindfleisch']
    },
    zh: {
      title: '传统中亚手抓饭配牛肉与孜然 (Plov)',
      description: '铸铁厚锅焖煮出粒粒分明的香浓羊油或牛油长粒香米，伴着软烂牛肉、甜黄胡萝卜丝与整颗蒜头。',
      tags: ['手抓饭', '焖饭', '牛肉饭', '米食大餐']
    }
  },

  'egg-fried-rice-veggies': {
    en: {
      title: '15-Minute Asian Egg Fried Rice with Crisp Vegetables',
      description: 'Quick wok-tossed leftover rice with scrambled eggs, scallions, carrots, peas, and a dash of sesame oil and soy sauce.',
      tags: ['fried rice', 'egg fried rice', 'asian', 'quick 20m', 'vegetarian']
    },
    de: {
      title: '15-Minuten Gebratener Eierreis mit Gemüse',
      description: 'Schneller Wok-Reis mit Rührei, Frühlingszwiebeln, Erbsen und Sesamöl.',
      tags: ['Gebratener Reis', 'Asiatisch', 'Schnell', 'Vegetarisch']
    },
    zh: {
      title: '15分钟快手经典什锦蛋炒饭',
      description: '粒粒分明裹金黄蛋液的隔夜米饭，大火爆炒出镬气，配清甜脆胡萝卜丁、青豆与葱花。',
      tags: ['蛋炒饭', '主食', '快手菜', '炒饭']
    }
  },

  'thin-crepes-mlyntsi': {
    en: {
      title: 'Delicate Ukrainian Lace Crepes (Mlyntsi)',
      description: 'Silky, paper-thin crepes made with milk and butter, perfect for rolling with sweet berries, Nutella, or savory cottage cheese.',
      tags: ['crepes', 'mlyntsi', 'pancakes', 'breakfast', 'sweet']
    },
    de: {
      title: 'Hauchdünne Ukrainische Pfannkuchen (Mlynzi)',
      description: 'Zarte, goldene Crêpes aus Milch und Butter, ideal zum Füllen mit Beeren, Quark oder Schokolade.',
      tags: ['Pfannkuchen', 'Crêpes', 'Frühstück', 'Süß']
    },
    zh: {
      title: '薄如蝉翼的传统牛奶薄饼 (Mlyntsi)',
      description: '奶香四溢、如蕾丝花边般细腻柔软的煎薄饼，可裹鲜果酱、甜奶酪馅或三文鱼享用。',
      tags: ['薄饼', '法式薄饼', '早餐点心', '下午茶']
    }
  },

  'fluffy-american-pancakes': {
    en: {
      title: 'Extra Fluffy American Diner Pancakes',
      description: 'Thick, airy, golden buttermilk pancakes stacked high and served with butter and pure maple syrup.',
      tags: ['pancakes', 'american pancakes', 'breakfast', 'sweet', 'fluffy']
    },
    de: {
      title: 'Extra Fluffige Amerikanische Pancakes',
      description: 'Dicke, luftige Pfannkuchen gestapelt mit schmelzender Butter und echtem Ahornsirup.',
      tags: ['Pancakes', 'Frühstück', 'Amerikanisch', 'Süß']
    },
    zh: {
      title: '美式松饼热香饼 (American Pancakes)',
      description: '厚实蓬松有如云朵般的经典美式热松饼，叠叠堆起，顶上融化黄油块与晶莹枫糖浆。',
      tags: ['美式松饼', '周末早餐', '早午餐', '甜品']
    }
  },

  'basque-burnt-cheesecake': {
    en: {
      title: 'San Sebastián Basque Burnt Cheesecake',
      description: 'The famous crustless cheesecake with a deeply caramelized dark exterior and an ultra-creamy, custardy molten center.',
      tags: ['cheesecake', 'basque', 'dessert', 'baking', 'gourmet']
    },
    de: {
      title: 'Baskischer Käsekuchen (San Sebastián)',
      description: 'Berühmter Käsekuchen ohne Boden mit dunkel karamellisierter Oberfläche und cremig-schmelzendem Kern.',
      tags: ['Käsekuchen', 'Dessert', 'Backen', 'Spanisch']
    },
    zh: {
      title: '西班牙圣塞巴斯蒂安巴斯克焦香芝士蛋糕',
      description: '风靡全球的无底重乳酪蛋糕，焦糖色微苦微焦的外表下，藏着半熟流心般丝滑绵密的浓郁奶酪芯。',
      tags: ['巴斯克蛋糕', '芝士蛋糕', '烘焙甜品', '免打发']
    }
  },

  'authentic-tiramisu': {
    en: {
      title: 'Authentic Italian Tiramisu with Mascarpone',
      description: 'The quintessential Italian dessert: espresso-soaked savoiardi ladyfingers layered with airy whipped mascarpone cream and dusted with dark cocoa.',
      tags: ['tiramisu', 'italian', 'dessert', 'coffee', 'no bake']
    },
    de: {
      title: 'Echtes Italienisches Tiramisu mit Mascarpone',
      description: 'Klassisches italienisches Schichtdessert aus Espresso-Löffelbiskuits, samtiger Mascarponecreme und Kakao.',
      tags: ['Tiramisu', 'Dessert', 'Italienisch', 'Kaffee']
    },
    zh: {
      title: '正宗意式浓缩咖啡马斯卡彭提拉米苏',
      description: '浸透香浓意式浓缩咖啡与利口酒的手指饼干，交替铺垫蓬松奶香的马斯卡彭乳酪蛋霜，表面筛满纯苦可可粉。',
      tags: ['提拉米苏', '意式甜品', '免烤箱', '经典咖啡甜点']
    }
  },

  'chocolate-lava-cake': {
    en: {
      title: 'Molten Chocolate Lava Cake (Fondant au Chocolat)',
      description: 'Individual warm chocolate cakes with a delicate baked crust and an irresistible warm liquid chocolate molten center.',
      tags: ['lava cake', 'chocolate', 'dessert', 'french', 'baking']
    },
    de: {
      title: 'Schoko-Lava-Kuchen mit flüssigem Kern',
      description: 'Warmer Schokoladenkuchen mit gebackener Hülle und herrlich flüssigem dunklem Schokoladenkern.',
      tags: ['Schokokuchen', 'Dessert', 'Schokolade', 'Backen']
    },
    zh: {
      title: '法式流心熔岩巧克力蛋糕 (Fondant au Chocolat)',
      description: '勺子切开刹那，浓郁微苦的黑巧克力岩浆倾泻而出，外脆内流，冷热交织佐香草冰淇淋绝美。',
      tags: ['熔岩蛋糕', '巧克力', '法式甜点', '浪漫甜品']
    }
  },

  'apple-pie-sharlotka': {
    en: {
      title: 'Classic Fluffy Apple Sharlotka Pie',
      description: 'The easiest and fluffiest three-ingredient sponge cake loaded with tart, juicy sliced apples and dusted with cinnamon powdered sugar.',
      tags: ['sharlotka', 'apple pie', 'baking', 'dessert', 'easy']
    },
    de: {
      title: 'Luftiger Apfelkuchen Scharlotka',
      description: 'Einfacher, herrlich lockerer Biskuit-Apfelkuchen mit vielen saftigen Apfelscheiben und Zimt.',
      tags: ['Apfelkuchen', 'Kuchen', 'Backen', 'Einfach']
    },
    zh: {
      title: '经典蓬松苹果海绵蛋糕 (Sharlotka)',
      description: '无需繁复揉面的果香小蛋糕，满载酸甜多汁的苹果厚片，蛋糕体如戚风般轻盈松软。',
      tags: ['苹果派', '海绵蛋糕', '新手烘焙', '下午茶']
    }
  },

  'homemade-oatmeal-cookies': {
    en: {
      title: 'Chewy Homemade Oatmeal Chocolate Chip Cookies',
      description: 'Crispy edges, soft chewy centers, packed with wholesome rolled oats, warm cinnamon, and pockets of dark chocolate chips.',
      tags: ['cookies', 'oatmeal', 'chocolate chip', 'baking', 'snack']
    },
    de: {
      title: 'Knusprige Haferflocken-Cookies mit Schokodrops',
      description: 'Herrlich mürbe Haferkekse mit feinem Zimt und zartschmelzenden dunklen Schokotropfen.',
      tags: ['Kekse', 'Cookies', 'Haferflocken', 'Backen']
    },
    zh: {
      title: '美式香脆嚼劲燕麦黑巧豆曲奇',
      description: '边缘金黄酥脆、中心软韧多层次，混合燕麦纤维与爆浆黑巧克力豆，香甜饱腹。',
      tags: ['曲奇饼干', '燕麦曲奇', '烘焙小吃', '健康零食']
    }
  },

  'traditional-uzvar': {
    en: {
      title: 'Traditional Ukrainian Dried Fruit Compote (Uzvar)',
      description: 'A deeply aromatic winter beverage simmered from sun-dried apples, smoked pears, and prunes, sweetened with natural wildflower honey.',
      tags: ['uzvar', 'compote', 'drink', 'traditional', 'ukrainian']
    },
    de: {
      title: 'Traditioneller Ukrainischer Usvar (Trockenobst-Kompott)',
      description: 'Aromatisches Traditionsgetränk aus getrockneten Äpfeln, geräucherten Birnen und Pflaumen mit feinem Honig.',
      tags: ['Usvar', 'Getränk', 'Kompott', 'Traditionell']
    },
    zh: {
      title: '传统乌克兰果干暖心果饮 (Uzvar)',
      description: '斯拉夫节日必备传统佳饮，选用烟熏干梨、苹果干与黑李干小火慢熬，以天然野花百花蜜甘甜润喉。',
      tags: ['果饮', '传统特色', '养生茶饮', '冬日热饮']
    }
  },

  'fresh-strawberry-lemonade': {
    en: {
      title: 'Refreshing Fresh Strawberry Mint Lemonade',
      description: 'A bright, thirst-quenching homemade lemonade prepared with fresh blended strawberries, freshly squeezed lemons, and bruised garden mint.',
      tags: ['lemonade', 'strawberry', 'drink', 'summer', 'refreshing']
    },
    de: {
      title: 'Erfrischende Erdbeer-Minz-Limonade',
      description: 'Hausgemachte fruchtige Limonade aus pürierten Sommer-Erdbeeren, frischem Zitronensaft und Minze.',
      tags: ['Limonade', 'Erdbeeren', 'Getränk', 'Sommer']
    },
    zh: {
      title: '清爽手作鲜草莓薄荷柠檬特饮',
      description: '鲜榨酸爽柠檬汁打入新鲜红颜草莓果泥，揉入捣碎的留兰香薄荷叶，冰凉解腻，夏日必备。',
      tags: ['草莓特饮', '柠檬茶', '自制冷饮', '高颜值饮品']
    }
  },

  'green-energy-smoothie': {
    en: {
      title: 'Green Detox Energy Smoothie with Spinach & Banana',
      description: 'Nutrient-rich power smoothie blended with baby spinach, sweet ripe banana, crisp green apple, and creamy plant milk.',
      tags: ['smoothie', 'green smoothie', 'detox', 'healthy', 'vegan']
    },
    de: {
      title: 'Grüner Energie-Detox-Smoothie mit Spinat & Banane',
      description: 'Vitaminreicher grüner Power-Smoothie aus Babyspinat, reifer Banane, grünem Apfel und Pflanzenmilch.',
      tags: ['Smoothie', 'Detox', 'Grün', 'Vegan']
    },
    zh: {
      title: '生机绿意菠菜香蕉排毒轻体思慕雪',
      description: '富含叶绿素与膳食纤维的能量代餐奶昔，嫩菠菜、熟透甜香蕉与青苹果加入杏仁奶打碎，丝滑清甜无青草涩味。',
      tags: ['思慕雪', '轻断食', '排毒果昔', '纯素饮品']
    }
  },

  'quick-chicken-cheese-quesadilla': {
    en: {
      title: 'Quick 15-Minute Cheesy Chicken Quesadilla',
      description: 'Crispy pan-toasted wheat tortillas stuffed with tender seasoned chicken, molten cheese blend, sweet corn, and served with salsa.',
      tags: ['quesadilla', 'mexican', 'quick dinner', 'cheese', 'chicken']
    },
    de: {
      title: 'Schnelle Hähnchen-Käse-Quesadilla aus der Pfanne',
      description: 'Knusprig geröstete Weizentortilla gefüllt mit zartem Hähnchenfleisch, schmelzendem Käse und Paprika.',
      tags: ['Quesadilla', 'Mexikanisch', 'Schnell', 'Käse']
    },
    zh: {
      title: '15分钟快手拉丝鸡肉奶酪墨西哥脆饼 (Quesadilla)',
      description: '平底锅将小麦卷饼烙至双面酥脆金黄，内里夹入多汁熟鸡肉丁、拉丝芝士碎与玉米青椒，趁热切块香脆可口。',
      tags: ['墨西哥馅饼', '快手晚餐', '芝士拉丝', '小吃']
    }
  },

  'tomato-basil-bruschetta': {
    en: {
      title: 'Crispy Italian Bruschetta with Tomatoes & Fresh Basil',
      description: 'Garlic-rubbed toasted crusty ciabatta topped with sweet ripe diced tomatoes, fragrant fresh basil, EVOO, and a drizzle of balsamic glaze.',
      tags: ['bruschetta', 'appetizer', 'italian', 'vegetarian', 'tomatoes']
    },
    de: {
      title: 'Knusprige Italienische Bruschetta mit Tomaten & Basilikum',
      description: 'Geröstetes Ciabatta mit Knoblauch verfeinert, belegt mit marinierten Tomatenwürfeln, Basilikum und Olivenöl.',
      tags: ['Bruschetta', 'Vorspeise', 'Italienisch', 'Vegetarisch']
    },
    zh: {
      title: '香脆经典意式番茄罗勒烤面包片 (Bruschetta)',
      description: '烘烤至香脆焦黄的意式夏巴塔面包片，用整瓣大蒜摩擦生香，堆满特级初榨橄榄油与黑醋腌渍的新鲜罗马番茄丁与罗勒碎。',
      tags: ['意式前菜', '法棍小吃', '聚会小食', '纯素开胃']
    }
  }
};

/**
 * Localizes a recipe object according to the active language.
 * If language is 'uk', returns the original recipe unchanged.
 * If translations exist, merges translated title, description, tags, ingredients, and instructions.
 */
export function getLocalizedRecipe(recipe: Recipe, lang: Language): Recipe {
  if (lang === 'uk') {
    return recipe;
  }

  const recipeTr = RECIPE_TRANSLATIONS[recipe.slug]?.[lang];
  if (!recipeTr) {
    return recipe;
  }

  let ingredients = recipe.ingredients;
  if (recipeTr.ingredients && recipeTr.ingredients.length > 0) {
    ingredients = recipe.ingredients.map((ing, idx) => {
      const trIng = recipeTr.ingredients?.[idx];
      if (!trIng) return ing;
      return {
        ...ing,
        name: trIng.name || ing.name,
        unit: trIng.unit !== undefined ? trIng.unit : ing.unit,
        notes: trIng.notes !== undefined ? trIng.notes : ing.notes
      };
    });
  }

  let instructions = recipe.instructions;
  if (recipeTr.instructions && recipeTr.instructions.length > 0) {
    instructions = recipe.instructions.map((step, idx) => {
      const trStep = recipeTr.instructions?.[idx];
      if (!trStep) return step;
      return {
        ...step,
        title: trStep.title || step.title,
        instruction: trStep.instruction || step.instruction,
        tip: trStep.tip !== undefined ? trStep.tip : step.tip
      };
    });
  }

  return {
    ...recipe,
    title: recipeTr.title || recipe.title,
    description: recipeTr.description || recipe.description,
    tags: recipeTr.tags || recipe.tags,
    ingredients,
    instructions
  };
}
