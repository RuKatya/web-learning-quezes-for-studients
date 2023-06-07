import { Alert } from '@mui/material';
import { Stack } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
// import { useEffect } from 'react';
// import { relative } from 'path';
// import { useResponsivity } from '../../hooks/useWidth';

export interface InfoAlertProps {
    message: string, setOpenMessage: Function, removeMessage: Function
}
const InfoAlert = ({ message, setOpenMessage, removeMessage }: InfoAlertProps) => {
    const dispatch = useAppDispatch()
    // const isMobile = useResponsivity()


    // useEffect(() => {
    //     setTimeout(() => {
    //         setOpenMessage(false)
    //         dispatch(removeMessage())
    //     }, 2000)
    // }, [])

    return (
        <Stack sx={{ width: '90%', p: 1, position: 'absolute', bottom: "0%" }} spacing={2}>
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
