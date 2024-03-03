export interface MarketSegmentSubDocumentResult {
  ly: number;
  budget: number;
  ty: number;
  var_vs_budget: number;
  goly: number;
  pdi: number;
  lyContr: number;
  tyContr: number;
}
export interface MarketSegmentResult {
  segment: string;
  roomSold: Omit<MarketSegmentSubDocumentResult, 'pdi' | 'lyContr' | 'tyContr'>;
  roomPerDay: Omit<
    MarketSegmentSubDocumentResult,
    'pdi' | 'lyContr' | 'tyContr'
  >;
  arr: Omit<MarketSegmentSubDocumentResult, 'pdi' | 'lyContr' | 'tyContr'>;
  totalRevenue: MarketSegmentSubDocumentResult;
}
export const SegmentWiseHtmlContentTemplate = (
  segments: MarketSegmentResult[],
  grandTotal: Omit<MarketSegmentResult, 'segment'>
) => {
  const data = segments
    .map(segment => {
      return `
        <tr>
            <td style="width:138.0pt;border-top:none;border-left:solid black 1.0pt;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.segment}</span></p>
            </td>
            <td style="width:27.5pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomSold.ly}</span></p>
            </td>
            <td style="width:35.35pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomSold.budget}</span></p>
                </td>
                <td style="width:27.55pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomSold.ty}</span></p>
                </td>
            </td>
                <td style="width:27.55pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomSold.var_vs_budget}</span></p>
                </td>
            <td style="width:35.35pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomSold.goly}</span></p>
            </td>
            <td style="width:33.85pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomPerDay.ly}</span></p>
            </td>
            <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomPerDay.budget}</span></p>
            </td>
            <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomPerDay.ty}</span></p>
            </td>
            <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomPerDay.var_vs_budget}</span></p>
            </td>
            <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.roomPerDay.goly}%</span></p>
            </td>
            <td style="width:38.2pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.arr.ly}</span></p>
            </td>
            <td style="width:38.2pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.arr.budget}</span></p>
            </td>
            <td style="width:38.2pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.arr.ty}</span></p>
            </td>
            <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.arr.var_vs_budget}%</span></p>
            </td>
            <td style="width:29.25pt;border-top:none;border-left:none;border-bottom:dotted black 1.0pt;border-right:solid black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.arr.goly}%</span></p>
            </td>
            <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.ly}</span></p>
            </td>
            <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.budget}</span></p>
            </td>
            <td style="width:24.15pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.ty}</span></p>
            </td>
            <td style="width:35.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.var_vs_budget}</span></p>
            </td>
            <td style="width:29.25pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.goly}%</span></p>
            </td>
            <td style="width:25.35pt;border:none;border-bottom:dotted black 1.0pt;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.pdi}%</span></p>
            </td>
            <td style="width:30.35pt;border:none;border-bottom:dotted black 1.0pt;background:#C6E0B4;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.lyContr}%</span></p>
            </td>
            <td style="width:30.35pt;border:none;border-bottom:dotted black 1.0pt;background:#C6E0B4;padding:.45pt .45pt 0cm .45pt;height:11.3pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-size:13px;font-family:"Arial",sans-serif;color:black;'>${segment.totalRevenue.tyContr}%</span></p>
            </td>
        </tr>`;
    })
    .join('');
  return `<table style="border: none; width: 859.35pt; margin-left: -63.35pt; border-collapse: collapse">
  <tbody>
    <tr>
      <td rowspan="2" style="width: 138pt; border: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 11.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Market Segment</span></strong>
        </p>
      </td>
      <td colspan="5" style="width: 159.6pt; border-top: solid black 1pt; border-left: none; border-bottom: solid white 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 11.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Room nights Sold</span></strong>
        </p>
      </td>
      <td colspan="5" style="width: 148.25pt; border-top: solid black 1pt; border-left: none; border-bottom: solid white 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 11.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Room Nights Sold per Day</span></strong>
        </p>
      </td>
      <td colspan="5" style="width: 179.2pt; border-top: solid black 1pt; border-left: none; border-bottom: solid white 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 11.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">ARR&nbsp;</span></strong>
        </p>
      </td>
      <td colspan="8" style="width: 234.3pt; border: none; border-bottom: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 11.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Total Rev (lac)</span></strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="width: 27.5pt; border: none; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">LY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Budget</span></strong>
        </p>
      </td>
      <td style="width: 27.55pt; border: none; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">TY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Var Vs Budget</span></strong>
        </p>
      </td>
      <td style="width: 33.85pt; border: none; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">GOLY</span></strong>
        </p>
      </td>
      <td style="width: 24.15pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">LY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Budget</span></strong>
        </p>
      </td>
      <td style="width: 24.15pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">TY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Var Vs Budget</span></strong>
        </p>
      </td>
      <td style="width: 29.25pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">GOLY</span></strong>
        </p>
      </td>
      <td style="width: 38.2pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">LY</span></strong>
        </p>
      </td>
      <td style="width: 38.2pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Budget</span></strong>
        </p>
      </td>
      <td style="width: 38.2pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">TY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Var Vs Budget</span></strong>
        </p>
      </td>
      <td style="width: 29.25pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">GOLY</span></strong>
        </p>
      </td>
      <td style="width: 24.15pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">LY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Budget</span></strong>
        </p>
      </td>
      <td style="width: 24.15pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">TY</span></strong>
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Var Vs Budget</span></strong>
        </p>
      </td>
      <td style="width: 29.25pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">GOLY</span></strong>
        </p>
      </td>
      <td style="width: 25.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">PDI</span></strong>
        </p>
      </td>
      <td style="width: 30.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Contri % LY</span></strong>
        </p>
      </td>
      <td style="width: 30.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid white 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 43.9pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong><span style="font-size: 13px; font-family: 'Arial', sans-serif; color: white">Contri % TY</span></strong>
        </p>
      </td>
    </tr>
    ${data}
    <tr>
      <td style="width: 138pt; border: solid black 1pt; border-top: none; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">GRAND TOTAL</span></em></strong
          >
        </p>
      </td>
      <td style="width: 27.5pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomSold.ly}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomSold.budget}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 27.55pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomSold.ty}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomSold.var_vs_budget}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 33.85pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomSold.goly}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 24.15pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomPerDay.ly}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomPerDay.budget}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 24.15pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomPerDay.ty}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomPerDay.var_vs_budget}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 29.25pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.roomPerDay.goly}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 38.2pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.arr.ly}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 38.2pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.arr.budget}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 38.2pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.arr.ty}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.arr.var_vs_budget}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 29.25pt; border-top: none; border-left: none; border-bottom: solid black 1pt; border-right: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.arr.goly}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 24.15pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.totalRevenue.ly}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.totalRevenue.budget}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 24.15pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.totalRevenue.ty}</span></em></strong
          >
        </p>
      </td>
      <td style="width: 35.35pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.totalRevenue.var_vs_budget}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 29.25pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.totalRevenue.goly}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 25.35pt; border: none; border-bottom: solid black 1pt; background: #002060; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: white">${grandTotal.totalRevenue.pdi}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 30.35pt; border: none; border-bottom: solid black 1pt; background: #c6e0b4; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: black">${grandTotal.totalRevenue.lyContr}%</span></em></strong
          >
        </p>
      </td>
      <td style="width: 30.35pt; border: none; border-bottom: solid black 1pt; background: #c6e0b4; padding: 0.45pt 0.45pt 0cm 0.45pt; height: 24.3pt">
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; margin-left: 0cm; line-height: normal; font-size: 15px; font-family: 'Calibri', sans-serif; text-align: center; vertical-align: middle">
          <strong
            ><em><span style="font-family: 'Arial', sans-serif; color: black">${grandTotal.totalRevenue.tyContr}%</span></em></strong
          >
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;
};
