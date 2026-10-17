import React, { useState } from 'react';
import { X, Ruler, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { STORE_CONTACTS } from '../utils/orderLinks';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isOpen) return null;

  const sizeChart = [
    { size: 'XS', bustCm: '80 - 84', waistCm: '62 - 66', hipCm: '88 - 92', bustIn: '31 - 33', waistIn: '24 - 26', hipIn: '34 - 36' },
    { size: 'S', bustCm: '84 - 88', waistCm: '66 - 70', hipCm: '92 - 96', bustIn: '33 - 35', waistIn: '26 - 28', hipIn: '36 - 38' },
    { size: 'M', bustCm: '88 - 94', waistCm: '70 - 76', hipCm: '96 - 102', bustIn: '35 - 37', waistIn: '28 - 30', hipIn: '38 - 40' },
    { size: 'L', bustCm: '94 - 102', waistCm: '76 - 84', hipCm: '102 - 110', bustIn: '37 - 40', waistIn: '30 - 33', hipIn: '40 - 43' },
    { size: 'XL', bustCm: '102 - 110', waistCm: '84 - 92', hipCm: '110 - 118', bustIn: '40 - 43', waistIn: '33 - 36', hipIn: '43 - 46' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#FBF9F5] border border-[#E7E2D8] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl z-10 p-6 sm:p-8 text-[#1C1917]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#F2EFE9] hover:bg-[#E7E2D8] rounded-full text-[#1C1917] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
            <Ruler className="w-3.5 h-3.5" />
            <span>Golden Atelier Fit Reference</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light">Women's Sizing Architecture</h2>
          <p className="text-xs text-[#78716C] max-w-md mx-auto">
            Our silhouettes are engineered with relaxed elegance and tailored precision.
          </p>
        </div>

        {/* Unit Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#F2EFE9] p-1 rounded border border-[#E7E2D8] flex gap-1 text-xs">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded transition-colors ${
                unit === 'cm'
                  ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded transition-colors ${
                unit === 'inches'
                  ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#E7E2D8] rounded bg-[#FBF9F5]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2EFE9] border-b border-[#E7E2D8] text-[10px] uppercase tracking-wider text-[#78716C]">
              <tr>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Bust</th>
                <th className="py-3 px-4 font-semibold">Natural Waist</th>
                <th className="py-3 px-4 font-semibold">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E2D8] font-mono text-[#1C1917]">
              {sizeChart.map((row) => (
                <tr key={row.size} className="hover:bg-[#F2EFE9]/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-sm font-sans">{row.size}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn} in`}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn} in`}</td>
                  <td className="py-3 px-4">{unit === 'cm' ? `${row.hipCm} cm` : `${row.hipIn} in`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tips */}
        <div className="mt-6 p-4 bg-[#F2EFE9]/60 rounded border border-[#C5A880]/30 space-y-2 text-xs text-[#78716C]">
          <h4 className="font-serif font-medium text-sm text-[#1C1917] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            How to Take Measurements
          </h4>
          <ul className="space-y-1 pl-4 list-disc marker:text-[#C5A880]">
            <li><strong>Bust:</strong> Measure around the fullest part of your chest, keeping the tape level.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline (usually the narrowest contour).</li>
            <li><strong>Hips:</strong> Stand with heels together and measure around the fullest curve of hips.</li>
          </ul>
        </div>

        {/* Bespoke Chat Tailoring CTA */}
        <div className="mt-6 pt-6 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif text-sm font-medium text-[#1C1917]">Between sizes or prefer a customized hem?</p>
            <p className="text-xs text-[#78716C]">Our master tailor will consult with you on WhatsApp before cutting.</p>
          </div>

          <a
            href={`https://wa.me/${STORE_CONTACTS.whatsappNumber}?text=${encodeURIComponent(
              'Hello Golden Atelier! I have a question regarding garment sizing and bespoke adjustments for an order.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#1C1917] text-[#FBF9F5] hover:bg-[#332e2b] rounded text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Consult Tailor</span>
          </a>
        </div>
      </div>
    </div>
  );
};
