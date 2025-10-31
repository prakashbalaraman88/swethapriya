import { Download, Briefcase, TrendingUp, Target, Award, Users, Building2, Rocket, BarChart3, Lightbulb, LineChart, ShoppingCart, Calendar, MapPin, ArrowUpRight, Handshake, Layers, Zap } from 'lucide-react';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('/Untitled design (2).png');

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    let yPos = 0;

    pdf.setFillColor(26, 26, 26);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    const addImage = (imgSrc: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 105;
            const imgHeight = 110;
            pdf.addImage(imgData, 'PNG', 105, 0, imgWidth, imgHeight);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = imgSrc;
      });
    };

    addImage(photoUrl).then(() => {
      pdf.setFillColor(143, 188, 63, 0.15 * 255);
      pdf.roundedRect(15, 15, 65, 10, 3, 3, 'F');

      pdf.setDrawColor(143, 188, 63);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(15, 15, 65, 10, 3, 3, 'S');

      pdf.setTextColor(143, 188, 63);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SENIOR BUSINESS LEADER', 47.5, 21, { align: 'center' });

      yPos = 35;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(32);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Swetha Priya', 15, yPos);

      yPos += 10;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(226, 232, 240);
      pdf.text('Business Head | Growth & P&L @MediBuddy', 15, yPos);

      yPos += 8;
      pdf.setFontSize(10);
      pdf.setTextColor(148, 163, 184);
      const desc = pdf.splitTextToSize('0→1 Builder | P&L Owner | Scaling Businesses from Concept to ₹100Cr+ | 15+ Years Experience in High-Growth Health-Tech', 90);
      pdf.text(desc, 15, yPos);

      yPos += 15;
      const tags = [
        { icon: '💼', text: 'Business Head' },
        { icon: '🎯', text: 'P&L Owner' },
        { icon: '🚀', text: '0→1 Expert' }
      ];

      let xPos = 15;
      tags.forEach(tag => {
        pdf.setFillColor(255, 255, 255, 0.05 * 255);
        pdf.roundedRect(xPos, yPos, 30, 8, 2, 2, 'F');
        pdf.setDrawColor(255, 255, 255, 0.1 * 255);
        pdf.roundedRect(xPos, yPos, 30, 8, 2, 2, 'S');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.text(tag.text, xPos + 15, yPos + 5.5, { align: 'center' });
        xPos += 32;
      });

      yPos = 120;
      const statsData = [
        { value: '180x', label: 'Growth Scale', sub: '₹10L → ₹18Cr GMV' },
        { value: '800+', label: 'Corporate Clients', sub: 'Enterprise Partners' },
        { value: '15+', label: 'Years Experience', sub: 'Industry Leadership' },
        { value: '25%', label: 'QoQ Growth', sub: 'Sustained Growth Rate' }
      ];

      xPos = 15;
      const statWidth = 45;
      const statHeight = 28;

      statsData.forEach(stat => {
        pdf.setFillColor(36, 36, 36);
        pdf.roundedRect(xPos, yPos, statWidth, statHeight, 2, 2, 'F');
        pdf.setDrawColor(51, 51, 51);
        pdf.roundedRect(xPos, yPos, statWidth, statHeight, 2, 2, 'S');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(stat.value, xPos + statWidth / 2, yPos + 10, { align: 'center' });

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(209, 213, 219);
        pdf.text(stat.label, xPos + statWidth / 2, yPos + 16, { align: 'center' });

        pdf.setFontSize(7);
        pdf.setTextColor(156, 163, 175);
        pdf.text(stat.sub, xPos + statWidth / 2, yPos + 21, { align: 'center' });

        xPos += statWidth + 2;
      });

      yPos += 35;
      pdf.setFillColor(143, 188, 63);
      pdf.roundedRect(15, yPos, 8, 8, 2, 2, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('About Me', 28, yPos + 6);

      yPos += 13;
      pdf.setFillColor(36, 36, 36);
      pdf.roundedRect(15, yPos, 180, 40, 3, 3, 'F');
      pdf.setDrawColor(51, 51, 51);
      pdf.roundedRect(15, yPos, 180, 40, 3, 3, 'S');

      pdf.setFontSize(9);
      pdf.setTextColor(209, 213, 219);
      pdf.setFont('helvetica', 'normal');
      const aboutText1 = "I'm a category and business head with a proven record of building and scaling new verticals from the ground up — from ₹10 lakhs/month to ₹18 crores GMV/month — by owning the complete P&L and driving cross-functional execution.";
      const aboutText2 = "Over the years, I've led multiple 0→1 business builds within India's largest digital healthcare platform, integrating strategy, product, marketing, operations, and customer success into a unified growth engine. I thrive in ambiguity — identifying whitespace opportunities, building structure where none exists, and converting ideas into sustainable revenue lines.";

      const lines1 = pdf.splitTextToSize(aboutText1, 170);
      const lines2 = pdf.splitTextToSize(aboutText2, 170);

      pdf.text(lines1, 20, yPos + 6);
      pdf.text(lines2, 20, yPos + 6 + (lines1.length * 4) + 3);

      pdf.addPage();
      pdf.setFillColor(26, 26, 26);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      yPos = 20;
      pdf.setFillColor(143, 188, 63);
      pdf.roundedRect(15, yPos, 8, 8, 2, 2, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Current Role', 28, yPos + 6);

      yPos += 13;
      pdf.setFillColor(36, 36, 36);
      pdf.roundedRect(15, yPos, 180, 120, 3, 3, 'F');
      pdf.setDrawColor(51, 51, 51);
      pdf.roundedRect(15, yPos, 180, 120, 3, 3, 'S');

      let innerY = yPos + 8;

      pdf.setFillColor(143, 188, 63, 0.2 * 255);
      pdf.roundedRect(20, innerY, 45, 6, 10, 10, 'F');
      pdf.setDrawColor(143, 188, 63, 0.3 * 255);
      pdf.roundedRect(20, innerY, 45, 6, 10, 10, 'S');

      pdf.setTextColor(143, 188, 63);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CURRENT POSITION', 42.5, innerY + 4.5, { align: 'center' });

      innerY += 10;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MediBuddy', 20, innerY);

      innerY += 6;
      pdf.setFontSize(11);
      pdf.setTextColor(226, 232, 240);
      pdf.text('Senior Director – Programs (Business Head)', 20, innerY);

      innerY += 6;
      pdf.setFontSize(9);
      pdf.setTextColor(209, 213, 219);
      pdf.text('Bengaluru  •  2022 – Present (4 years)', 20, innerY);

      innerY += 8;
      pdf.setFontSize(9);
      pdf.setTextColor(209, 213, 219);
      const roleDesc = pdf.splitTextToSize('Owning P&L and strategy for multiple new business verticals under MediBuddy\'s "Programs" charter, spanning Chronic Care, Fitness, Maternity, Women\'s Health, and EAP.', 170);
      pdf.text(roleDesc, 20, innerY);

      innerY += roleDesc.length * 4 + 5;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('Key Achievements', 20, innerY);

      innerY += 5;
      const achievements = [
        'Scaled a nascent business line from ₹10 lakhs/month to ₹18 crores GMV/month within 24 months through structured product-market fit, process design, and multi-vendor scaling.',
        'Built and led cross-functional teams across Product, Marketing, Sales, Ops, and Customer Service to deliver end-to-end category ownership.',
        'Established new pricing, partner, and distribution models integrating corporate-sponsored and out-of-pocket revenue streams.',
        'Forged high-impact partnerships with leading ecosystem players (Cult.fit, Fitpass, Novo Nordisk, Elecom-Japan, etc.), driving adoption across 800+ corporate clients.',
        'Designed quarterly OKR frameworks, trackers, and review cadences that improved forecasting accuracy and operating discipline across verticals.'
      ];

      achievements.forEach((achievement, idx) => {
        if (innerY > 260) {
          pdf.addPage();
          pdf.setFillColor(26, 26, 26);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          innerY = 20;
        }

        pdf.setFillColor(26, 26, 26);
        pdf.roundedRect(20, innerY, 170, 12, 2, 2, 'F');
        pdf.setDrawColor(51, 51, 51);
        pdf.roundedRect(20, innerY, 170, 12, 2, 2, 'S');

        pdf.setFillColor(143, 188, 63, 0.2 * 255);
        pdf.roundedRect(22, innerY + 2.5, 5, 5, 1, 1, 'F');

        pdf.setFontSize(8);
        pdf.setTextColor(209, 213, 219);
        pdf.setFont('helvetica', 'normal');
        const achLines = pdf.splitTextToSize(achievement, 160);
        pdf.text(achLines, 30, innerY + 4);

        innerY += 14;
      });

      pdf.addPage();
      pdf.setFillColor(26, 26, 26);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      yPos = 20;
      pdf.setFillColor(143, 188, 63);
      pdf.roundedRect(15, yPos, 8, 8, 2, 2, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Core Skills', 28, yPos + 6);

      yPos += 13;
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

      xPos = 15;
      let skillYPos = yPos;
      const skillWidth = 62;
      const skillHeight = 15;

      skills.forEach((skill, idx) => {
        if (idx > 0 && idx % 3 === 0) {
          skillYPos += skillHeight + 2;
          xPos = 15;
        }

        pdf.setFillColor(36, 36, 36);
        pdf.roundedRect(xPos, skillYPos, skillWidth, skillHeight, 2, 2, 'F');
        pdf.setDrawColor(51, 51, 51);
        pdf.roundedRect(xPos, skillYPos, skillWidth, skillHeight, 2, 2, 'S');

        pdf.setFillColor(143, 188, 63, 0.2 * 255);
        pdf.roundedRect(xPos + 2, skillYPos + 2, 5, 5, 1, 1, 'F');

        pdf.setFontSize(8);
        pdf.setTextColor(209, 213, 219);
        pdf.setFont('helvetica', 'normal');
        const skillLines = pdf.splitTextToSize(skill, skillWidth - 10);
        pdf.text(skillLines, xPos + 3, skillYPos + 10);

        xPos += skillWidth + 2;
      });

      yPos = skillYPos + skillHeight + 10;
      pdf.setFillColor(143, 188, 63);
      pdf.roundedRect(15, yPos, 8, 8, 2, 2, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Career Journey', 28, yPos + 6);

      pdf.setFontSize(8);
      pdf.setTextColor(156, 163, 175);
      pdf.setFont('helvetica', 'normal');
      pdf.text('15+ Years of Leadership Excellence', 28, yPos + 11);

      yPos += 16;

      const timeline = [
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

      pdf.setDrawColor(143, 188, 63);
      pdf.setLineWidth(0.5);
      pdf.line(18, yPos, 18, yPos + (timeline.length * 20));

      timeline.forEach((item, idx) => {
        pdf.setFillColor(143, 188, 63);
        pdf.circle(18, yPos + 3, 2, 'F');

        pdf.setFillColor(36, 36, 36);
        pdf.roundedRect(25, yPos, 170, 17, 2, 2, 'F');
        pdf.setDrawColor(51, 51, 51);
        pdf.roundedRect(25, yPos, 170, 17, 2, 2, 'S');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(item.company, 28, yPos + 5);

        pdf.setFillColor(143, 188, 63, 0.2 * 255);
        pdf.roundedRect(165, yPos + 2, 25, 5, 10, 10, 'F');
        pdf.setTextColor(143, 188, 63);
        pdf.setFontSize(7);
        pdf.text(item.duration, 177.5, yPos + 5.5, { align: 'center' });

        pdf.setFontSize(8);
        pdf.setTextColor(209, 213, 219);
        pdf.setFont('helvetica', 'normal');
        pdf.text(item.role, 28, yPos + 9);

        pdf.setFontSize(7);
        pdf.setTextColor(156, 163, 175);
        const achText = pdf.splitTextToSize(item.achievement, 160);
        pdf.text(achText, 28, yPos + 13);

        yPos += 20;
      });

      yPos += 5;
      pdf.setFillColor(10, 10, 10);
      pdf.rect(0, yPos, pageWidth, 8, 'F');
      pdf.setDrawColor(51, 51, 51);
      pdf.line(0, yPos, pageWidth, yPos);

      pdf.setTextColor(156, 163, 175);
      pdf.setFontSize(7);
      pdf.text('Swetha Priya | Business Head & P&L Owner | Building Scalable Health-Tech Businesses', pageWidth / 2, yPos + 5, { align: 'center' });

      pdf.save('Swetha_Priya_Portfolio.pdf');
      setIsGeneratingPDF(false);
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-end items-center gap-4 mb-8">
          <label
            htmlFor="photo-upload"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <Award size={20} />
            Change Photo
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="w-[210mm] mx-auto bg-[#1a1a1a] shadow-2xl">
        <div className="w-[210mm] h-[297mm] bg-[#1a1a1a] flex flex-col">
          <div className="relative bg-[#1a1a1a] text-white flex-shrink-0" style={{ height: '110mm' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#8fbc3f]/10 via-transparent to-[#8fbc3f]/5"></div>

            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', position: 'relative', zIndex: 10 }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(143, 188, 63, 0.15)',
                  border: '1px solid rgba(143, 188, 63, 0.3)',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  padding: '10px 16px',
                  width: 'fit-content'
                }}>
                  <span style={{
                    color: '#8fbc3f',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    display: 'block',
                    lineHeight: '1'
                  }}>SENIOR BUSINESS LEADER</span>
                </div>

                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2'
                }}>Swetha Priya</h1>

                <p style={{
                  fontSize: '17px',
                  color: '#e2e8f0',
                  marginBottom: '12px',
                  fontWeight: '500',
                  lineHeight: '1.4'
                }}>Business Head | Growth & P&L @MediBuddy</p>

                <p style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  maxWidth: '90%'
                }}>
                  0→1 Builder | P&L Owner | Scaling Businesses from Concept to ₹100Cr+ | 15+ Years Experience in High-Growth Health-Tech
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Briefcase size={16} style={{ color: '#8fbc3f' }} />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Business Head</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Target size={16} style={{ color: '#8fbc3f' }} />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>P&L Owner</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Rocket size={16} style={{ color: '#8fbc3f' }} />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>0→1 Expert</span>
                  </div>
                </div>
              </div>

              <div style={{
                width: '50%',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={photoUrl}
                  alt="Swetha Priya"
                  crossOrigin="anonymous"
                  style={{
                    width: '100%',
                    height: '110mm',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </div>
            </div>
          </div>

          <div className="px-10 py-6 bg-[#1a1a1a] flex-1 overflow-hidden flex flex-col">
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="bg-[#242424] p-3.5 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <TrendingUp className="text-[#8fbc3f]" size={24} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">180x</div>
                <div className="text-sm text-gray-300 font-medium">Growth Scale</div>
                <div className="text-xs text-gray-400 mt-1">₹10L → ₹18Cr GMV</div>
              </div>

              <div className="bg-[#242424] p-3.5 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <Users className="text-[#8fbc3f]" size={24} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">800+</div>
                <div className="text-sm text-gray-300 font-medium">Corporate Clients</div>
                <div className="text-xs text-gray-400 mt-1">Enterprise Partners</div>
              </div>

              <div className="bg-[#242424] p-3.5 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <Calendar className="text-[#8fbc3f]" size={24} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-gray-300 font-medium">Years Experience</div>
                <div className="text-xs text-gray-400 mt-1">Industry Leadership</div>
              </div>

              <div className="bg-[#242424] p-3.5 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <BarChart3 className="text-[#8fbc3f]" size={24} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">25%</div>
                <div className="text-sm text-gray-300 font-medium">QoQ Growth</div>
                <div className="text-xs text-gray-400 mt-1">Sustained Growth Rate</div>
              </div>
            </div>

            <section className="mt-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-[#8fbc3f] rounded-lg">
                  <Lightbulb className="text-[#1a1a1a]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">About Me</h2>
              </div>

              <div className="bg-[#242424] p-5 rounded-lg border border-[#333333] shadow-lg">
                <div className="text-gray-300 leading-relaxed space-y-3 text-sm">
                  <p>
                    I'm a <span className="font-bold text-white">category and business head</span> with a proven record of building and scaling new verticals from the ground up — from <span className="font-bold text-[#8fbc3f]">₹10 lakhs/month to ₹18 crores GMV/month</span> — by owning the complete P&L and driving cross-functional execution.
                  </p>
                  <p>
                    Over the years, I've led multiple 0→1 business builds within India's largest digital healthcare platform, integrating strategy, product, marketing, operations, and customer success into a unified growth engine. I thrive in ambiguity — identifying whitespace opportunities, building structure where none exists, and converting ideas into sustainable revenue lines.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="w-[210mm] h-[297mm] bg-[#1a1a1a] flex flex-col p-10">
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-[#8fbc3f] rounded-lg">
                <Building2 className="text-[#1a1a1a]" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Current Role</h2>
            </div>

            <div className="bg-[#242424] text-white p-4 rounded-lg shadow-lg border border-[#333333]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(143, 188, 63, 0.2)',
                    border: '1px solid rgba(143, 188, 63, 0.3)',
                    borderRadius: '9999px',
                    marginBottom: '8px',
                    padding: '6px 12px'
                  }}>
                    <span style={{
                      color: '#8fbc3f',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'block',
                      lineHeight: '1',
                      textAlign: 'center'
                    }}>CURRENT POSITION</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">MediBuddy</h3>
                  <p className="text-base text-gray-200 font-semibold mb-2">Senior Director – Programs (Business Head)</p>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>Bengaluru</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span>2022 – Present (4 years)</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                Owning P&L and strategy for multiple new business verticals under MediBuddy's "Programs" charter, spanning <span className="font-semibold text-white">Chronic Care, Fitness, Maternity, Women's Health, and EAP</span>.
              </p>

              <div className="mb-3 flex items-center gap-2">
                <Award className="text-[#8fbc3f]" size={16} />
                <h4 className="font-bold text-sm text-white">Key Achievements</h4>
              </div>

              <div className="grid gap-2">
                <div className="flex gap-2.5 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333]">
                  <div className="flex-shrink-0 w-7 h-7 bg-[#8fbc3f]/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-[#8fbc3f]" size={14} />
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">Scaled a nascent business line from <span className="font-bold text-[#8fbc3f]">₹10 lakhs/month to ₹18 crores GMV/month</span> within 24 months through structured product-market fit, process design, and multi-vendor scaling.</p>
                </div>

                <div className="flex gap-2.5 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333]">
                  <div className="flex-shrink-0 w-7 h-7 bg-[#8fbc3f]/20 rounded-lg flex items-center justify-center">
                    <Users className="text-[#8fbc3f]" size={14} />
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">Built and led cross-functional teams across Product, Marketing, Sales, Ops, and Customer Service to deliver end-to-end category ownership.</p>
                </div>

                <div className="flex gap-2.5 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333]">
                  <div className="flex-shrink-0 w-7 h-7 bg-[#8fbc3f]/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-[#8fbc3f]" size={14} />
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">Established new pricing, partner, and distribution models integrating corporate-sponsored and out-of-pocket revenue streams.</p>
                </div>

                <div className="flex gap-2.5 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333]">
                  <div className="flex-shrink-0 w-7 h-7 bg-[#8fbc3f]/20 rounded-lg flex items-center justify-center">
                    <Handshake className="text-[#8fbc3f]" size={14} />
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">Forged high-impact partnerships with leading ecosystem players (Cult.fit, Fitpass, Novo Nordisk, Elecom-Japan, etc.), driving adoption across <span className="font-bold text-[#8fbc3f]">800+ corporate clients</span>.</p>
                </div>

                <div className="flex gap-2.5 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333]">
                  <div className="flex-shrink-0 w-7 h-7 bg-[#8fbc3f]/20 rounded-lg flex items-center justify-center">
                    <Target className="text-[#8fbc3f]" size={14} />
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">Designed quarterly OKR frameworks, trackers, and review cadences that improved forecasting accuracy and operating discipline across verticals.</p>
                </div>

                <div className="flex gap-2.5 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333]">
                  <div className="flex-shrink-0 w-7 h-7 bg-[#8fbc3f]/20 rounded-lg flex items-center justify-center">
                    <Layers className="text-[#8fbc3f]" size={14} />
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">Led category diversification — from chronic condition management to GLP-1 programs, fitness bundles, and maternity offerings — achieving sustainable <span className="font-bold text-[#8fbc3f]">25% QoQ growth</span>.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-[210mm] h-[297mm] bg-[#1a1a1a] flex flex-col p-10">
          <section className="mb-5">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 bg-[#8fbc3f] rounded-lg">
                <Zap className="text-[#1a1a1a]" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Core Skills</h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { skill: 'P&L Ownership & Business Strategy', icon: LineChart },
                { skill: '0→1 Category Building', icon: Rocket },
                { skill: 'Product + Ops + Marketing Alignment', icon: Layers },
                { skill: 'GTM & Growth Strategy', icon: TrendingUp },
                { skill: 'Pricing & Revenue Model Design', icon: ShoppingCart },
                { skill: 'Cross-Functional Leadership', icon: Users },
                { skill: 'Corporate Partnerships & Ecosystem Alliances', icon: Handshake },
                { skill: 'Process Design & Operational Excellence', icon: Target },
                { skill: 'Data-Driven Decision-Making', icon: BarChart3 }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-[#242424] p-2.5 rounded-lg border border-[#333333] shadow-lg">
                    <div className="inline-flex p-1.5 bg-[#8fbc3f]/20 rounded-lg mb-1.5">
                      <Icon className="text-[#8fbc3f]" size={16} />
                    </div>
                    <p className="text-gray-200 font-medium leading-snug text-xs">{item.skill}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="p-1.5 bg-[#8fbc3f] rounded-lg">
                <Briefcase className="text-[#1a1a1a]" size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Career Journey</h2>
                <p className="text-gray-400 font-medium text-xs mt-0.5">15+ Years of Leadership Excellence</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8fbc3f] via-[#7fa835] to-[#6f942b]"></div>

              <div className="space-y-2">
                {[
                  {
                    company: 'MediBuddy',
                    duration: '4 yrs',
                    role: 'Leading Programs vertical as Business Head',
                    achievement: 'scaled a new business from ₹10 L/month to ₹18 Cr GMV/month through full P&L ownership and cross-functional leadership.',
                  },
                  {
                    company: 'UrbanKisaan',
                    duration: '1 yr 6 mos',
                    role: 'Vice President of Sales',
                    achievement: 'drove B2C and enterprise expansion in agri-tech and built sales frameworks for rapid scaling.',
                  },
                  {
                    company: 'Unacademy',
                    duration: '7 mos',
                    role: 'Associate Director of Sales',
                    achievement: 'led category-specific growth in the ed-tech space, improving funnel efficiency and retention.',
                  },
                  {
                    company: 'HealthifyMe',
                    duration: '3 yrs 2 mos',
                    role: 'Head of Sales',
                    achievement: 'owned revenue P&L, built nationwide inside-sales engine, and scaled digital health subscriptions multi-fold.',
                  },
                  {
                    company: 'Babajob.com',
                    duration: '1 yr 3 mos',
                    role: 'Assistant Manager – Inside Sales',
                    achievement: 'managed telesales operations and onboarded SMB employers across India.',
                  },
                  {
                    company: 'AEON Learning',
                    duration: '1 yr 1 mo',
                    role: 'Team Lead',
                    achievement: 'led revenue team for ed-tech inside-sales, improving conversion and lead-quality processes.',
                  },
                  {
                    company: 'TutorVista',
                    duration: '2 yrs',
                    role: 'Sales Executive / Academic Counselor',
                    achievement: 'early-career foundation in B2C consultative selling and academic counseling.',
                  }
                ].map((item, index) => (
                  <div key={index} className="relative pl-9">
                    <div className="absolute left-2 w-3 h-3 bg-[#8fbc3f] rounded-full border-2 border-[#1a1a1a] shadow-lg" style={{ top: '6px' }}></div>
                    <div className="bg-[#242424] p-2 rounded-lg border border-[#333333] shadow-lg">
                      <div className="flex items-start justify-between mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-xs font-bold text-white">{item.company}</h3>
                          <p className="text-gray-300 font-medium text-xs leading-tight">{item.role}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-[#8fbc3f]/20 text-[#8fbc3f] text-xs font-semibold rounded-full whitespace-nowrap ml-2">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mt-1">{item.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="bg-[#0a0a0a] text-gray-400 text-center py-2 border-t border-[#333333] mt-2 flex-shrink-0">
            <p className="text-xs font-medium">Swetha Priya | Business Head & P&L Owner | Building Scalable Health-Tech Businesses</p>
          </div>
        </div>
      </div>

      <div className="h-12"></div>
    </div>
  );
}

export default App;
