import { useState } from 'react';
import { Download, Briefcase, TrendingUp, Target, Award, Users, Building2, Rocket, BarChart3, Lightbulb, LineChart, ShoppingCart, Calendar, MapPin, ArrowUpRight, Handshake, Layers, Zap } from 'lucide-react';
import { generatePortfolioPDF } from './pdf-generator';

function App() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('/Untitled design (1) copy copy.png');

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

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePortfolioPDF(photoUrl);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl mb-4 shadow-lg">
              <Briefcase size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio PDF Generator</h1>
            <p className="text-slate-300">Generate a professional portfolio PDF for Swetha Priya</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <label className="block text-sm font-semibold text-white mb-3">
                Upload Photo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="photo-upload"
                  className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer border border-white/20"
                >
                  <Award size={20} />
                  Choose Photo
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {photoUrl && (
                  <span className="text-sm text-slate-300">Photo selected ✓</span>
                )}
              </div>
            </div>

            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              <Download size={24} />
              {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF'}
            </button>

            <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
              <div className="flex gap-3">
                <Lightbulb className="text-teal-400 flex-shrink-0" size={20} />
                <div className="text-sm text-slate-300">
                  <p className="font-semibold text-white mb-1">What will be generated:</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Professional 3-page portfolio PDF</li>
                    <li>• Properly formatted and aligned content</li>
                    <li>• Ready for distribution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
