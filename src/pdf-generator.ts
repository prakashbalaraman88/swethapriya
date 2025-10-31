import { jsPDF } from 'jspdf';

const getImageBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (url.startsWith('data:')) {
      resolve(url);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject('Failed to get canvas context');
      }
    };

    img.onerror = () => reject('Failed to load image');
    img.src = url;
  });
};

const cropImageForPDF = (base64: string, targetWidth: number, targetHeight: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject('Failed to get canvas context');
        return;
      }

      const imgAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      let sourceWidth = img.width;
      let sourceHeight = img.height;
      let sourceX = 0;
      let sourceY = 0;

      if (imgAspect > targetAspect) {
        sourceWidth = img.height * targetAspect;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        sourceHeight = img.width / targetAspect;
        sourceY = img.height * 0.15;
      }

      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, targetWidth, targetHeight
      );

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => reject('Failed to load image');
    img.src = base64;
  });
};

export const generatePortfolioPDF = async (photoUrl: string) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - (2 * margin);

  let imageBase64 = photoUrl;
  if (!photoUrl.startsWith('data:')) {
    imageBase64 = await getImageBase64(photoUrl);
  }
  const croppedImage = await cropImageForPDF(imageBase64, 800, 900);

  pdf.setFillColor(26, 26, 26);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setFillColor(36, 36, 36);
  pdf.rect(margin, margin, contentWidth / 2 - 5, 90, 'F');

  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Swetha Priya', margin + 5, margin + 15);

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(226, 232, 240);
  pdf.text('Business Head | Growth & P&L @MediBuddy', margin + 5, margin + 25);

  pdf.setFontSize(10);
  pdf.setTextColor(148, 163, 184);
  const subtitle = pdf.splitTextToSize('0→1 Builder | P&L Owner | Scaling Businesses from Concept to ₹100Cr+ | 15+ Years Experience in High-Growth Health-Tech', contentWidth / 2 - 15);
  pdf.text(subtitle, margin + 5, margin + 35);

  pdf.setFillColor(143, 188, 63, 40);
  pdf.roundedRect(margin + 5, margin + 52, 30, 8, 3, 3, 'F');
  pdf.setFontSize(9);
  pdf.setTextColor(143, 188, 63);
  pdf.text('Business Head', margin + 8, margin + 57);

  pdf.roundedRect(margin + 40, margin + 52, 25, 8, 3, 3, 'F');
  pdf.text('P&L Owner', margin + 43, margin + 57);

  pdf.roundedRect(margin + 70, margin + 52, 25, 8, 3, 3, 'F');
  pdf.text('0→1 Expert', margin + 73, margin + 57);

  try {
    pdf.addImage(croppedImage, 'PNG', margin + contentWidth / 2 + 5, margin, contentWidth / 2 - 5, 90);
  } catch (error) {
    console.error('Error adding image:', error);
  }

  const statsY = margin + 100;
  const statWidth = (contentWidth - 15) / 4;
  const statHeight = 25;

  const stats = [
    { value: '180x', label: 'Growth Scale', sub: '₹10L → ₹18Cr GMV' },
    { value: '100+', label: 'Vendor Partners', sub: 'Strategic Partnerships' },
    { value: '15+', label: 'Years Experience', sub: 'Industry Leadership' },
    { value: '25%', label: 'QoQ Growth', sub: 'Sustained Growth Rate' }
  ];

  stats.forEach((stat, index) => {
    const x = margin + (index * (statWidth + 5));
    pdf.setFillColor(36, 36, 36);
    pdf.roundedRect(x, statsY, statWidth, statHeight, 2, 2, 'F');

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text(stat.value, x + 3, statsY + 8);

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(211, 211, 211);
    pdf.text(stat.label, x + 3, statsY + 14);

    pdf.setFontSize(8);
    pdf.setTextColor(163, 163, 163);
    pdf.text(stat.sub, x + 3, statsY + 20);
  });

  let currentY = statsY + 35;

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('About Me', margin, currentY);

  currentY += 8;
  pdf.setFillColor(36, 36, 36);
  pdf.roundedRect(margin, currentY, contentWidth, 40, 2, 2, 'F');

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(211, 211, 211);

  const aboutText1 = pdf.splitTextToSize(
    "I'm a category and business head with a proven record of building and scaling new verticals from the ground up — from ₹10 lakhs/month to ₹18 crores GMV/month — by owning the complete P&L and driving cross-functional execution.",
    contentWidth - 10
  );
  pdf.text(aboutText1, margin + 5, currentY + 6);

  const aboutText2 = pdf.splitTextToSize(
    "Over the years, I've led multiple 0→1 business builds within India's largest digital healthcare platform, integrating strategy, product, marketing, operations, and customer success into a unified growth engine. I thrive in ambiguity — identifying whitespace opportunities, building structure where none exists, and converting ideas into sustainable revenue lines.",
    contentWidth - 10
  );
  pdf.text(aboutText2, margin + 5, currentY + 20);

  pdf.addPage();

  pdf.setFillColor(26, 26, 26);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  currentY = margin;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Current Role', margin, currentY);

  currentY += 8;
  pdf.setFillColor(36, 36, 36);
  pdf.roundedRect(margin, currentY, contentWidth, 120, 2, 2, 'F');

  pdf.setFillColor(143, 188, 63, 50);
  pdf.roundedRect(margin + 5, currentY + 5, 40, 6, 2, 2, 'F');
  pdf.setFontSize(8);
  pdf.setTextColor(143, 188, 63);
  pdf.text('CURRENT POSITION', margin + 8, currentY + 9);

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('MediBuddy', margin + 5, currentY + 18);

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(226, 232, 240);
  pdf.text('Senior Director – Programs (Business Head)', margin + 5, currentY + 25);

  pdf.setFontSize(9);
  pdf.setTextColor(203, 213, 225);
  pdf.text('Bengaluru  •  2022 – Present (4 years)', margin + 5, currentY + 31);

  pdf.setFontSize(9);
  pdf.setTextColor(211, 211, 211);
  const roleDesc = pdf.splitTextToSize(
    'Owning P&L and strategy for multiple new business verticals under MediBuddy\'s "Programs" charter, spanning Chronic Care, Fitness, Maternity, Women\'s Health, and EAP.',
    contentWidth - 10
  );
  pdf.text(roleDesc, margin + 5, currentY + 39);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Key Achievements', margin + 5, currentY + 52);

  const achievements = [
    'Scaled a nascent business line from ₹10 lakhs/month to ₹18 crores GMV/month within 24 months through structured product-market fit, process design, and multi-vendor scaling.',
    'Built and led cross-functional teams across Product, Marketing, Sales, Ops, and Customer Service to deliver end-to-end category ownership.',
    'Established new pricing, partner, and distribution models integrating corporate-sponsored and out-of-pocket revenue streams.',
    'Forged high-impact partnerships with leading ecosystem players (Cult.fit, Fitpass, Novo Nordisk, Elecom-Japan, etc.), managing 100+ vendor partners.',
    'Designed quarterly OKR frameworks, trackers, and review cadences that improved forecasting accuracy and operating discipline across verticals.',
    'Led category diversification — from chronic condition management to GLP-1 programs, fitness bundles, and maternity offerings — achieving sustainable 25% QoQ growth.'
  ];

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(226, 232, 240);

  let achievementY = currentY + 58;
  achievements.forEach((achievement, index) => {
    const lines = pdf.splitTextToSize(`• ${achievement}`, contentWidth - 12);
    pdf.text(lines, margin + 6, achievementY);
    achievementY += lines.length * 3.5;
  });

  currentY = achievementY + 15;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Core Skills', margin, currentY);

  currentY += 8;
  const skills = [
    'P&L Ownership & Business Strategy',
    '0→1 Category Building',
    'Product + Ops + Marketing Alignment',
    'GTM & Growth Strategy',
    'Pricing & Revenue Model Design',
    'Cross-Functional Leadership',
    'Corporate Partnerships & Ecosystem Alliances',
    'Process Design & Operational Excellence',
    'Data-Driven Decision-Making'
  ];

  const skillBoxWidth = (contentWidth - 10) / 3;
  const skillBoxHeight = 12;
  let skillX = margin;
  let skillY = currentY;

  skills.forEach((skill, index) => {
    if (index > 0 && index % 3 === 0) {
      skillY += skillBoxHeight + 3;
      skillX = margin;
    }

    pdf.setFillColor(36, 36, 36);
    pdf.roundedRect(skillX, skillY, skillBoxWidth - 3, skillBoxHeight, 2, 2, 'F');

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(226, 232, 240);
    const skillLines = pdf.splitTextToSize(skill, skillBoxWidth - 8);
    pdf.text(skillLines, skillX + 3, skillY + 5);

    skillX += skillBoxWidth;
  });

  pdf.addPage();

  pdf.setFillColor(26, 26, 26);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  currentY = margin;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Career Journey', margin, currentY);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(156, 163, 175);
  pdf.text('15+ Years of Leadership Excellence', margin, currentY + 6);

  const experiences = [
    {
      company: 'MediBuddy',
      duration: '4 yrs',
      role: 'Leading Programs vertical as Business Head',
      achievement: 'scaled a new business from ₹10 L/month to ₹18 Cr GMV/month through full P&L ownership and cross-functional leadership.'
    },
    {
      company: 'UrbanKisaan',
      duration: '1 yr 6 mos',
      role: 'Vice President of Sales',
      achievement: 'drove B2C and enterprise expansion in agri-tech and built sales frameworks for rapid scaling.'
    },
    {
      company: 'Unacademy',
      duration: '7 mos',
      role: 'Associate Director of Sales',
      achievement: 'led category-specific growth in the ed-tech space, improving funnel efficiency and retention.'
    },
    {
      company: 'HealthifyMe',
      duration: '3 yrs 2 mos',
      role: 'Head of Sales',
      achievement: 'owned revenue P&L, built nationwide inside-sales engine, and scaled digital health subscriptions multi-fold.'
    },
    {
      company: 'Babajob.com',
      duration: '1 yr 3 mos',
      role: 'Assistant Manager – Inside Sales',
      achievement: 'managed telesales operations and onboarded SMB employers across India.'
    },
    {
      company: 'AEON Learning',
      duration: '1 yr 1 mo',
      role: 'Team Lead',
      achievement: 'led revenue team for ed-tech inside-sales, improving conversion and lead-quality processes.'
    },
    {
      company: 'TutorVista',
      duration: '2 yrs',
      role: 'Sales Executive / Academic Counselor',
      achievement: 'early-career foundation in B2C consultative selling and academic counseling.'
    }
  ];

  currentY += 12;

  experiences.forEach((exp, index) => {
    if (currentY > pageHeight - 40) {
      pdf.addPage();
      pdf.setFillColor(26, 26, 26);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      currentY = margin;
    }

    pdf.setFillColor(36, 36, 36);
    pdf.roundedRect(margin, currentY, contentWidth, 20, 2, 2, 'F');

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text(exp.company, margin + 3, currentY + 5);

    pdf.setFillColor(143, 188, 63, 40);
    pdf.roundedRect(margin + contentWidth - 25, currentY + 2, 22, 5, 2, 2, 'F');
    pdf.setFontSize(8);
    pdf.setTextColor(143, 188, 63);
    pdf.text(exp.duration, margin + contentWidth - 23, currentY + 5.5);

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(203, 213, 225);
    pdf.text(exp.role, margin + 3, currentY + 10);

    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    const achievementText = pdf.splitTextToSize(exp.achievement, contentWidth - 8);
    pdf.text(achievementText, margin + 3, currentY + 15);

    currentY += 23;
  });

  currentY = pageHeight - 15;
  pdf.setFillColor(10, 10, 10);
  pdf.rect(0, currentY, pageWidth, 15, 'F');

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(156, 163, 175);
  pdf.text('Swetha Priya | Business Head & P&L Owner | Building Scalable Health-Tech Businesses', pageWidth / 2, currentY + 8, { align: 'center' });

  pdf.save('Swetha_Priya_Portfolio.pdf');
};
