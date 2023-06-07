import {MenuItem, Select, InputLabel, Stack, Button, Box, Typography} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {useState} from "react";
import dayjs, {Dayjs} from 'dayjs';
import {generateCandidateDates, validateArgs} from "../functions";
import CopyToClipboardButton from "./CopyToClipboardButton";

function Content() {
    // 時間関連
    const timeCandidates = [...Array(23)].map((_, i) => i + 1)
    const intervalCandidates = Array.from({length: (180 - 5) / 5 + 1}, (_, i) => 5 * (i + 1));

    const [time, setTime] = useState<{ startTime: number, endTime: number }>({
        startTime: 10,
        endTime: 18
    })
    const onChangeStartTime = (time: number) => setTime((prev) => ({...prev, startTime: time}))
    const onChangeEndTime = (time: number) => setTime((prev) => ({...prev, endTime: time}))

    const [date, setDate] = useState<{ startDate: Date, endDate: Date }>({
        startDate: dayjs().toDate(),
        endDate: dayjs().add(1, 'day').toDate()
    })
    const onChangeStartDate = (date: Date) => setDate((prev) => ({...prev, startDate: date}))
    const onChangeEndDate = (date: Date) => setDate((prev) => ({...prev, endDate: date}))

    const [interval, setInterval] = useState(60)
    // ---------------------------------------------------------

    // 回答関連
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [candidates, setCandidates] = useState<string[]>([])

    // ロジック
    const generate = () => {
        const [{
            startDate,
            endDate,
            startHour,
            endHour,
            increment
        }, errors] = validateArgs(date.startDate, date.endDate, time.startTime, time.endTime, interval)
        if (errors.length > 0) {
            setErrorMessages(errors)
            setCandidates([])
            return
        }
        setErrorMessages([])

        setCandidates(generateCandidateDates(startDate, endDate, startHour, endHour, increment))
    }


    return (
        <div>
            <Box
                sx={{
                    bgcolor: '#34A219',
                    p: '16px',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '22px'
                    }}
                >
                    調整さんジェネレーター
                </Typography>
            </Box>
            <Stack spacing={2} marginTop={2}>
                <Stack direction="row" spacing={2}>
                    <DatePicker label="開始日" value={dayjs(date.startDate?.toLocaleString())}
                                onChange={(e) => onChangeStartDate((e as Dayjs).toDate())
                                }/>
                    <DatePicker label="終了日" value={dayjs(date.endDate?.toLocaleString())}
                                onChange={(e) => onChangeEndDate((e as Dayjs).toDate())}/>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <div>
                        <InputLabel id="start-time">開始時間</InputLabel>
                        <Select labelId="start-time" onChange={(e) => onChangeStartTime(e.target.value as number)}
                                value={time.startTime}>
                            {timeCandidates.map((t) => (
                                <MenuItem key={t} value={t}>{t}</MenuItem>
                            ))}
                        </Select>

                    </div>

                    <div>
                        <InputLabel id="end-time">終了時間</InputLabel>
                        <Select labelId="end-time" onChange={(e) => onChangeEndTime(e.target.value as number)}
                                value={time.endTime}>
                            {timeCandidates.map((t) => (
                                <MenuItem key={t} value={t}>{t}</MenuItem>
                            ))}
                        </Select>

                    </div>

                    <div>
                        <InputLabel id="interval">間隔（分）</InputLabel>
                        <Select labelId="interval" onChange={(e) => setInterval(e.target.value as number)}
                                value={interval}>
                            {intervalCandidates.map((i) => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </Stack>
                <Button sx={{backgroundColor: "#56B238", "&:hover": {backgroundColor: "#56B238", opacity: 0.7,}}}
                        variant="contained"
                        onClick={generate}>生成</Button>
            </Stack>
            {
                errorMessages.length > 0 && (
                    <div>
                        <ul>
                            {errorMessages.map((e) => <li style={{color: '#c0392b'}} key={e}>{e}</li>)}
                        </ul>
                    </div>)
            }

            {
                candidates.length > 0 && (
                    <div>
                        <h3>生成された候補日</h3>
                        <CopyToClipboardButton text={candidates.reduce((prev, curr) => prev + curr + '\n', '')}/>
                    </div>

                )
            }
        </div>)
}

export default Content;