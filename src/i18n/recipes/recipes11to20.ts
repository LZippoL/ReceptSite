import { Language } from '../types';
import { LocalizedRecipeData } from '../recipeTranslations';

export const RECIPES_11_TO_20: Record<string, Partial<Record<Language, LocalizedRecipeData>>> = {
  'french-herb-omelette': {
    en: {
      title: 'Classic French Herb Rolled Omelette',
      description: 'The iconic French rolled omelette with a silky smooth, pale golden exterior and soft creamy baveuse interior infused with fresh chives and parsley.',
      tags: ['omelette', 'breakfast', 'french cuisine', 'eggs', 'quick'],
      ingredients: [
        { name: 'Fresh eggs', unit: 'pcs' },
        { name: 'Butter', unit: 'g' },
        { name: 'Fresh chives and parsley', unit: 'tbsp', notes: 'finely minced' },
        { name: 'Fine salt', unit: 'pinch' },
        { name: 'White or black pepper', unit: 'pinch' }
      ],
      instructions: [
        { title: 'Whisking the Eggs', instruction: 'Crack eggs into a bowl, season with salt and pepper, and whisk vigorously with a fork until whites and yolks are completely homogeneous without frothing.' },
        { title: 'Rapid Swirling in Butter', instruction: 'Melt butter in a non-stick pan over medium-low heat without browning. Pour in eggs and stir rapidly with a silicone spatula in small circles while shaking the pan back and forth for 60-90 seconds.' },
        { title: 'Folding and Rolling', instruction: 'When eggs form soft curds with a custardy top, tilt the pan forward. Fold the top third down, roll the omelette onto itself toward the edge into a neat cigar shape, and invert onto a plate. Brush with butter and top with fresh herbs.', tip: 'No browning on the outside is the hallmark of classic French technique.' }
      ]
    },
    de: {
      title: 'Klassisches Französisches Kräuter-Omelett',
      description: 'Cremig-zart gerolltes französisches Omelett ohne Bräunung, außen samtig und innen wunderbar saftig (baveuse) mit Schnittlauch und Petersilie.',
      tags: ['Omelett', 'Frühstück', 'Französische Küche', 'Eier', 'Schnell'],
      ingredients: [
        { name: 'Frische Eier', unit: 'Stk' },
        { name: 'Butter', unit: 'g' },
        { name: 'Frische Kräuter (Schnittlauch, Petersilie)', unit: 'EL', notes: 'fein gehackt' },
        { name: 'Feines Salz', unit: 'Prise' },
        { name: 'Weißer oder schwarzer Pfeffer', unit: 'Prise' }
      ],
      instructions: [
        { title: 'Eier verquirlen', instruction: 'Eier mit Salz und Pfeffer mit einer Gabel gründlich verquirlen, bis Eiklar und Eigelb homogen sind.' },
        { title: 'In Butter rühren', instruction: 'Butter in einer beschichteten Pfanne sanft schmelzen. Eier hineingeben und mit einem Spatel schnell kreisen, während die Pfanne gerüttelt wird.' },
        { title: 'Rollen und anrichten', instruction: 'Sobald die Masse cremig gestockt ist, Pfanne schräg halten, Omelett zu einer Zigarre rollen und auf den Teller gleiten lassen. Mit Kräutern bestreuen.', tip: 'Das Omelett sollte außen zartgelb und ohne Bräunung bleiben.' }
      ]
    },
    zh: {
      title: '法式经典香草卷煎欧姆蛋 (Omelette)',
      description: '法式殿堂级经典卷蛋，表面平滑无焦色、内部半熟如嫩豆腐般流心丝滑，点缀鲜细香葱与欧芹碎。',
      tags: ['欧姆蛋', '法式早餐', '鸡蛋料理', '快手'],
      ingredients: [
        { name: '鲜鸡蛋', unit: '个' },
        { name: '黄油', unit: '克' },
        { name: '新鲜细香葱与欧芹', unit: '汤匙', notes: '切极细末' },
        { name: '细海盐', unit: '少许' },
        { name: '白胡椒粉', unit: '少许' }
      ],
      instructions: [
        { title: '叉子快速打散蛋液', instruction: '将鸡蛋打入碗中，加盐和白胡椒粉，用叉子快速挑散直至蛋清与蛋黄完全融合，不要打出过多泡沫。' },
        { title: '融化黄油小火快搅', instruction: '不粘锅小火融化黄油，倒入蛋液，一只手前后晃锅，另一只手持刮刀快速划小圈搅拌，使蛋糊形成均匀细嫩的半凝固蛋凝块。' },
        { title: '倾斜卷边翻折装盘', instruction: '当蛋液底部定型而顶面微稠如奶油时离火，锅身倾斜45度将蛋皮边缘往前轻推卷起成橄榄球雪茄状，扣入盘中抹黄油撒香草碎。', tip: '外表不带任何焦黄斑点是地道法式欧姆蛋的最高标准。' }
      ]
    }
  },

  'french-toast-cinnamon': {
    en: {
      title: 'Golden Cinnamon French Toast with Berries',
      description: 'Thick slices of brioche soaked in rich vanilla-cinnamon egg custard, pan-fried in butter to golden perfection, and dusted with powdered sugar.',
      tags: ['toast', 'breakfast', 'cinnamon', 'sweet', 'berries'],
      ingredients: [
        { name: 'Brioche or challah bread', unit: 'slices' },
        { name: 'Eggs', unit: 'pcs' },
        { name: 'Milk', unit: 'ml' },
        { name: 'Sugar', unit: 'tbsp' },
        { name: 'Ground cinnamon', unit: 'tsp' },
        { name: 'Butter for frying', unit: 'g' },
        { name: 'Fresh berries and honey/maple syrup', unit: 'g' }
      ],
      instructions: [
        { title: 'Making the Custard Dip', instruction: 'In a shallow dish, whisk eggs, milk, sugar, and cinnamon until smooth.' },
        { title: 'Soaking the Bread', instruction: 'Dip bread slices into the custard for 20-30 seconds per side so they soak up the custard without falling apart.' },
        { title: 'Frying to Golden Brown', instruction: 'Melt butter in a skillet over medium heat. Fry toast slices for 2-3 minutes per side until deeply golden and caramelized. Serve warm with berries and honey.', tip: 'Using stale or slightly dried brioche absorbs more custard without becoming soggy.' }
      ]
    },
    de: {
      title: 'Goldbraune Arme Ritter mit Zimt & Beeren',
      description: 'Dicke Briochescheiben in Vanille-Zimt-Eiermilch getränkt, in Butter goldbraun ausgebacken und mit Puderzucker bestäubt.',
      tags: ['French Toast', 'Frühstück', 'Zimt', 'Süßspeise', 'Beeren'],
      ingredients: [
        { name: 'Brioche oder Weißbrot', unit: 'Scheiben' },
        { name: 'Eier', unit: 'Stk' },
        { name: 'Milch', unit: 'ml' },
        { name: 'Zucker', unit: 'EL' },
        { name: 'Zimt', unit: 'TL' },
        { name: 'Butter zum Braten', unit: 'g' },
        { name: 'Frische Beeren & Ahornsirup/Honig', unit: 'g' }
      ],
      instructions: [
        { title: 'Eier-Milch-Mischung anrühren', instruction: 'Eier, Milch, Zucker und Zimt in einer flachen Schale gründlich verquirlen.' },
        { title: 'Brot tränken', instruction: 'Brotscheiben von beiden Seiten je 20-30 Sekunden in die Mischung legen, bis sie vollgesogen sind.' },
        { title: 'In Butter braten', instruction: 'Butter in einer Pfanne schmelzen und die Scheiben bei mittlerer Hitze ca. 2-3 Minuten pro Seite goldgelb braten. Mit Beeren servieren.', tip: 'Brioche vom Vortag eignet sich am besten.' }
      ]
    },
    zh: {
      title: '黄金肉桂法式吐司配鲜果 (French Toast)',
      description: '厚切布里欧修面包浸透香草肉桂蛋奶液，黄油煎至两面焦糖焦香，外酥里嫩如布丁般入口即化。',
      tags: ['吐司', '下午茶', '甜品', '法式早餐'],
      ingredients: [
        { name: '布里欧修或吐司面包', unit: '厚片' },
        { name: '鸡蛋', unit: '个' },
        { name: '鲜牛奶', unit: '毫升' },
        { name: '细砂糖', unit: '汤匙' },
        { name: '肉桂粉', unit: '茶匙' },
        { name: '黄油', unit: '克' },
        { name: '新鲜浆果与蜂蜜/枫糖浆', unit: '克' }
      ],
      instructions: [
        { title: '调制肉桂蛋奶液', instruction: '在宽浅盘中打散鸡蛋，加入牛奶、细砂糖与肉桂粉搅匀至糖融化。' },
        { title: '浸泡厚吐司', instruction: '将厚吐司片放入蛋奶液中，每面浸泡20-30秒，让面包芯完全吸饱液体却不软烂断裂。' },
        { title: '黄油双面慢煎', instruction: '平底锅融化黄油，中火将浸泡好的吐司两面各煎2-3分钟至焦糖金黄香脆。配新鲜浆果淋蜂蜜食用。', tip: '隔夜稍干的面包吸水力更强，煎出内芯格外如布丁嫩滑。' }
      ]
    }
  },

  'creamy-apple-oatmeal': {
    en: {
      title: 'Creamy Apple Cinnamon Oatmeal with Honey',
      description: 'Hearty warm rolled oats cooked in milk with sweet caramelized apples, warm cinnamon, honey, and toasted walnuts.',
      tags: ['oatmeal', 'breakfast', 'healthy', 'apples', 'autumn'],
      ingredients: [
        { name: 'Rolled oats', unit: 'g' },
        { name: 'Milk or plant milk', unit: 'ml' },
        { name: 'Water', unit: 'ml' },
        { name: 'Sweet apple', unit: 'pc' },
        { name: 'Honey', unit: 'tbsp' },
        { name: 'Butter', unit: 'g' },
        { name: 'Ground cinnamon', unit: 'tsp' },
        { name: 'Walnuts', unit: 'g' }
      ],
      instructions: [
        { title: 'Cooking the Oatmeal', instruction: 'Bring milk and water to a gentle boil, stir in oats and a pinch of salt. Simmer over low heat for 5-7 minutes until creamy.' },
        { title: 'Caramelizing Apples', instruction: 'Dice apple. In a small pan, melt butter, add diced apples, cinnamon, and half the honey. Sauté for 3-4 minutes until tender and caramelized.' },
        { title: 'Assembling Bowl', instruction: 'Spoon warm oatmeal into bowls, crown with warm cinnamon apples, drizzle remaining honey, and scatter toasted walnuts.', tip: 'Combining milk and water yields the creamiest texture without heaviness.' }
      ]
    },
    de: {
      title: 'Cremiger Apfel-Zimt-Haferbrei mit Honig',
      description: 'Wärmender Haferbrei auf Milch gekocht mit karamellisierten Apfelstücken, Zimt, Blütenhonig und gerösteten Walnüssen.',
      tags: ['Haferbrei', 'Frühstück', 'Gesund', 'Äpfel', 'Herbstlich'],
      ingredients: [
        { name: 'Haferflocken', unit: 'g' },
        { name: 'Milch oder Pflanzenmilch', unit: 'ml' },
        { name: 'Wasser', unit: 'ml' },
        { name: 'Süßer Apfel', unit: 'Stk' },
        { name: 'Honig', unit: 'EL' },
        { name: 'Butter', unit: 'g' },
        { name: 'Zimt', unit: 'TL' },
        { name: 'Walnüsse', unit: 'g' }
      ],
      instructions: [
        { title: 'Haferbrei kochen', instruction: 'Milch und Wasser aufkochen, Haferflocken einrühren und bei schwacher Hitze 5-7 Minuten cremig einköcheln.' },
        { title: 'Äpfel karamellisieren', instruction: 'Apfel würfeln. In einer Pfanne mit Butter, Zimt und etwas Honig ca. 3-4 Minuten weich dünsten.' },
        { title: 'Anrichten', instruction: 'Haferbrei in Schalen füllen, mit warmen Apfelstücken, Nüssen und Honig garnieren.', tip: 'Die Mischung aus Milch und Wasser sorgt für beste Cremigkeit.' }
      ]
    },
    zh: {
      title: '浓醇肉桂焦糖苹果燕麦粥配核桃',
      description: '暖胃高纤元气早餐，传统燕麦片奶香浓郁炖煮，顶层铺满焦糖肉桂甜苹果丁与香脆核桃碎。',
      tags: ['燕麦', '低脂健康', '苹果', '快手早餐'],
      ingredients: [
        { name: '传统燕麦片', unit: '克' },
        { name: '鲜牛奶或植物奶', unit: '毫升' },
        { name: '清水', unit: '毫升' },
        { name: '脆甜苹果', unit: '个' },
        { name: '天然蜂蜜', unit: '汤匙' },
        { name: '黄油', unit: '克' },
        { name: '肉桂粉', unit: '茶匙' },
        { name: '核桃碎', unit: '克' }
      ],
      instructions: [
        { title: '牛奶燕麦稠煮', instruction: '小锅将牛奶与清水混合煮沸，倒入燕麦片和一小撮盐，转微火搅拌慢熬5-7分钟至顺滑浓稠。' },
        { title: '黄油焦糖煎苹果', instruction: '苹果去皮切小丁。另起平底锅融化黄油，倒入苹果丁、肉桂粉与半勺蜂蜜，翻炒3-4分钟至软糯焦香。' },
        { title: '装碗点缀坚果', instruction: '将热燕麦粥盛入碗中，铺上温热的肉桂苹果丁，淋上剩余蜂蜜，撒上酥脆烤核桃碎趁热享用。', tip: '水奶半对半煮出的燕麦粥口感既清爽又兼具纯正奶香。' }
      ]
    }
  },

  'caesar-salad-chicken': {
    en: {
      title: 'Classic Chicken Caesar Salad with Garlic Croutons',
      description: 'Crisp Romaine lettuce hearts, juicy seasoned grilled chicken breast, crunchy homemade garlic croutons, Parmesan ribbons, and creamy Caesar dressing.',
      tags: ['caesar', 'salad', 'chicken', 'lunch', 'dinner'],
      ingredients: [
        { name: 'Grilled or baked chicken breast', unit: 'g' },
        { name: 'Romaine lettuce hearts', unit: 'head' },
        { name: 'Cherry tomatoes', unit: 'pcs' },
        { name: 'Parmesan cheese', unit: 'g', notes: 'shaved' },
        { name: 'White bread or baguette', unit: 'slices', notes: 'for croutons' },
        { name: 'Mayonnaise or Greek yogurt', unit: 'tbsp' },
        { name: 'Dijon mustard', unit: 'tsp' },
        { name: 'Garlic', unit: 'clove' },
        { name: 'Lemon juice', unit: 'tbsp' },
        { name: 'Olive oil', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Making Crispy Garlic Croutons', instruction: 'Cut bread into cubes. Toss with olive oil, minced garlic, and salt. Bake at 180°C (350°F) for 8-10 minutes until golden and crunchy.' },
        { title: 'Whisking Caesar Dressing', instruction: 'Whisk mayonnaise, Dijon mustard, lemon juice, grated Parmesan, crushed garlic, and a splash of olive oil into a silky dressing.' },
        { title: 'Assembling the Salad', instruction: 'Tear crisp Romaine lettuce into a wide bowl, toss with half the dressing. Top with sliced warm chicken breast, cherry tomato halves, crunchy croutons, and shaved Parmesan.', tip: 'Keep lettuce cold and completely dry for maximum crunch.' }
      ]
    },
    de: {
      title: 'Klassischer Caesar Salad mit Hähnchenbrust',
      description: 'Knackiger Römersalat, saftig gegrillte Hähnchenbruststreifen, goldbraune Knoblauch-Croutons, gehobelter Parmesan und cremiges Caesar-Dressing.',
      tags: ['Caesar Salad', 'Salat', 'Hähnchen', 'Mittagessen'],
      ingredients: [
        { name: 'Hähnchenbrustfilet', unit: 'g' },
        { name: 'Römersalat', unit: 'Kopf' },
        { name: 'Kirschtomaten', unit: 'Stk' },
        { name: 'Parmesan', unit: 'g', notes: 'gehobelt' },
        { name: 'Baguette', unit: 'Scheiben', notes: 'für Croutons' },
        { name: 'Mayonnaise oder Joghurt', unit: 'EL' },
        { name: 'Dijonsenf', unit: 'TL' },
        { name: 'Knoblauch', unit: 'Zehe' },
        { name: 'Zitronensaft', unit: 'EL' },
        { name: 'Olivenöl', unit: 'EL' }
      ],
      instructions: [
        { title: 'Knoblauch-Croutons rösten', instruction: 'Brot würfeln, mit Olivenöl und Knoblauch vermengen und im Ofen bei 180°C ca. 8-10 Minuten goldbraun rösten.' },
        { title: 'Dressing zubereiten', instruction: 'Mayonnaise, Senf, Zitronensaft, geriebenen Parmesan und Knoblauch cremig rühren.' },
        { title: 'Salat anrichten', instruction: 'Römersalat zupfen, mit Dressing vermengen und mit Hähnchenstreifen, Tomaten, Croutons und Parmesanspänen toppen.', tip: 'Salat trocken schleudern für besten Halt des Dressings.' }
      ]
    },
    zh: {
      title: '经典香煎鸡胸肉凯撒沙拉 (Caesar Salad)',
      description: '爽脆罗马生菜心、多汁香煎鸡胸肉条、手工蒜香焦脆法棍丁与帕玛森奶酪薄片，裹满浓郁凯撒酱汁。',
      tags: ['凯撒沙拉', '鸡肉', '健身餐', '减脂轻食'],
      ingredients: [
        { name: '香煎鸡胸肉', unit: '克' },
        { name: '罗马生菜心', unit: '棵' },
        { name: '小番茄（圣女果）', unit: '个' },
        { name: '帕玛森干酪', unit: '克', notes: '刨大薄片' },
        { name: '白面包或法棍', unit: '厚片', notes: '做面包丁' },
        { name: '蛋黄酱或希腊酸奶', unit: '汤匙' },
        { name: '第戎芥末酱', unit: '茶匙' },
        { name: '大蒜', unit: '瓣' },
        { name: '柠檬汁', unit: '汤匙' },
        { name: '橄榄油', unit: '汤匙' }
      ],
      instructions: [
        { title: '烘烤金黄蒜香面包丁', instruction: '法棍切1.5厘米方丁，淋橄榄油蒜末抓匀，烤箱180°C烤8-10分钟至嘎嘣脆香。' },
        { title: '特调凯撒沙拉乳酱', instruction: '蛋黄酱、第戎芥末、柠檬汁、蒜泥、擦碎帕玛森干酪和黑胡椒搅拌乳化成丝滑酱汁。' },
        { title: '撕菜拌酱装盘', instruction: '生菜撕大块擦干水分，拌入大部分凯撒酱，铺上温热切片鸡胸肉、对半切小番茄、脆面包丁与帕玛森大薄片。', tip: '生菜叶洗净后务必完全甩干水分，酱汁才能牢固挂在菜叶上。' }
      ]
    }
  },

  'authentic-greek-salad': {
    en: {
      title: 'Authentic Greek Salad (Horiatiki) with Feta & Olives',
      description: 'Crisp sun-ripened tomatoes, crunchy cucumbers, sweet red onions, Kalamata olives, and a slab of creamy Greek feta dusted with oregano and EVOO.',
      tags: ['greek salad', 'salad', 'mediterranean', 'vegetarian', 'summer'],
      ingredients: [
        { name: 'Ripe sweet tomatoes', unit: 'pcs' },
        { name: 'Crisp cucumbers', unit: 'pcs' },
        { name: 'Sweet red onion', unit: 'pc' },
        { name: 'Sweet green or red pepper', unit: 'pc' },
        { name: 'Greek feta cheese block', unit: 'g' },
        { name: 'Kalamata olives', unit: 'g' },
        { name: 'Extra virgin olive oil', unit: 'tbsp' },
        { name: 'Dried oregano', unit: 'tsp' },
        { name: 'Red wine vinegar or lemon juice', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Chopping Vegetables Rustic Style', instruction: 'Cut ripe tomatoes and crunchy cucumbers into chunky bite-sized wedges. Slice sweet onion into thin half-moons and bell pepper into strips.' },
        { title: 'Dressing and Topping with Feta', instruction: 'Toss vegetables and Kalamata olives in a wide bowl with extra virgin olive oil, a splash of vinegar, and salt. Top with the whole block or large chunks of feta, sprinkle generously with aromatic dried oregano, and drizzle extra olive oil.', tip: 'Never add lettuce to authentic Greek Horiatiki salad.' }
      ]
    },
    de: {
      title: 'Original Griechischer Bauernsalat (Choriatiki) mit Feta',
      description: 'Sonnengereifte Tomaten, knackige Gurken, Kalamata-Oliven und ein Block echter griechischer Feta mit getrocknetem Oregano und feinstem Olivenöl.',
      tags: ['Griechischer Salat', 'Salat', 'Mediterran', 'Vegetarisch'],
      ingredients: [
        { name: 'Sonnengereifte Tomaten', unit: 'Stk' },
        { name: 'Knackige Gurken', unit: 'Stk' },
        { name: 'Rote Zwiebel', unit: 'Stk' },
        { name: 'Paprika', unit: 'Stk' },
        { name: 'Feta (aus Schafsmilch)', unit: 'g' },
        { name: 'Kalamata-Oliven', unit: 'g' },
        { name: 'Natives Olivenöl extra', unit: 'EL' },
        { name: 'Getrockneter Oregano', unit: 'TL' },
        { name: 'Rotweinessig oder Zitronensaft', unit: 'TL' }
      ],
      instructions: [
        { title: 'Gemüse rustikal schneiden', instruction: 'Tomaten und Gurken in grobe Stücke schneiden. Zwiebel in feine Halbringe und Paprika in Streifen schneiden.' },
        { title: 'Mischen und mit Feta vollenden', instruction: 'Gemüse und Oliven mit bestem Olivenöl und Essig vermengen. Den Feta im Ganzen darauflegen und reichlich Oregano darüber streuen.', tip: 'Echter griechischer Salat enthält niemals Blattsalat.' }
      ]
    },
    zh: {
      title: '正宗希腊乡村沙拉 (Horiatiki) 配菲达羊酪',
      description: '地中海阳光风味，红熟甜番茄、爽口青瓜、卡拉马塔黑橄榄与整块希腊菲达羊奶酪，淋特级初榨橄榄油与牛至香草。',
      tags: ['希腊沙拉', '地中海风味', '减脂素食', '爽口'],
      ingredients: [
        { name: '成熟甜番茄', unit: '个' },
        { name: '清脆小黄瓜', unit: '根' },
        { name: '紫洋葱', unit: '个' },
        { name: '甜青椒或红椒', unit: '个' },
        { name: '希腊菲达羊奶酪整块', unit: '克' },
        { name: '卡拉马塔黑橄榄', unit: '克' },
        { name: '特级初榨橄榄油', unit: '汤匙' },
        { name: '干燥牛至碎 (Oregano)', unit: '茶匙' },
        { name: '红酒醋或柠檬汁', unit: '茶匙' }
      ],
      instructions: [
        { title: '粗犷切配新鲜蔬菜', instruction: '番茄滚刀切大角块，黄瓜切厚片，紫洋葱切细丝，彩椒切条状，保持地中海乡村大块口感。' },
        { title: '拌油醋汁顶铺整块菲达', instruction: '将蔬菜与黑橄榄盛入大浅盘，淋特级初榨橄榄油与少许红酒醋抓拌，顶部完整摆上一整厚块菲达奶酪，厚撒牛至粉与黑胡椒。', tip: '传统地道希腊沙拉绝不加任何叶菜（生菜），纯享果蔬与羊酪原味。' }
      ]
    }
  },

  'tuna-egg-cucumber-salad': {
    en: {
      title: 'High-Protein Tuna, Egg & Cucumber Salad',
      description: 'Quick nutritious fitness salad with canned chunk tuna, hard-boiled eggs, sweet canned corn, crisp cucumbers, and fresh herbs.',
      tags: ['tuna', 'salad', 'high protein', 'fitness', 'quick'],
      ingredients: [
        { name: 'Canned tuna in own juice or olive oil', unit: 'can' },
        { name: 'Hard-boiled eggs', unit: 'pcs' },
        { name: 'Fresh cucumbers', unit: 'pcs' },
        { name: 'Canned sweet corn', unit: 'g' },
        { name: 'Green onions and fresh dill', unit: 'bunch' },
        { name: 'Greek yogurt or light mayonnaise', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Prepping Ingredients', instruction: 'Drain liquid from tuna can and flake meat gently with a fork. Dice hard-boiled eggs and crisp cucumbers into equal cubes.' },
        { title: 'Mixing and Dressing', instruction: 'Combine tuna, eggs, cucumber, sweet corn, and chopped herbs in a bowl. Fold in Greek yogurt or light mayo, season with salt and black pepper.', tip: 'Using Greek yogurt makes this salad low-calorie and extra protein-packed!' }
      ]
    },
    de: {
      title: 'Proteinreicher Thunfisch-Ei-Gurken-Salat',
      description: 'Schneller, sättigender Fitness-Salat aus saftigem Thunfisch, gekochten Eiern, Mais, knackiger Gurke und Kräuter-Dressing.',
      tags: ['Thunfisch', 'Salat', 'Proteinreich', 'Fitness', 'Schnell'],
      ingredients: [
        { name: 'Thunfisch aus der Dose (im eigenen Saft)', unit: 'Dose' },
        { name: 'Hartgekochte Eier', unit: 'Stk' },
        { name: 'Frische Gurken', unit: 'Stk' },
        { name: 'Dosenmais', unit: 'g' },
        { name: 'Frühlingszwiebeln & Dill', unit: 'Bund' },
        { name: 'Griechischer Joghurt oder leichte Mayo', unit: 'EL' }
      ],
      instructions: [
        { title: 'Zutaten vorbereiten', instruction: 'Thunfisch abtropfen lassen und zerzupfen. Gekochte Eier und Gurke in Würfel schneiden.' },
        { title: 'Vermengen', instruction: 'Alle Zutaten mit Mais und gehackten Kräutern in eine Schüssel geben. Mit Joghurt, Salz und Pfeffer abschmecken.', tip: 'Griechischer Joghurt spart Kalorien und liefert Extra-Protein.' }
      ]
    },
    zh: {
      title: '高蛋白金枪鱼鸡蛋脆黄瓜健身沙拉',
      description: '减脂期高蛋白快手沙拉，水浸金枪鱼肉块、水煮蛋、清脆小黄瓜与甜玉米粒，拌希腊酸奶低卡清爽。',
      tags: ['金枪鱼', '沙拉', '高蛋白', '减脂健身', '快手'],
      ingredients: [
        { name: '水浸或油浸金枪鱼罐头', unit: '罐' },
        { name: '全熟水煮蛋', unit: '个' },
        { name: '清脆小黄瓜', unit: '根' },
        { name: '甜玉米粒罐头', unit: '克' },
        { name: '小葱与新鲜莳萝草', unit: '把' },
        { name: '无糖希腊酸奶或轻卡蛋黄酱', unit: '汤匙' }
      ],
      instructions: [
        { title: '切碎食材', instruction: '金枪鱼倒出沥干汁水，用叉子压成均匀肉块。熟鸡蛋与黄瓜切成整齐小方丁。' },
        { title: '拌匀调味', instruction: '将鱼肉、蛋丁、黄瓜丁、玉米粒和香草碎放入大碗，加入希腊酸奶、盐和黑胡椒翻拌均匀即可。', tip: '用希腊酸奶替代蛋黄酱，热量立减一半，高蛋白更饱腹。' }
      ]
    }
  },

  'homemade-chicken-noodle-soup': {
    en: {
      title: 'Comforting Homemade Chicken Noodle Soup',
      description: 'Golden rich homemade chicken broth loaded with tender shredded chicken, tender root vegetables, silky egg noodles, and fresh fragrant dill.',
      tags: ['chicken soup', 'noodles', 'soup', 'comfort food', 'lunch'],
      ingredients: [
        { name: 'Chicken thighs or drumsticks', unit: 'g' },
        { name: 'Egg noodles', unit: 'g' },
        { name: 'Carrot', unit: 'pc' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Potatoes', unit: 'pcs' },
        { name: 'Bay leaves', unit: 'pcs' },
        { name: 'Fresh dill', unit: 'bunch' },
        { name: 'Water', unit: 'L' },
        { name: 'Salt & peppercorns', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Simmering Golden Broth', instruction: 'Place chicken pieces in a stockpot with cold water, a whole peeled onion, bay leaves, and black peppercorns. Bring to a boil, skim off foam, and simmer gently on low for 35 minutes.' },
        { title: 'Adding Root Vegetables', instruction: 'Discard the boiled onion. Add diced potatoes and sliced carrot rounds. Simmer for 10 minutes until vegetables are just tender.' },
        { title: 'Noodles & Fresh Dill', instruction: 'Stir in egg noodles, season with salt, and cook for 4 minutes until noodles are tender. Turn off heat, stir in finely chopped dill, and rest covered for 5 minutes.', tip: 'Simmering with bone-in chicken thighs produces the most golden broth.' }
      ]
    },
    de: {
      title: 'Hausgemachte Hühnernudelsuppe (Comfort Soup)',
      description: 'Goldgelbe, wärmende Hühnersuppe mit zartem Hähnchenfleisch, feinen Eiernudeln, Möhren und frischem Dill.',
      tags: ['Hühnersuppe', 'Nudelsuppe', 'Suppe', 'Comfort Food'],
      ingredients: [
        { name: 'Hähnchenschenkel', unit: 'g' },
        { name: 'Eiernudeln', unit: 'g' },
        { name: 'Karotte', unit: 'Stk' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Kartoffeln', unit: 'Stk' },
        { name: 'Lorbeerblätter', unit: 'Stk' },
        { name: 'Frischer Dill', unit: 'Bund' },
        { name: 'Wasser', unit: 'L' },
        { name: 'Salz & Pfefferkörner', unit: 'TL' }
      ],
      instructions: [
        { title: 'Brühe ansetzen', instruction: 'Hähnchen mit kaltem Wasser, ganzer Zwiebel, Lorbeer und Pfefferkörnern aufkochen, abschöpfen und 35 Min. sanft sieden.' },
        { title: 'Gemüse zugeben', instruction: 'Zwiebel entfernen. Kartoffelwürfel und Karottenscheiben zugeben und 10 Minuten köcheln lassen.' },
        { title: 'Nudeln & Dill', instruction: 'Nudeln einstreuen, salzen und 4 Minuten garen. Herd ausschalten, Dill einrühren und 5 Min. ziehen lassen.', tip: 'Hähnchen mit Knochen ergibt die kräftigste goldene Brühe.' }
      ]
    },
    zh: {
      title: '金汤家常土鸡鸡蛋手擀面汤 (Chicken Soup)',
      description: '暖胃治愈系金黄土鸡高汤，炖出澄澈鲜香鸡油，搭配滑嫩手擀蛋面、胡萝卜厚片与清爽莳萝草。',
      tags: ['鸡汤面', '暖胃面食', '家常靓汤', '舒适料理'],
      ingredients: [
        { name: '带骨鸡腿或鸡肉块', unit: '克' },
        { name: '鸡蛋细面或宽面', unit: '克' },
        { name: '胡萝卜', unit: '根' },
        { name: '洋葱', unit: '个' },
        { name: '土豆', unit: '个' },
        { name: '香叶', unit: '片' },
        { name: '新鲜莳萝草', unit: '把' },
        { name: '清水', unit: '升' },
        { name: '盐与黑胡椒粒', unit: '茶匙' }
      ],
      instructions: [
        { title: '慢熬金黄鸡汤', instruction: '鸡肉冷水下锅，放入整颗去皮洋葱、香叶和黑胡椒粒。大火烧开撇去浮沫，转微火慢炖35分钟至鸡肉软烂、汤色澄黄。' },
        { title: '下根茎蔬菜煮软', instruction: '捞出煮软的洋葱弃之。加入切块土豆与胡萝卜圆片，中火煮10分钟至蔬菜熟软。' },
        { title: '下面条与香草出锅', instruction: '下入鸡蛋面加盐调味煮4分钟至面条断生。关火撒入切碎莳萝草，盖盖焖香5分钟即可装碗。', tip: '带骨鸡腿慢炖出的天然鸡油能赋予汤汁金黄透亮的诱人色泽。' }
      ]
    }
  },

  'creamy-mushroom-soup': {
    en: {
      title: 'Velvety Creamy Forest Mushroom Soup',
      description: 'Rich and earthy puréed mushroom soup made with pan-caramelized button mushrooms, aromatic garlic, sweet cream, and a hint of nutmeg.',
      tags: ['mushroom soup', 'cream soup', 'soup', 'vegetarian', 'dinner'],
      ingredients: [
        { name: 'Fresh brown or white mushrooms', unit: 'g' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Potato', unit: 'pc' },
        { name: 'Heavy cream (20%)', unit: 'ml' },
        { name: 'Butter', unit: 'g' },
        { name: 'Garlic', unit: 'cloves' },
        { name: 'Vegetable broth or water', unit: 'ml' },
        { name: 'Salt & ground nutmeg', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Caramelizing Mushrooms & Garlic', instruction: 'Slice mushrooms and onions. Sauté in melted butter with minced garlic for 10 minutes until deeply browned and caramelized.' },
        { title: 'Simmering with Potato', instruction: 'Add diced potato, pour in hot broth or water, and simmer for 12 minutes until potatoes are fork-tender.' },
        { title: 'Puréeing and Adding Cream', instruction: 'Purée soup with an immersion blender until velvety smooth. Pour in warm cream, season with salt and fragrant ground nutmeg, and heat gently for 2 minutes without boiling.', tip: 'Sautéing mushrooms until deep brown develops profound umami depth.' }
      ]
    },
    de: {
      title: 'Samtige Champignon-Cremesuppe mit Muskat',
      description: 'Cremig pürierte Pilzsuppe aus scharf angebratenen Champignons, Kartoffeln, feiner Sahne und frisch geriebener Muskatnuss.',
      tags: ['Pilzsuppe', 'Cremesuppe', 'Suppe', 'Vegetarisch'],
      ingredients: [
        { name: 'Frische Champignons', unit: 'g' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Kartoffel', unit: 'Stk' },
        { name: 'Sahne (20%)', unit: 'ml' },
        { name: 'Butter', unit: 'g' },
        { name: 'Knoblauch', unit: 'Zehen' },
        { name: 'Gemüsebrühe oder Wasser', unit: 'ml' },
        { name: 'Salz & Muskatnuss', unit: 'TL' }
      ],
      instructions: [
        { title: 'Pilze scharf anbraten', instruction: 'Champignons und Zwiebel schneiden. In Butter mit Knoblauch ca. 10 Minuten bräunen.' },
        { title: 'Kartoffeln weich kochen', instruction: 'Gewürfelte Kartoffel und heiße Brühe zugeben und 12 Minuten weich garen.' },
        { title: 'Pürieren & Sahne unterrühren', instruction: 'Mit dem Pürierstab fein pürieren, Sahne und Muskat einrühren und kurz erhitzen.', tip: 'Starkes Anbraten der Pilze bringt das intensivste Aroma hervor.' }
      ]
    },
    zh: {
      title: '丝滑香浓法式奶油口蘑浓汤 (Creamy Mushroom Soup)',
      description: '焦糖香气浓郁的法式蘑菇浓汤，选用口蘑炒至深褐焦香打碎，融入丝滑鲜奶油与现磨肉豆蔻粉。',
      tags: ['蘑菇浓汤', '奶油汤', '西餐经典', '素食浓汤'],
      ingredients: [
        { name: '新鲜口蘑（双孢菇）', unit: '克' },
        { name: '洋葱', unit: '个' },
        { name: '土豆', unit: '个' },
        { name: '动物鲜奶油 (20%)', unit: '毫升' },
        { name: '黄油', unit: '克' },
        { name: '大蒜', unit: '瓣' },
        { name: '蔬菜高汤或温水', unit: '毫升' },
        { name: '盐与现磨肉豆蔻粉', unit: '茶匙' }
      ],
      instructions: [
        { title: '黄油煸炒焦香口蘑', instruction: '口蘑与洋葱切片。厚底锅融化黄油，加蒜末翻炒蘑菇10分钟至蘑菇完全析出水分并煎至深焦黄色。' },
        { title: '加入土豆块炖软', instruction: '加入切细小土豆丁，倒入热高汤没过食材，中小火炖煮12分钟至土豆完全粉软。' },
        { title: '均质破壁加入鲜奶油', instruction: '用手持均质料理棒将浓汤打至如丝缎般细腻顺滑。倒入温鲜奶油、调入盐与肉豆蔻粉，微火加热2分钟切勿大沸。', tip: '蘑菇一定要炒到焦黄上色，才能释放浓郁的美拉德鲜香。' }
      ]
    }
  },

  'pumpkin-soup-seeds': {
    en: {
      title: 'Velvety Roasted Pumpkin Soup with Crunchy Seeds',
      description: 'Vibrant golden autumn pumpkin soup with aromatic ginger, mild yellow curry, coconut milk, and toasted pumpkin seed garnish.',
      tags: ['pumpkin soup', 'autumn', 'vegan', 'soup', 'healthy'],
      ingredients: [
        { name: 'Peeled pumpkin flesh (Butternut or Hokkaido)', unit: 'g' },
        { name: 'Carrot', unit: 'pc' },
        { name: 'Yellow onion', unit: 'pc' },
        { name: 'Fresh ginger, grated', unit: 'tsp' },
        { name: 'Coconut milk or dairy milk', unit: 'ml' },
        { name: 'Pumpkin seeds', unit: 'g' },
        { name: 'Olive oil', unit: 'tbsp' },
        { name: 'Salt & mild curry powder', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Sautéing and Simmering Vegetables', instruction: 'Sauté chopped onion, carrot, and diced pumpkin in olive oil for 5 minutes. Stir in grated ginger and curry powder, add 400ml water, and simmer 20 minutes until tender.' },
        { title: 'Puréeing with Coconut Milk', instruction: 'Purée vegetables with an immersion blender until silky smooth. Pour in coconut milk and season with salt.' },
        { title: 'Garnishing and Serving', instruction: 'Toast pumpkin seeds in a dry pan until puffed. Ladle warm soup into bowls, swirl olive oil, and scatter crunchy seeds.', tip: 'A pinch of grated fresh ginger balances the natural sweetness of pumpkin.' }
      ]
    },
    de: {
      title: 'Samtige Kürbis-Ingwer-Cremesuppe mit Kernen',
      description: 'Leuchtend goldene Herbstsuppe aus feinem Hokkaido-Kürbis, frischem Ingwer, milder Currynote, Kokosmilch und gerösteten Kernen.',
      tags: ['Kürbissuppe', 'Herbst', 'Vegan', 'Gesund'],
      ingredients: [
        { name: 'Kürbisfruchtfleisch (Hokkaido/Butternut)', unit: 'g' },
        { name: 'Karotte', unit: 'Stk' },
        { name: 'Zwiebel', unit: 'Stk' },
        { name: 'Frischer Ingwer (gerieben)', unit: 'TL' },
        { name: 'Kokosmilch oder Milch', unit: 'ml' },
        { name: 'Kürbiskerne', unit: 'g' },
        { name: 'Olivenöl', unit: 'EL' },
        { name: 'Salz & mildes Currypulver', unit: 'TL' }
      ],
      instructions: [
        { title: 'Gemüse dünsten & kochen', instruction: 'Zwiebel, Karotte und Kürbis in Olivenöl 5 Min. anbraten. Ingwer und Curry zugeben, mit Wasser bedecken und 20 Min. weich kochen.' },
        { title: 'Pürieren', instruction: 'Fein pürieren, Kokosmilch einrühren und mit Salz abschmecken.' },
        { title: 'Servieren', instruction: 'Kürbiskerne in der Pfanne ohne Fett anrösten und auf der warmen Suppe anrichten.', tip: 'Frischer Ingwer verleiht dem Kürbis eine feine Frische.' }
      ]
    },
    zh: {
      title: '金黄生姜椰香南瓜浓汤配脆南瓜籽',
      description: '暖秋治愈系金汤，南瓜块与胡萝卜生姜软炖成泥，调入丝滑椰浆与暖胃咖喱粉，撒烘烤香脆南瓜仁。',
      tags: ['南瓜浓汤', '素食轻食', '秋季限定', '高营养'],
      ingredients: [
        { name: '去皮南瓜肉（板栗南瓜或贝贝南瓜）', unit: '克' },
        { name: '胡萝卜', unit: '根' },
        { name: '洋葱', unit: '个' },
        { name: '新鲜生姜末', unit: '茶匙' },
        { name: '浓椰浆或鲜牛奶', unit: '毫升' },
        { name: '去壳南瓜籽仁', unit: '克' },
        { name: '橄榄油', unit: '汤匙' },
        { name: '盐与温和咖喱粉', unit: '茶匙' }
      ],
      instructions: [
        { title: '炒香并煮软蔬菜', instruction: '橄榄油热锅炒香洋葱丁、胡萝卜丁与南瓜方块5分钟。加入姜末与咖喱粉翻匀，倒入400毫升清水大火烧开，小火炖煮20分钟至南瓜软烂。' },
        { title: '破壁搅拌调入椰浆', instruction: '用料理棒将锅中食材完全打碎成天鹅绒般细腻金泥。倒入浓椰浆与少许盐拌匀微热。' },
        { title: '干焙南瓜籽装盘', instruction: '干平底锅烘烤南瓜籽至鼓起香脆。盛汤入碗，滴几滴橄榄油或椰浆拉花，撒上焦香南瓜仁。', tip: '少许鲜生姜末与咖喱能巧妙中和南瓜的厚重甜腻感。' }
      ]
    }
  },

  'crispy-baked-chicken-garlic': {
    en: {
      title: 'Crispy Oven-Baked Garlic Herb Chicken Thighs',
      description: 'Juicy bone-in chicken thighs roasted to crackling golden perfection with garlic, fresh rosemary, sweet paprika, and zesty lemon.',
      tags: ['baked chicken', 'chicken', 'dinner', 'crispy', 'meat'],
      ingredients: [
        { name: 'Chicken thighs or whole chicken pieces', unit: 'g' },
        { name: 'Garlic cloves', unit: 'cloves' },
        { name: 'Fresh lemon', unit: 'half' },
        { name: 'Fresh rosemary or thyme sprigs', unit: 'sprigs' },
        { name: 'Olive or vegetable oil', unit: 'tbsp' },
        { name: 'Sweet smoked paprika', unit: 'tsp' },
        { name: 'Salt & freshly cracked black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Marinating the Chicken', instruction: 'In a bowl, mix oil, paprika, minced garlic, salt, pepper, and freshly squeezed lemon juice. Rub the marinade thoroughly all over the chicken pieces and under skin. Let rest for 15 minutes.' },
        { title: 'Roasting to Crackling Crisp', instruction: 'Place chicken skin-side up in a baking dish with rosemary sprigs. Roast at 200°C (400°F) for 45-50 minutes until juices run clear and skin is bubbly and deeply crisp.', tip: 'Baste chicken with rendered pan juices every 15 minutes for a lustrous, ultra-crisp skin.' }
      ]
    },
    de: {
      title: 'Knusprig gebackenes Knoblauch-Hähnchen aus dem Ofen',
      description: 'Saftige Hähnchenschenkel im Ofen kross gebacken mit Knoblauch, frischem Rosmarin, Paprika und Zitrone.',
      tags: ['Hähnchen', 'Aus dem Ofen', 'Knusprig', 'Abendessen'],
      ingredients: [
        { name: 'Hähnchenschenkel', unit: 'g' },
        { name: 'Knoblauchzehen', unit: 'Zehen' },
        { name: 'Zitrone', unit: 'halbe' },
        { name: 'Frischer Rosmarin oder Thymian', unit: 'Zweige' },
        { name: 'Oliven- oder Pflanzenöl', unit: 'EL' },
        { name: 'Edelsüß-Paprika', unit: 'TL' },
        { name: 'Salz & schwarzer Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Marinieren', instruction: 'Öl, Paprikapulver, gepressten Knoblauch, Salz, Pfeffer und Zitronensaft mischen. Hähnchen gründlich damit einreiben und 15 Min. ziehen lassen.' },
        { title: 'Knusprig braten', instruction: 'Mit Rosmarinzweigen in eine Auflaufform geben. Bei 200°C ca. 45-50 Minuten backen, bis die Haut goldbraun und herrlich kross ist.', tip: 'Alle 15 Minuten mit dem Bratensaft bepinseln für perfekten Glanz.' }
      ]
    },
    zh: {
      title: '焦香蒜香脆皮迷迭香烤鸡腿',
      description: '外皮金黄酥脆爆汁、肉质鲜嫩多汁的家庭烤鸡腿，大蒜柠檬汁与烟熏红椒粉深度腌渍，迷迭香清香扑鼻。',
      tags: ['烤鸡', '鸡腿', '脆皮', '肉食家常', '硬菜'],
      ingredients: [
        { name: '带皮鸡腿或整鸡块', unit: '克' },
        { name: '大蒜瓣', unit: '瓣' },
        { name: '新鲜柠檬', unit: '半个' },
        { name: '新鲜迷迭香或百里香枝', unit: '枝' },
        { name: '橄榄油或植物油', unit: '汤匙' },
        { name: '甜烟熏红椒粉', unit: '茶匙' },
        { name: '盐与现磨黑胡椒', unit: '茶匙' }
      ],
      instructions: [
        { title: '蒜香红椒深度腌制', instruction: '将油、红椒粉、蒜泥、盐、黑胡椒和鲜榨柠檬汁调匀成腌料。均匀揉搓在鸡肉表面及皮下缝隙，腌渍15分钟入味。' },
        { title: '高温烘烤至皮脆肉嫩', instruction: '鸡皮朝上放入烤盘，铺上新鲜迷迭香枝。烤箱预热200°C烘烤45-50分钟，直至表皮起泡脆响、鸡汁清澈。', tip: '每烤15分钟用毛刷蘸取烤盘底渗出的鸡油刷一遍鸡皮，烤出的外皮格外薄脆油亮。' }
      ]
    }
  }
};
