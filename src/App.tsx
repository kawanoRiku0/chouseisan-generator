import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ja';
import Content from "./components/Content";


function App() {
    return (
        <div style={{margin: '0 auto', maxWidth: '500px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                <Content/>
            </LocalizationProvider>
        </div>)
}

export default App
