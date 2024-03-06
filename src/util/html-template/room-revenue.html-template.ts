import {HotelRevenueData} from './../../business_objects/report';
export const RoomRevenueHtmlTemplate = (
  data: HotelRevenueData[],
  grandTotal: Omit<HotelRevenueData, 'hotel'>
) => {
  const table1Rows = data
    .map(revenue => {
      return `<tr>
        <td style="width:41.0pt;border:solid black 1.0pt;border-top:none;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.hotel}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
        <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.noOfRooms}</span></p>
    </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomsAvailable.ly}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomsAvailable.budget}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomsAvailable.ty}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomsAvailable.var_vs_budget}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomsAvailable.goly}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomSold.ly}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomSold.budget};</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomSold.ty}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomSold.var_vs_budget}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.roomSold.goly}</span></p>
        </td>

        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.occupancy.ly}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.occupancy.budget}</span></p>
        </td>
        <td style="width:41.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.occupancy.ty}</span></p>
        </td>
        <td style="width:41.0pt;border:none;border-bottom:dotted black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.occupancy.var_vs_budget}</span></p>
        </td>
        <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  dotted black 1.0pt;border-right:solid black 1.0pt;padding:.75pt .75pt 0cm .75pt;height:15.95pt;">
            <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.occupancy.goly}</span></p>
        </td>
    </tr>`;
    })
    .join('');
  const table2Rows = data
    .map(revenue => {
      return `
      <tr>
          <td style="width:37.0pt;border:solid black 1.0pt;border-top:none;padding:.7pt .7pt 0cm .7pt;height:24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><span style='font-family:"Arial",sans-serif;color:black;'>${revenue.hotel}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.arr.ly}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.arr.budget}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.arr.ty}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.arr.var_vs_budget}</span></p>
          </td>
          <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.arr.goly}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.revPar.ly}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.revPar.budget}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.revPar.ty}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.revPar.var_vs_budget}</span></p>
          </td>
          <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.revPar.goly}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.ly}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.budget}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.ty}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.ty-revenue.totalRev.budget}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.goly}</span></p>
          </td>
          <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;padding:.7pt .7pt 0cm .7pt;height:  24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.pdi}</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.foreign}%</span></p>
          </td>
          <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:24.55pt;">
              <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><span style='font-family:  "Arial",sans-serif;color:black;'>${revenue.totalRev.domestic}%</span></p>
          </td>
      </tr>`;
    })
    .join();
  const table1 = `<table style="border: none;width:695.0pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td rowspan="2" style="width:41.0pt;border:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:  13.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Hotels</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:solid black 1.0pt;border-left:  none;border-bottom:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:13.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>No of&nbsp;</span></strong></p>
            </td>
            <td colspan="5" style="width:204.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:13.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Room Nights Available</span></strong></p>
            </td>
            <td colspan="5" style="width:204.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:13.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Room Nights Sold</span></strong></p>
            </td>
            <td colspan="5" style="width:204.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:13.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Occpancy%</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Rooms</span></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:solid white 1.0pt;border-left:  none;border-bottom:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:solid white 1.0pt;border-left:  none;border-bottom:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:solid white 1.0pt;border-left:  none;border-bottom:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:solid white 1.0pt;border-left:  none;border-bottom:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:40.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
        </tr>
        ${table1Rows}
        <tr>
            <td style="width:41.0pt;border:solid black 1.0pt;border-top:none;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>GRAND TOTAL</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.noOfRooms}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomsAvailable.ly}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomsAvailable.budget}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomsAvailable.ty}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomsAvailable.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomsAvailable.goly}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.ly}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.budget}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.ty}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.roomSold.goly}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.occupancy.ly}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.occupancy.budget}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.occupancy.ty}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.occupancy.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:41.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.75pt .75pt 0cm .75pt;height:67.45pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:19px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.occupancy.goly}</span></em></strong></p>
            </td>
        </tr>
    </tbody>
  </table>
  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  `;
  const table2 = `<table style="border: none;width:700.0pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td rowspan="2" style="width:37.0pt;border:solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:15.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Hotels</span></strong></p>
            </td>
            <td colspan="5" style="width:185.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:15.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>ARR</span></strong></p>
            </td>
            <td colspan="5" style="width:185.0pt;border-top:solid black 1.0pt;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:15.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Revpar</span></strong></p>
            </td>
            <td colspan="8" style="width:293.0pt;border:none;border-bottom:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:15.05pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Total Rev (lac)</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>LY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Budget</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>TY</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Var Vs Budget</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>GOLY</span></strong></p>
            </td>
            <td style="width:35.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>PDI</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Foreign</span></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid white 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:36.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style='font-family:"Arial",sans-serif;color:white;'>Domestic</span></strong></p>
            </td>
        </tr>
        ${table2Rows}
        <tr>
            <td style="width:37.0pt;border:solid black 1.0pt;border-top:none;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>GRAND TOTAL</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.ly}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.budget}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.ty}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.arr.goly}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.revPar.ly}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.revPar.budget}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.revPar.ty}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.revPar.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.revPar.goly}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.ly}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.budget}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.ty}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.var_vs_budget}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.goly}</span></em></strong></p>
            </td>
            <td style="width:35.0pt;border:none;border-bottom:solid black 1.0pt;background:#002060;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:white;'>${grandTotal.totalRev.pdi}</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:black;'>${grandTotal.totalRev.foreign}%</span></em></strong></p>
            </td>
            <td style="width:37.0pt;border:none;border-bottom:solid black 1.0pt;background:#C6E0B4;padding:.7pt .7pt 0cm .7pt;height:52.85pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><em><span style='font-size:16px;font-family:"Arial",sans-serif;color:black;'>${grandTotal.totalRev.domestic}%</span></em></strong></p>
            </td>
        </tr>
    </tbody>
  </table>
  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  `;
  return table1 + table2;
};
