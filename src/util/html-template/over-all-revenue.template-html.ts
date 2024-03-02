export interface RevenueData {
  availableRooms: number;
  occupancyPercentage: number;
  roomRevenue: number;
  foodAndBeverageRevenue: number;
  otherRevenue: number;
  totalRevenue: number;
  year: number;
  month: number;
}
interface OverAllReport {
  currentYear: RevenueData;
  oneYearB4Now: RevenueData;
  twoYearB4Now: RevenueData;
}
export const overAllRevenueHtmlTemplate = async (data: OverAllReport) => {
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
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:middle;'><strong><span style="font-size:19px;color:black;">August, 2023 (Rev in Lakhs)</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width: 163pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">&nbsp;</span></strong></p>
            </td>
            <td style="width: 67pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;vertical-align:bottom;'><strong><span style="font-size:19px;color:black;">2021-22</span></strong></p>
            </td>
            <td style="width: 76pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">2022-23</span></strong></p>
            </td>
            <td style="width: 85pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Budget TY</span></strong></p>
            </td>
            <td style="width: 84pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">2023-24</span></strong></p>
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
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.availableRooms ?? ''}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.availableRooms ?? ''}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.availableRooms ?? ''}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">RNA per day</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Total Room nights sold</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Rooms Sold per day</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Occupancy %</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.occupancyPercentage ?? ''}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.occupancyPercentage ?? ''}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.currentYear?.occupancyPercentage ?? ''}</span><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">ARR</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Revpar</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Room Revenue&nbsp;</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.roomRevenue ?? ''}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomRevenue ?? ''}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br><span>${data.currentYear?.roomRevenue ?? ''}</span></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Food And Beverage Revenue</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.foodAndBeverageRevenue ?? ''}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.roomRevenue ?? ''}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.currentYear?.roomRevenue ?? ''}</span><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Covers</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">No. of Covers per day</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">APC</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width:163.0pt;border:solid black 1.0pt;border-top:none;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  middle;'><strong><span style="font-size:19px;color:black;">Other Revenue</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.otherRevenue ?? ''}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.otherRevenue ?? ''}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.currentYear?.otherRevenue ?? ''}</span><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#F2F2F2;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
        </tr>
        <tr>
            <td style="width: 163pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;background: rgb(196, 189, 151);padding: 0.75pt 0.75pt 0cm;height: 18.4pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;vertical-align:  bottom;'><strong><span style="font-size:19px;color:black;">Total Revenue</span></strong></p>
            </td>
            <td style="width:67.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.twoYearB4Now?.totalRevenue ?? ''}</span><br></td>
            <td style="width:76.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.oneYearB4Now?.totalRevenue ?? ''}</span><br></td>
            <td style="width:85.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:84.0pt;border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><span>${data.currentYear?.totalRevenue ?? ''}</span><br></td>
            <td style="width:69.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
            <td style="width:66.0pt;border-top:none;border-left:none;border-bottom:  solid black 1.0pt;border-right:solid black 1.0pt;background:#C4BD97;padding:.75pt .75pt 0cm .75pt;height:18.4pt;"><br></td>
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
                    <p><strong><span style="font-size:19px;color:black;">August, 2023 (Rev in Lakhs)</span></strong></p>
                </td>
            </tr>
            <tr>
                <th style="width: 163pt;">&nbsp;</th>
                <th style="width: 67pt;">2021-22</th>
                <th style="width: 76pt;">2022-23</th>
                <th style="width: 85pt;">Budget TY</th>
                <th style="width: 84pt;">2023-24</th>
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
