import { FC, useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { selectTheme } from '../../features/dark-light-theme/theme';
import { useAppSelector } from '../../app/hooks';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

interface ListItemProps {
    itemID: number,
    itemName: string,
    itemCategory: string,
    deleteFunc: Function,
    updateFunc?: any,
}

const ListItem: FC<ListItemProps> = ({
    itemID,
    itemName,
    itemCategory,
    deleteFunc,
    updateFunc,
}) => {
    const [editItem, setEditItem] = useState<boolean>(false)
    const theme = useAppSelector(selectTheme)

    return (
        <div key={itemID} className={`dashboardInfo__listItem dashboardInfo__listItem__${theme}-theme`}>
            <h1>
                {editItem ?
                    <Form onSubmit={updateFunc} className='dashboardInfo__listItem--formUpdate'>
                        <button
                            type="button"
                            title='Cancel Update'
                            onClick={() => setEditItem(!editItem)}
                        >
                            <CloseOutlinedIcon
                                sx={{ color: 'white' }}
                            />
                        </button>
                        <input type="text" name={`${itemCategory}Name`} placeholder='' id={`${itemID}`} defaultValue={itemName} />
                        <button
                            type="submit"
                            title='Save Update'
                        >
                            <DoneOutlinedIcon
                                sx={{ color: 'white' }}
                            />
                        </button>
                        {/* <div className='dashboardInfo__listItem--formUpdateBtns'>
                        </div> */}
                    </Form>
                    :
                    <Link to={`/dashboard/${itemCategory}/${itemID}`}>{itemName}</Link>
                }
            </h1>
            <div className='dashboardInfo__listItem--controlBtn'>
                {!editItem && (<>
                    <button
                        type='button'
                        title={`Update ${itemName}`}
                        onClick={() => setEditItem(!editItem)}>
                        <AutorenewOutlinedIcon
                            sx={{ color: 'white' }} />
                    </button>
                    <button
                        type='button'
                        title={`Delete ${itemName}`}
                        onClick={() => deleteFunc(itemID, itemName)
                        }>
                        <DeleteForeverOutlinedIcon sx={{ color: 'white' }} />
                    </button>
                </>)}
            </div>
        </div>
    )
}

export default ListItem
