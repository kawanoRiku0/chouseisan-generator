export const formatTwoDigits = (num: number): string => num < 10 ? `0${num}` : `${num}`;

export const moveToNextDay = (date: Date, startHour: number): Date => {
    const newDate = new Date(date.getTime())
    newDate.setDate(newDate.getDate() + 1);
    newDate.setHours(startHour, 0, 0);
    return newDate;
}

export const generateTimeSlot = (date: Date, increment: number, dayOfWeekJp: string[]): string => {
    const incrementTime = new Date(date.getTime() + increment * 60000);
    return `${date.getMonth() + 1}/${date.getDate()}（${dayOfWeekJp[date.getDay()]}）${formatTwoDigits(date.getHours())}:${formatTwoDigits(date.getMinutes())}〜${formatTwoDigits(incrementTime.getHours())}:${formatTwoDigits(incrementTime.getMinutes())}`;
}

export const generateCandidateDates = (startDate: Date, endDate: Date, startHour: number, endHour: number, increment: number) => {
    const daysOfWeekJp = ["日", "月", "火", "水", "木", "金", "土"];

    startDate.setHours(startHour, 0, 0);
    endDate.setHours(endHour, 0, 0);

    const result: string[] = [];
    let t = new Date(startDate.getTime());

    while (t.getTime() <= endDate.getTime()) {
        if (t.getHours() > endHour || (t.getHours() === endHour && t.getMinutes() >= 0)) {
            t = moveToNextDay(t, startHour);
            continue;
        }
        result.push(generateTimeSlot(t, increment, daysOfWeekJp));
        t.setTime(t.getTime() + increment * 60000);
    }

    return result;
}

type Errors = string[]
type ValidatedArg = {
    startDate: Date
    endDate: Date
    startHour: number
    endHour: number
    increment: number
}
export const validateArgs = (startDateArg: Date, endDateArg: Date, startHourArg: number, endHourArg: number, incrementArg: number): [ValidatedArg, Errors] => {
    const errors: Errors = [];

    if (endDateArg.getTime() <= startDateArg.getTime()) {
        errors.push("終了日は開始日よりも後でなければなりません。");
    }

    if (endHourArg <= startHourArg) {
        errors.push("終了時間は開始時間よりも後でなければなりません。");
    }

    return [{
        startDate: startDateArg,
        endDate: endDateArg,
        startHour: startHourArg,
        endHour: endHourArg,
        increment: incrementArg
    }, errors]
}
