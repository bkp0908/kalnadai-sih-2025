import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface District {
  name: string;
  compliance: number;
  totalEntries: number;
  alerts: number;
}

interface IndiaMapProps {
  language: 'english' | 'tamil';
  onDistrictSelect?: (district: string) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({ language, onDistrictSelect }) => {
  const [currentView, setCurrentView] = useState<'india' | 'tamilnadu'>('india');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Mock compliance data for Tamil Nadu districts
  const tamilNaduDistricts: District[] = [
    { name: 'Chennai', compliance: 92, totalEntries: 45, alerts: 2 },
    { name: 'Coimbatore', compliance: 87, totalEntries: 38, alerts: 3 },
    { name: 'Erode', compliance: 76, totalEntries: 52, alerts: 8 },
    { name: 'Salem', compliance: 81, totalEntries: 31, alerts: 5 },
    { name: 'Namakkal', compliance: 89, totalEntries: 44, alerts: 1 },
    { name: 'Tiruchirappalli', compliance: 84, totalEntries: 36, alerts: 4 },
    { name: 'Madurai', compliance: 79, totalEntries: 41, alerts: 6 },
    { name: 'Virudhunagar', compliance: 85, totalEntries: 28, alerts: 3 },
    { name: 'Tirunelveli', compliance: 88, totalEntries: 33, alerts: 2 },
    { name: 'Kanniyakumari', compliance: 91, totalEntries: 22, alerts: 1 },
    { name: 'Dindigul', compliance: 83, totalEntries: 29, alerts: 4 },
    { name: 'Karur', compliance: 86, totalEntries: 25, alerts: 2 },
  ];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 85) return '#22c55e'; // Green
    if (compliance >= 70) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  const getComplianceStatus = (compliance: number) => {
    if (compliance >= 85) return 'Good';
    if (compliance >= 70) return 'Warning';
    return 'High Risk';
  };

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district.name);
    onDistrictSelect?.(district.name);
  };

  const translations = {
    english: {
      indiaMap: 'India Compliance Map',
      tamilnaduMap: 'Tamil Nadu District View',
      backToIndia: 'Back to India',
      clickToZoom: 'Click Tamil Nadu to view districts',
      compliance: 'Compliance',
      totalEntries: 'Total Entries',
      alerts: 'Active Alerts',
      selectDistrict: 'Select a district to view details'
    },
    tamil: {
      indiaMap: 'இந்திய இணக்க வரைபடம்',
      tamilnaduMap: 'தமிழ்நாடு மாவட்ட பார்வை',
      backToIndia: 'இந்தியாவுக்கு திரும்பு',
      clickToZoom: 'மாவட்டங்களைப் பார்க்க தமிழ்நாட்டைக் கிளிக் செய்யவும்',
      compliance: 'இணக்கம்',
      totalEntries: 'மொத்த பதிவுகள்',
      alerts: 'செயலில் உள்ள எச்சரிக்கைகள்',
      selectDistrict: 'விவரங்களைப் பார்க்க ஒரு மாவட்டத்தைத் தேர்ந்தெடுக்கவும்'
    }
  };

  const t = translations[language];

  const renderIndiaMap = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{t.indiaMap}</h3>
        <p className="text-sm text-muted-foreground">{t.clickToZoom}</p>
      </div>
      
      {/* Simplified India SVG Map */}
      <div className="relative bg-gray-50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
        <svg width="400" height="300" viewBox="0 0 400 300" className="border rounded">
          {/* India outline (simplified) */}
          <path
            d="M80 50 L320 50 L340 80 L330 120 L340 160 L320 190 L300 220 L250 240 L200 250 L150 240 L100 220 L80 190 L70 160 L80 120 L70 80 Z"
            fill="#e5e7eb"
            stroke="#9ca3af"
            strokeWidth="2"
          />
          
          {/* Tamil Nadu (highlighted) */}
          <path
            d="M200 180 L240 180 L250 200 L240 220 L220 230 L200 225 L185 210 L190 190 Z"
            fill="#3b82f6"
            stroke="#1d4ed8"
            strokeWidth="2"
            className="cursor-pointer hover:fill-blue-600 transition-colors"
            onClick={() => setCurrentView('tamilnadu')}
          />
          
          {/* Other states with basic compliance colors */}
          <circle cx="150" cy="100" r="15" fill="#22c55e" className="opacity-70" />
          <circle cx="200" cy="90" r="12" fill="#eab308" className="opacity-70" />
          <circle cx="250" cy="110" r="18" fill="#ef4444" className="opacity-70" />
          <circle cx="120" cy="140" r="14" fill="#22c55e" className="opacity-70" />
          <circle cx="280" cy="140" r="16" fill="#eab308" className="opacity-70" />
          
          {/* Tamil Nadu label */}
          <text x="215" y="205" textAnchor="middle" className="text-xs font-medium fill-white">
            Tamil Nadu
          </text>
        </svg>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
          <h4 className="text-sm font-medium mb-2">Compliance Status</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Good (≥85%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Warning (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>High Risk (&lt;70%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTamilNaduMap = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentView('india')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToIndia}
        </Button>
        <h3 className="text-xl font-semibold">{t.tamilnaduMap}</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tamil Nadu District Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">District Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-50 rounded-lg p-4 min-h-[300px]">
              <svg width="100%" height="280" viewBox="0 0 300 280">
                {/* Simplified Tamil Nadu outline */}
                <path
                  d="M50 50 L250 50 L270 80 L260 120 L270 160 L250 190 L230 220 L180 240 L130 235 L80 220 L50 190 L40 160 L50 120 L40 80 Z"
                  fill="#f3f4f6"
                  stroke="#9ca3af"
                  strokeWidth="2"
                />
                
                {/* District circles with compliance colors */}
                {tamilNaduDistricts.map((district, index) => {
                  const x = 80 + (index % 4) * 50;
                  const y = 80 + Math.floor(index / 4) * 50;
                  return (
                    <g key={district.name}>
                      <circle
                        cx={x}
                        cy={y}
                        r="16"
                        fill={getComplianceColor(district.compliance)}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleDistrictClick(district)}
                      />
                      <text
                        x={x}
                        y={y + 25}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-700"
                      >
                        {district.name.length > 8 ? district.name.substring(0, 8) + '...' : district.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>
        
        {/* District Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">District Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDistrict ? (
              <div className="space-y-4">
                {(() => {
                  const district = tamilNaduDistricts.find(d => d.name === selectedDistrict);
                  if (!district) return null;
                  
                  return (
                    <>
                      <div>
                        <h4 className="font-semibold text-lg">{district.name}</h4>
                        <Badge 
                          variant={district.compliance >= 85 ? 'secondary' : district.compliance >= 70 ? 'outline' : 'destructive'}
                        >
                          {getComplianceStatus(district.compliance)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t.compliance}:</span>
                          <span className="font-medium">{district.compliance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t.totalEntries}:</span>
                          <span className="font-medium">{district.totalEntries}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t.alerts}:</span>
                          <span className="font-medium text-warning">{district.alerts}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${district.compliance}%`,
                              backgroundColor: getComplianceColor(district.compliance)
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                {t.selectDistrict}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* District Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Districts Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tamilNaduDistricts.map((district) => (
              <div
                key={district.name}
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleDistrictClick(district)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{district.name}</h5>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getComplianceColor(district.compliance) }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Compliance:</span>
                    <span>{district.compliance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entries:</span>
                    <span>{district.totalEntries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alerts:</span>
                    <span className="text-warning">{district.alerts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return currentView === 'india' ? renderIndiaMap() : renderTamilNaduMap();
};
