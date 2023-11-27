import React, { FC, useState } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { addSubject } from "../../../../../features/subjects/subjectsAPI";
import DashboardAddNew from "../../../../UI/DashboardAddNew/DashboardAddNew";

const AddSubjForm: FC = () => {
    const [showAddNewSubjectWindow, setShowAddNewSubjectWindow] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const hendleAddNewSubject = (ev: React.SyntheticEvent) => {
        ev.preventDefault();

        const target = ev.target as typeof ev.target & {
            subjectName: { value: string };
        };

        const subjectName = target.subjectName.value;

        if (subjectName.length <= 2) return alert("The Input must be atleast 3 charasters");

        dispatch(addSubject(subjectName));
        setShowAddNewSubjectWindow(false);
    };

    return (
        <>
            <DashboardAddNew
                btnText={"SUBJECT"}
                submitFunction={hendleAddNewSubject}
                inputName={"subjectName"}
                placeholderText={"Enter Subject"}
                showAddNewSubjectWindow={showAddNewSubjectWindow}
                setShowAddNewSubjectWindow={setShowAddNewSubjectWindow}
            />
        </>
    );
};

export default AddSubjForm;
