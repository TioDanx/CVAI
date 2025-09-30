import { jsPDF } from "jspdf";
import CVData from "@/types/CVData";

const dict = {
  es: {
    profile: "Perfil profesional",
    education: "Educación",
    contact: "Contacto",
    experience: "Experiencia laboral",
    hard: "Habilidades técnicas",
    soft: "Habilidades blandas",
    languages: "Idiomas",
    download: "Descargar como PDF",
    present: "Presente",
    months: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
  },
  en: {
    profile: "Professional Summary",
    education: "Education",
    contact: "Contact",
    experience: "Work Experience",
    hard: "Technical Skills",
    soft: "Soft Skills",
    languages: "Languages",
    download: "Download as PDF",
    present: "Present",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  },
} 

export function generatePDF(cvData: CVData, lang: "es" | "en" = "es") {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const langText = (lang === "es" ? dict.es : dict.en);
  const PAGE = { w: 210, h: 297 };
  const MARGIN = 18;
  const GUTTER = 10;

  const COLORS = {
    text: [25, 25, 28] as [number, number, number],
    mute: [110, 113, 120] as [number, number, number],
    accent: [88, 118, 255] as [number, number, number], 
    line: [225, 228, 236] as [number, number, number],
    sidebarBg: [248, 249, 252] as [number, number, number],
  };

  const SIDEBAR_W = 64; 
  const MAIN_X = MARGIN + SIDEBAR_W + GUTTER;
  const MAIN_W = PAGE.w - MARGIN - MAIN_X;

  let yMain = 0;

  const setFont = (weight: "normal" | "bold" = "normal", size = 11, color = COLORS.text) => {
    doc.setFont("helvetica", weight);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };

  const line = (x1: number, y1: number, x2: number, y2: number, color = COLORS.line) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.3);
    doc.line(x1, y1, x2, y2);
  };

  const textWrap = (text: string, x: number, y: number, width: number, lineHeight = 5) => {
    if (!text) return 0;
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, x, y);
    return lines.length * lineHeight;
  };

  const bulletList = (
    items: string[],
    x: number,
    startY: number,
    width: number,
    bullet = "•",
    lineHeight = 5
  ) => {
    let y = startY;
    setFont("normal", 10, COLORS.text);
    items.forEach((t) => {
      const wrapped = doc.splitTextToSize(t, width - 5);
      doc.text(bullet, x, y);
      doc.text(wrapped, x + 4, y);
      y += wrapped.length * lineHeight;
    });
    return y - startY;
  };

  const pageBreakIfNeeded = (nextBlockHeight: number, afterBreak = () => {}) => {
    if (yMain + nextBlockHeight > PAGE.h - MARGIN) {
      doc.addPage();
      yMain = MARGIN;
      afterBreak();
    }
  };

  const sectionTitle = (title: string, x: number, width: number) => {
    const h = 10;
    pageBreakIfNeeded(h + 4);
    setFont("bold", 12, COLORS.accent);
    doc.text(title, x, yMain + 8);
    yMain += 10;
    line(x, yMain, x + width, yMain);
    yMain += 3;
  };

  const drawHeader = () => {
    const x = MARGIN;
    let y = MARGIN;

    setFont("bold", 22, COLORS.text);
    doc.text(cvData.contact_info.name || "Nombre Apellido", x, y + 7);

    setFont("normal", 12, COLORS.mute);
    doc.text(cvData.contact_info.role || "Front-End Developer", x, y + 14);

    line(MARGIN, y + 18, PAGE.w - MARGIN, y + 18);

  

    yMain = y + 28; 
  };

  const drawSidebar = () => {
    const x = MARGIN;
    let y = yMain;

    doc.setFillColor(...COLORS.sidebarBg);
    doc.rect(x - 2, y - 4, SIDEBAR_W + 4, PAGE.h - y - MARGIN + 6, "F");

    setFont("bold", 11, COLORS.accent);
    doc.text(langText.contact, x, y+2);
    y += 7;
    setFont("normal", 10, COLORS.text);
    y += textWrap(cvData.contact_info.email, x, y, SIDEBAR_W);
    y += textWrap(cvData.contact_info.phone, x, y, SIDEBAR_W);
    y += textWrap(cvData.contact_info.linkedin, x, y, SIDEBAR_W);
    y += 3;
    line(x, y, x + SIDEBAR_W, y);
    y += 5;

    setFont("bold", 11, COLORS.accent);
    doc.text(langText.hard, x, y);
    y += 5;
    setFont("normal", 10);
    (cvData.additional_info.hard_skills || []).forEach((s) => {
      const h = textWrap(`• ${s}`, x, y, SIDEBAR_W);
      y += Math.max(h, 5);
    });
    y += 3;
    line(x, y, x + SIDEBAR_W, y);
    y += 5;

    setFont("bold", 11, COLORS.accent);
    doc.text(langText.soft, x, y);
    y += 5;
    setFont("normal", 10);
    (cvData.additional_info.soft_skills || []).forEach((s) => {
      const h = textWrap(`• ${s}`, x, y, SIDEBAR_W);
      y += Math.max(h, 5);
    });
    y += 3;
    line(x, y, x + SIDEBAR_W, y);
    y += 5;

    setFont("bold", 11, COLORS.accent);
    doc.text(langText.languages, x, y);
    y += 5;
    setFont("normal", 10);
    (cvData.additional_info.languages || []).forEach((s) => {
      const h = textWrap(`• ${s}`, x, y, SIDEBAR_W);
      y += Math.max(h, 5);
    });

  };

  const drawProfile = () => {
    yMain -= 5;
    sectionTitle(langText.profile, MAIN_X, MAIN_W);
    setFont("normal", 11, COLORS.text);
    const h = textWrap(cvData.description || "", MAIN_X, yMain + 2, MAIN_W, 5.5);
    yMain += h-6;
  };

  const drawExperience = () => {
    sectionTitle(langText.experience, MAIN_X, MAIN_W);

    (cvData.experience || []).forEach((exp, idx) => {
      const header = `${exp.position}  –  ${exp.company}`;
      const meta = `${exp.dates}`;
      const estHeaderH = 5 + 5 + 4; 

      pageBreakIfNeeded(estHeaderH + 8);

      setFont("bold", 12, COLORS.text);
      doc.text(header, MAIN_X, yMain + 5);
      setFont("normal", 10, COLORS.mute);
      doc.text(meta, MAIN_X, yMain + 10);

      yMain += 15;

      if (exp.bullet_points?.length) {
        pageBreakIfNeeded(6 * exp.bullet_points.length);
        yMain += bulletList(exp.bullet_points, MAIN_X, yMain, MAIN_W, "•", 5.2);
      }

      yMain += 2;

      if (idx < (cvData.experience?.length || 0) - 1) {
        line(MAIN_X, yMain, MAIN_X + MAIN_W, yMain);
        yMain += 4;
      }
    });
  };

  const drawEducation = () => {
    sectionTitle(langText.education, MAIN_X, MAIN_W);

    (cvData.education || []).forEach((edu, idx) => {
      const row = `${edu.degree} – ${edu.institution} (${edu.year})`;
      pageBreakIfNeeded(8);
      setFont("normal", 10, COLORS.text);
      doc.text(row, MAIN_X, yMain + 3);
      yMain += 7;

      if (idx < (cvData.education?.length || 0) - 1) {
        line(MAIN_X, yMain, MAIN_X + MAIN_W, yMain, COLORS.line);
        yMain += 2;
      }
    });
  };

 
  drawHeader();
  drawSidebar();
  drawProfile();
  drawExperience();
  drawEducation();

 
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    setFont("normal", 9, COLORS.mute);
    const footerText = `${cvData.contact_info.name || "Nombre Apellido"} · ${cvData.contact_info.email || ""}`;
    doc.text(footerText, MARGIN, PAGE.h - 8);
    doc.text(String(i), PAGE.w - MARGIN, PAGE.h - 8, { align: "right" });
  }

  doc.save("cv.pdf");
}
