export interface SourceWiseRevenueSubDocumentResult {
  ly: number;
  budget: number;
  ty: number;
  var_vs_budget: number;
  goly: number;
  pdi: number;
}
export interface SourceWiseRevenueResult {
  source: string;
  roomSold: Omit<SourceWiseRevenueSubDocumentResult, 'pdi'>;
  roomPerDay: Omit<SourceWiseRevenueSubDocumentResult, 'pdi'>;
  arr: Omit<SourceWiseRevenueSubDocumentResult, 'pdi'>;
  totalRevenue: SourceWiseRevenueSubDocumentResult;
}
export const SourceWiseRevenueHtmlTemplate = (
  sourceRevenues: SourceWiseRevenueResult[],
  grandTotal: Omit<SourceWiseRevenueResult, 'source'>
) => {
  const data = sourceRevenues
    .map((sourceRev: SourceWiseRevenueResult): string => {
      return `
    <tr>
        <td style="width:138.0pt;border-top:none;border-left:solid black 1.0pt;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.source}</span></p>
        </td>
        <td style="width:27.5pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomSold.ly}</span></p>
        </td>
        <td style="width:35.35pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomSold.budget}</span></p>
        </td>
        <td style="width:27.55pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomSold.ty}</span></p>
        </td>
        <td style="width:27.55pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomSold.var_vs_budget}</span></p>
        </td>
        <td style="width:35.35pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomSold.goly}</span></p>
        </td>
        <td style="width:33.85pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomPerDay.ly}</span></p>
        </td>
        <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomPerDay.budget}</span></p>
        </td>
        <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomPerDay.ty}</span></p>
        </td>
        <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomPerDay.var_vs_budget}</span></p>
        </td>
        <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.roomPerDay.goly}%</span></p>
        </td>
        <td style="width:38.2pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.arr.ly}</span></p>
        </td>
        <td style="width:38.2pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.arr.budget}</span></p>
        </td>
        <td style="width:38.2pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.arr.ty}</span></p>
        </td>
        <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.arr.var_vs_budget}%</span></p>
        </td>
        <td style="width:29.25pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.arr.goly}%</span></p>
        </td>
        <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.totalRevenue.ly}</span></p>
        </td>
        <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.totalRevenue.budget}</span></p>
        </td>
        <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.totalRevenue.ty}</span></p>
        </td>
        <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.totalRevenue.var_vs_budget}</span></p>
        </td>
        <td style="width:29.25pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.totalRevenue.goly}%</span></p>
        </td>
        <td style="width:25.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${sourceRev.totalRevenue.pdi}%</span></p>
        </td>
    </tr>`;
    })
    .join('');
  return `
  <table style="border: none;width:823.0pt;margin-left:-62.8pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td rowspan="2" style="width:117.85pt;border:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:10.0pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Source Code</span></strong></p>
            </td>
            <td colspan="5" style="width:179.85pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:10.0pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Room Nights Sold</span></strong></p>
            </td>
            <td colspan="5" style="width:158.85pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:10.0pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Room Nights Sold Per Day</span></strong></p>
            </td>
            <td colspan="5" style="width:173.25pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:10.0pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>ARR&nbsp;</span></strong></p>
            </td>
            <td colspan="6" style="width:193.2pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:10.0pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Total Rev</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width:31.65pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:38.5pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:38.85pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:38.85pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:31.65pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:31.65pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:31.55pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:38.85pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:38.85pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:31.55pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:31.65pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:31.65pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:32.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:32.95pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:32.95pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:24.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>PDI</span></strong></p>
            </td>
        </tr>
        ${data}
        <tr>
            <td style="width:117.85pt;border:solid black 1.0pt;border-top:none;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>GRAND TOTAL</span></em></strong></p>
            </td>
            <td style="width:31.65pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.ly}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.budget}</span></strong></p>
            </td>
            <td style="width:38.5pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.ty}</span></strong></p>
            </td>
            <td style="width:38.85pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.var_vs_budget}</span></strong></p>
            </td>
            <td style="width:38.85pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.goly}</span></strong></p>
            </td>
            <td style="width:31.65pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomPerDay.ly}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomPerDay.budget}</span></strong></p>
            </td>
            <td style="width:31.65pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomPerDay.ty}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomPerDay.var_vs_budget}</span></strong></p>
            </td>
            <td style="width:31.55pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomPerDay.goly}</span></strong></p>
            </td>
            <td style="width:38.85pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.ly}</span></strong></p>
            </td>
            <td style="width:38.85pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.budget}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.ty}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.var_vs_budget}</span></strong></p>
            </td>
            <td style="width:31.55pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.goly}</span></strong></p>
            </td>
            <td style="width:31.65pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRevenue.ly}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRevenue.budget}</span></strong></p>
            </td>
            <td style="width:31.65pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRevenue.ty}</span></strong></p>
            </td>
            <td style="width:32.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRevenue.var_vs_budget}</span></strong></p>
            </td>
            <td style="width:32.95pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRevenue.goly}</span></strong></p>
            </td>
            <td style="width:32.95pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.5pt .5pt 0cm .5pt;height:16.5pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:12px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRevenue.pdi}</span></em></strong></p>
            </td>
        </tr>
    </tbody>
</table>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  `;
};
