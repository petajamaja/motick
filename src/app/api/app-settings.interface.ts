export enum AttendanceMode {
    everyday,
    partial
}

export interface AppSettings {
    monthlyIncome: number;
    foodTickersPerManDay: number;
    rentSpendings: number;
    foodSpendings: number;
    goalAttendancePercent: number;
    attendanceMode: AttendanceMode;
}
