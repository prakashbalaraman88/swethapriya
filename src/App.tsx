import { Download, Briefcase, TrendingUp, Target, Award, Users, Building2, Rocket, BarChart3, Lightbulb, LineChart, ShoppingCart, Calendar, MapPin, ArrowUpRight, Handshake, Layers, Zap } from 'lucide-react';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('/Untitled design (2).png');
  const portfolioRef = useRef<HTMLDivElement>(null);

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

  const generatePDF = async () => {
    if (!portfolioRef.current) return;

    setIsGeneratingPDF(true);

    try {
      const element = portfolioRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#1a1a1a',
        logging: false,
        windowWidth: 794,
        windowHeight: element.scrollHeight,
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Swetha_Priya_Portfolio.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-[210mm] mx-auto px-4">
        <div className="mb-6 flex items-center justify-center gap-4 no-print">
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

        <div ref={portfolioRef} className="w-[794px] mx-auto bg-[#1a1a1a]" style={{ width: '794px' }}>
          {/* Hero Section - Fixed Height with Absolute Positioning */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white overflow-hidden" style={{ height: '377px', position: 'relative' }}>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8fbc3f]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8fbc3f]/3 rounded-full blur-3xl"></div>

            {/* Left Content - Absolutely Positioned */}
            <div className="absolute left-10 top-1/2 z-10" style={{ transform: 'translateY(-50%)', width: '340px' }}>
              <div className="inline-block px-3 py-1 bg-[#8fbc3f]/20 border border-[#8fbc3f]/30 rounded-full mb-2">
                <span className="text-[#8fbc3f] text-xs font-semibold">Senior Business Leader</span>
              </div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">Swetha Priya</h1>
              <p className="text-base text-slate-200 mb-2.5 font-medium">Business Head | Growth & P&L @MediBuddy</p>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                0→1 Builder | P&L Owner | Scaling Businesses from Concept to ₹100Cr+ | 15+ Years Experience in High-Growth Health-Tech
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <Briefcase size={13} className="text-[#8fbc3f]" />
                  <span className="text-xs font-medium">Business Head</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <Target size={13} className="text-[#8fbc3f]" />
                  <span className="text-xs font-medium">P&L Owner</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <Rocket size={13} className="text-[#8fbc3f]" />
                  <span className="text-xs font-medium">0→1 Expert</span>
                </div>
              </div>
            </div>

            {/* Right Image - Absolutely Positioned */}
            <div className="absolute right-0 top-0 z-10" style={{ width: '412px', height: '377px' }}>
              <img
                src={photoUrl}
                alt="Swetha Priya"
                crossOrigin="anonymous"
                style={{
                  width: '412px',
                  height: '377px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-10 py-7 bg-[#1a1a1a]">
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="bg-[#242424] p-3 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <TrendingUp className="text-[#8fbc3f]" size={22} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-xl font-bold text-white mb-0.5">180x</div>
                <div className="text-xs text-gray-300 font-medium">Growth Scale</div>
                <div className="text-xs text-gray-400 mt-0.5">₹10L → ₹18Cr GMV</div>
              </div>

              <div className="bg-[#242424] p-3 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <Users className="text-[#8fbc3f]" size={22} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-xl font-bold text-white mb-0.5">800+</div>
                <div className="text-xs text-gray-300 font-medium">Corporate Clients</div>
                <div className="text-xs text-gray-400 mt-0.5">Enterprise Partners</div>
              </div>

              <div className="bg-[#242424] p-3 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <Calendar className="text-[#8fbc3f]" size={22} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-xl font-bold text-white mb-0.5">15+</div>
                <div className="text-xs text-gray-300 font-medium">Years Experience</div>
                <div className="text-xs text-gray-400 mt-0.5">Industry Leadership</div>
              </div>

              <div className="bg-[#242424] p-3 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <BarChart3 className="text-[#8fbc3f]" size={22} />
                  <ArrowUpRight className="text-[#8fbc3f]" size={14} />
                </div>
                <div className="text-xl font-bold text-white mb-0.5">25%</div>
                <div className="text-xs text-gray-300 font-medium">QoQ Growth</div>
                <div className="text-xs text-gray-400 mt-0.5">Sustained Growth Rate</div>
              </div>
            </div>

            {/* About Me */}
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-[#8fbc3f] rounded-lg">
                  <Lightbulb className="text-[#1a1a1a]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">About Me</h2>
              </div>

              <div className="bg-[#242424] p-5 rounded-lg border border-[#333333] shadow-lg">
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  I'm a <span className="text-white font-semibold">category and business head</span> with a proven record of building and scaling new verticals from the ground up — from <span className="text-[#8fbc3f] font-semibold">₹10 lakhs/month to ₹18 crores GMV/month</span> — by owning the complete P&L and driving cross-functional execution.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Over the years, I've led multiple 0→1 business builds within India's largest digital healthcare platform, integrating strategy, product, marketing, operations, and customer success into a unified growth engine. I thrive in ambiguity — identifying whitespace opportunities, building structure where none exists, and converting ideas into sustainable revenue lines.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  My leadership philosophy blends <span className="text-white font-semibold">strategic clarity with operational depth</span>. I enjoy being hands-on in go-to-market design, pricing, process building, and stakeholder alignment — while keeping sharp focus on business metrics like GMV, CAC, margins, and growth rate.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  I'm at my best in challenging environments that demand agility, ownership, and a dynamic, outcome-driven mindset. Whether it's launching new categories, turning around underperforming units, or forging high-impact partnerships, I bring an entrepreneurial lens and a "make-it-happen" attitude to everything I do.
                </p>
              </div>
            </section>

            {/* Current Role */}
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-[#8fbc3f] rounded-lg">
                  <Building2 className="text-[#1a1a1a]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Current Role</h2>
              </div>

              <div className="bg-[#242424] p-5 rounded-lg border border-[#333333] shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="inline-block px-2 py-0.5 bg-[#8fbc3f]/20 text-[#8fbc3f] text-xs font-semibold rounded-full mb-2">
                      CURRENT POSITION
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">MediBuddy</h3>
                    <p className="text-gray-300 font-medium text-base mb-1">Senior Director – Programs (Business Head)</p>
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>Bengaluru</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>2022 – Present (4 years)</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#8fbc3f]/20 text-[#8fbc3f] text-xs font-semibold rounded-full">
                    4 yrs
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Owning P&L and strategy for multiple new business verticals under MediBuddy's "Programs" charter, spanning <span className="text-[#8fbc3f] font-semibold">Chronic Care, Fitness, Maternity, Women's Health, and EAP</span>.
                </p>

                <div className="space-y-2">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333333]">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 p-1.5 bg-[#8fbc3f]/20 rounded">
                        <TrendingUp size={14} className="text-[#8fbc3f]" />
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed flex-1">
                        Scaled a nascent business line from <span className="text-[#8fbc3f] font-semibold">₹10 lakhs/month to ₹18 crores GMV/month</span> within 24 months through structured product-market fit, process design, and multi-vendor scaling.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333333]">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 p-1.5 bg-[#8fbc3f]/20 rounded">
                        <Users size={14} className="text-[#8fbc3f]" />
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed flex-1">
                        Built and led cross-functional teams across Product, Marketing, Sales, Ops, and Customer Service to deliver end-to-end category ownership.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333333]">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 p-1.5 bg-[#8fbc3f]/20 rounded">
                        <ShoppingCart size={14} className="text-[#8fbc3f]" />
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed flex-1">
                        Established new pricing, partner, and distribution models integrating corporate-sponsored and out-of-pocket revenue streams.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333333]">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 p-1.5 bg-[#8fbc3f]/20 rounded">
                        <Handshake size={14} className="text-[#8fbc3f]" />
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed flex-1">
                        Forged high-impact partnerships with leading ecosystem players (Cult.fit, Fitpass, Novo Nordisk, Elecom-Japan, etc.), driving adoption across <span className="text-[#8fbc3f] font-semibold">800+ corporate clients</span>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333333]">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 p-1.5 bg-[#8fbc3f]/20 rounded">
                        <Target size={14} className="text-[#8fbc3f]" />
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed flex-1">
                        Designed quarterly OKR frameworks, trackers, and review cadences that improved forecasting accuracy and operating discipline across verticals.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333333]">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 p-1.5 bg-[#8fbc3f]/20 rounded">
                        <Layers size={14} className="text-[#8fbc3f]" />
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed flex-1">
                        Led category diversification — from chronic condition management to GLP-1 programs, fitness bundles, and maternity offerings — achieving sustainable <span className="text-[#8fbc3f] font-semibold">25% QoQ growth</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Page 2 */}
          <div className="px-10 py-7 bg-[#1a1a1a]" style={{ pageBreakBefore: 'always' }}>
            {/* Core Skills */}
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-[#8fbc3f] rounded-lg">
                  <Zap className="text-[#1a1a1a]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Core Skills</h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: LineChart, title: 'P&L Ownership & Business Strategy' },
                  { icon: Rocket, title: '0→1 Category Building' },
                  { icon: Layers, title: 'Product + Ops + Marketing Alignment' },
                  { icon: TrendingUp, title: 'GTM & Growth Strategy' },
                  { icon: ShoppingCart, title: 'Pricing & Revenue Model Design' },
                  { icon: Users, title: 'Cross-Functional Leadership' },
                  { icon: Handshake, title: 'Corporate Partnerships & Ecosystem Alliances' },
                  { icon: Target, title: 'Process Design & Operational Excellence' },
                  { icon: BarChart3, title: 'Data-Driven Decision-Making' },
                ].map((skill, index) => (
                  <div key={index} className="bg-[#242424] p-4 rounded-lg border border-[#333333] shadow-lg">
                    <div className="p-2 bg-[#8fbc3f]/20 rounded-lg w-fit mb-2">
                      <skill.icon className="text-[#8fbc3f]" size={18} />
                    </div>
                    <h3 className="text-white text-sm font-semibold leading-tight">{skill.title}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Journey */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-[#8fbc3f] rounded-lg">
                  <Briefcase className="text-[#1a1a1a]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Career Journey</h2>
                <p className="text-gray-400 text-sm ml-2">15+ Years of Leadership Excellence</p>
              </div>

              <div className="relative">
                <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-[#8fbc3f]/30"></div>

                {[
                  {
                    company: 'MediBuddy',
                    role: 'Leading Programs vertical as Business Head',
                    achievement: 'scaled a new business from ₹10 L/month to ₹18 Cr GMV/month through full P&L ownership and cross-functional leadership.',
                    duration: '4 yrs'
                  },
                  {
                    company: 'UrbanKisaan',
                    role: 'Vice President of Sales',
                    achievement: 'drove B2C and enterprise expansion in agri-tech and built sales frameworks for rapid scaling.',
                    duration: '1 yr 6 mos'
                  },
                  {
                    company: 'Unacademy',
                    role: 'Associate Director of Sales',
                    achievement: 'led category-specific growth in the ed-tech space, improving funnel efficiency and retention.',
                    duration: '7 mos'
                  },
                  {
                    company: 'HealthifyMe',
                    role: 'Head of Sales',
                    achievement: 'owned revenue P&L, built nationwide inside-sales engine, and scaled digital health subscriptions multi-fold.',
                    duration: '3 yrs 2 mos'
                  },
                  {
                    company: 'Babajob.com',
                    role: 'Assistant Manager – Inside Sales',
                    achievement: 'managed telesales operations and onboarded SMB employers across India.',
                    duration: '1 yr 3 mos'
                  },
                  {
                    company: 'AEON Learning',
                    role: 'Team Lead',
                    achievement: 'led revenue team for ed-tech inside-sales, improving conversion and lead-quality processes.',
                    duration: '1 yr 1 mo'
                  },
                  {
                    company: 'TutorVista',
                    role: 'Sales Executive / Academic Counselor',
                    achievement: 'early-career foundation in B2C consultative selling and academic counseling.',
                    duration: '2 yrs'
                  }
                ].map((item, index) => (
                  <div key={index} className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-[#8fbc3f] rounded-full border-4 border-[#1a1a1a]"></div>

                    <div className="bg-[#242424] p-4 rounded-lg border border-[#333333] shadow-lg">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-sm font-bold text-white">{item.company}</h3>
                          <p className="text-gray-300 font-medium text-xs">{item.role}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-[#8fbc3f]/20 text-[#8fbc3f] text-xs font-semibold rounded-full whitespace-nowrap">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mt-1">{item.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <div className="bg-[#0a0a0a] text-gray-400 text-center py-4 border-t border-[#333333] mt-8 -mx-10">
              <p className="text-sm font-medium">Swetha Priya | Business Head & P&L Owner | Building Scalable Health-Tech Businesses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
