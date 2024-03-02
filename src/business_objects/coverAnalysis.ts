interface Total {
  foodCov: number;
  foodAmd: number;
  foodAvg: number;
  liqCov: number;
  liqAmd: number;
  liqAvg: number;
  softDrinkCov: number;
  softDrinkAmd: number;
  softDrinkAvg: number;
  tobaccoCov: number;
  tobaccoAmd: number;
  tobaccoAvg: number;
  othersCov: number;
  othersAmd: number;
  othersAvg: number;
  totalCov: number;
  totalAmd: number;
  totalAvg: number;
}

interface Session {
  session: string;
  nonResident: Total;
  resident: Total;
  sessionTotal: Total;
}

export interface CoverAnalysisData {
  report: Session[];
  department: string;
  outletTotal: Total;
}
