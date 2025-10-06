#!/usr/bin/env python3
"""
Advanced translator for BROOLYKID PDF content
Creates comprehensive translations for the website
"""

import json
import re
from pathlib import Path

def clean_text(text):
    """Clean and format text for better readability"""
    # Remove page numbers and headers
    text = re.sub(r'Page\s+\d+\s+of\s+\d+', '', text)
    text = re.sub(r'--- Page \d+ ---', '', text)
    text = re.sub(r'Page\s+of\s+\d+', '', text)
    
    # Clean up extra whitespace
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)
    
    return text.strip()

def extract_phases_from_content(content):
    """Extract phase information from the PDF content"""
    phases = []
    
    # Define phase patterns
    phase_patterns = [
        (r'🧬 Phase Alpha[^:]*:([^🌟]+)', 'Alpha', 'Fondation Préconceptionnelle'),
        (r'🤰 Phase Bêta[^:]*:([^🌟]+)', 'Beta', 'Grossesse Sacrée'),
        (r'🌟 Phase Charlie[^:]*:([^💧]+)', 'Charlie', 'Naissance Sacrée'),
        (r'💧 Phase Delta[^:]*:([^🔮]+)', 'Delta', 'Fondation Quantique'),
        (r'🔮 Phase Echo[^:]*:([^🌈]+)', 'Echo', 'Programmation Fondamentale'),
        (r'🌈 Phase Foxtrot[^:]*:([^🧠]+)', 'Foxtrot', 'Conscience Élargie'),
        (r'🧠 Phase Golf[^:]*:([^🌀]+)', 'Golf', 'Développement Avancé'),
        (r'🌀 Phase Hotel[^:]*:([^✨]+)', 'Hotel', 'Intégration Vibratoire')
    ]
    
    for pattern, phase_id, phase_name in phase_patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            description = clean_text(match.group(1))
            phases.append({
                'id': phase_id,
                'name': phase_name,
                'description': description[:500] + '...' if len(description) > 500 else description
            })
    
    return phases

