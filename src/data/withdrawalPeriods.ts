export interface WithdrawalPeriod {
  drugName: string;
  pharmacologicalClass: string;
  meatWithdrawalDays: number;
  milkWithdrawalHours: number;
  species: string[];
  dosage: string;
}

export const withdrawalPeriods: WithdrawalPeriod[] = [
  {
    drugName: "Enrofloxacin",
    pharmacologicalClass: "Fluoroquinolone",
    meatWithdrawalDays: 28, // Using maximum value from range 14-28
    milkWithdrawalHours: 84, // 3.5 days
    species: ["Cattle", "Poultry", "Swine", "Sheep", "Goat"],
    dosage: "2.5-5 mg/kg BW; IM/IV/Oral"
  },
  {
    drugName: "Ciprofloxacin",
    pharmacologicalClass: "Fluoroquinolone", 
    meatWithdrawalDays: 15, // Using maximum value from range 10-15
    milkWithdrawalHours: 120, // 5 days
    species: ["Cattle", "Poultry", "Swine", "Sheep", "Goat"],
    dosage: "5-13.4 mg/kg BW; Oral/IM/IV"
  },
  {
    drugName: "Danofloxacin",
    pharmacologicalClass: "Fluoroquinolone",
    meatWithdrawalDays: 5,
    milkWithdrawalHours: 0, // Not for use in lactating animals
    species: ["Cattle", "Swine"],
    dosage: "1.25 mg/kg BW; IM/SC"
  },
  {
    drugName: "Levofloxacin",
    pharmacologicalClass: "Fluoroquinolone",
    meatWithdrawalDays: 9, // Using maximum value from range 7-9
    milkWithdrawalHours: 168, // 7 days
    species: ["Poultry", "Cattle"],
    dosage: "10 mg/kg BW; Oral"
  },
  {
    drugName: "Ceftriaxone",
    pharmacologicalClass: "3rd Gen Cephalosporin",
    meatWithdrawalDays: 10, // Using maximum value from range 7-10
    milkWithdrawalHours: 72, // 3 days
    species: ["Cattle", "Buffalo", "Sheep", "Goat"],
    dosage: "5-10 mg/kg BW; IM/IV"
  },
  {
    drugName: "Ceftiofur",
    pharmacologicalClass: "3rd Gen Cephalosporin",
    meatWithdrawalDays: 4,
    milkWithdrawalHours: 0, // 0 days
    species: ["Cattle", "Buffalo", "Sheep", "Goat", "Swine"],
    dosage: "1.1-2.2 mg/kg BW; IM/SC"
  },
  {
    drugName: "Cefoperazone",
    pharmacologicalClass: "3rd Gen Cephalosporin",
    meatWithdrawalDays: 14, // Using maximum value from range 10-14
    milkWithdrawalHours: 120, // 4-5 days, using 5 days
    species: ["Cattle", "Buffalo", "Calves"],
    dosage: "10-15 mg/kg BW; IM/IV"
  },
  {
    drugName: "Cephalexin",
    pharmacologicalClass: "1st Gen Cephalosporin",
    meatWithdrawalDays: 4, // Using maximum value from range 2-4
    milkWithdrawalHours: 0, // 0 days
    species: ["Cattle", "Dogs"],
    dosage: "15-30 mg/kg BW; Oral/Intrauterine"
  },
  {
    drugName: "Amoxicillin",
    pharmacologicalClass: "Aminopenicillin",
    meatWithdrawalDays: 21, // Using maximum value from range 14-21
    milkWithdrawalHours: 60, // 2.5 days
    species: ["Cattle", "Buffalo", "Sheep", "Goat", "Pigs"],
    dosage: "10-20 mg/kg BW; IM/IV"
  },
  {
    drugName: "Ampicillin",
    pharmacologicalClass: "Aminopenicillin",
    meatWithdrawalDays: 14, // Using maximum value from range 10-14
    milkWithdrawalHours: 72, // 2-3 days, using 3 days
    species: ["Cattle", "Sheep", "Goat", "Swine"],
    dosage: "5-10 mg/kg BW; IM/IV"
  },
  {
    drugName: "Procaine Penicillin G",
    pharmacologicalClass: "Natural Penicillin",
    meatWithdrawalDays: 14, // Using maximum value from range 10-14
    milkWithdrawalHours: 72, // 3 days
    species: ["Cattle", "Buffalo", "Horses", "Sheep", "Goat"],
    dosage: "22,000-44,000 IU/kg; IM"
  },
  {
    drugName: "Benzylpenicillin (Penicillin G)",
    pharmacologicalClass: "Natural Penicillin",
    meatWithdrawalDays: 10, // Using maximum value from range 5-10
    milkWithdrawalHours: 72, // 3 days
    species: ["Cattle", "Buffalo", "Sheep", "Goat"],
    dosage: "22,000-44,000 IU/kg; IM"
  },
  {
    drugName: "Cloxacillin",
    pharmacologicalClass: "Penicillinase-resistant Penicillin",
    meatWithdrawalDays: 10,
    milkWithdrawalHours: 96, // 4 days
    species: ["Cattle"],
    dosage: "200 mg per quarter; Intramammary"
  },
  {
    drugName: "Oxytetracycline",
    pharmacologicalClass: "Tetracycline",
    meatWithdrawalDays: 28, // Using maximum value from range 21-28
    milkWithdrawalHours: 168, // 4-7 days, using 7 days
    species: ["Cattle", "Sheep", "Goat", "Swine", "Poultry"],
    dosage: "5-10 mg/kg BW (LA: 20 mg/kg); IV/IM/SC"
  },
  {
    drugName: "Chlortetracycline",
    pharmacologicalClass: "Tetracycline",
    meatWithdrawalDays: 10, // Using maximum value from range 5-10
    milkWithdrawalHours: 0, // Not for use in lactating animals
    species: ["Poultry", "Swine", "Calves"],
    dosage: "Feed inclusion: 50-200 g/ton"
  },
  {
    drugName: "Doxycycline",
    pharmacologicalClass: "Tetracycline",
    meatWithdrawalDays: 10, // Using maximum value from range 7-10
    milkWithdrawalHours: 0, // Not for use in laying hens
    species: ["Poultry", "Swine"],
    dosage: "10-20 mg/kg BW; Oral (water)"
  },
  {
    drugName: "Gentamicin",
    pharmacologicalClass: "Aminoglycoside",
    meatWithdrawalDays: 45, // 40+ days, using 45 for safety
    milkWithdrawalHours: 120, // 3-5 days, using 5 days
    species: ["Cattle", "Horse", "Sheep", "Goat", "Poultry"],
    dosage: "4-7 mg/kg BW; IM/IV"
  }
];

