export interface UnitWiseRevenueSubDocument {
  ly: number;
  budget: number;
  ty: number;
  var_vs_budget: number;
  goly: number;
  pdi?: number;
}
export const TotalRevenueUnitWiseHtmlContentTemplate = (
  data: {
    hotel: string;
    roomRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
    FnBRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
    otherRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
    totalRev?: UnitWiseRevenueSubDocument;
  }[],
  grandTotal: {
    roomRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
    FnBRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
    otherRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
    totalRev?: UnitWiseRevenueSubDocument;
  }
) => {
  const hotelData = (
    hotel: string,
    roomRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>,
    FnBRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>,
    otherRev?: Omit<UnitWiseRevenueSubDocument, 'pdi'>,
    totalRev?: UnitWiseRevenueSubDocument
  ) => `
    <tr>
            <td style="width:37.0pt;border-top:none;border-left:solid black 1.0pt;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${hotel || ''}</span></p>
            </td>
            <td style="width:25.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${roomRev?.ly || 0}</span></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${roomRev?.budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${roomRev?.ty || 0}</span></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${roomRev?.var_vs_budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${roomRev?.goly || 0}%</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${FnBRev?.ly || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${FnBRev?.budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${FnBRev?.ty || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${FnBRev?.var_vs_budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${FnBRev?.goly || 0} %</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${otherRev?.ly || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${otherRev?.budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${otherRev?.ty || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${otherRev?.var_vs_budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${otherRev?.goly || 0} %</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${totalRev?.ly || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${totalRev?.budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${totalRev?.ty || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${totalRev?.var_vs_budget || 0}</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${totalRev?.goly || 0} %</span></p>
            </td>
            <td style="width:31.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.6pt .6pt 0cm .6pt;height:36.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${totalRev?.pdi || 0} %</span></p>
            </td>
        </tr>`;
  return `<table style="border: none;width:687.0pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td rowspan="2" style="width:37.0pt;border:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:19.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Hotels</span></strong></p>
            </td>
            <td colspan="5" style="width:150.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:19.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Room Revenue</span></strong></p>
            </td>
            <td colspan="5" style="width:156.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:19.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>F&amp;B Revenue</span></strong></p>
            </td>
            <td colspan="5" style="width:156.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:19.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Other Revenue</span></strong></p>
            </td>
            <td colspan="6" style="width:187.0pt;border:none;border-bottom:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:19.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Total Rev (lac)</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width:25.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:31.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:31.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:71.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>PDI</span></strong></p>
            </td>
        </tr>
        ${data.map(t => hotelData(t.hotel, t.roomRev, t.FnBRev, t.otherRev, t.totalRev)).join('')}
        <tr>
            <td style="width:37.0pt;border:solid black 1.0pt;border-top:none;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>GRAND TOTAL</span></em></strong></p>
            </td>
            <td style="width:25.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.roomRev?.ly || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.roomRev?.budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.roomRev?.ty || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.roomRev?.var_vs_budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.roomRev?.goly || 0} %</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.FnBRev?.ly || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.FnBRev?.budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.FnBRev?.ty || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.FnBRev?.var_vs_budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.FnBRev?.goly || 0} %</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.otherRev?.ly || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.otherRev?.budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.otherRev?.ty || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.otherRev?.var_vs_budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.otherRev?.goly || 0} %</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.totalRev?.ly || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.totalRev?.budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.totalRev?.ty || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.totalRev?.var_vs_budget || 0}</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.totalRev?.goly || 0} %</span></em></strong></p>
            </td>
            <td style="width:31.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.6pt .6pt 0cm .6pt;height:77.7pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal?.totalRev?.pdi || 0} %</span></em></strong></p>
            </td>
        </tr>
    </tbody>
</table>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>`;
};
