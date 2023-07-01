import { Alert } from '@mui/material';
import { Stack } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';

export interface InfoAlertProps {
    message: string, setOpenMessage: Function, removeMessage: Function
}
const InfoAlert = ({ message, setOpenMessage, removeMessage }: InfoAlertProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        setTimeout(() => {
            setOpenMessage(false)
            dispatch(removeMessage())
        }, 2000)
    }, [])

    return (
        <Stack sx={{ width: '100%', position: 'absolute', bottom: "2%", left: "0%" }}>
            <Alert
                severity="info"
                onClose={() => {
                    setOpenMessage(false)
                    dispatch(removeMessage())
                }}
            >{message}</Alert>
        </Stack>
    )
}

export default InfoAlert