export const getWithdrawalPeriod = (drugName: string): WithdrawalPeriod | undefined => {
  return withdrawalPeriods.find(
    period => period.drugName.toLowerCase() === drugName.toLowerCase()
  );
};

export const calculateWithdrawalEndDate = (
  treatmentDate: string, 
  drugName: string, 
  productType: 'meat' | 'milk'
): Date | null => {
  const period = getWithdrawalPeriod(drugName);
  if (!period) return null;

  const startDate = new Date(treatmentDate);
  if (isNaN(startDate.getTime())) return null;

  const endDate = new Date(startDate);
  
  if (productType === 'meat') {
    endDate.setDate(endDate.getDate() + period.meatWithdrawalDays);
  } else {
    if (period.milkWithdrawalHours === 0) return null; // Not allowed for milk
    endDate.setHours(endDate.getHours() + period.milkWithdrawalHours);
  }
  
  return endDate;
};

export const isInWithdrawalPeriod = (
  treatmentDate: string,
  drugName: string,
  productType: 'meat' | 'milk'
): boolean => {
  const endDate = calculateWithdrawalEndDate(treatmentDate, drugName, productType);
  if (!endDate) return false;
  
  return new Date() < endDate;
};

export const getDaysUntilWithdrawalEnd = (
  treatmentDate: string,
  drugName: string,
  productType: 'meat' | 'milk'
): number => {
  const endDate = calculateWithdrawalEndDate(treatmentDate, drugName, productType);
  if (!endDate) return 0;
  
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};