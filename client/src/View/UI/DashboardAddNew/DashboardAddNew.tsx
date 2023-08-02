import { FC, FormEventHandler } from 'react'
import DashboardAddNewForm from './DashboardAddNewForm'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface DashboardAddNewProps {
    btnText: string,
    submitFunction: FormEventHandler<HTMLFormElement>,
    inputName: string,
    placeholderText: string,
    showAddNewSubjectWindow: boolean,
    setShowAddNewSubjectWindow: Function
}
const DashboardAddNew: FC<DashboardAddNewProps> = ({
    btnText,
    submitFunction,
    inputName,
    placeholderText,
    showAddNewSubjectWindow,
    setShowAddNewSubjectWindow }) => {

    return (
        <div className='addMoreForm'>
            <div
                className='addMoreForm__btn'
                onClick={() => setShowAddNewSubjectWindow(!showAddNewSubjectWindow)}>
                {showAddNewSubjectWindow ? <DisabledByDefaultIcon /> : <LibraryAddIcon />}
            </div>

            {showAddNewSubjectWindow && (
                <DashboardAddNewForm
                    submitFunction={submitFunction}
                    inputName={inputName}
                    placeholderText={placeholderText} />)}
        </div>
    )
}

export default DashboardAddNew
