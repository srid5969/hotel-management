import { FnBRevenueResultSingleObjectDTO } from './../../business_objects/report';
export const FnBRevenueHtmlTemplate = (
  data: FnBRevenueResultSingleObjectDTO[],
  grandTotal: Omit<FnBRevenueResultSingleObjectDTO, 'hotel'>
) => {
  const contents = data
    .map((item: FnBRevenueResultSingleObjectDTO): string => {
      return `<tr>
      <td style="width:35.0pt;border:solid black 1.0pt;border-top:none;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${item.hotel}</span></p>
      </td>
      <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${item.coversSold.ly}</span></p>
      </td>
      <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${item.coversSold.budget}</span></p>
      </td>
      <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${item.coversSold.ty}</span></p>
      </td>
      <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${item.coversSold.var_vs_budget}</span></p>
      </td>
      <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${item.coversSold.goly}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.avgRevPerCover.ly}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.avgRevPerCover.budget}span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.avgRevPerCover.ty}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.avgRevPerCover.var_vs_budget}</span></p>
      </td>
      <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.avgRevPerCover.goly}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.ly}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.budget}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.ty}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.var_vs_budget}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.goly}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.pdi}</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.resident}%</span></p>
      </td>
      <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
          <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${item.totalRev.non_resident}%</span></p>
      </td>
  </tr>`;
    })
    .join('');
  return `<table style="border: none;width:669.0pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td rowspan="2" style="width:35.0pt;border:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Hotels</span></strong></p>
            </td>
            <td colspan="5" style="width:176.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Covers Sold</span></strong></p>
            </td>
            <td colspan="5" style="width:176.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Average Revenue Per Cover</span></strong></p>
            </td>
            <td colspan="8" style="width:282.0pt;border:none;border-bottom:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:25.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Total Rev (lac)</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width:35.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>PDI</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Resident</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:43.75pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Non Resident</span></strong></p>
            </td>
        </tr>
        
        ${contents}
        
        <tr>
            <td style="width:35.0pt;border:solid black 1.0pt;border-top:none;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>GRAND TOTAL</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.coversSold.ly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.coversSold.budget}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.coversSold.ty}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.coversSold.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.coversSold.goly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.avgRevPerCover.ly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.avgRevPerCover.budget}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.avgRevPerCover.ty}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.avgRevPerCover.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.avgRevPerCover.goly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.ly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.budget}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.ty}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.goly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.pdi}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:black;'>${grandTotal.totalRev.resident}%</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:73.35pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:black;'>${grandTotal.totalRev.non_resident}%</span></em></strong></p>
            </td>
        </tr>
    </tbody>
</table>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>`;
};
