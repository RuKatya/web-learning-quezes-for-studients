import { FC } from 'react'
import { useAppDispatch } from '../../../../../app/hooks'
import { deleteOneUser } from '../../../../../features/users/usersApi'
import { useNavigate } from 'react-router-dom'

interface DeleteBtnProps {
    userId: number
}
const DeleteBtn: FC<DeleteBtnProps> = ({ userId }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <button onClick={async () => {
            await dispatch(deleteOneUser(Number(userId)))
            navigate('/dashboard/allUser', { replace: true })
        }}>Delete</button>
    )
}

export default DeleteBtn
