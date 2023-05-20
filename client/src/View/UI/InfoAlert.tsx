import { Alert } from '@mui/material';
import { Stack } from '@mui/material';
import { setMessageEmpty } from '../../features/subjects/subjectsSlice';
import { useAppDispatch } from '../../app/hooks';

export interface InfoAlertProps {
    message: string, setOpenMessage: Function
}
const InfoAlert = ({ message, setOpenMessage }: InfoAlertProps) => {
    const dispatch = useAppDispatch()

    return (
        <Stack sx={{ width: '50%', mx: 'auto', p: 1 }} spacing={2}>
            <Alert
                variant="outlined" severity="info"
                onClose={() => {
                    setOpenMessage(false)
                    dispatch(setMessageEmpty())
                }}
            >{message}</Alert>
        </Stack>
    )
}

export default InfoAlert
