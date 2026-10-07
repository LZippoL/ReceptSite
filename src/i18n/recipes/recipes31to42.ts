import { Language } from '../types';
import { LocalizedRecipeData } from '../recipeTranslations';

export const RECIPES_31_TO_42: Record<string, Partial<Record<Language, LocalizedRecipeData>>> = {
  'thin-crepes-mlyntsi': {
    en: {
      title: 'Delicate Paper-Thin Ukrainian Crepes (Mlyntsi)',
      description: 'Lacy, silky golden crepes made with milk, melted butter, and eggs. Perfect for rolling with sweet cheese, berry preserves, or savory fillings.',
      tags: ['crepes', 'breakfast', 'baking', 'traditional', 'sweet'],
      ingredients: [
        { name: 'Whole milk', unit: 'ml' },
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Eggs', unit: 'pcs' },
        { name: 'Sugar', unit: 'tbsp' },
        { name: 'Melted butter', unit: 'g' },
        { name: 'Vegetable oil', unit: 'tbsp' },
        { name: 'Salt', unit: 'pinch' }
      ],
      instructions: [
        { title: 'Lump-Free Crepe Batter', instruction: 'Whisk eggs with sugar, salt, and half the milk. Sift in flour and whisk into a smooth thick paste without lumps. Gradually pour in remaining milk and melted butter. Rest batter for 15 minutes.' },
        { title: 'Swirling and Pan-Frying', instruction: 'Heat a crepe pan and brush lightly with oil. Pour a ladle of batter, tilting the pan quickly to coat the bottom thinly. Fry 60-90 seconds until edges brown, flip, and cook 30 seconds more. Brush each warm crepe with butter.', tip: 'Resting the batter relaxes flour gluten so crepes never tear when rolled.' }
      ]
    },
    de: {
      title: 'Hauchdünne Ukrainische Pfannkuchen (Mlynzi)',
      description: 'Zarte, feine Pfannkuchen auf Milch, ideal zum Füllen mit süßem Quark, Beerenkompott oder herzhaften Füllungen.',
      tags: ['Pfannkuchen', 'Frühstück', 'Backen', 'Traditionell'],
      ingredients: [
        { name: 'Milch', unit: 'ml' },
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Eier', unit: 'Stk' },
        { name: 'Zucker', unit: 'EL' },
        { name: 'Zerlassene Butter', unit: 'g' },
        { name: 'Pflanzenöl', unit: 'EL' },
        { name: 'Salz', unit: 'Prise' }
      ],
      instructions: [
        { title: 'Klumpenfreien Teig rühren', instruction: 'Eier mit Zucker, Salz und der halben Milch verquirlen. Mehl klumpenfrei unterrühren, dann restliche Milch und flüssige Butter zugeben. 15 Min. ruhen lassen.' },
        { title: 'Hauchdünn ausbacken', instruction: 'Pfanne fetten. Eine Kelle Teig hineingeben und schwenken. Von jeder Seite ca. 1 Minute goldgelb backen und mit Butter bestreichen.', tip: 'Teig ruhen lassen verhindert das Reißen beim Wenden.' }
      ]
    },
    zh: {
      title: '透光蕾丝薄饼乌克兰经典煎饼 (Mlyntsi)',
      description: '薄如蝉翼的牛奶金黄薄饼，口感软韧丝滑奶香浓郁，包农家甜奶酪馅、草莓果酱或三文鱼皆绝配。',
      tags: ['薄饼', '早餐', '烘焙面点', '甜点'],
      ingredients: [
        { name: '鲜牛奶', unit: '毫升' },
        { name: '中筋面粉', unit: '克' },
        { name: '鸡蛋', unit: '个' },
        { name: '细砂糖', unit: '汤匙' },
        { name: '融化黄油', unit: '克' },
        { name: '植物油', unit: '汤匙' },
        { name: '食盐', unit: '少许' }
      ],
      instructions: [
        { title: '搅打无颗粒顺滑面糊', instruction: '鸡蛋加糖、盐与一半牛奶打匀。筛入面粉搅拌成无颗粒浓面糊，再缓缓冲入剩余牛奶与融化黄油搅匀。静置15分钟松弛面筋。' },
        { title: '转锅摊薄两面煎熟', instruction: '薄饼锅微热刷少许油，舀入一勺面糊快速旋转锅身使面糊均匀铺满锅底。中小火煎60-90秒至边缘微卷翘，翻面再煎30秒出锅，每张表面刷薄黄油叠放。', tip: '面糊静置15分钟能彻底松弛面筋，摊出的薄饼极为软韧不易撕破。' }
      ]
    }
  },

  'fluffy-american-pancakes': {
    en: {
      title: 'Fluffy Golden American Pancakes with Maple Syrup',
      description: 'Thick, pillow-soft golden pancakes made with buttermilk or milk, stacked high and topped with melting butter and pure maple syrup.',
      tags: ['pancakes', 'breakfast', 'sweet', 'baking', 'for kids'],
      ingredients: [
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Kefir, buttermilk, or milk', unit: 'ml' },
        { name: 'Egg', unit: 'pc' },
        { name: 'Sugar', unit: 'tbsp' },
        { name: 'Baking powder', unit: 'tsp' },
        { name: 'Melted butter', unit: 'g' },
        { name: 'Pinch of salt', unit: 'pinch' }
      ],
      instructions: [
        { title: 'Gentle Batter Mixing', instruction: 'Whisk egg with kefir, melted butter, and sugar. In another bowl, combine flour, baking powder, and salt. Fold wet into dry until just combined; small lumps are normal!' },
        { title: 'Dry-Skillet Frying', instruction: 'Ladle batter onto a dry non-stick skillet over medium-low heat. Cook until bubbles form and pop on the surface (about 2 minutes), flip, and cook 1-2 minutes until puffed and golden brown.', tip: 'Do not overmix the batter; lumpy batter yields the fluffiest pancakes.' }
      ]
    },
    de: {
      title: 'Fluffige Amerikanische Pancakes mit Ahornsirup',
      description: 'Dicke, luftig-weiche Pancakes auf Buttermilch oder Milch, serviert im Turm mit zart schmelzender Butter und süßem Ahornsirup.',
      tags: ['Pancakes', 'Frühstück', 'Süßspeise', 'Backen'],
      ingredients: [
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Buttermilch, Kefir oder Milch', unit: 'ml' },
        { name: 'Ei', unit: 'Stk' },
        { name: 'Zucker', unit: 'EL' },
        { name: 'Backpulver', unit: 'TL' },
        { name: 'Zerlassene Butter', unit: 'g' },
        { name: 'Prise Salz', unit: 'Prise' }
      ],
      instructions: [
        { title: 'Teig sanft unterheben', instruction: 'Flüssige Zutaten verquirlen. Mehl, Backpulver und Salz untermischen. Nur kurz verrühren, kleine Klümpchen sind erwünscht!' },
        { title: 'In der Pfanne backen', instruction: 'Teig portionsweise in eine heiße beschichtete Pfanne ohne Fett geben. Wenden, sobald Bläschen aufsteigen, und von der zweiten Seite goldbraun backen.', tip: 'Nicht zu viel rühren, damit der Teig herrlich fluffig aufgeht.' }
      ]
    },
    zh: {
      title: '松软蓬松美式厚松饼 (Fluffy Pancakes)',
      description: '厚实如云朵般松软的美式松饼，选用发酵乳制作蓬松绵密孔洞，叠成厚层淋纯枫糖浆与融化黄油。',
      tags: ['松饼', '美式早餐', '甜品', '儿童友好'],
      ingredients: [
        { name: '中筋面粉', unit: '克' },
        { name: '开菲尔酸奶、脱脂乳或鲜牛奶', unit: '毫升' },
        { name: '鸡蛋', unit: '个' },
        { name: '细砂糖', unit: '汤匙' },
        { name: '无铝泡打粉', unit: '茶匙' },
        { name: '融化无盐黄油', unit: '克' },
        { name: '食盐', unit: '少许' }
      ],
      instructions: [
        { title: '轻拌干湿料', instruction: '鸡蛋与酸奶、融化黄油、糖搅拌混合。面粉与泡打粉、盐混合过筛，将液体倒入粉类中用刮刀粗拌至见不到干粉即可，保留粗颗粒切忌过度搅拌！' },
        { title: '不粘锅无油烘煎', instruction: '不粘锅小火预热（无需放油），舀入一勺面糊摊成厚圆饼。煎约2分钟直至表面密布小气孔破裂，利落翻面再煎1-2分钟至两面金黄鼓起。', tip: '面糊带细小粗疙瘩切勿使劲搅顺，这是松饼蓬松如海绵云朵的核心诀窍。' }
      ]
    }
  },

  'basque-burnt-cheesecake': {
    en: {
      title: 'San Sebastián Basque Burnt Cheesecake',
      description: 'The world-famous Basque cheesecake with a deeply caramelized, scorched dark top and a luscious, molten, creamy center.',
      tags: ['cheesecake', 'baking', 'dessert', 'sweet', 'party'],
      ingredients: [
        { name: 'Full-fat cream cheese (Philadelphia)', unit: 'g' },
        { name: 'Granulated sugar', unit: 'g' },
        { name: 'Fresh eggs', unit: 'pcs' },
        { name: 'Heavy whipping cream (33-35%)', unit: 'ml' },
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Pure vanilla extract', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Mixing the Creamy Batter', instruction: 'Beat room-temperature cream cheese with sugar until smooth and glossy without whipping in excess air. Add eggs one at a time, then stir in heavy cream, vanilla, and sifted flour.' },
        { title: 'Baking at High Heat', instruction: 'Line a 20cm springform pan with crumpled parchment paper. Pour batter in. Bake at 220°C (430°F) for 30-35 minutes until the top is deeply dark brown/caramelized and the center jiggles gently like custard.' },
        { title: 'Cooling to Set', instruction: 'Cool in the pan to room temperature, then chill in fridge for at least 4 hours before slicing with a hot knife.', tip: 'Do not fear the burnt top; the bitter-sweet caramelized crust balances the rich cream.' }
      ]
    },
    de: {
      title: 'Baskischer Verbrannter Käsekuchen (San Sebastián)',
      description: 'Der weltberühmte baskische Cheesecake mit fast schwarzer karamellisierter Oberfläche und einem herrlich cremig-flüssigen Kern.',
      tags: ['Käsekuchen', 'Backen', 'Dessert', 'Festlich'],
      ingredients: [
        { name: 'Doppelrahm-Frischkäse (Philadelphia)', unit: 'g' },
        { name: 'Zucker', unit: 'g' },
        { name: 'Frische Eier', unit: 'Stk' },
        { name: 'Schlagsahne (33%)', unit: 'ml' },
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Vanilleextrakt', unit: 'TL' }
      ],
      instructions: [
        { title: 'Creme anrühren', instruction: 'Frischkäse mit Zucker glattrühren. Eier einzeln unterrühren, Sahne, Vanille und Mehl sanft einarbeiten.' },
        { title: 'Heiß backen', instruction: 'In eine mit Backpapier ausgelegte Springform füllen. Bei 220°C ca. 30-35 Minuten backen, bis die Oberfläche dunkelbraun karamellisiert und die Mitte noch wackelt.' },
        { title: 'Kühlen', instruction: 'Auf Raumtemperatur abkühlen lassen und mindestens 4 Stunden kaltstellen vor dem Anschneiden.', tip: 'Die dunkle Kruste sorgt für das unverwechselbare Karamellaroma.' }
      ]
    },
    zh: {
      title: '焦香浓郁西班牙巴斯克重芝士蛋糕 (Basque Cheesecake)',
      description: '风靡全球的圣塞巴斯蒂安巴斯克焦香芝士蛋糕，表层深度焦糖化甚至焦黑微苦，切开内芯流心丝滑奶香爆炸。',
      tags: ['巴斯克蛋糕', '芝士蛋糕', '烘焙甜点', '免打发'],
      ingredients: [
        { name: '原味奶油奶酪 (室温软化)', unit: '克' },
        { name: '细砂糖', unit: '克' },
        { name: '新鲜鸡蛋', unit: '个' },
        { name: '动物性淡奶油 (33-35%脂)', unit: '毫升' },
        { name: '低筋面粉', unit: '克' },
        { name: '天然香草精', unit: '茶匙' }
      ],
      instructions: [
        { title: '低速搅打顺滑芝士糊', instruction: '室温软化的奶油奶酪加细砂糖用蛋抽压拌至顺滑无颗粒。分次打入鸡蛋搅匀，倒入淡奶油、香草精并筛入低筋面粉轻柔拌匀。' },
        { title: '极限高温烘烤至焦褐焦化', instruction: '6寸圆模铺上揉皱的油纸，倒入芝士糊轻震气泡。烤箱预热220°C烘烤30-35分钟，直至表面呈现浓烈深焦褐色，取出晃动模具中心仍如布丁般duangduang颤动。' },
        { title: '自然冷却冷藏凝固', instruction: '模具常温彻底冷却后送入冰箱冷藏至少4小时，用热水烫热刀面切出完美横截面。', tip: '不要害怕表面的焦黑，美拉德反应的焦糖微苦与内芯的浓醇奶香是绝妙灵魂平衡。' }
      ]
    }
  },

  'authentic-tiramisu': {
    en: {
      title: 'Authentic Italian Tiramisu with Mascarpone',
      description: 'The genuine Italian classic dessert: crisp Savoiardi ladyfingers soaked in rich espresso, layered with cloud-like mascarpone cream and dusted with Dutch cocoa.',
      tags: ['tiramisu', 'dessert', 'italian', 'no-bake', 'coffee'],
      ingredients: [
        { name: 'Mascarpone cheese', unit: 'g' },
        { name: 'Savoiardi ladyfingers biscuits', unit: 'g' },
        { name: 'Fresh egg yolks (or whole pasteurized eggs)', unit: 'pcs' },
        { name: 'Granulated sugar', unit: 'g' },
        { name: 'Strong brewed espresso, cooled', unit: 'ml' },
        { name: 'Unsweetened cocoa powder', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Whipping the Mascarpone Cream', instruction: 'Whisk egg yolks with sugar until pale, thick, and ribbon-like. Fold in room-temperature mascarpone gently until perfectly velvety without overworking.' },
        { title: 'Layering Ladyfingers and Cream', instruction: 'Dip Savoiardi quickly into cooled espresso (1 second per side!). Arrange in a single layer in a serving dish. Spread half the mascarpone cream. Repeat with another layer of dipped biscuits and cream.' },
        { title: 'Chilling and Cocoa Dusting', instruction: 'Refrigerate for at least 4-6 hours (ideally overnight). Dust generously with high-grade Dutch cocoa powder through a fine sieve right before serving.', tip: 'A quick dip into coffee prevents biscuits from turning soggy.' }
      ]
    },
    de: {
      title: 'Original Italienisches Tiramisu mit Mascarpone',
      description: 'Das echte italienische Original: In Espresso getränkte Löffelbiskuits geschichtet mit himmlischer Mascarponecreme und edlem Kakao.',
      tags: ['Tiramisu', 'Dessert', 'Italienisch', 'Ohne Backen', 'Kaffee'],
      ingredients: [
        { name: 'Mascarpone', unit: 'g' },
        { name: 'Löffelbiskuits (Savoiardi)', unit: 'g' },
        { name: 'Frische Eigelbe', unit: 'Stk' },
        { name: 'Zucker', unit: 'g' },
        { name: 'Kalter starker Espresso', unit: 'ml' },
        { name: 'Kakaopulver zum Bestäuben', unit: 'EL' }
      ],
      instructions: [
        { title: 'Mascarponecreme rühren', instruction: 'Eigelbe mit Zucker cremig aufschlagen. Mascarpone vorsichtig unterheben, bis eine samtige Creme entsteht.' },
        { title: 'Schichten', instruction: 'Löffelbiskuits kurz in Espresso wenden und in die Form legen. Die Hälfte der Creme darauf verteilen, zweite Schicht Biskuits und restliche Creme aufbringen.' },
        { title: 'Kühlen & Kakao', instruction: 'Mindestens 4-6 Stunden im Kühlschrank durchziehen lassen. Vor dem Servieren dick mit Kakao bestäuben.', tip: 'Nur ganz kurz in den Kaffee tauchen, damit die Biskuits Struktur behalten.' }
      ]
    },
    zh: {
      title: '正宗意式浓缩咖啡马斯卡彭提拉米苏 (Tiramisu)',
      description: '传统意式殿堂级经典冷甜点，手指饼干秒蘸香浓意式浓缩咖啡，层层堆叠如轻云般的马斯卡彭乳酪慕斯，厚洒苦甜可可粉。',
      tags: ['提拉米苏', '意式甜品', '免烤箱', '咖啡甜点'],
      ingredients: [
        { name: '马斯卡彭奶酪 (Mascarpone)', unit: '克' },
        { name: '意式手指饼干 (Savoiardi)', unit: '克' },
        { name: '新鲜无菌蛋黄', unit: '个' },
        { name: '细砂糖', unit: '克' },
        { name: '浓缩咖啡液 (彻底冷却)', unit: '毫升' },
        { name: '纯黑可可粉', unit: '汤匙' }
      ],
      instructions: [
        { title: '搅打轻盈马斯卡彭奶酪糊', instruction: '蛋黄加入细砂糖隔温水快速抽打至发白浓稠发亮。加入室温软化马斯卡彭奶酪，轻柔翻拌均匀至如云朵般细腻顺滑。' },
        { title: '秒蘸咖啡分层铺组', instruction: '手指饼干快速在冷咖啡液中滚动浸润1秒（切忌久泡！），紧密排在容器底部。抹上一半奶酪糊，再铺一层蘸咖啡饼干，顶面抹平剩余奶酪糊。' },
        { title: '冷藏定型厚撒纯可可粉', instruction: '送入冰箱冷藏密封静置至少4-6小时（隔夜风味最佳）。食用前用细滤网在表面厚厚筛满纯黑苦甜可可粉。', tip: '手指饼干浸泡咖啡必须快进快出，靠冷藏时间让饼干自然吸收奶酪中的水分软化如蛋糕。' }
      ]
    }
  },

  'chocolate-lava-cake': {
    en: {
      title: 'Molten Chocolate Lava Cake (Fondant au Chocolat)',
      description: 'Decadent French dessert with a warm, crisp cake exterior that breaks open to release a luscious, flowing molten dark chocolate center.',
      tags: ['chocolate', 'lava cake', 'dessert', 'baking', 'french'],
      ingredients: [
        { name: 'Dark chocolate (70% cocoa)', unit: 'g' },
        { name: 'Butter', unit: 'g' },
        { name: 'Fresh eggs', unit: 'pcs' },
        { name: 'Sugar', unit: 'g' },
        { name: 'All-purpose flour', unit: 'g' }
      ],
      instructions: [
        { title: 'Melting Chocolate & Butter', instruction: 'Melt dark chocolate chunks and butter together in a heatproof bowl set over simmering water (bain-marie) or in the microwave in 20-second bursts. Stir until glossy.' },
        { title: 'Mixing the Batter', instruction: 'Whisk eggs with sugar until pale. Gently fold in the warm chocolate-butter mixture, then fold in sifted flour just until combined.' },
        { title: 'High-Heat Baking', instruction: 'Grease ramekins with butter and dust with cocoa powder. Pour batter and bake at 200°C (400°F) for exactly 8-10 minutes until edges are set but center remains soft. Invert onto plates and serve immediately with vanilla ice cream.', tip: 'Timing is everything; 1 extra minute will turn molten lava into a regular chocolate muffin.' }
      ]
    },
    de: {
      title: 'Flüssiger Schoko-Lava-Kuchen (Fondant au Chocolat)',
      description: 'Himmlisches Schokodessert mit warmem, flüssigem Kern aus feinster Zartbitterschokolade und knuspriger Hülle.',
      tags: ['Schokokuchen', 'Dessert', 'Lava Cake', 'Festlich'],
      ingredients: [
        { name: 'Zartbitterschokolade (70%)', unit: 'g' },
        { name: 'Butter', unit: 'g' },
        { name: 'Frische Eier', unit: 'Stk' },
        { name: 'Zucker', unit: 'g' },
        { name: 'Weizenmehl', unit: 'g' }
      ],
      instructions: [
        { title: 'Schokolade schmelzen', instruction: 'Schokolade und Butter über dem Wasserbad sanft schmelzen und glattrühren.' },
        { title: 'Teig zubereiten', instruction: 'Eier mit Zucker schaumig schlagen, flüssige Schokolade und Mehl vorsichtig unterheben.' },
        { title: 'Auf den Punkt backen', instruction: 'In gefettete Förmchen füllen. Bei 200°C exakt 8-10 Minuten backen, bis der Rand fest und die Mitte flüssig ist. Sofort stürzen.', tip: 'Auf die Minute genau backen, damit der Kern flüssig bleibt!' }
      ]
    },
    zh: {
      title: '法式爆浆黑巧熔岩蛋糕 (Chocolate Lava Cake)',
      description: '殿堂级法式浓郁黑巧甜点，烘烤至外壳微焦松脆，勺子挖开瞬间滚烫浓醇的黑巧岩浆瀑布般流淌而出。',
      tags: ['熔岩蛋糕', '巧克力', '爆浆甜点', '法式西点'],
      ingredients: [
        { name: '特浓黑巧克力 (70%可可脂)', unit: '克' },
        { name: '无盐黄油', unit: '克' },
        { name: '新鲜鸡蛋', unit: '个' },
        { name: '细砂糖', unit: '克' },
        { name: '低筋面粉', unit: '克' }
      ],
      instructions: [
        { title: '隔水融化黑巧与黄油', instruction: '黑巧克力块与黄油切小块放入耐热碗中，隔热水慢化或微波炉分次加热搅拌融化成光亮黑巧液体。' },
        { title: '乳化拌入面糊', instruction: '全蛋加糖打匀至糖化，慢慢倒入温热巧克力液体翻拌均匀，筛入低筋面粉用刮刀轻拌均匀无干粉。' },
        { title: '精准掐秒烘烤出炉', instruction: '烤盅抹黄油撒薄可可粉防粘，倒入面糊8分满。烤箱200°C精准烘烤8-10分钟，至蛋糕四周定型鼓起而中心微晃，出炉稍凉1分钟倒扣盘中，佐香草冰淇淋开吃。', tip: '烘烤时间必须精准掐表，多烤1分钟流心熔岩就会凝固成普通布朗尼。' }
      ]
    }
  },

  'apple-pie-sharlotka': {
    en: {
      title: 'Classic Fluffy Apple Pie (Sharlotka)',
      description: 'The beloved airy Slavic apple sponge cake packed with tart, juicy sliced apples under a delicate crackly sugar meringue crust.',
      tags: ['sharlotka', 'apple pie', 'baking', 'dessert', 'autumn'],
      ingredients: [
        { name: 'Tart baking apples (Granny Smith or Antonovka)', unit: 'pcs' },
        { name: 'Fresh eggs', unit: 'pcs' },
        { name: 'Granulated sugar', unit: 'g' },
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Ground cinnamon', unit: 'tsp' },
        { name: 'Butter', unit: 'g', notes: 'for greasing pan' }
      ],
      instructions: [
        { title: 'Slicing Tart Apples', instruction: 'Core and slice apples into thin wedges. Toss with ground cinnamon and arrange in a buttered baking dish.' },
        { title: 'Whipping Airy Sponge Batter', instruction: 'Beat eggs and sugar with a stand mixer or hand mixer on high for 5-7 minutes until pale, quadrupled in volume, and forming thick ribbons. Gently fold in sifted flour with a spatula in wide lifting strokes.' },
        { title: 'Baking to Golden Crust', instruction: 'Pour airy batter over the apples, tapping pan once on the counter. Bake at 180°C (350°F) for 35-40 minutes without opening the oven door until golden and a wooden skewer comes out clean.', tip: 'Whipping eggs thoroughly creates the crackly meringue-like crust on top naturally.' }
      ]
    },
    de: {
      title: 'Luftiger Apfelkuchen Scharlotka',
      description: 'Traditioneller saftiger Biskuit-Apfelkuchen mit säuerlichen Äpfeln, Zimtnote und zarter Zuckerkruste.',
      tags: ['Apfelkuchen', 'Scharlotka', 'Backen', 'Herbst'],
      ingredients: [
        { name: 'Säuerliche Äpfel (Boskoop/Granny Smith)', unit: 'Stk' },
        { name: 'Frische Eier', unit: 'Stk' },
        { name: 'Zucker', unit: 'g' },
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Zimt', unit: 'TL' },
        { name: 'Butter für die Form', unit: 'g' }
      ],
      instructions: [
        { title: 'Äpfel vorbereiten', instruction: 'Äpfel entkernen, in Scheiben schneiden, mit Zimt bestreuen und in eine gebutterte Form legen.' },
        { title: 'Biskuitteig aufschlagen', instruction: 'Eier und Zucker mindestens 5-7 Minuten dickcremig aufschlagen. Mehl vorsichtig unterheben.' },
        { title: 'Goldbraun backen', instruction: 'Teig über die Äpfel gießen. Bei 180°C ca. 35-40 Minuten backen, bis die Kruste goldbraun ist und die Stäbchenprobe gelingt.', tip: 'Langes Aufschlagen der Eier sorgt für die typische Knusperkruste.' }
      ]
    },
    zh: {
      title: '空气感酸甜苹果夏洛特蛋糕 (Sharlotka)',
      description: '家喻户晓的经典东欧苹果海绵蛋糕，铺满大块多汁酸苹果，蛋糊充分充气打发，烤出薄脆糖霜表壳与如海绵般湿润蛋糕体。',
      tags: ['夏洛特苹果派', '苹果蛋糕', '烘焙甜点', '下午茶'],
      ingredients: [
        { name: '多汁酸甜烘焙苹果 (青苹果)', unit: '个' },
        { name: '新鲜鸡蛋', unit: '个' },
        { name: '白砂糖', unit: '克' },
        { name: '低筋或中筋面粉', unit: '克' },
        { name: '天然肉桂粉', unit: '茶匙' },
        { name: '黄油 (涂抹模具)', unit: '克' }
      ],
      instructions: [
        { title: '处理肉桂苹果块', instruction: '苹果洗净去核切成均匀薄块，撒入肉桂粉抓匀，铺在涂有黄油撒有薄粉的烤模底部。' },
        { title: '全蛋高速打发成浓稠蛋糊', instruction: '鸡蛋加入白糖，用电动打蛋器高速打发5-7分钟，直至蛋糊膨胀发白数倍、提起打蛋头划“8”字纹路数秒不消。筛入面粉用刮刀轻柔抄底翻拌均匀。' },
        { title: '浇淋面糊烤至酥脆裂纹', instruction: '将轻盈面糊淋在苹果上抹平。烤箱180°C烘烤35-40分钟，期间不要开烤箱门，直至表面形成微脆糖裂纹、竹签插入干净无粘连出炉。', tip: '鸡蛋充分打发是蛋糕表面自然形成酥脆薄糖霜壳、内芯如云朵松软的秘密。' }
      ]
    }
  },

  'homemade-oatmeal-cookies': {
    en: {
      title: 'Chewy Homemade Oatmeal Chocolate Chip Cookies',
      description: 'Crispy around the edges, soft and chewy in the center homemade oatmeal cookies packed with whole oats and melting dark chocolate chips.',
      tags: ['cookies', 'oatmeal', 'chocolate', 'baking', 'for tea'],
      ingredients: [
        { name: 'Rolled oats', unit: 'g' },
        { name: 'All-purpose flour', unit: 'g' },
        { name: 'Softened butter', unit: 'g' },
        { name: 'Sugar', unit: 'g' },
        { name: 'Egg', unit: 'pc' },
        { name: 'Dark chocolate chips', unit: 'g' },
        { name: 'Cinnamon & baking powder', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Creaming and Mixing Dough', instruction: 'Beat softened butter with sugar and egg until creamy. Stir in oats, flour, baking powder, cinnamon, and chocolate chips.' },
        { title: 'Shaping and Baking', instruction: 'Roll dough into golf-ball-sized balls, place on a parchment-lined baking sheet, and flatten slightly. Bake at 180°C (350°F) for 10-12 minutes until edges are golden.', tip: 'Cookies will be soft when removed from the oven; they crisp up as they cool on the tray.' }
      ]
    },
    de: {
      title: 'Knusprige Haferflocken-Kekse mit Schokotropfen',
      description: 'Außen knusprig, innen saftig: Hausgemachte Haferkekse mit zartschmelzenden Schokodrops und Zimt.',
      tags: ['Kekse', 'Haferflocken', 'Schokolade', 'Zum Tee'],
      ingredients: [
        { name: 'Haferflocken', unit: 'g' },
        { name: 'Weizenmehl', unit: 'g' },
        { name: 'Weiche Butter', unit: 'g' },
        { name: 'Zucker', unit: 'g' },
        { name: 'Ei', unit: 'Stk' },
        { name: 'Schokotröpfchen', unit: 'g' },
        { name: 'Zimt & Backpulver', unit: 'TL' }
      ],
      instructions: [
        { title: 'Teig rühren', instruction: 'Butter mit Zucker und Ei schaumig rühren. Mehl, Haferflocken, Backpulver, Zimt und Schokotropfen unterkneten.' },
        { title: 'Backen', instruction: 'Bällchen formen, auf dem Blech flachdrücken und bei 180°C ca. 10-12 Minuten goldgelb backen.', tip: 'Auf dem Blech abkühlen lassen, damit sie schön knusprig werden.' }
      ]
    },
    zh: {
      title: '香脆浓郁手工燕麦黑巧碎曲奇饼干 (Oatmeal Cookies)',
      description: '外酥里韧的自制燕麦巧克力曲奇，整颗燕麦片越嚼越香，咬破流心黑巧克力豆，伴随肉桂温暖香气。',
      tags: ['曲奇饼干', '燕麦饼干', '下午茶', '快手烘焙'],
      ingredients: [
        { name: '原片大燕麦片', unit: '克' },
        { name: '低筋或中筋面粉', unit: '克' },
        { name: '软化黄油', unit: '克' },
        { name: '白砂糖或红糖', unit: '克' },
        { name: '鸡蛋', unit: '个' },
        { name: '耐高温黑巧克力豆', unit: '克' },
        { name: '肉桂粉与无铝泡打粉', unit: '茶匙' }
      ],
      instructions: [
        { title: '搅打黄油和面', instruction: '软化黄油加糖打发至轻微发白，加入鸡蛋搅匀。加入燕麦片、面粉、泡打粉、肉桂粉与巧克力豆团成面团。' },
        { title: '团球压扁烘烤', instruction: '分成小球摆入烤盘轻压成圆饼。烤箱180°C烘烤10-12分钟至饼干边缘焦黄上色。', tip: '出炉时饼干偏软，在烤盘上自然晾凉后边缘会变得格外香脆。' }
      ]
    }
  },

  'traditional-uzvar': {
    en: {
      title: 'Traditional Ukrainian Dried Fruit Compote (Uzvar)',
      description: 'Fragrant traditional Slavic winter holiday beverage simmered from smoke-dried apples, wild pears, and sweet prunes, sweetened with natural honey.',
      tags: ['uzvar', 'beverage', 'traditional', 'honey', 'winter'],
      ingredients: [
        { name: 'Assorted dried fruits (apples, pears, prunes)', unit: 'g' },
        { name: 'Pure spring water', unit: 'L' },
        { name: 'Natural floral honey', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Rinsing Dried Fruits', instruction: 'Rinse dried apples, pears, and prunes thoroughly under warm water multiple times to remove any dust.' },
        { title: 'Simmering and Steeping with Honey', instruction: 'Place in a large pot with cold water, bring to a boil, and simmer gently over low heat for 20 minutes. Turn off heat, let cool until comfortably warm, stir in raw honey, and steep covered for 2 hours before drinking.', tip: 'Never add honey to boiling water; adding it when warm preserves all delicate enzymes.' }
      ]
    },
    de: {
      title: 'Traditioneller Ukrainischer Dörrobst-Uswar mit Honig',
      description: 'Aromatisches Traditionsgetränk aus getrockneten Äpfeln, Birnen und Pflaumen, schonend gekocht und mit echtem Blütenhonig verfeinert.',
      tags: ['Uswar', 'Getränke', 'Traditionell', 'Honig'],
      ingredients: [
        { name: 'Dörrobst-Mischung (Äpfel, Birnen, Pflaumen)', unit: 'g' },
        { name: 'Wasser', unit: 'L' },
        { name: 'Natürlicher Blütenhonig', unit: 'EL' }
      ],
      instructions: [
        { title: 'Dörrobst waschen', instruction: 'Trockenfrüchte mehrmals gründlich mit warmem Wasser abspülen.' },
        { title: 'Kochen & ziehen lassen', instruction: 'Mit Wasser aufkochen und 20 Min. sanft köcheln. Herd ausschalten, lauwarm abkühlen lassen, Honig einrühren und 2 Stunden zugedeckt ziehen lassen.', tip: 'Honig erst im warmen Zustand zugeben, um wertvolle Nährstoffe zu schonen.' }
      ]
    },
    zh: {
      title: '传统乌克兰烟熏果干蜂蜜温润饮 (Uzvar)',
      description: '东欧传统节日养生果饮，烟熏干苹果、野梨干与黑西梅慢熬出琥珀色清甜果汤，调入纯天然百花蜂蜜。',
      tags: ['果干水', '养生热饮', '传统饮品', '蜂蜜'],
      ingredients: [
        { name: '什锦果干（风干苹果片、干野梨、西梅干）', unit: '克' },
        { name: '纯净水', unit: '升' },
        { name: '天然纯蜂蜜', unit: '汤匙' }
      ],
      instructions: [
        { title: '温水淘洗果干', instruction: '将风干苹果干、干梨和西梅干用温水反复冲洗数次，去除表面浮尘。' },
        { title: '慢熬浸泡调蜂蜜', instruction: '果干冷水下锅大火烧开，转微火慢煮20分钟关火。待汤汁降至温热后调入天然蜂蜜搅拌融化，盖盖浸泡焖透2小时后饮用。', tip: '切勿在沸水中加入蜂蜜，待汤温降至50°C以下加入能完美保留蜂蜜活性酶与花香。' }
      ]
    }
  },

  'fresh-strawberry-lemonade': {
    en: {
      title: 'Refreshing Homemade Strawberry Mint Lemonade',
      description: 'The ultimate thirst quencher: sweet puréed ripe strawberries, freshly squeezed tart lemon juice, crushed fragrant mint, and sparkling water over ice.',
      tags: ['lemonade', 'strawberries', 'drinks', 'summer', 'refreshing'],
      ingredients: [
        { name: 'Fresh or frozen strawberries', unit: 'g' },
        { name: 'Fresh lemons', unit: 'pcs' },
        { name: 'Fresh mint', unit: 'bunch' },
        { name: 'Sugar or simple syrup', unit: 'tbsp' },
        { name: 'Sparkling or still water', unit: 'L' },
        { name: 'Ice cubes', unit: 'cup' }
      ],
      instructions: [
        { title: 'Puréeing Strawberries', instruction: 'Blend strawberries with sugar and 2 tablespoons of water until completely smooth.' },
        { title: 'Mixing Pitcher', instruction: 'Squeeze juice from 3 lemons into a large pitcher. Pour in strawberry purée, bruised mint leaves, ice cubes, and top with chilled water. Stir vigorously and serve with lemon wheels.', tip: 'Clapping mint between your palms before adding releases intense aromatic oils.' }
      ]
    },
    de: {
      title: 'Erfrischende Erdbeer-Minz-Limonade',
      description: 'Herrlich fruchtige Sommerlimonade aus pürierten Erdbeeren, frisch gepresstem Zitronensaft, Minze und sprudelndem Wasser auf Eis.',
      tags: ['Limonade', 'Erdbeeren', 'Getränke', 'Sommerlich'],
      ingredients: [
        { name: 'Frische oder gefrorene Erdbeeren', unit: 'g' },
        { name: 'Zitronen', unit: 'Stk' },
        { name: 'Frische Minze', unit: 'Bund' },
        { name: 'Zucker oder Sirup', unit: 'EL' },
        { name: 'Mineralwasser mit Sprudel', unit: 'L' },
        { name: 'Eiswürfel', unit: 'Glas' }
      ],
      instructions: [
        { title: 'Erdbeerpüree herstellen', instruction: 'Erdbeeren mit Zucker im Mixer fein pürieren.' },
        { title: 'Limonade anmischen', instruction: 'Zitronensaft in eine Karaffe pressen, Erdbeerpüree, angedrückte Minze, Eis und kaltes Sprudelwasser zugeben und umrühren.', tip: 'Minze vorab zwischen den Handflächen anklatschen für mehr Frische.' }
      ]
    },
    zh: {
      title: '夏日冰爽手工草莓薄荷气泡柠檬水',
      description: '消暑解腻高颜值冷饮，熟透草莓原汁果泥、现榨鲜柠檬汁、手拍薄荷叶注入清凉苏打水与冰块。',
      tags: ['柠檬水', '草莓特饮', '夏日冰饮', '气泡水'],
      ingredients: [
        { name: '新鲜或冷冻草莓', unit: '克' },
        { name: '新鲜柠檬', unit: '个' },
        { name: '新鲜薄荷叶', unit: '把' },
        { name: '白砂糖或糖浆', unit: '汤匙' },
        { name: '冷藏苏打水或矿泉水', unit: '升' },
        { name: '纯净冰块', unit: '杯' }
      ],
      instructions: [
        { title: '破壁打制草莓果泥', instruction: '草莓加入白糖用料理机打成细腻丝滑果泥。' },
        { title: '大壶调制冰镇特饮', instruction: '大玻璃壶中挤入3颗鲜柠檬汁，倒入草莓果泥、手掌拍出清香的薄荷叶、大半壶冰块，冲入冰镇气泡水搅拌均匀即可享用。', tip: '薄荷叶入壶前在手掌中用力拍一下，能瞬间震破油胞释放浓烈清凉香气。' }
      ]
    }
  },

  'green-energy-smoothie': {
    en: {
      title: 'Green Energy Detox Smoothie with Spinach & Banana',
      description: 'Vibrant chlorophyll-rich power smoothie blended with baby spinach, sweet ripe banana, tart green apple, chia seeds, and almond milk.',
      tags: ['smoothie', 'detox', 'vegan', 'healthy', 'breakfast'],
      ingredients: [
        { name: 'Fresh baby spinach leaves', unit: 'g' },
        { name: 'Ripe sweet banana', unit: 'pc' },
        { name: 'Tart green apple (cored)', unit: 'pc' },
        { name: 'Almond milk or water', unit: 'ml' },
        { name: 'Chia or flax seeds', unit: 'tsp' }
      ],
      instructions: [
        { title: 'High-Speed Blending', instruction: 'Add washed spinach, ripe banana slices, chopped green apple, chia seeds, and liquid into a high-speed blender. Blend on high for 60 seconds until silky smooth, vibrant green, and completely lump-free.', tip: 'A frozen ripe banana yields a creamy milkshake-like texture without needing dairy.' }
      ]
    },
    de: {
      title: 'Grüner Energie-Detox-Smoothie mit Spinat & Banane',
      description: 'Vitaminreicher grüner Power-Smoothie aus Babyspinat, reifer Banane, grünem Apfel, Chiasamen und Pflanzenmilch.',
      tags: ['Smoothie', 'Detox', 'Vegan', 'Gesund'],
      ingredients: [
        { name: 'Frischer Babyspinat', unit: 'g' },
        { name: 'Reife Banane', unit: 'Stk' },
        { name: 'Grüner Apfel', unit: 'Stk' },
        { name: 'Mandelmilch oder Wasser', unit: 'ml' },
        { name: 'Chia- oder Leinsamen', unit: 'TL' }
      ],
      instructions: [
        { title: 'Fein pürieren', instruction: 'Alle Zutaten in den Hochleistungsmixer geben und ca. 60 Sekunden cremig mixen.', tip: 'Eine gefrorene Banane verleiht dem Smoothie eine Eisshake-Textur.' }
      ]
    },
    zh: {
      title: '生机绿意菠菜香蕉青苹果排毒轻体思慕雪',
      description: '富含天然叶绿素与膳食纤维的高能轻体果昔，嫩菠菜、甜香蕉与青苹果加入杏仁奶打碎，丝滑无渣清甜爽口。',
      tags: ['思慕雪', '轻断食', '排毒果昔', '纯素饮品'],
      ingredients: [
        { name: '新鲜嫩菠菜叶', unit: '克' },
        { name: '成熟甜香蕉', unit: '个' },
        { name: '爽脆青苹果 (去核切块)', unit: '个' },
        { name: '无糖杏仁奶或凉开水', unit: '毫升' },
        { name: '奇亚籽或亚麻籽', unit: '茶匙' }
      ],
      instructions: [
        { title: '高速破壁顺滑搅打', instruction: '将洗净的嫩菠菜、成熟香蕉段、青苹果块、奇亚籽倒入破壁机，倒入杏仁奶。高速打发60秒直至呈现翡翠透亮、天鹅绒般丝滑口感。', tip: '使用熟透带黑斑的冷冻香蕉段，打出的思慕雪如冰淇淋奶昔般细腻浓郁。' }
      ]
    }
  },

  'quick-chicken-cheese-quesadilla': {
    en: {
      title: 'Quick 15-Minute Cheesy Chicken Quesadilla',
      description: 'Crispy pan-toasted wheat tortillas stuffed with tender seasoned chicken, molten cheese blend, sweet corn, and served with salsa.',
      tags: ['quesadilla', 'mexican', 'quick dinner', 'cheese', 'chicken'],
      ingredients: [
        { name: 'Flour tortillas', unit: 'pcs' },
        { name: 'Cooked chicken breast (shredded)', unit: 'g' },
        { name: 'Mozzarella or Cheddar cheese (shredded)', unit: 'g' },
        { name: 'Canned sweet corn', unit: 'tbsp' },
        { name: 'Salsa sauce or marinara', unit: 'tbsp' }
      ],
      instructions: [
        { title: 'Filling the Tortilla', instruction: 'Spread salsa over one half of each tortilla. Top with shredded chicken, sweet corn, and a generous handful of cheese. Fold the other half over into a half-moon.' },
        { title: 'Toasting in a Dry Pan', instruction: 'Place folded quesadilla in a hot dry skillet over medium heat. Toast for 3 minutes per side until crisp and golden brown, and cheese is completely melted. Slice into triangles.', tip: 'No oil in the pan gives the tortilla that authentic, crackling blistered crust.' }
      ]
    },
    de: {
      title: 'Schnelle Hähnchen-Käse-Quesadilla aus der Pfanne',
      description: 'Knusprig geröstete Weizentortilla gefüllt mit zartem Hähnchenfleisch, schmelzendem Käse und Paprika.',
      tags: ['Quesadilla', 'Mexikanisch', 'Schnell', 'Käse'],
      ingredients: [
        { name: 'Weizentortillas', unit: 'Stk' },
        { name: 'Gegartes Hähnchenfilet', unit: 'g' },
        { name: 'Geriebener Käse (Gouda/Cheddar)', unit: 'g' },
        { name: 'Dosenmais', unit: 'EL' },
        { name: 'Salsasauce', unit: 'EL' }
      ],
      instructions: [
        { title: 'Tortilla belegen', instruction: 'Eine Hälfte mit Salsa bestreichen, mit Hähnchen, Mais und reichlich Käse belegen. Zuklappen.' },
        { title: 'Knusprig braten', instruction: 'In einer heißen trockenen Pfanne von jeder Seite ca. 3 Minuten rösten, bis der Käse schmilzt. In Dreiecke schneiden.', tip: 'Trocken in der Pfanne geröstet wird die Tortilla herrlich kross.' }
      ]
    },
    zh: {
      title: '15分钟快手拉丝鸡肉奶酪墨西哥脆饼 (Quesadilla)',
      description: '平底锅将小麦卷饼烙至双面酥脆金黄，内里夹入多汁熟鸡肉丁、拉丝芝士碎与玉米青椒，趁热切块香脆可口。',
      tags: ['墨西哥馅饼', '快手晚餐', '芝士拉丝', '小吃'],
      ingredients: [
        { name: '墨西哥小麦卷饼皮', unit: '张' },
        { name: '熟鸡胸肉丝或鸡肉丁', unit: '克' },
        { name: '马苏里拉或车达奶酪碎', unit: '克' },
        { name: '甜玉米粒', unit: '汤匙' },
        { name: '莎莎辣酱或番茄酱', unit: '汤匙' }
      ],
      instructions: [
        { title: '卷饼涂酱铺料', instruction: '卷饼半边抹上一勺莎莎酱，铺上熟鸡肉丝、甜玉米粒与厚厚的拉丝奶酪碎，对折成半月形。' },
        { title: '干锅慢烙至酥脆拉丝', instruction: '将对折饼放入烧热的干燥平底锅（不放油），中小火两面各烙3分钟至外皮金黄酥脆焦斑点缀、内馅奶酪彻底融化，切三角块蘸酱。', tip: '干锅无油煎烙才能烙出墨西哥餐厅地道酥脆不腻的外壳。' }
      ]
    }
  },

  'tomato-basil-bruschetta': {
    en: {
      title: 'Crispy Italian Bruschetta with Tomatoes & Fresh Basil',
      description: 'Garlic-rubbed toasted crusty ciabatta topped with sweet ripe diced tomatoes, fragrant fresh basil, EVOO, and a drizzle of balsamic glaze.',
      tags: ['bruschetta', 'appetizer', 'italian', 'vegetarian', 'tomatoes'],
      ingredients: [
        { name: 'Ciabatta or rustic baguette', unit: 'slices' },
        { name: 'Sweet ripe tomatoes', unit: 'pcs' },
        { name: 'Garlic cloves', unit: 'cloves' },
        { name: 'Fresh basil leaves', unit: 'leaves' },
        { name: 'Extra virgin olive oil', unit: 'tbsp' },
        { name: 'Sea salt & cracked black pepper', unit: 'tsp' }
      ],
      instructions: [
        { title: 'Prepping Tomato Basil Topping', instruction: 'Dice tomatoes finely, discarding watery seed pulp. Toss in a bowl with hand-torn basil, 1 tbsp olive oil, sea salt, and black pepper. Let macerate 10 minutes.' },
        { title: 'Toasting and Garlic-Rubbing Bread', instruction: 'Toast bread slices in a dry skillet or grill until golden and crackling. While hot, rub the coarse crust gently with a peeled raw garlic clove.' },
        { title: 'Assembling and Serving', instruction: 'Spoon tomato mixture over the toasts immediately before serving to keep the crust crunchy. Drizzle with extra virgin olive oil.', tip: 'Rubbing raw garlic directly on warm toasted crust infuses robust aroma without bitterness.' }
      ]
    },
    de: {
      title: 'Knusprige Italienische Bruschetta mit Tomaten & Basilikum',
      description: 'Geröstetes Ciabatta mit Knoblauch verfeinert, belegt mit marinierten Tomatenwürfeln, Basilikum und bestem Olivenöl.',
      tags: ['Bruschetta', 'Vorspeise', 'Italienisch', 'Vegetarisch'],
      ingredients: [
        { name: 'Ciabatta oder Baguette', unit: 'Scheiben' },
        { name: 'Sonnengereifte Tomaten', unit: 'Stk' },
        { name: 'Knoblauchzehen', unit: 'Zehen' },
        { name: 'Frische Basilikumblätter', unit: 'Blätter' },
        { name: 'Natives Olivenöl extra', unit: 'EL' },
        { name: 'Meersalz & Pfeffer', unit: 'TL' }
      ],
      instructions: [
        { title: 'Tomatenmischung ansetzen', instruction: 'Tomaten entkernen und würfeln. Mit zerzupftem Basilikum, Olivenöl, Salz und Pfeffer vermengen.' },
        { title: 'Brot rösten & einreiben', instruction: 'Brotscheiben in der Pfanne knusprig rösten. Das heiße Brot mit einer rohen Knoblauchzehe abreiben.' },
        { title: 'Anrichten', instruction: 'Tomaten kurz vor dem Servieren auf das Brot geben, damit es kross bleibt.', tip: 'Das Abreiben mit rohem Knoblauch auf heißem Brot ergibt das typische Aroma.' }
      ]
    },
    zh: {
      title: '香脆经典意式番茄罗勒烤面包片 (Bruschetta)',
      description: '烘烤至香脆焦黄的意式夏巴塔面包片，用整瓣大蒜摩擦生香，堆满特级初榨橄榄油与黑醋腌渍的新鲜罗马番茄丁与罗勒碎。',
      tags: ['意式前菜', '法棍小吃', '聚会小食', '纯素开胃'],
      ingredients: [
        { name: '夏巴塔 (Ciabatta) 或法棍斜切厚片', unit: '厚片' },
        { name: '熟透多汁红番茄', unit: '个' },
        { name: '新鲜大蒜瓣', unit: '瓣' },
        { name: '新鲜罗勒叶', unit: '片' },
        { name: '特级初榨橄榄油', unit: '汤匙' },
        { name: '海盐与黑胡椒粒', unit: '茶匙' }
      ],
      instructions: [
        { title: '腌制罗勒番茄丁', instruction: '番茄去籽挤干多余水汁后切细丁，加入手撕罗勒叶碎、橄榄油、海盐和现磨黑胡椒翻拌腌制10分钟入味。' },
        { title: '烘烤面包热擦蒜香', instruction: '面包片在干锅或烤箱中烤2-3分钟至表面焦黄嘎嘣脆。趁热手持切开的生蒜瓣在粗糙的面包焦壳表面用力摩擦生香。' },
        { title: '铺上番茄装盘', instruction: '食用前一刻将番茄料堆在蒜香脆面包片上，淋少许特级初榨橄榄油，立即享用脆嫩口感。', tip: '趁面包滚烫粗糙时直接用蒜瓣摩擦，是意式前菜浓香四溢却毫无生蒜辣味的祖传秘笈。' }
      ]
    }
  }
};
