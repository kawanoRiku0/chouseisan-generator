import {FC, useRef} from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {Button, Stack} from "@mui/material";


type Props = {
    text: string
}

const CopyToClipboardButton: FC<Props> = ({text}) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const copyToClipboard = () => {
        if (textAreaRef.current === null || !textAreaRef.current?.value) return
        navigator.clipboard.writeText(textAreaRef.current.value)
            .then(() => alert('候補日をコピーしました'))
            .catch(err => alert(`コピーに失敗しました: ${err}`));
    };

    return (
        <div>
            <form>
                <TextareaAutosize style={{maxHeight: '300px', overflow: 'auto', width: '100%'}} ref={textAreaRef}
                                  value={text}/>
            </form>
            <Stack direction="row-reverse">
                <Button sx={{
                    bgcolor: "#56B238",
                    "&:hover": {bgcolor: "#56B238", opacity: 0.7,}
                }}
                        variant="contained" onClick={copyToClipboard}>コピーする</Button>
            </Stack>
        </div>
    );
}

export default CopyToClipboardButton;
