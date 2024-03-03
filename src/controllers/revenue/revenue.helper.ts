export function calculateGrandTotal(data: any[]): any {
    const grandTotal: any = {
      roomRev: { ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0 },
      FnBRev: { ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0 },
      otherRev: { ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0 },
      totalRev: { ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0 },
    };
  
    // Iterate over each object in the array
    data.forEach((item) => {
      grandTotal.roomRev.ly += item.roomRev.ly;
      grandTotal.roomRev.budget += item.roomRev.budget;
      grandTotal.roomRev.ty += item.roomRev.ty;
      grandTotal.roomRev.var_vs_budget += item.roomRev.var_vs_budget;
      grandTotal.roomRev.goly += item.roomRev.goly;
  
      grandTotal.FnBRev.ly += item.FnBRev.ly;
      grandTotal.FnBRev.budget += item.FnBRev.budget;
      grandTotal.FnBRev.ty += item.FnBRev.ty;
      grandTotal.FnBRev.var_vs_budget += item.FnBRev.var_vs_budget;
      grandTotal.FnBRev.goly += item.FnBRev.goly;
  
      grandTotal.otherRev.ly += item.otherRev.ly;
      grandTotal.otherRev.budget += item.otherRev.budget;
      grandTotal.otherRev.ty += item.otherRev.ty;
      grandTotal.otherRev.var_vs_budget += item.otherRev.var_vs_budget;
      grandTotal.otherRev.goly += item.otherRev.goly;
  
      grandTotal.totalRev.ly += item.totalRev.ly;
      grandTotal.totalRev.budget += item.totalRev.budget;
      grandTotal.totalRev.ty += item.totalRev.ty;
      grandTotal.totalRev.var_vs_budget += item.totalRev.var_vs_budget;
      grandTotal.totalRev.goly += item.totalRev.goly;
    });
  
    return grandTotal;
  }