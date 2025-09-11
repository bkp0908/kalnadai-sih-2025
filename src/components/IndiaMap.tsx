import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

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
  const [indiaGeoData, setIndiaGeoData] = useState<any>(null);
  const [tamilNaduGeoData, setTamilNaduGeoData] = useState<any>(null);

  useEffect(() => {
    // Load India map data
    fetch('/data/india-map.json')
      .then(response => response.json())
      .then(data => setIndiaGeoData(data))
      .catch(error => console.error('Error loading India map:', error));
    
    // Load Tamil Nadu districts data
    fetch('/data/tamil-nadu-districts.json')
      .then(response => response.json())
      .then(data => setTamilNaduGeoData(data))
      .catch(error => console.error('Error loading Tamil Nadu map:', error));
  }, []);

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

  const renderIndiaMap = () => {
    if (!indiaGeoData) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{t.indiaMap}</h3>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ZoomIn className="h-4 w-4" />
            {t.clickToZoom}
          </p>
        </div>
        
        {/* Real India Map using react-simple-maps */}
        <div className="relative bg-background rounded-lg border p-4 min-h-[500px]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1000,
              center: [78, 22]
            }}
            width={800}
            height={500}
            className="w-full h-full"
          >
            <ZoomableGroup>
              <Geographies geography={indiaGeoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;
                    const compliance = geo.properties.compliance || 80;
                    const fillColor = getComplianceColor(compliance);
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { 
                            outline: "none", 
                            fill: stateName === 'Tamil Nadu' ? "#2563eb" : fillColor,
                            filter: "brightness(1.1)",
                            cursor: stateName === 'Tamil Nadu' ? "pointer" : "default"
                          },
                          pressed: { outline: "none" }
                        }}
                        onClick={() => {
                          if (stateName === 'Tamil Nadu') {
                            setCurrentView('tamilnadu');
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-card p-4 rounded-lg shadow-lg border">
            <h4 className="text-sm font-semibold mb-3">Compliance Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-green-500 rounded"></div>
                <span>Good (≥85%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-yellow-500 rounded"></div>
                <span>Warning (70-84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-red-500 rounded"></div>
                <span>High Risk (&lt;70%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTamilNaduMap = () => {
    if (!tamilNaduGeoData) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading districts...</p>
          </div>
        </div>
      );
    }

    return (
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
              <CardTitle className="text-lg">District Compliance Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-background rounded-lg border p-4 min-h-[400px]">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 6000,
                    center: [78.6, 11.1]
                  }}
                  width={400}
                  height={350}
                  className="w-full h-full"
                >
                  <ZoomableGroup>
                    <Geographies geography={tamilNaduGeoData}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const districtName = geo.properties.name;
                          const compliance = geo.properties.compliance || 80;
                          const fillColor = getComplianceColor(compliance);
                          
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={fillColor}
                              stroke="#FFFFFF"
                              strokeWidth={0.8}
                              style={{
                                default: { outline: "none" },
                                hover: { 
                                  outline: "none", 
                                  fill: fillColor,
                                  filter: "brightness(1.1)",
                                  cursor: "pointer"
                                },
                                pressed: { outline: "none" }
                              }}
                              onClick={() => {
                                const district = tamilNaduDistricts.find(d => d.name === districtName);
                                if (district) {
                                  handleDistrictClick(district);
                                }
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
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
};

  return currentView === 'india' ? renderIndiaMap() : renderTamilNaduMap();
};
