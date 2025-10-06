#!/usr/bin/env python3
"""
Script to extract content from BROOLYKIDPDF.pdf and create translations
"""

import sys
import os
import json
from pathlib import Path

try:
    import PyPDF2
except ImportError:
    print("Installing PyPDF2...")
    os.system("pip install PyPDF2")
    import PyPDF2

def extract_pdf_content(pdf_path):
    """Extract text content from PDF"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text_content = ""
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content += f"\n--- Page {page_num + 1} ---\n"
                text_content += page.extract_text()
            
            return text_content
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def create_translation_structure(content):
    """Create translation structure for the website"""
    
    # Split content into logical sections
    sections = {
        "title": "BROOLYKID Protocol",
        "subtitle": "Advanced Child Development Program",
        "introduction": "",
        "phases": [],
        "methodology": "",
        "evidence": "",
        "implementation": "",
        "conclusion": ""
    }
    
    # Basic content parsing (you can enhance this)
    lines = content.split('\n')
    current_section = "introduction"
    current_text = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect sections based on keywords
        if any(keyword in line.lower() for keyword in ['phase', 'étape', 'step']):
            if current_text:
                sections[current_section] = current_text.strip()
            current_section = "phases"
            current_text = line + "\n"
        elif any(keyword in line.lower() for keyword in ['method', 'méthode', 'approach']):
            if current_text:
                sections[current_section] = current_text.strip()
            current_section = "methodology"
            current_text = line + "\n"
        elif any(keyword in line.lower() for keyword in ['evidence', 'preuve', 'research']):
            if current_text:
                sections[current_section] = current_text.strip()
            current_section = "evidence"
            current_text = line + "\n"
        elif any(keyword in line.lower() for keyword in ['implementation', 'mise en œuvre']):
            if current_text:
                sections[current_section] = current_text.strip()
            current_section = "implementation"
            current_text = line + "\n"
        elif any(keyword in line.lower() for keyword in ['conclusion', 'résumé']):
            if current_text:
                sections[current_section] = current_text.strip()
            current_section = "conclusion"
            current_text = line + "\n"
        else:
            current_text += line + "\n"
    
    # Add the last section
    if current_text:
        sections[current_section] = current_text.strip()
    
    return sections

def create_translations(content_sections):
    """Create translations for different languages"""
    
    translations = {
        "en": {
            "title": "BROOLYKID Protocol",
            "subtitle": "Advanced Child Development Program",
            "introduction": content_sections.get("introduction", "Advanced child development protocol based on scientific research."),
            "phases": content_sections.get("phases", "Development phases and implementation steps."),
            "methodology": content_sections.get("methodology", "Scientific methodology and approach."),
            "evidence": content_sections.get("evidence", "Research evidence and scientific backing."),
            "implementation": content_sections.get("implementation", "Implementation guidelines and best practices."),
            "conclusion": content_sections.get("conclusion", "Summary and next steps.")
        },
        "fr": {
            "title": "Protocole BROOLYKID",
            "subtitle": "Programme Avancé de Développement de l'Enfant",
            "introduction": content_sections.get("introduction", "Protocole avancé de développement de l'enfant basé sur la recherche scientifique."),
            "phases": content_sections.get("phases", "Phases de développement et étapes d'implémentation."),
            "methodology": content_sections.get("methodology", "Méthodologie scientifique et approche."),
            "evidence": content_sections.get("evidence", "Preuves de recherche et soutien scientifique."),
            "implementation": content_sections.get("implementation", "Directives d'implémentation et meilleures pratiques."),
            "conclusion": content_sections.get("conclusion", "Résumé et prochaines étapes.")
        },
        "ar": {
            "title": "بروتوكول BROOLYKID",
            "subtitle": "برنامج متقدم لتطوير الطفل",
            "introduction": content_sections.get("introduction", "بروتوكول متقدم لتطوير الطفل مبني على البحث العلمي."),
            "phases": content_sections.get("phases", "مراحل التطوير وخطوات التنفيذ."),
            "methodology": content_sections.get("methodology", "المنهجية العلمية والنهج."),
            "evidence": content_sections.get("evidence", "الأدلة البحثية والدعم العلمي."),
            "implementation": content_sections.get("implementation", "إرشادات التنفيذ وأفضل الممارسات."),
            "conclusion": content_sections.get("conclusion", "الملخص والخطوات التالية.")
        },
        "he": {
            "title": "פרוטוקול BROOLYKID",
            "subtitle": "תכנית מתקדמת לפיתוח ילדים",
            "introduction": content_sections.get("introduction", "פרוטוקול מתקדם לפיתוח ילדים המבוסס על מחקר מדעי."),
            "phases": content_sections.get("phases", "שלבי פיתוח ושלבי יישום."),
            "methodology": content_sections.get("methodology", "מתודולוגיה מדעית וגישה."),
            "evidence": content_sections.get("evidence", "ראיות מחקריות ותמיכה מדעית."),
            "implementation": content_sections.get("implementation", "הנחיות יישום ופרקטיקות מומלצות."),
            "conclusion": content_sections.get("conclusion", "סיכום ושלבים הבאים.")
        },
        "es": {
            "title": "Protocolo BROOLYKID",
            "subtitle": "Programa Avanzado de Desarrollo Infantil",
            "introduction": content_sections.get("introduction", "Protocolo avanzado de desarrollo infantil basado en investigación científica."),
            "phases": content_sections.get("phases", "Fases de desarrollo y pasos de implementación."),
            "methodology": content_sections.get("methodology", "Metodología científica y enfoque."),
            "evidence": content_sections.get("evidence", "Evidencia de investigación y respaldo científico."),
            "implementation": content_sections.get("implementation", "Pautas de implementación y mejores prácticas."),
            "conclusion": content_sections.get("conclusion", "Resumen y próximos pasos.")
        },
        "fa": {
            "title": "پروتکل BROOLYKID",
            "subtitle": "برنامه پیشرفته رشد کودک",
            "introduction": content_sections.get("introduction", "پروتکل پیشرفته رشد کودک مبتنی بر تحقیقات علمی."),
            "phases": content_sections.get("phases", "مراحل رشد و مراحل پیاده‌سازی."),
            "methodology": content_sections.get("methodology", "روش‌شناسی علمی و رویکرد."),
            "evidence": content_sections.get("evidence", "شواهد تحقیقاتی و پشتیبانی علمی."),
            "implementation": content_sections.get("implementation", "راهنمای پیاده‌سازی و بهترین شیوه‌ها."),
            "conclusion": content_sections.get("conclusion", "خلاصه و مراحل بعدی.")
        }
    }
    
    return translations

def main():
    pdf_path = "/Users/sheirraza/Desktop/hustle/life/lifes/BROOLYKIDPDF.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"PDF file not found: {pdf_path}")
        return
    
    print("Extracting content from PDF...")
    content = extract_pdf_content(pdf_path)
    
    if not content:
        print("Failed to extract content from PDF")
        return
    
    print("Creating translation structure...")
    sections = create_translation_structure(content)
    
    print("Generating translations...")
    translations = create_translations(sections)
    
    # Save raw content
    with open("pdf-content.txt", "w", encoding="utf-8") as f:
        f.write(content)
    
    # Save translations
    with open("translations.json", "w", encoding="utf-8") as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    
    # Save sections
    with open("content-sections.json", "w", encoding="utf-8") as f:
        json.dump(sections, f, ensure_ascii=False, indent=2)
    
    print("✅ Content extracted and translations created!")
    print("📁 Files created:")
    print("  - pdf-content.txt (raw PDF content)")
    print("  - translations.json (all translations)")
    print("  - content-sections.json (structured content)")

if __name__ == "__main__":
    main()
