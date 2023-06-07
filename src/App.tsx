import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ja';
import Content from "./components/Content";
import {useEffect} from "react";


function App() {
    useEffect(() => {
        document.title = '調整さんジェネレーター';
    }, []);
    return (
        <div style={{margin: '0 auto', maxWidth: '500px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                <Content/>
            </LocalizationProvider>
        </div>)
}

export default App
