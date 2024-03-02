export interface RevenueData {
  availableRooms: number;
  notAvailableRooms: number;
  occupancyPercentage: number;
  roomRevenue: number;
  foodAndBeverageRevenue: number;
  otherRevenue: number;
  roomsSold: number;
  roomsSoldPerDay: number;
  totalRevenue: number;
  year?: number;
  apc: any; //n/a
  noOfCovers: any; //n/a
  noOfCoversPerDay: any; //n/a
  arr: any; //n/a
  revPar: any; //n/a
  month?: number;
}
interface OverAllReport {
  currentYear: RevenueData;
  oneYearB4Now: RevenueData;
  twoYearB4Now: RevenueData;
  variance: RevenueData;
  budget?: RevenueData;
  goly?: RevenueData;
  month?: string;
  year?: number;
}
export const overAllRevenueHtmlForMTDTemplate = async (data: OverAllReport) => {
  return `
    <table style="border: none;width:610.0pt;border-collapse:collapse;">
    <tbody>
        <tr>
            <td colspan="7" style="width:610.0pt;border:solid black 1.0pt;background:#404040;padding:.75pt .75pt 0cm .75pt;height:25.0pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style="font-size:19px;color:#FFC000;">FPHL Chain Performance</span></strong></p>
            </td>
        </tr>
        <tr>
            <td colspan="7" style="width:610.0pt;border:solid black 1.0pt;border-top:none;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:23.55pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style="font-size:19px;color:black;">${data.month}, ${data.year} (Rev in Lakhs)</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width: 163pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">&nbsp;</span></strong></p>
            </td>
            <td style="width: 67pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style="font-size:19px;color:black;">${data.year - 2 + '-' + (data.year - 1).toString().substring(2, 4)}</span></strong></p>
            </td>
            <td style="width: 76pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">${data.year - 1 + '-' + data.year.toString().substring(2, 4)}</span></strong></p>
            </td>
            <td style="width: 85pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Budget TY</span></strong></p>
            </td>
            <td style="width: 84pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">${data.year + '-' + (data.year + 1).toString().substring(2, 4)}</span></strong></p>
            </td>
            <td style="width: 69pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Variance</span></strong></p>
            </td>
            <td style="width: 66pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">GOLY%</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Rooms Nights Available</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.availableRooms || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.availableRooms || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.availableRooms || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.availableRooms || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.availableRooms || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.availableRooms || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">RNA per day</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.notAvailableRooms || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.notAvailableRooms || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.notAvailableRooms || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.notAvailableRooms || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.notAvailableRooms || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.notAvailableRooms || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Total Room nights sold</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomsSold || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomsSold || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.roomsSold || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomsSold || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.roomsSold || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.roomsSold || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Rooms Sold per day</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomsSoldPerDay || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomsSoldPerDay || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.roomsSoldPerDay || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomsSoldPerDay || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.roomsSoldPerDay || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.roomsSoldPerDay || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Occupancy %</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.occupancyPercentage || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.occupancyPercentage || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.occupancyPercentage || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.occupancyPercentage || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.occupancyPercentage || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.occupancyPercentage || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">ARR</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.arr || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.arr || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.arr || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.arr || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.arr || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.arr || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Revpar</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.revPar || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.revPar || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.revPar || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.revPar || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.revPar || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.revPar || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Room Revenue&nbsp;</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomRevenue || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomRevenue || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.roomRevenue || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomRevenue || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.roomRevenue || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.roomRevenue || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Food And Beverage Revenue</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.foodAndBeverageRevenue || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.foodAndBeverageRevenue || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.foodAndBeverageRevenue || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.foodAndBeverageRevenue || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.foodAndBeverageRevenue || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.foodAndBeverageRevenue || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Covers</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.noOfCovers || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.noOfCovers || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.noOfCovers || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.noOfCovers || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.noOfCovers || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.noOfCovers || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Covers per day</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.noOfCoversPerDay || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.noOfCoversPerDay || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.noOfCoversPerDay || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.noOfCoversPerDay || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.noOfCoversPerDay || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.noOfCoversPerDay || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">APC</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.apc || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.apc || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.apc || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.apc || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.apc || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.apc || '0'}<br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Other Revenue</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.otherRevenue || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.otherRevenue || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.otherRevenue || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.otherRevenue || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.otherRevenue || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.otherRevenue || '0'}<br></td>
        </tr>
        <tr>
            <td style="width: 163pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Total Revenue</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.totalRevenue || '0'}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.totalRevenue || '0'}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.totalRevenue || '0'}</span><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.totalRevenue || '0'}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.totalRevenue || '0'}<br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.totalRevenue || '0'}<br></td>
        </tr>
    </tbody>
</table>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>



///////////////////////////////////////////////////////////////////////////////////////////////////////


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table {
            border: none;
            width: 610.0pt;
            border-collapse: collapse;
        }

        td, th {
            border: 1pt solid black;
            padding: 0.75pt 0.75pt 0cm 0.75pt;
            height: 18.4pt;
            vertical-align: bottom;
            background: #F2F2F2;
        }

        th {
            background: #404040;
            color: #FFC000;
            font-size: 19px;
        }

        p {
            margin: 0;
            line-height: normal;
            font-size: 15px;
            font-family: "Calibri", sans-serif;
            vertical-align: middle;
            text-align: center;
        }
    </style>
</head>
<body>
    <table>
        <tbody>
            <tr>
                <td colspan="7">
                    <p><strong><span style="font-size:19px;color:#FFC000;">FPHL Chain Performance</span></strong></p>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <p><strong><span style="font-size:19px;color:black;">${data.month}, ${data.year} (Rev in Lakhs)</span></strong></p>
                </td>
            </tr>
            <tr>
                <th style="width: 163pt;">&nbsp;</th>
                <th style="width: 67pt;">${data.year - 2 + '-' + (data.year - 1).toString().substring(2, 4)}</th>
                <th style="width: 76pt;">${data.year - 1 + '-' + data.year.toString().substring(2, 4)}</th>
                <th style="width: 85pt;">Budget TY</th>
                <th style="width: 84pt;">${data.year + '-' + (data.year + 1).toString().substring(2, 4)}</th>
                <th style="width: 69pt;">Variance</th>
                <th style="width: 66pt;">GOLY%</th>
            </tr>
            <tr>
    <td>Revenue</td>
    <td>50,000</td>
    <td>60,000</td>
    <td>55,000</td>
    <td>65,000</td>
    <td>10,000</td>
    <td>18%</td>
</tr>
<tr>
    <td>Expenses</td>
    <td>40,000</td>
    <td>45,000</td>
    <td>42,000</td>
    <td>50,000</td>
    <td>8,000</td>
    <td>16%</td>
</tr>
<tr>
    <td>Profit</td>
    <td>10,000</td>
    <td>15,000</td>
    <td>13,000</td>
    <td>15,000</td>
    <td>2,000</td>
    <td>15%</td>
</tr>
        </tbody>
    </table>
</body>
</html>

`;
};
export const overAllRevenueForYTDHtmlTemplate = async (
  data: Omit<OverAllReport, 'month'>
) => {
  return `
      <table style="border: none;width:610.0pt;border-collapse:collapse;">
      <tbody>
          <tr>
              <td colspan="7" style="width:610.0pt;border:solid black 1.0pt;background:#404040;padding:.75pt .75pt 0cm .75pt;height:25.0pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style="font-size:19px;color:#FFC000;">FPHL Chain Performance</span></strong></p>
              </td>
          </tr>
          <tr>
              <td colspan="7" style="width:610.0pt;border:solid black 1.0pt;border-top:none;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:23.55pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style="font-size:19px;color:black;"> ${data.year} (Rev in Lakhs)</span></strong></p>
              </td>
          </tr>
          <tr>
              <td style="width: 163pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">&nbsp;</span></strong></p>
              </td>
              <td style="width: 67pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style="font-size:19px;color:black;">${data.year - 2 + '-' + (data.year - 1).toString().substring(2, 4)}</span></strong></p>
              </td>
              <td style="width: 76pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">${data.year - 1 + '-' + data.year.toString().substring(2, 4)}</span></strong></p>
              </td>
              <td style="width: 85pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Budget TY</span></strong></p>
              </td>
              <td style="width: 84pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">${data.year + '-' + (data.year + 1).toString().substring(2, 4)}</span></strong></p>
              </td>
              <td style="width: 69pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Variance</span></strong></p>
              </td>
              <td style="width: 66pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">GOLY%</span></strong></p>
              </td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Rooms Nights Available</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.availableRooms || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.availableRooms || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.availableRooms || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.availableRooms || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.availableRooms || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.availableRooms || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">RNA per day</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.notAvailableRooms || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.notAvailableRooms || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.notAvailableRooms || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.notAvailableRooms || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.notAvailableRooms || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.notAvailableRooms || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Total Room nights sold</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomsSold || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomsSold || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.roomsSold || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomsSold || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.roomsSold || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.roomsSold || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Rooms Sold per day</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomsSoldPerDay || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomsSoldPerDay || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.roomsSoldPerDay || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomsSoldPerDay || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.roomsSoldPerDay || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.roomsSoldPerDay || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Occupancy %</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.occupancyPercentage || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.occupancyPercentage || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.occupancyPercentage || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.occupancyPercentage || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.occupancyPercentage || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.occupancyPercentage || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">ARR</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.arr || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.arr || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.arr || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.arr || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.arr || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.arr || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Revpar</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.revPar || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.revPar || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.revPar || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.revPar || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.revPar || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.revPar || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Room Revenue&nbsp;</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomRevenue || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomRevenue || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.roomRevenue || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomRevenue || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.roomRevenue || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.roomRevenue || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Food And Beverage Revenue</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.foodAndBeverageRevenue || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.foodAndBeverageRevenue || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.foodAndBeverageRevenue || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.foodAndBeverageRevenue || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.foodAndBeverageRevenue || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.foodAndBeverageRevenue || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Covers</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.noOfCovers || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.noOfCovers || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.noOfCovers || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.noOfCovers || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.noOfCovers || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.noOfCovers || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Covers per day</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.noOfCoversPerDay || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.noOfCoversPerDay || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.noOfCoversPerDay || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.noOfCoversPerDay || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.noOfCoversPerDay || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.noOfCoversPerDay || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">APC</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.apc || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.apc || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.apc || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.apc || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.apc || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.apc || '0'}<br></td>
          </tr>
          <tr>
              <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Other Revenue</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.otherRevenue || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.otherRevenue || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.otherRevenue || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.otherRevenue || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.otherRevenue || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.otherRevenue || '0'}<br></td>
          </tr>
          <tr>
              <td style="width: 163pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Total Revenue</span></strong></p>
              </td>
              <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.totalRevenue || '0'}</span><br></td>
              <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.totalRevenue || '0'}</span><br></td>
              <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.budget?.totalRevenue || '0'}</span><br></td>
              <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.totalRevenue || '0'}</span></td>
              <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.variance?.totalRevenue || '0'}<br></td>
              <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">${data.goly?.totalRevenue || '0'}<br></td>
          </tr>
      </tbody>
  </table>
  <p style='margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  
  
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          table {
              border: none;
              width: 610.0pt;
              border-collapse: collapse;
          }
  
          td, th {
              border: 1pt solid black;
              padding: 0.75pt 0.75pt 0cm 0.75pt;
              height: 18.4pt;
              vertical-align: bottom;
              background: #F2F2F2;
          }
  
          th {
              background: #404040;
              color: #FFC000;
              font-size: 19px;
          }
  
          p {
              margin: 0;
              line-height: normal;
              font-size: 15px;
              font-family: "Calibri", sans-serif;
              vertical-align: middle;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <table>
          <tbody>
              <tr>
                  <td colspan="7">
                      <p><strong><span style="font-size:19px;color:#FFC000;">FPHL Chain Performance</span></strong></p>
                  </td>
              </tr>
              <tr>
                  <td colspan="7">
                      <p><strong><span style="font-size:19px;color:black;"> ${data.year} (Rev in Lakhs)</span></strong></p>
                  </td>
              </tr>
              <tr>
                  <th style="width: 163pt;">&nbsp;</th>
                  <th style="width: 67pt;">${data.year - 2 + '-' + (data.year - 1).toString().substring(2, 4)}</th>
                  <th style="width: 76pt;">${data.year - 1 + '-' + data.year.toString().substring(2, 4)}</th>
                  <th style="width: 85pt;">Budget TY</th>
                  <th style="width: 84pt;">${data.year + '-' + (data.year + 1).toString().substring(2, 4)}</th>
                  <th style="width: 69pt;">Variance</th>
                  <th style="width: 66pt;">GOLY%</th>
              </tr>
              <tr>
      <td>Revenue</td>
      <td>50,000</td>
      <td>60,000</td>
      <td>55,000</td>
      <td>65,000</td>
      <td>10,000</td>
      <td>18%</td>
  </tr>
  <tr>
      <td>Expenses</td>
      <td>40,000</td>
      <td>45,000</td>
      <td>42,000</td>
      <td>50,000</td>
      <td>8,000</td>
      <td>16%</td>
  </tr>
  <tr>
      <td>Profit</td>
      <td>10,000</td>
      <td>15,000</td>
      <td>13,000</td>
      <td>15,000</td>
      <td>2,000</td>
      <td>15%</td>
  </tr>
          </tbody>
      </table>
  </body>
  </html>
  
  `;
};