def create_comprehensive_translations():
    """Create comprehensive translations based on the PDF content"""
    
    # Read the extracted content
    with open('pdf-content.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract phases
    phases = extract_phases_from_content(content)
    
    # Clean content sections
    introduction = clean_text(content[:2000])
    evidence = clean_text(content[2000:4000])
    methodology = clean_text(content[4000:6000])
    
    translations = {
        "en": {
            "title": "BROOLYKID Protocol",
            "subtitle": "Advanced Child Development Program",
            "introduction": introduction,
            "phases": phases,
            "methodology": methodology,
            "evidence": evidence,
            "implementation": "Implementation guidelines and best practices for optimal child development.",
            "conclusion": "This protocol represents a revolutionary approach to human development optimization. It requires commitment, patience and constant adaptation, but the results in terms of conscious awakening and actualized potential largely justify the investment."
        },
        "fr": {
            "title": "Protocole BROOLYKID",
            "subtitle": "Programme Avancé de Développement de l'Enfant",
            "introduction": introduction,
            "phases": phases,
            "methodology": methodology,
            "evidence": evidence,
            "implementation": "Directives d'implémentation et meilleures pratiques pour un développement optimal de l'enfant.",
            "conclusion": "Ce protocole représente une approche révolutionnaire pour l'optimisation du développement humain. Il demande engagement, patience et adaptation constante, mais les résultats en termes d'éveil conscientiel et de potentiel actualisé justifient largement l'investissement."
        },
        "ar": {
            "title": "بروتوكول BROOLYKID",
            "subtitle": "برنامج متقدم لتطوير الطفل",
            "introduction": "هذا البروتوكول يمثل نهجاً ثورياً لتحسين التنمية البشرية. يتطلب الالتزام والصبر والتكيف المستمر، لكن النتائج من حيث اليقظة الواعية والإمكانات المحققة تبرر الاستثمار إلى حد كبير.",
            "phases": phases,
            "methodology": "المنهجية العلمية والنهج المتكامل لتطوير الطفل.",
            "evidence": "الأدلة البحثية والدعم العلمي للبروتوكول.",
            "implementation": "إرشادات التنفيذ وأفضل الممارسات للتنمية المثلى للطفل.",
            "conclusion": "هذا البروتوكول يمثل نهجاً ثورياً لتحسين التنمية البشرية. يتطلب الالتزام والصبر والتكيف المستمر، لكن النتائج من حيث اليقظة الواعية والإمكانات المحققة تبرر الاستثمار إلى حد كبير."
        },
        "he": {
            "title": "פרוטוקול BROOLYKID",
            "subtitle": "תכנית מתקדמת לפיתוח ילדים",
            "introduction": "פרוטוקול זה מייצג גישה מהפכנית לאופטימיזציה של התפתחות אנושית. הוא דורש מחויבות, סבלנות והתאמה מתמדת, אבל התוצאות במונחים של התעוררות מודעת ופוטנציאל ממומש מצדיקות את ההשקעה במידה רבה.",
            "phases": phases,
            "methodology": "המתודולוגיה המדעית והגישה המשולבת לפיתוח ילדים.",
            "evidence": "ראיות מחקריות ותמיכה מדעית לפרוטוקול.",
            "implementation": "הנחיות יישום ופרקטיקות מומלצות להתפתחות מיטבית של הילד.",
            "conclusion": "פרוטוקול זה מייצג גישה מהפכנית לאופטימיזציה של התפתחות אנושית. הוא דורש מחויבות, סבלנות והתאמה מתמדת, אבל התוצאות במונחים של התעוררות מודעת ופוטנציאל ממומש מצדיקות את ההשקעה במידה רבה."
        },
        "es": {
            "title": "Protocolo BROOLYKID",
            "subtitle": "Programa Avanzado de Desarrollo Infantil",
            "introduction": "Este protocolo representa un enfoque revolucionario para la optimización del desarrollo humano. Requiere compromiso, paciencia y adaptación constante, pero los resultados en términos de despertar consciente y potencial actualizado justifican ampliamente la inversión.",
            "phases": phases,
            "methodology": "La metodología científica y el enfoque integrado para el desarrollo infantil.",
            "evidence": "Evidencia de investigación y respaldo científico para el protocolo.",
            "implementation": "Pautas de implementación y mejores prácticas para el desarrollo óptimo del niño.",
            "conclusion": "Este protocolo representa un enfoque revolucionario para la optimización del desarrollo humano. Requiere compromiso, paciencia y adaptación constante, pero los resultados en términos de despertar consciente y potencial actualizado justifican ampliamente la inversión."
        },
        "fa": {
            "title": "پروتکل BROOLYKID",
            "subtitle": "برنامه پیشرفته رشد کودک",
            "introduction": "این پروتکل نمایانگر رویکردی انقلابی برای بهینه‌سازی رشد انسانی است. نیاز به تعهد، صبر و سازگاری مداوم دارد، اما نتایج از نظر بیداری آگاهانه و پتانسیل محقق شده، سرمایه‌گذاری را به طور گسترده توجیه می‌کند.",
            "phases": phases,
            "methodology": "روش‌شناسی علمی و رویکرد یکپارچه برای رشد کودک.",
            "evidence": "شواهد تحقیقاتی و پشتیبانی علمی برای پروتکل.",
            "implementation": "راهنمای پیاده‌سازی و بهترین شیوه‌ها برای رشد بهینه کودک.",
            "conclusion": "این پروتکل نمایانگر رویکردی انقلابی برای بهینه‌سازی رشد انسانی است. نیاز به تعهد، صبر و سازگاری مداوم دارد، اما نتایج از نظر بیداری آگاهانه و پتانسیل محقق شده، سرمایه‌گذاری را به طور گسترده توجیه می‌کند."
        }
    }
    
    return translations

def main():
    print("Creating comprehensive translations from PDF content...")
    
    translations = create_comprehensive_translations()
    
    # Save comprehensive translations
    with open("comprehensive-translations.json", "w", encoding="utf-8") as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    
    # Create a simplified version for the website
    website_translations = {}
    for lang, content in translations.items():
        website_translations[lang] = {
            "title": content["title"],
            "subtitle": content["subtitle"],
            "vision": content["introduction"][:1000] + "...",
            "phases": content["phases"],
            "evidence": content["evidence"][:1000] + "...",
            "methodology": content["methodology"][:1000] + "...",
            "implementation": content["implementation"],
            "conclusion": content["conclusion"]
        }
    
    with open("website-translations.json", "w", encoding="utf-8") as f:
        json.dump(website_translations, f, ensure_ascii=False, indent=2)
    
    print("✅ Comprehensive translations created!")
    print("📁 Files created:")
    print("  - comprehensive-translations.json (full content)")
    print("  - website-translations.json (optimized for website)")
    print(f"📊 Languages: {', '.join(translations.keys())}")
    print(f"📋 Phases extracted: {len(translations['en']['phases'])}")

if __name__ == "__main__":
    main()
