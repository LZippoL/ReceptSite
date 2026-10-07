import { Article } from '../types';
import { Language } from './types';

export interface LocalizedArticleData {
  title: string;
  summary: string;
  content?: string;
  tags?: string[];
}

export const ARTICLE_TRANSLATIONS: Record<string, Partial<Record<Language, LocalizedArticleData>>> = {
  'how-to-cook-perfect-rice': {
    en: {
      title: 'How to Cook Perfect Rice: Secrets to Fluffy, Non-Sticky Grains',
      summary: 'Learn the golden ratio of water to rice, proper rinsing techniques, and how steam resting creates fluffy individual grains every time.',
      tags: ['cooking tips', 'rice', 'kitchen basics', 'techniques']
    },
    de: {
      title: 'Perfekten Reis kochen: Geheimnisse für lockere, körnige Reiskörner',
      summary: 'Lernen Sie das ideale Wasser-Reis-Verhältnis, das richtige Waschen und warum die Ruhephase im Dampf entscheidend ist.',
      tags: ['Küchentipps', 'Reis', 'Grundlagen', 'Kochtechniken']
    },
    zh: {
      title: '如何煮出粒粒分明的不粘米饭：米水黄金比例与焖饭秘诀',
      summary: '掌握洗米技巧、精确水米配比，以及出锅前关键的关火焖蒸静置，煮出媲美名厨的香甜弹牙米饭。',
      tags: ['烹饪技巧', '煮饭秘诀', '厨房基础', '美食心得']
    }
  },

  '10-secrets-of-perfect-steak': {
    en: {
      title: '10 Secrets to Cooking a Restaurant-Quality Juicy Steak at Home',
      summary: 'From bringing meat to room temperature and patting dry, to the high-heat cast-iron sear, butter basting, and crucial resting phase.',
      tags: ['steak', 'beef', 'chef tips', 'meat', 'gourmet']
    },
    de: {
      title: '10 Geheimnisse für das perfekte saftige Steak zu Hause',
      summary: 'Von der Raumtemperatur über scharfes Anbraten in Gusseisen bis hin zum Arrosieren mit Butter und der Ruhezeit.',
      tags: ['Steak', 'Rindfleisch', 'Küchentipps', 'Gourmet']
    },
    zh: {
      title: '在家煎出米其林级鲜嫩多汁牛排的10个关键秘诀',
      summary: '从回温吸干水分、超高温铸铁锅热锅、美拉德焦褐感外壳、香草黄油淋浇到必不可少的出锅醒肉。',
      tags: ['牛排', '煎肉技巧', '大厨秘籍', '肉类料理']
    }
  },

  'how-to-choose-olive-oil': {
    en: {
      title: 'How to Choose Real Extra Virgin Olive Oil: The Ultimate Buyer’s Guide',
      summary: 'Understanding harvest dates, acidity levels, dark glass bottles, cold-pressing, and how to detect genuine peppery freshness.',
      tags: ['olive oil', 'ingredients', 'shopping guide', 'healthy']
    },
    de: {
      title: 'Echtes Extra Vergine Olivenöl erkennen: Der Einkaufsführer',
      summary: 'Erntejahr, Kaltpressung, dunkle Glasflaschen und Geschmacksprofile: So meiden Sie Fälschungen im Supermarkt.',
      tags: ['Olivenöl', 'Zutaten', 'Einkaufstipps', 'Gesundheit']
    },
    zh: {
      title: '如何辨别真正的特级初榨橄榄油：避坑选购全指南',
      summary: '深度解析采收年份、酸度指标、深色玻璃瓶避光重要性、冷榨工艺以及优质橄榄油独特的辛辣回甘。',
      tags: ['橄榄油', '食材辨析', '选购指南', '健康生活']
    }
  },

  'food-storage-fridge-guide': {
    en: {
      title: 'Fridge Organization Guide: Keep Fresh Herbs and Vegetables Crisp for Weeks',
      summary: 'Smart temperature zones in modern refrigerators, the paper towel trick for leafy greens, and foods that should never be chilled.',
      tags: ['food storage', 'fridge organization', 'zero waste', 'freshness']
    },
    de: {
      title: 'Kühlschrank-Guide: Frische Kräuter & Gemüse wochenlang knackig halten',
      summary: 'Die richtigen Temperaturzonen, Papiertuch-Tricks für Blattsalate und welche Lebensmittel niemals in die Kälte gehören.',
      tags: ['Lagerung', 'Kühlschrank', 'Frische', 'Nachhaltigkeit']
    },
    zh: {
      title: '冰箱食材科学保鲜指南：让新鲜绿叶菜与香草保鲜两周的妙招',
      summary: '读懂冰箱分区温湿度差异、厨房纸吸湿包扎法，以及哪些果蔬放进冰箱更容易腐败的常见误区。',
      tags: ['食材保鲜', '冰箱收纳', '节约减废', '生活小妙招']
    }
  },

  'secrets-of-fluffy-syrnyky': {
    en: {
      title: 'The Secret to Fluffy Syrnyky That Never Spread in the Pan',
      summary: 'Why moisture control in farmer’s cheese is essential, how using semolina or cornstarch beats excess flour, and low-temperature frying.',
      tags: ['syrnyky', 'baking tips', 'breakfast', 'ukrainian']
    },
    de: {
      title: 'Geheimnis fluffiger Syrniki: Warum sie nie in der Pfanne zerlaufen',
      summary: 'Grieß statt Zuviel Mehl, das richtige Abtropfen des Quarks und sanftes Braten bei mittlerer Hitze.',
      tags: ['Syrniki', 'Quarkküchlein', 'Frühstück', 'Backtipps']
    },
    zh: {
      title: '松软不塌陷的奶酪小饼秘诀：告别下锅散架与面粉感',
      summary: '去除农家干酪过多乳清水分的关键，如何用微量木薯淀粉或细面粉替代厚重面粉，以及文火慢煎控温法。',
      tags: ['奶酪松饼', '烘焙心得', '早餐料理', '美味秘笈']
    }
  },

  'spices-and-herbs-kitchen-guide': {
    en: {
      title: 'The Ultimate Guide to Kitchen Spices: Pairing Herbs with Everyday Dishes',
      summary: 'Mastering blooming whole spices in hot oil, the difference between dry and fresh herbs, and flavor pairing charts for meat, fish, and soups.',
      tags: ['spices', 'flavor pairing', 'kitchen guide', 'culinary basics']
    },
    de: {
      title: 'Gewürz-Guide: Welche Kräuter und Gewürze passen zu welchen Gerichten?',
      summary: 'Gewürze in heißem Öl anrösten, Trocken- versus Frischkräuter und die besten Aromenkombinationen.',
      tags: ['Gewürze', 'Kräuter', 'Geschmack', 'Kochschule']
    },
    zh: {
      title: '厨房香料百科全书：常见香草与家常菜肴的风味搭配法则',
      summary: '热油煸香激发脂溶性香气、干香草与鲜香草的最佳投放时机，以及肉类、海鲜和靓汤的风味图谱。',
      tags: ['香料指南', '风味搭配', '烹饪科学', '大厨课堂']
    }
  },

  'perfect-choux-pastry-varenyky': {
    en: {
      title: 'Choux Scalded Dough for Varenyky & Dumplings: Perfect Elasticity',
      summary: 'Using hot boiling water to gelatinize flour starch creates an ultra-pliable dough that rolls paper-thin and never tears during boiling.',
      tags: ['dough', 'varenyky', 'dumplings', 'techniques']
    },
    de: {
      title: 'Brandteig für Wareniki & Teigtaschen: Perfekt elastisch ohne Reißen',
      summary: 'Kochendes Wasser verkleistert die Stärke für einen geschmeidigen Teig, der sich hauchdünn ausrollen lässt.',
      tags: ['Teig', 'Wareniki', 'Teigtaschen', 'Rezept']
    },
    zh: {
      title: '烫面水饺与面点皮的弹韧秘诀：薄如宣纸且久煮不破',
      summary: '利用滚水糊化面粉淀粉分子，制作出延展性绝佳的面团，擀得薄如蝉翼且锁汁不破口。',
      tags: ['烫面面团', '水饺皮', '面点技法', '传统面食']
    }
  },

  'how-to-make-crystal-clear-broth': {
    en: {
      title: 'How to Make Crystal-Clear, Golden Bone Broth: Chef Rules',
      summary: 'Cold water start, never boiling hard, roasting bones for color, skimming impurities, and finishing with an egg white raft if needed.',
      tags: ['broth', 'soups', 'kitchen basics', 'techniques']
    },
    de: {
      title: 'Glasklare, goldene Knochenbrühe kochen: Die goldenen Chefregeln',
      summary: 'Kalt aufsetzen, niemals sprudelnd kochen, Knochen anrösten und sanft simmern für maximale Klarheit.',
      tags: ['Brühe', 'Suppe', 'Grundbrühe', 'Küchentipps']
    },
    zh: {
      title: '如何炖出一锅清澈如水晶、金黄醇香的骨汤：名厨黄金法则',
      summary: '冷水下锅、骨头提前烤香、全程文火微沸不翻滚、勤撇浮沫以及蛋清扫汤提清终极技巧。',
      tags: ['高汤清汤', '煲汤技巧', '骨汤', '厨房基本功']
    }
  }
};

/**
 * Localizes an article according to the active language.
 */
export function getLocalizedArticle(article: Article, lang: Language): Article {
  if (lang === 'uk') {
    return article;
  }

  const artTr = ARTICLE_TRANSLATIONS[article.slug]?.[lang];
  if (!artTr) {
    return article;
  }

  return {
    ...article,
    title: artTr.title || article.title,
    summary: artTr.summary || article.summary,
    content: artTr.content || article.content,
    tags: artTr.tags || article.tags
  };
}
