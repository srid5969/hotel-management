import { CityWiseRevenueReportResponseDTO } from './../../business_objects/report';
export const cityWiseHTMLTemplate = (
  reports: CityWiseRevenueReportResponseDTO[]
) => {
  const data = reports
    .map((cityWiseData,i:number): string => {
      return `<tr>
    <td style="width:39.7pt;border:solid black 1.0pt;border-top:none;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${i}</span></p>
    </td>
    <td style="width:75.85pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.hotel}</span></p>
    </td>
    <td style="width:55.95pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.city}</span></p>
    </td>
    <td style="width:94.4pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.roomsAvl}</span></p>
    </td>
    <td style="width:72.95pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.roomsSold}</span></p>
    </td>
    <td style="width:74.55pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.occ}</span></p>
    </td>
    <td style="width:45.7pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.arr}</span></p>
    </td>
    <td style="width:51.8pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.revPar}</span></p>
    </td>
    <td style="width:63.6pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.roomRev}</span></p>
    </td>
    <td style="width:5.45pt;border:none;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;"><br></td>
    <td style="width:64.05pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.fnbRev}</span></p>
    </td>
    <td style="width:4.6pt;border:none;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;"><br></td>
    <td style="width:66.65pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.otherRev}</span></p>
    </td>
    <td style="width:6.35pt;border:none;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;"><br></td>
    <td style="width:61.4pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:black;'>${cityWiseData.totalRevenue}</span></p>
    </td>
</tr>`;
    })
    .join('');
  return `
    <table style="border: none;width:783.0pt;margin-left:-42.55pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td style="width:39.7pt;border:solid black 1.0pt;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>S. No.</span></strong></p>
            </td>
            <td style="width:75.85pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Name of the Hotel</span></strong></p>
            </td>
            <td style="width:55.95pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>City</span></strong></p>
            </td>
            <td style="width:94.4pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Room Nights Available</span></strong></p>
            </td>
            <td style="width:72.95pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Room Nights Sold</span></strong></p>
            </td>
            <td style="width:74.55pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Occupancy</span></strong></p>
            </td>
            <td style="width:45.7pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>ARR</span></strong></p>
            </td>
            <td style="width:51.8pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>RevPAR</span></strong></p>
            </td>
            <td style="width:63.6pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Room revenue</span></strong></p>
            </td>
            <td style="width:5.45pt;border:none;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;"><br></td>
            <td style="width:64.05pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>F&amp;B Revenue</span></strong></p>
            </td>
            <td style="width:4.6pt;border:none;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;"><br></td>
            <td style="width:66.65pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Other Revenue</span></strong></p>
            </td>
            <td style="width:6.35pt;border:none;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:34.2pt;"><br></td>
            <td style="width:61.4pt;border:solid black 1.0pt;border-left:none;background:#44546A;padding:.7pt .7pt 0cm .7pt;height:34.2pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style='font-size:16px;font-family:"Arial Black",sans-serif;color:white;'>Total Revenue</span></strong></p>
            </td>
        </tr>
        ${data}
    </tbody>
</table>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>-</p>




    `;
};
