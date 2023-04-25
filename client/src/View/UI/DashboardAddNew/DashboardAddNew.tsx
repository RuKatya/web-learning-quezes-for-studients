import { FC, FormEventHandler } from 'react'
import DashboardAddNewForm from './DashboardAddNewForm'

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
        <>
            <button
                onClick={() => setShowAddNewSubjectWindow(!showAddNewSubjectWindow)}
                className='addMoreBtn'>
                {showAddNewSubjectWindow ?
                    "CLOSE" :
                    `ADD NEW ${btnText}`
                }
            </button>

            {
                showAddNewSubjectWindow && (
                    <DashboardAddNewForm submitFunction={submitFunction} inputName={inputName} placeholderText={placeholderText} />
                )
            }
        </>
    )
}

export default DashboardAddNew
