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
        <Stack sx={{ width: '50%', mx: 'auto', p: 1 }} spacing={2}>
            <Alert
                variant="outlined" severity="info"
                onClose={() => {
                    setOpenMessage(false)
                    dispatch(removeMessage())
                }}
            >{message}</Alert>
        </Stack>
    )
}

export default InfoAlert
